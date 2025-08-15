import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchFiltersSchema } from "@shared/schema";
import { AuthService } from "./auth";
import { GoogleAuthService } from "./google-auth";
import { type LoginCredentials, type RegisterData } from "@shared/types";

export async function registerRoutes(app: Express): Promise<Server> {
  const authService = new AuthService(storage);
  const googleAuthService = new GoogleAuthService(storage);

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const registerData: RegisterData = req.body;
      const result = await authService.register(registerData);
      
      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(201).json(result);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Đã có lỗi xảy ra khi đăng ký" 
      });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData: LoginCredentials = req.body;
      const result = await authService.login(loginData);
      
      if (!result.success) {
        return res.status(401).json(result);
      }

      res.json(result);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Đã có lỗi xảy ra khi đăng nhập" 
      });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Access token required' });
      }

      const user = await authService.getCurrentUser(token);
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    // For JWT tokens, logout is handled client-side by removing the token
    res.json({ success: true, message: "Đăng xuất thành công" });
  });

  // Google config endpoint for debugging
  app.get("/api/auth/google-config", (req, res) => {
    res.json({
      configured: !!process.env.GOOGLE_CLIENT_ID,
      clientIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0
    });
  });

  // Google authentication route
  app.post("/api/auth/google", async (req, res) => {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Token Google không được cung cấp"
        });
      }

      const result = await googleAuthService.signInWithGoogle(token);
      
      if (!result.success) {
        return res.status(401).json(result);
      }

      res.json(result);
    } catch (error) {
      console.error('Google auth error:', error);
      res.status(500).json({
        success: false,
        message: "Đã có lỗi xảy ra khi đăng nhập bằng Google"
      });
    }
  });
  // Get all tutors with optional filters
  app.get("/api/tutors", async (req, res) => {
    try {
      const filters = searchFiltersSchema.parse({
        subject: req.query.subject,
        courseType: req.query.courseType,
        minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
        timeSlots: req.query.timeSlots ? (req.query.timeSlots as string).split(',') : undefined,
        keywords: req.query.keywords,
      });

      const tutors = await storage.getTutors(filters);
      res.json(tutors);
    } catch (error) {
      res.status(400).json({ message: "Invalid filter parameters" });
    }
  });

  // Get specific tutor
  app.get("/api/tutors/:id", async (req, res) => {
    try {
      const tutor = await storage.getTutor(req.params.id);
      if (!tutor) {
        return res.status(404).json({ message: "Tutor not found" });
      }
      res.json(tutor);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all videos
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all subjects
  app.get("/api/subjects", async (req, res) => {
    try {
      const subjects = await storage.getSubjects();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Curriculum Management Routes
  
  // Get all curriculums for a tutor
  app.get("/api/tutors/:tutorId/curriculums", async (req, res) => {
    try {
      const curriculums = await storage.getCurriculums(req.params.tutorId);
      res.json(curriculums);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get specific curriculum
  app.get("/api/curriculums/:id", async (req, res) => {
    try {
      const curriculum = await storage.getCurriculum(req.params.id);
      if (!curriculum) {
        return res.status(404).json({ message: "Curriculum not found" });
      }
      res.json(curriculum);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create new curriculum
  app.post("/api/curriculums", async (req, res) => {
    try {
      const curriculumData = req.body;
      const curriculum = await storage.createCurriculum(curriculumData);
      res.status(201).json(curriculum);
    } catch (error) {
      console.error('Create curriculum error:', error);
      res.status(500).json({ message: "Failed to create curriculum" });
    }
  });

  // Update curriculum
  app.put("/api/curriculums/:id", async (req, res) => {
    try {
      const curriculumData = req.body;
      const curriculum = await storage.updateCurriculum(req.params.id, curriculumData);
      if (!curriculum) {
        return res.status(404).json({ message: "Curriculum not found" });
      }
      res.json(curriculum);
    } catch (error) {
      console.error('Update curriculum error:', error);
      res.status(500).json({ message: "Failed to update curriculum" });
    }
  });

  // Delete curriculum
  app.delete("/api/curriculums/:id", async (req, res) => {
    try {
      const success = await storage.deleteCurriculum(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Curriculum not found" });
      }
      res.json({ message: "Curriculum deleted successfully" });
    } catch (error) {
      console.error('Delete curriculum error:', error);
      res.status(500).json({ message: "Failed to delete curriculum" });
    }
  });

  // Get curriculum topics
  app.get("/api/curriculums/:curriculumId/topics", async (req, res) => {
    try {
      const topics = await storage.getCurriculumTopics(req.params.curriculumId);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create curriculum topic
  app.post("/api/curriculums/:curriculumId/topics", async (req, res) => {
    try {
      const topicData = { ...req.body, curriculumId: req.params.curriculumId };
      const topic = await storage.createCurriculumTopic(topicData);
      res.status(201).json(topic);
    } catch (error) {
      console.error('Create topic error:', error);
      res.status(500).json({ message: "Failed to create topic" });
    }
  });

  // Update curriculum topic
  app.put("/api/topics/:id", async (req, res) => {
    try {
      const topicData = req.body;
      const topic = await storage.updateCurriculumTopic(req.params.id, topicData);
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }
      res.json(topic);
    } catch (error) {
      console.error('Update topic error:', error);
      res.status(500).json({ message: "Failed to update topic" });
    }
  });

  // Delete curriculum topic
  app.delete("/api/topics/:id", async (req, res) => {
    try {
      const success = await storage.deleteCurriculumTopic(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Topic not found" });
      }
      res.json({ message: "Topic deleted successfully" });
    } catch (error) {
      console.error('Delete topic error:', error);
      res.status(500).json({ message: "Failed to delete topic" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
