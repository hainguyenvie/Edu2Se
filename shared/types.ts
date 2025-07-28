import { z } from "zod";

// Type definitions for the application
export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  fullName?: string | null;
  role: string;
  isEmailVerified?: boolean | null;
  lastLogin?: Date | null;
  createdAt: Date | null;
  updatedAt?: Date | null;
};

export type Tutor = {
  id: string;
  name: string;
  subjects: string[];
  grades: string[];
  education: string;
  experience: string | null;
  pricePerHour: number;
  rating: string | null;
  reviewCount: number | null;
  status: string;
  isVerified: boolean | null;
  isTopRated: boolean | null;
  badges: string[];
  profileImage: string | null;
  timeSlots: string[];
  description: string | null;
  createdAt: Date | null;
};

export type Video = {
  id: string;
  tutorId: string | null;
  subject: string;
  title: string;
  duration: string;
  thumbnailColor: string;
  url: string | null;
  createdAt: Date | null;
};

export type Subject = {
  id: string;
  name: string;
  nameVi: string;
  icon: string;
  color: string;
  isActive: boolean | null;
};

export type InsertUser = {
  username: string;
  password: string;
  email: string;
  fullName?: string;
  role?: string;
};

// Authentication types
export type LoginCredentials = {
  username: string; // This will be the email address
  password: string;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  role?: "student" | "tutor";
};

export type AuthResponse = {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
  token?: string;
};

export type InsertTutor = {
  name: string;
  subjects: string[];
  grades: string[];
  education: string;
  experience?: string | null;
  pricePerHour: number;
  rating?: string | null;
  reviewCount?: number | null;
  status?: string;
  isVerified?: boolean | null;
  isTopRated?: boolean | null;
  badges?: string[];
  profileImage?: string | null;
  timeSlots?: string[];
  description?: string | null;
};

export type InsertVideo = {
  tutorId?: string | null;
  subject: string;
  title: string;
  duration: string;
  thumbnailColor: string;
  url?: string | null;
};

export type InsertSubject = {
  name: string;
  nameVi: string;
  icon: string;
  color: string;
  isActive?: boolean | null;
};

// SearchFilters schema is defined in shared/schema.ts

// Virtual Classroom Types
export type ClassInfo = {
  name: string;
  subject: string;
  tutor: string;
  time: string;
  duration: string;
};

export type ChatMessage = {
  user: string;
  message: string;
  time: string;
};

export type VirtualClassroomTool = {
  id: string;
  icon: any;
  name: string;
};

export type VirtualClassroomTab = {
  name: string;
  icon: any;
  active: boolean;
};

// Booking and Meeting Types
export type BookingInfo = {
  tutorId: string;
  date: string;
  time: string;
  duration: string;
  subject: string;
};

export type MeetingSettings = {
  cameraEnabled: boolean;
  micEnabled: boolean;
  speakerEnabled: boolean;
};