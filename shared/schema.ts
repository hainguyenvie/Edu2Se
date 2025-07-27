import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Re-export types for better organization
export type {
  User,
  Tutor,
  Video,
  Subject,
  InsertUser,
  InsertTutor,
  InsertVideo,
  InsertSubject,
  SearchFilters
} from "./types";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("student"), // student, tutor, admin
  createdAt: timestamp("created_at").defaultNow(),
});

export const tutors = pgTable("tutors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  subjects: text("subjects").array().notNull(),
  grades: text("grades").array().notNull(),
  education: text("education").notNull(),
  experience: text("experience"),
  pricePerHour: integer("price_per_hour").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  reviewCount: integer("review_count").default(0),
  status: text("status").notNull().default("online"), // online, offline, busy
  isVerified: boolean("is_verified").default(false),
  isTopRated: boolean("is_top_rated").default(false),
  badges: text("badges").array().default([]),
  profileImage: text("profile_image"),
  timeSlots: text("time_slots").array().default([]), // morning, afternoon, evening
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tutorId: varchar("tutor_id").references(() => tutors.id),
  subject: text("subject").notNull(),
  title: text("title").notNull(),
  duration: text("duration").notNull(), // e.g., "5:00"
  thumbnailColor: text("thumbnail_color").notNull(),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subjects = pgTable("subjects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  nameVi: text("name_vi").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  isActive: boolean("is_active").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true,
});

export const insertTutorSchema = createInsertSchema(tutors).omit({
  id: true,
  createdAt: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
});

export const insertSubjectSchema = createInsertSchema(subjects).omit({
  id: true,
});

export const searchFiltersSchema = z.object({
  subject: z.string().optional(),
  courseType: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  timeSlots: z.array(z.string()).optional(),
  keywords: z.string().optional(),
});

export type SearchFilters = z.infer<typeof searchFiltersSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTutor = z.infer<typeof insertTutorSchema>;
export type Tutor = typeof tutors.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;
export type Subject = typeof subjects.$inferSelect;
