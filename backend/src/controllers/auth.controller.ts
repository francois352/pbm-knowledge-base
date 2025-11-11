/**
 * Authentication Controller
 */

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { config } from '../config/env';
import { AuthRequest } from '../middleware/auth';
import { UserService } from '../services/user.service';
import { AppError } from '../middleware/errorHandler';

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

export class AuthController {
  private userService = new UserService();

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = registerSchema.parse(req.body);

      // Check if user exists
      const existingUser = await this.userService.findByEmail(email);
      if (existingUser) {
        throw new AppError(400, 'User already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await this.userService.create({
        name,
        email,
        password: hashedPassword,
      });

      // Generate tokens
      const tokens = this.generateTokens(user);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          ...tokens,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, 'Validation error');
      }
      throw error;
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      // Find user
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new AppError(401, 'Invalid credentials');
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new AppError(401, 'Invalid credentials');
      }

      // Generate tokens
      const tokens = this.generateTokens(user);

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          ...tokens,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, 'Validation error');
      }
      throw error;
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = refreshSchema.parse(req.body);

      // Verify refresh token
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as {
        id: string;
        email: string;
      };

      // Get user
      const user = await this.userService.findById(decoded.id);
      if (!user) {
        throw new AppError(401, 'Invalid token');
      }

      // Generate new tokens
      const tokens = this.generateTokens(user);

      res.json({
        success: true,
        data: tokens,
      });
    } catch (error) {
      throw new AppError(401, 'Invalid refresh token');
    }
  };

  logout = async (_req: AuthRequest, res: Response) => {
    // In a production app, you might invalidate the token in a blacklist
    res.json({
      success: true,
      data: { message: 'Logged out successfully' },
    });
  };

  getCurrentUser = async (req: AuthRequest, res: Response) => {
    const user = await this.userService.findById(req.user!.id);
    if (!user) {
      throw new AppError(404, 'User not found');
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
      },
    });
  };

  private generateTokens(user: any) {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      config.jwt.refreshSecret,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken, expiresIn: 900 };
  }
}
