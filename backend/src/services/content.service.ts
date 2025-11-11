/**
 * Content Service
 */

import knex from 'knex';
import { databaseConfig } from '../config/database';

const db = knex(databaseConfig);

interface FindArticlesOptions {
  category?: string;
  difficulty?: string;
  tags?: string[];
  page: number;
  limit: number;
}

export class ContentService {
  async findArticles(options: FindArticlesOptions) {
    let query = db('content_articles').where('published_at', '<=', db.fn.now());

    if (options.category) {
      query = query.where('category', options.category);
    }

    if (options.difficulty) {
      query = query.where('difficulty', options.difficulty);
    }

    if (options.tags && options.tags.length > 0) {
      query = query.whereRaw('tags && ?', [options.tags]);
    }

    const total = await query.clone().count('* as count').first();
    const totalCount = parseInt(total?.count as string) || 0;

    const items = await query
      .select(
        'id',
        'title',
        'slug',
        'category',
        'tags',
        'difficulty',
        'read_time',
        'published_at'
      )
      .orderBy('published_at', 'desc')
      .limit(options.limit)
      .offset((options.page - 1) * options.limit);

    return {
      items,
      pagination: {
        page: options.page,
        limit: options.limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / options.limit),
        hasMore: options.page * options.limit < totalCount,
      },
    };
  }

  async findArticleBySlug(slug: string) {
    return db('content_articles')
      .where({ slug })
      .where('published_at', '<=', db.fn.now())
      .first();
  }

  async getCategories() {
    const result = await db('content_articles')
      .distinct('category')
      .select('category')
      .count('* as count')
      .groupBy('category');

    return result;
  }

  async searchContent(query: string, category?: string, limit = 10) {
    let searchQuery = db('content_articles')
      .where('published_at', '<=', db.fn.now())
      .where(builder => {
        builder
          .whereILike('title', `%${query}%`)
          .orWhereILike('content', `%${query}%`);
      });

    if (category) {
      searchQuery = searchQuery.where('category', category);
    }

    return searchQuery
      .select('id', 'title', 'slug', 'category', 'tags', 'difficulty', 'read_time')
      .limit(limit);
  }

  async trackProgress(data: {
    userId: string;
    articleId: string;
    completed: boolean;
    timeSpent: number;
  }) {
    const existing = await db('user_progress')
      .where({ user_id: data.userId, article_id: data.articleId })
      .first();

    if (existing) {
      const [progress] = await db('user_progress')
        .where({ user_id: data.userId, article_id: data.articleId })
        .update({
          completed: data.completed,
          completed_at: data.completed ? db.fn.now() : null,
          time_spent: db.raw('time_spent + ?', [data.timeSpent]),
          updated_at: db.fn.now(),
        })
        .returning('*');
      return progress;
    } else {
      const [progress] = await db('user_progress')
        .insert({
          user_id: data.userId,
          article_id: data.articleId,
          completed: data.completed,
          completed_at: data.completed ? db.fn.now() : null,
          time_spent: data.timeSpent,
        })
        .returning('*');
      return progress;
    }
  }
}
