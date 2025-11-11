/**
 * Forum Types
 * Community discussion and Q&A
 */

export enum ForumCategory {
  GENERAL = 'general',
  QUESTIONS = 'questions',
  EXPERIENCES = 'experiences',
  RESEARCH = 'research',
  PRACTITIONERS = 'practitioners',
}

export enum VoteType {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}

export interface ForumPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: ForumCategory;
  isPinned: boolean;
  isLocked: boolean;
  viewCount: number;
  commentCount: number;
  voteCount: number;
  createdAt: Date;
  updatedAt?: Date;
  author?: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
}

export interface ForumComment {
  id: string;
  postId: string;
  userId: string;
  parentId?: string;
  content: string;
  isBestAnswer: boolean;
  voteCount: number;
  createdAt: Date;
  updatedAt?: Date;
  author?: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  replies?: ForumComment[];
}

export interface ForumVote {
  id: string;
  postId?: string;
  commentId?: string;
  userId: string;
  voteType: VoteType;
  createdAt: Date;
}

export interface ForumStats {
  totalPosts: number;
  totalComments: number;
  activeUsers: number;
  topContributors: Array<{
    userId: string;
    name: string;
    postCount: number;
    commentCount: number;
  }>;
}
