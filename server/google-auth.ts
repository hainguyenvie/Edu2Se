import { OAuth2Client } from 'google-auth-library';
import { type AuthResponse, type User } from '@shared/types';
import { type IStorage } from './storage';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export class GoogleAuthService {
  private client: OAuth2Client;

  constructor(private storage: IStorage) {
    if (GOOGLE_CLIENT_ID) {
      this.client = new OAuth2Client(GOOGLE_CLIENT_ID);
    }
  }

  async verifyGoogleToken(token: string): Promise<{ email: string; name: string; picture?: string } | null> {
    if (!this.client || !GOOGLE_CLIENT_ID) {
      console.error('Google Client ID not configured');
      return null;
    }

    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) return null;

      return {
        email: payload.email || '',
        name: payload.name || '',
        picture: payload.picture,
      };
    } catch (error) {
      console.error('Google token verification failed:', error);
      return null;
    }
  }

  async signInWithGoogle(googleToken: string): Promise<AuthResponse> {
    if (!GOOGLE_CLIENT_ID) {
      return {
        success: false,
        message: 'Google Sign-In chưa được cấu hình'
      };
    }

    try {
      const googleUser = await this.verifyGoogleToken(googleToken);
      if (!googleUser) {
        return {
          success: false,
          message: 'Token Google không hợp lệ'
        };
      }

      // Check if user exists
      let user = await this.storage.getUserByEmail(googleUser.email);
      
      if (!user) {
        // Create new user
        user = await this.storage.createUser({
          username: googleUser.email,
          email: googleUser.email,
          password: '', // Google users don't have passwords
          fullName: googleUser.name,
          role: 'student'
        });
      }

      // Update last login
      await this.storage.updateUserLastLogin(user.id);

      // Generate JWT token (using the same logic as regular auth)
      const jwt = (await import('jsonwebtoken')).default;
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username,
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password, ...userWithoutPassword } = user;

      return {
        success: true,
        message: 'Đăng nhập Google thành công',
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return {
        success: false,
        message: 'Đã có lỗi xảy ra khi đăng nhập bằng Google'
      };
    }
  }
}