/**
 * Content Routes
 */

import { Router } from 'express';
import { ContentController } from '../controllers/content.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const contentController = new ContentController();

router.get('/articles', contentController.getArticles);
router.get('/articles/:slug', contentController.getArticleBySlug);
router.get('/categories', contentController.getCategories);
router.get('/search', contentController.searchContent);
router.post('/articles/:id/progress', authenticate, contentController.trackProgress);

export default router;
