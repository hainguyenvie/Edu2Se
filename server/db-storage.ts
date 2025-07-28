import { eq, and, or, ilike, gte, lte, sql } from "drizzle-orm";
import { db } from "./database";
import { users, tutors, videos, subjects } from "@shared/schema";
import { type User, type InsertUser, type Tutor, type InsertTutor, type Video, type InsertVideo, type Subject, type InsertSubject, type SearchFilters } from "@shared/types";
import { type IStorage } from "./storage";

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values({
      ...user,
      role: user.role || 'student',
      isEmailVerified: false,
    }).returning();
    return result[0];
  }

  async updateUserLastLogin(id: string): Promise<void> {
    await db.update(users)
      .set({ 
        lastLogin: new Date(),
        updatedAt: new Date()
      })
      .where(eq(users.id, id));
  }

  async getTutors(filters?: SearchFilters): Promise<Tutor[]> {
    let query = db.select().from(tutors);
    
    if (filters) {
      const conditions = [];
      
      if (filters.subject) {
        // Check if the subject is in the subjects array
        conditions.push(sql`${filters.subject} = ANY(${tutors.subjects})`);
      }
      
      if (filters.minPrice !== undefined) {
        conditions.push(gte(tutors.pricePerHour, filters.minPrice));
      }
      
      if (filters.maxPrice !== undefined) {
        conditions.push(lte(tutors.pricePerHour, filters.maxPrice));
      }
      
      if (filters.timeSlots && filters.timeSlots.length > 0) {
        // Check if any of the time slots overlap
        conditions.push(sql`${tutors.timeSlots} && ${filters.timeSlots}`);
      }
      
      if (filters.keywords) {
        conditions.push(
          or(
            ilike(tutors.name, `%${filters.keywords}%`),
            ilike(tutors.description, `%${filters.keywords}%`),
            ilike(tutors.education, `%${filters.keywords}%`)
          )
        );
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return await query;
  }

  async getTutor(id: string): Promise<Tutor | undefined> {
    const result = await db.select().from(tutors).where(eq(tutors.id, id)).limit(1);
    return result[0];
  }

  async createTutor(tutor: InsertTutor): Promise<Tutor> {
    const result = await db.insert(tutors).values(tutor).returning();
    return result[0];
  }

  async getVideos(): Promise<Video[]> {
    return await db.select().from(videos);
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const result = await db.insert(videos).values(video).returning();
    return result[0];
  }

  async getSubjects(): Promise<Subject[]> {
    return await db.select().from(subjects);
  }

  async createSubject(subject: InsertSubject): Promise<Subject> {
    const result = await db.insert(subjects).values(subject).returning();
    return result[0];
  }
}