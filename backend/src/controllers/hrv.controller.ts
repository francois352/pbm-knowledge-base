/**
 * HRV Controller
 */

import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { HRVService } from '../services/hrv.service';
import { AppError } from '../middleware/errorHandler';

const createSessionSchema = z.object({
  duration: z.number().min(60).max(1800),
  avgHeartRate: z.number().min(40).max(200),
  coherenceScore: z.number().min(0).max(100),
  breathingRate: z.number().min(1).max(30),
  sessionDate: z.string().datetime(),
  rawData: z.any().optional(),
});

export class HRVController {
  private hrvService = new HRVService();

  getSessions = async (req: AuthRequest, res: Response) => {
    const { startDate, endDate, limit = '20' } = req.query;

    const sessions = await this.hrvService.findSessions({
      userId: req.user!.id,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
      limit: parseInt(limit as string),
    });

    res.json({
      success: true,
      data: sessions,
    });
  };

  createSession = async (req: AuthRequest, res: Response) => {
    try {
      const data = createSessionSchema.parse(req.body);

      const session = await this.hrvService.createSession({
        userId: req.user!.id,
        ...data,
        sessionDate: new Date(data.sessionDate),
      });

      res.status(201).json({
        success: true,
        data: session,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, 'Validation error');
      }
      throw error;
    }
  };

  getStats = async (req: AuthRequest, res: Response) => {
    const { period = '30' } = req.query;

    const stats = await this.hrvService.getStats(
      req.user!.id,
      parseInt(period as string)
    );

    res.json({
      success: true,
      data: stats,
    });
  };

  getSessionById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const session = await this.hrvService.findSessionById(id, req.user!.id);

    if (!session) {
      throw new AppError(404, 'Session not found');
    }

    res.json({
      success: true,
      data: session,
    });
  };
}
