/**
 * Content Types
 * Educational content and learning materials
 */

export enum ContentCategory {
  NEUROFEEDBACK = 'neurofeedback',
  PBM = 'pbm',
  WELLNESS = 'wellness',
  RESEARCH = 'research',
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export interface ContentArticle {
  id: string;
  title: string;
  slug: string;
  category: ContentCategory;
  tags: string[];
  content: string;
  difficulty: DifficultyLevel;
  readTime: number; // in minutes
  authorId: string;
  publishedAt: Date;
  updatedAt?: Date;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  pdfUrl: string;
  fileKey: string;
  summary: string;
  keywords: string[];
  category: ContentCategory;
  createdAt: Date;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  items: LearningPathItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningPathItem {
  id: string;
  pathId: string;
  articleId: string;
  order: number;
  required: boolean;
}

export interface UserProgress {
  id: string;
  userId: string;
  articleId: string;
  completed: boolean;
  completedAt?: Date;
  timeSpent: number; // in seconds
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: Record<string, unknown>;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
}
