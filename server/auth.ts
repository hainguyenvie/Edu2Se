import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { type User, type LoginCredentials, type RegisterData, type AuthResponse } from '@shared/types';
import { type IStorage } from './storage';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export class AuthService {
  constructor(private storage: IStorage) {}

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Check if user already exists
      const existingUser = await this.storage.getUserByUsername(data.username);
      if (existingUser) {
        return {
          success: false,
          message: 'Tên đăng nhập đã được sử dụng'
        };
      }

      const existingEmail = await this.storage.getUserByEmail(data.email);
      if (existingEmail) {
        return {
          success: false,
          message: 'Email đã được sử dụng'
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);

      // Create user
      const newUser = await this.storage.createUser({
        username: data.username,
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        role: data.role || 'student'
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: newUser.id, 
          username: newUser.username,
          role: newUser.role 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Remove password from response
      const { password, ...userWithoutPassword } = newUser;

      return {
        success: true,
        message: 'Đăng ký thành công',
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Đã có lỗi xảy ra khi đăng ký'
      };
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Find user by username or email
      let user = await this.storage.getUserByUsername(credentials.username);
      if (!user) {
        user = await this.storage.getUserByEmail(credentials.username);
      }

      if (!user) {
        return {
          success: false,
          message: 'Tên đăng nhập hoặc mật khẩu không đúng'
        };
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(credentials.password, user.password);
      if (!isValidPassword) {
        return {
          success: false,
          message: 'Tên đăng nhập hoặc mật khẩu không đúng'
        };
      }

      // Update last login
      await this.storage.updateUserLastLogin(user.id);

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username,
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      return {
        success: true,
        message: 'Đăng nhập thành công',
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Đã có lỗi xảy ra khi đăng nhập'
      };
    }
  }

  verifyToken(token: string): { userId: string; username: string; role: string } | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return {
        userId: decoded.userId,
        username: decoded.username,
        role: decoded.role
      };
    } catch (error) {
      return null;
    }
  }

  async getCurrentUser(token: string): Promise<Omit<User, 'password'> | null> {
    try {
      const decoded = this.verifyToken(token);
      if (!decoded) return null;

      const user = await this.storage.getUser(decoded.userId);
      if (!user) return null;

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return null;
    }
  }
}

// Middleware to protect routes
export function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const authService = new AuthService(req.storage);
  const decoded = authService.verifyToken(token);
  
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded;
  next();
}