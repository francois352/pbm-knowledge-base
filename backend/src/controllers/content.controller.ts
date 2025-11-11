/**
 * Content Controller
 */

import { Request, Response } from 'express';
import { ContentService } from '../services/content.service';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export class ContentController {
  private contentService = new ContentService();

  getArticles = async (req: Request, res: Response) => {
    const {
      category,
      difficulty,
      tags,
      page = '1',
      limit = '20',
    } = req.query;

    const articles = await this.contentService.findArticles({
      category: category as string,
      difficulty: difficulty as string,
      tags: tags ? (tags as string).split(',') : undefined,
      page: parseInt(page as string),
      limit: parseInt(limit as string),
    });

    res.json({
      success: true,
      data: articles.items,
      meta: {
        page: articles.pagination.page,
        limit: articles.pagination.limit,
        total: articles.pagination.total,
        totalPages: articles.pagination.totalPages,
        hasMore: articles.pagination.hasMore,
      },
    });
  };

  getArticleBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const article = await this.contentService.findArticleBySlug(slug);

    if (!article) {
      throw new AppError(404, 'Article not found');
    }

    res.json({
      success: true,
      data: article,
    });
  };

  getCategories = async (_req: Request, res: Response) => {
    const categories = await this.contentService.getCategories();

    res.json({
      success: true,
      data: categories,
    });
  };

  searchContent = async (req: Request, res: Response) => {
    const { q, category, limit = '10' } = req.query;

    if (!q) {
      throw new AppError(400, 'Search query required');
    }

    const results = await this.contentService.searchContent(
      q as string,
      category as string,
      parseInt(limit as string)
    );

    res.json({
      success: true,
      data: results,
    });
  };

  trackProgress = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { completed, timeSpent } = req.body;

    const progress = await this.contentService.trackProgress({
      userId: req.user!.id,
      articleId: id,
      completed,
      timeSpent,
    });

    res.json({
      success: true,
      data: progress,
    });
  };
}
