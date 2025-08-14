import { type User, type InsertUser, type Tutor, type InsertTutor, type Video, type InsertVideo, type Subject, type InsertSubject, type SearchFilters, type Curriculum, type InsertCurriculum, type CurriculumTopic, type InsertCurriculumTopic } from "@shared/types";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserLastLogin(id: string): Promise<void>;
  
  getTutors(filters?: SearchFilters): Promise<Tutor[]>;
  getTutor(id: string): Promise<Tutor | undefined>;
  createTutor(tutor: InsertTutor): Promise<Tutor>;
  
  getVideos(): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  
  getSubjects(): Promise<Subject[]>;
  createSubject(subject: InsertSubject): Promise<Subject>;
  
  getCurriculums(tutorId: string): Promise<Curriculum[]>;
  getCurriculum(id: string): Promise<Curriculum | undefined>;
  createCurriculum(curriculum: InsertCurriculum): Promise<Curriculum>;
  updateCurriculum(id: string, curriculum: Partial<InsertCurriculum>): Promise<Curriculum | undefined>;
  deleteCurriculum(id: string): Promise<boolean>;
  
  getCurriculumTopics(curriculumId: string): Promise<CurriculumTopic[]>;
  createCurriculumTopic(topic: InsertCurriculumTopic): Promise<CurriculumTopic>;
  updateCurriculumTopic(id: string, topic: Partial<InsertCurriculumTopic>): Promise<CurriculumTopic | undefined>;
  deleteCurriculumTopic(id: string): Promise<boolean>;
}

// import { DbStorage } from "./db-storage";

// Use memory storage temporarily until database is properly configured
// export const storage = new DbStorage();

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tutors: Map<string, Tutor>;
  private videos: Map<string, Video>;
  private subjects: Map<string, Subject>;
  private curriculums: Map<string, Curriculum>;
  private curriculumTopics: Map<string, CurriculumTopic>;

  constructor() {
    this.users = new Map();
    this.tutors = new Map();
    this.videos = new Map();
    this.subjects = new Map();
    this.curriculums = new Map();
    this.curriculumTopics = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize subjects
    const subjectsData: InsertSubject[] = [
      { name: "Math", nameVi: "TOÁN", icon: "Calculator", color: "hsl(207, 90%, 54%)", isActive: true },
      { name: "Literature", nameVi: "VĂN", icon: "Book", color: "hsl(142, 71%, 45%)", isActive: true },
      { name: "Physics", nameVi: "LÝ", icon: "Zap", color: "hsl(16, 89%, 58%)", isActive: true },
      { name: "Chemistry", nameVi: "HÓA", icon: "Beaker", color: "hsl(340, 82%, 52%)", isActive: true },
      { name: "Biology", nameVi: "SINH", icon: "Leaf", color: "hsl(120, 61%, 50%)", isActive: true },
      { name: "English", nameVi: "TIẾNG ANH", icon: "Languages", color: "hsl(262, 83%, 58%)", isActive: true },
      { name: "French", nameVi: "TIẾNG PHÁP", icon: "Globe", color: "hsl(221, 83%, 53%)", isActive: true },
      { name: "Russian", nameVi: "TIẾNG NGA", icon: "GlobeEurope", color: "hsl(0, 72%, 51%)", isActive: true },
      { name: "Test Prep", nameVi: "ÔN THI", icon: "GraduationCap", color: "hsl(45, 93%, 47%)", isActive: true },
      { name: "Advanced", nameVi: "NÂNG CAO", icon: "Star", color: "hsl(291, 64%, 42%)", isActive: true },
      { name: "Consultation", nameVi: "TƯ VẤN", icon: "MessageCircle", color: "hsl(173, 58%, 39%)", isActive: true },
      { name: "Career Guidance", nameVi: "HƯỚNG NGHIỆP", icon: "Compass", color: "hsl(25, 95%, 53%)", isActive: true },
    ];

    subjectsData.forEach(subject => {
      const id = randomUUID();
      this.subjects.set(id, { 
        ...subject, 
        id,
        isActive: subject.isActive ?? true 
      });
    });

    // Initialize tutors
    const tutorsData: InsertTutor[] = [
      // Math tutors
      {
        name: "Thầy Minh Tuấn",
        subjects: ["Toán"],
        grades: ["Lớp 10-12"],
        education: "ĐH Bách Khoa",
        pricePerHour: 250000,
        rating: "5.0",
        reviewCount: 23,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        timeSlots: ["morning", "afternoon"],
        description: "Chuyên gia toán học với 5 năm kinh nghiệm",
      },
      {
        name: "Thầy Hoàng Nam",
        subjects: ["Toán"],
        grades: ["Lớp 9-12"],
        education: "ĐH Khoa Học Tự Nhiên",
        pricePerHour: 180000,
        rating: "4.8",
        reviewCount: 56,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop",
        timeSlots: ["afternoon", "evening"],
        description: "Giáo viên toán với phương pháp dạy sáng tạo",
      },
      {
        name: "Cô Mai Anh",
        subjects: ["Toán"],
        grades: ["Lớp 6-9"],
        education: "ĐH Sư Phạm",
        pricePerHour: 150000,
        rating: "4.9",
        reviewCount: 34,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=300&fit=crop",
        timeSlots: ["morning", "afternoon"],
        description: "Chuyên dạy toán cơ bản cho học sinh THCS",
      },
      
      // Literature tutors
      {
        name: "Cô Lan Hương",
        subjects: ["Văn"],
        grades: ["Lớp 9-12"],
        education: "ĐH Sư Phạm",
        pricePerHour: 200000,
        rating: "4.9",
        reviewCount: 47,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=300&fit=crop",
        timeSlots: ["evening"],
        description: "Giáo viên văn học nhiều năm kinh nghiệm",
      },
      {
        name: "Thầy Văn Dũng",
        subjects: ["Văn"],
        grades: ["Lớp 10-12"],
        education: "ĐH Văn Hóa",
        pricePerHour: 220000,
        rating: "4.7",
        reviewCount: 29,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
        timeSlots: ["morning", "evening"],
        description: "Chuyên gia phân tích văn học và luyện thi",
      },
      
      // English tutors
      {
        name: "Thầy Đức Anh",
        subjects: ["Tiếng Anh"],
        grades: ["Lớp 6-12"],
        education: "IELTS 8.0",
        pricePerHour: 350000,
        rating: "5.0",
        reviewCount: 89,
        status: "online",
        isVerified: true,
        isTopRated: true,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
        timeSlots: ["morning", "afternoon", "evening"],
        description: "Chuyên gia tiếng Anh, IELTS 8.0",
      },
      {
        name: "Cô Jennifer",
        subjects: ["Tiếng Anh"],
        grades: ["Lớp 6-12"],
        education: "Native Speaker - ĐH Oxford",
        pricePerHour: 500000,
        rating: "4.9",
        reviewCount: 67,
        status: "online",
        isVerified: true,
        isTopRated: true,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop",
        timeSlots: ["afternoon", "evening"],
        description: "Native English speaker từ Anh Quốc",
      },
      {
        name: "Thầy Minh Quân",
        subjects: ["Tiếng Anh"],
        grades: ["Lớp 9-12"],
        education: "TOEIC 950",
        pricePerHour: 280000,
        rating: "4.8",
        reviewCount: 42,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        timeSlots: ["morning", "afternoon"],
        description: "Chuyên luyện thi TOEIC và giao tiếp",
      },
      
      // Physics tutors
      {
        name: "Cô Thu Hà",
        subjects: ["Lý"],
        grades: ["Lớp 10-12"],
        education: "ĐH Khoa Học Tự Nhiên",
        pricePerHour: 280000,
        rating: "4.8",
        reviewCount: 31,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop",
        timeSlots: ["afternoon", "evening"],
        description: "Giáo viên vật lý chuyên nghiệp",
      },
      {
        name: "Thầy Trung Kiên",
        subjects: ["Lý"],
        grades: ["Lớp 9-12"],
        education: "ĐH Bách Khoa",
        pricePerHour: 250000,
        rating: "4.9",
        reviewCount: 38,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=300&fit=crop",
        timeSlots: ["morning", "evening"],
        description: "Chuyên dạy vật lý và luyện thi đại học",
      },
      
      // Chemistry tutors
      {
        name: "Thầy Quang Minh",
        subjects: ["Hóa"],
        grades: ["Lớp 10-12"],
        education: "ĐH Y Dược",
        pricePerHour: 300000,
        rating: "4.9",
        reviewCount: 64,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=300&fit=crop",
        timeSlots: ["morning", "evening"],
        description: "Chuyên gia hóa học, cử nhân y dược",
      },
      {
        name: "Cô Hương Giang",
        subjects: ["Hóa"],
        grades: ["Lớp 9-12"],
        education: "ĐH Khoa Học Tự Nhiên",
        pricePerHour: 240000,
        rating: "4.7",
        reviewCount: 25,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
        timeSlots: ["afternoon", "evening"],
        description: "Giáo viên hóa học với phương pháp thực hành",
      },
      
      // Biology tutors
      {
        name: "Cô Phương Linh",
        subjects: ["Sinh"],
        grades: ["Lớp 10-12"],
        education: "ĐH Y Hà Nội",
        pricePerHour: 220000,
        rating: "4.7",
        reviewCount: 18,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
        timeSlots: ["morning"],
        description: "Giáo viên sinh học chuyên nghiệp",
      },
      {
        name: "Thầy Bảo Long",
        subjects: ["Sinh"],
        grades: ["Lớp 9-12"],
        education: "ĐH Y Dược TP.HCM",
        pricePerHour: 260000,
        rating: "4.8",
        reviewCount: 33,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        timeSlots: ["afternoon", "evening"],
        description: "Chuyên gia sinh học và y học",
      },
      
      // Multi-subject tutors
      {
        name: "Cô Thanh Huyền",
        subjects: ["Toán", "Lý"],
        grades: ["Lớp 10-12"],
        education: "ĐH Bách Khoa",
        pricePerHour: 320000,
        rating: "4.9",
        reviewCount: 45,
        status: "online",
        isVerified: true,
        isTopRated: true,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=300&fit=crop",
        timeSlots: ["morning", "afternoon"],
        description: "Chuyên gia toán - lý tích hợp",
      },
      {
        name: "Thầy Công Minh",
        subjects: ["Hóa", "Sinh"],
        grades: ["Lớp 9-12"],
        education: "ĐH Y Hà Nội",
        pricePerHour: 290000,
        rating: "4.8",
        reviewCount: 52,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
        timeSlots: ["evening"],
        description: "Chuyên dạy khối tự nhiên",
      },
      
      // Affordable tutors
      {
        name: "Cô Ngọc Ánh",
        subjects: ["Toán"],
        grades: ["Lớp 6-9"],
        education: "ĐH Sư Phạm",
        pricePerHour: 120000,
        rating: "4.6",
        reviewCount: 28,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop",
        timeSlots: ["morning", "afternoon"],
        description: "Dạy toán cơ bản cho học sinh THCS",
      },
      {
        name: "Thầy Đình Hùng",
        subjects: ["Văn"],
        grades: ["Lớp 6-9"],
        education: "ĐH Sư Phạm",
        pricePerHour: 130000,
        rating: "4.5",
        reviewCount: 19,
        status: "online",
        isVerified: true,
        isTopRated: false,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        timeSlots: ["afternoon", "evening"],
        description: "Giáo viên văn cấp 2 nhiều năm kinh nghiệm",
      },
      
      // Premium tutors
      {
        name: "Thầy Việt Hoàng",
        subjects: ["Toán", "Lý", "Hóa"],
        grades: ["Lớp 10-12"],
        education: "Tiến sĩ ĐH Bách Khoa",
        pricePerHour: 600000,
        rating: "5.0",
        reviewCount: 156,
        status: "online",
        isVerified: true,
        isTopRated: true,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=300&fit=crop",
        timeSlots: ["morning"],
        description: "Tiến sĩ khoa học, chuyên gia luyện thi",
      },
      {
        name: "Cô Helen Smith",
        subjects: ["Tiếng Anh"],
        grades: ["Lớp 6-12"],
        education: "Native - ĐH Cambridge",
        pricePerHour: 800000,
        rating: "5.0",
        reviewCount: 89,
        status: "online",
        isVerified: true,
        isTopRated: true,
        badges: ["ONLINE"],
        profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop",
        timeSlots: ["evening"],
        description: "Native English speaker từ Cambridge",
      },
    ];

    tutorsData.forEach(tutor => {
      const id = randomUUID();
      this.tutors.set(id, { ...tutor, id, createdAt: new Date() });
    });

    // Add a demo tutor with a stable ID so you can open it directly
    const demoTutorId = "380e334d-4366-4033-aa82-0344f55a30e4";
    this.tutors.set(demoTutorId, {
      id: demoTutorId,
      name: "MINH TIẾN",
      subjects: ["Toán", "Lý"],
      grades: ["Lớp 10", "Lớp 11", "Lớp 12"],
      education: "Đại học Bách Khoa Hà Nội",
      experience: "5 năm kinh nghiệm",
      pricePerHour: 150000,
      rating: "4.9",
      reviewCount: 150,
      status: "online",
      isVerified: true,
      isTopRated: true,
      badges: ["ONLINE", "TOP"],
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      timeSlots: ["evening"],
      description: "Gia sư Toán - Lý với 5+ năm kinh nghiệm. Chuyên luyện thi Đại học, phương pháp dễ hiểu, tận tâm.",
      createdAt: new Date(),
    });

    // Initialize videos
    const videosData: InsertVideo[] = [
      { tutorId: Array.from(this.tutors.keys())[0], subject: "Toán", title: "Giải phương trình bậc 2", duration: "5:00", thumbnailColor: "hsl(207, 90%, 54%)" },
      { tutorId: Array.from(this.tutors.keys())[1], subject: "Văn", title: "Phân tích tác phẩm", duration: "3:30", thumbnailColor: "hsl(142, 71%, 45%)" },
      { tutorId: Array.from(this.tutors.keys())[2], subject: "Anh", title: "Grammar cơ bản", duration: "7:15", thumbnailColor: "hsl(45, 93%, 47%)" },
      { tutorId: Array.from(this.tutors.keys())[3], subject: "Lý", title: "Định luật Newton", duration: "4:45", thumbnailColor: "hsl(291, 64%, 42%)" },
      { tutorId: Array.from(this.tutors.keys())[4], subject: "Hóa", title: "Phản ứng oxi hóa", duration: "6:20", thumbnailColor: "hsl(0, 72%, 51%)" },
      { tutorId: Array.from(this.tutors.keys())[5], subject: "Sinh", title: "Tế bào học", duration: "2:50", thumbnailColor: "hsl(221, 83%, 53%)" },
    ];

    videosData.forEach(video => {
      const id = randomUUID();
      this.videos.set(id, { ...video, id, createdAt: new Date() });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      role: insertUser.role || 'student',
      isEmailVerified: false,
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async updateUserLastLogin(id: string): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.lastLogin = new Date();
      user.updatedAt = new Date();
      this.users.set(id, user);
    }
  }

  async getTutors(filters?: SearchFilters): Promise<Tutor[]> {
    let tutors = Array.from(this.tutors.values());

    if (filters) {
      if (filters.subject) {
        tutors = tutors.filter(tutor => 
          tutor.subjects.some(subject => 
            subject.toLowerCase().includes(filters.subject!.toLowerCase())
          )
        );
      }

      if (filters.minPrice !== undefined) {
        tutors = tutors.filter(tutor => tutor.pricePerHour >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        tutors = tutors.filter(tutor => tutor.pricePerHour <= filters.maxPrice!);
      }

      if (filters.timeSlots && filters.timeSlots.length > 0) {
        tutors = tutors.filter(tutor =>
          tutor.timeSlots && filters.timeSlots!.some(slot => tutor.timeSlots!.includes(slot))
        );
      }

      if (filters.keywords) {
        const keywords = filters.keywords.toLowerCase();
        tutors = tutors.filter(tutor =>
          tutor.name.toLowerCase().includes(keywords) ||
          tutor.subjects.some(subject => subject.toLowerCase().includes(keywords)) ||
          tutor.education.toLowerCase().includes(keywords)
        );
      }
    }

    return tutors.sort((a, b) => {
      // Sort by rating and review count
      const aScore = parseFloat(a.rating || "0") * (a.reviewCount || 0);
      const bScore = parseFloat(b.rating || "0") * (b.reviewCount || 0);
      return bScore - aScore;
    });
  }

  async getTutor(id: string): Promise<Tutor | undefined> {
    return this.tutors.get(id);
  }

  async createTutor(insertTutor: InsertTutor): Promise<Tutor> {
    const id = randomUUID();
    const tutor: Tutor = { ...insertTutor, id, createdAt: new Date() };
    this.tutors.set(id, tutor);
    return tutor;
  }

  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = randomUUID();
    const video: Video = { ...insertVideo, id, createdAt: new Date() };
    this.videos.set(id, video);
    return video;
  }

  async getSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values()).filter(subject => subject.isActive !== false);
  }

  async createSubject(insertSubject: InsertSubject): Promise<Subject> {
    const id = randomUUID();
    const subject: Subject = { ...insertSubject, id };
    this.subjects.set(id, subject);
    return subject;
  }

  // Curriculum Management Methods
  async getCurriculums(tutorId: string): Promise<Curriculum[]> {
    return Array.from(this.curriculums.values())
      .filter(curriculum => curriculum.tutorId === tutorId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getCurriculum(id: string): Promise<Curriculum | undefined> {
    return this.curriculums.get(id);
  }

  async createCurriculum(insertCurriculum: InsertCurriculum): Promise<Curriculum> {
    const id = randomUUID();
    const curriculum: Curriculum = {
      ...insertCurriculum,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.curriculums.set(id, curriculum);
    return curriculum;
  }

  async updateCurriculum(id: string, updateData: Partial<InsertCurriculum>): Promise<Curriculum | undefined> {
    const curriculum = this.curriculums.get(id);
    if (!curriculum) return undefined;

    const updatedCurriculum: Curriculum = {
      ...curriculum,
      ...updateData,
      updatedAt: new Date()
    };
    this.curriculums.set(id, updatedCurriculum);
    return updatedCurriculum;
  }

  async deleteCurriculum(id: string): Promise<boolean> {
    // Also delete all related topics
    const topics = Array.from(this.curriculumTopics.values())
      .filter(topic => topic.curriculumId === id);
    topics.forEach(topic => this.curriculumTopics.delete(topic.id));
    
    return this.curriculums.delete(id);
  }

  async getCurriculumTopics(curriculumId: string): Promise<CurriculumTopic[]> {
    return Array.from(this.curriculumTopics.values())
      .filter(topic => topic.curriculumId === curriculumId)
      .sort((a, b) => a.order - b.order);
  }

  async createCurriculumTopic(insertTopic: InsertCurriculumTopic): Promise<CurriculumTopic> {
    const id = randomUUID();
    const topic: CurriculumTopic = {
      ...insertTopic,
      id,
      createdAt: new Date()
    };
    this.curriculumTopics.set(id, topic);
    return topic;
  }

  async updateCurriculumTopic(id: string, updateData: Partial<InsertCurriculumTopic>): Promise<CurriculumTopic | undefined> {
    const topic = this.curriculumTopics.get(id);
    if (!topic) return undefined;

    const updatedTopic: CurriculumTopic = {
      ...topic,
      ...updateData
    };
    this.curriculumTopics.set(id, updatedTopic);
    return updatedTopic;
  }

  async deleteCurriculumTopic(id: string): Promise<boolean> {
    return this.curriculumTopics.delete(id);
  }
}

export const storage = new MemStorage(); // Using MemStorage temporarily
