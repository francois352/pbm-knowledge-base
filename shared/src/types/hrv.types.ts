/**
 * HRV Biofeedback Types
 * Heart rate variability and biofeedback session data
 */

export interface HRVSession {
  id: string;
  userId: string;
  duration: number; // in seconds
  avgHeartRate: number; // BPM
  coherenceScore: number; // 0-100
  breathingRate: number; // breaths per minute
  sessionDate: Date;
  rawData?: HRVRawData;
}

export interface HRVRawData {
  timestamps: number[];
  heartRates: number[];
  rrIntervals: number[];
  coherenceValues: number[];
}

export interface HRVSessionSummary {
  totalSessions: number;
  averageCoherence: number;
  currentStreak: number;
  longestStreak: number;
  totalMinutes: number;
  lastSessionDate?: Date;
}

export interface CoherenceLevel {
  low: number; // 0-40
  medium: number; // 41-70
  high: number; // 71-100
}

export interface BreathingGuide {
  inhale: number; // seconds
  hold: number; // seconds
  exhale: number; // seconds
  pause: number; // seconds
}

export const DEFAULT_365_BREATHING: BreathingGuide = {
  inhale: 3,
  hold: 6,
  exhale: 5,
  pause: 0,
};
