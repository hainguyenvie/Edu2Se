import { db } from "./database";
import { users, tutors, subjects, videos } from "@shared/schema";

// Database initialization script
export async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database tables...');
    
    // The tables should already exist from the schema
    // Let's just verify we can connect and insert some sample data
    
    // Insert sample subjects if they don't exist
    const existingSubjects = await db.select().from(subjects).limit(1);
    if (existingSubjects.length === 0) {
      await db.insert(subjects).values([
        {
          name: "Math",
          nameVi: "TOÁN",
          icon: "Calculator",
          color: "bg-blue-500",
          description: "Toán học từ cơ bản đến nâng cao"
        },
        {
          name: "English",
          nameVi: "TIẾNG ANH",
          icon: "Globe",
          color: "bg-green-500",
          description: "Tiếng Anh giao tiếp và học thuật"
        },
        {
          name: "Physics",
          nameVi: "VẬT LÝ",
          icon: "Atom",
          color: "bg-purple-500",
          description: "Vật lý từ cơ bản đến nâng cao"
        },
        {
          name: "Chemistry",
          nameVi: "HÓA HỌC",
          icon: "TestTube",
          color: "bg-red-500",
          description: "Hóa học phổ thông"
        }
      ]);
      console.log('✅ Sample subjects inserted');
    }

    console.log('✅ Database initialization completed');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
}

// Run initialization when this module is imported
initializeDatabase().catch(console.error);