/**
 * HRV Service
 */

import knex from 'knex';
import { databaseConfig } from '../config/database';
import { calculateStreak } from '@pbm-knowledge-hub/shared';

const db = knex(databaseConfig);

interface FindSessionsOptions {
  userId: string;
  startDate?: Date;
  endDate?: Date;
  limit: number;
}

interface CreateSessionInput {
  userId: string;
  duration: number;
  avgHeartRate: number;
  coherenceScore: number;
  breathingRate: number;
  sessionDate: Date;
  rawData?: any;
}

export class HRVService {
  async findSessions(options: FindSessionsOptions) {
    let query = db('hrv_sessions').where('user_id', options.userId);

    if (options.startDate) {
      query = query.where('session_date', '>=', options.startDate);
    }

    if (options.endDate) {
      query = query.where('session_date', '<=', options.endDate);
    }

    return query
      .select(
        'id',
        'duration',
        'avg_heart_rate',
        'coherence_score',
        'breathing_rate',
        'session_date',
        'created_at'
      )
      .orderBy('session_date', 'desc')
      .limit(options.limit);
  }

  async createSession(input: CreateSessionInput) {
    const [session] = await db('hrv_sessions')
      .insert({
        user_id: input.userId,
        duration: input.duration,
        avg_heart_rate: input.avgHeartRate,
        coherence_score: input.coherenceScore,
        breathing_rate: input.breathingRate,
        session_date: input.sessionDate,
        raw_data: input.rawData ? JSON.stringify(input.rawData) : null,
      })
      .returning('*');

    return session;
  }

  async getStats(userId: string, periodDays: number) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    const sessions = await db('hrv_sessions')
      .where('user_id', userId)
      .where('session_date', '>=', startDate)
      .select('coherence_score', 'duration', 'session_date')
      .orderBy('session_date', 'desc');

    const totalSessions = sessions.length;
    const averageCoherence =
      totalSessions > 0
        ? sessions.reduce((sum, s) => sum + parseFloat(s.coherence_score), 0) /
          totalSessions
        : 0;
    const totalMinutes =
      sessions.reduce((sum, s) => sum + s.duration, 0) / 60;

    // Calculate streak
    const sessionDates = sessions.map(s => new Date(s.session_date));
    const currentStreak = calculateStreak(sessionDates);

    // Get last session date
    const lastSessionDate = sessions.length > 0 ? sessions[0].session_date : null;

    return {
      totalSessions,
      averageCoherence: Math.round(averageCoherence * 100) / 100,
      currentStreak,
      longestStreak: currentStreak, // TODO: Calculate actual longest streak
      totalMinutes: Math.round(totalMinutes),
      lastSessionDate,
    };
  }

  async findSessionById(id: string, userId: string) {
    return db('hrv_sessions').where({ id, user_id: userId }).first();
  }
}
