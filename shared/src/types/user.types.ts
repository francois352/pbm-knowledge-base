/**
 * User Types
 * Authentication and user management types
 */

export enum UserRole {
  USER = 'user',
  PRACTITIONER = 'practitioner',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  openId: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  avatar?: string;
  bio?: string;
  location?: string;
  timezone?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'fr' | 'de';
  notifications: {
    email: boolean;
    push: boolean;
    forum: boolean;
  };
  privacy: {
    showProfile: boolean;
    shareProgress: boolean;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
