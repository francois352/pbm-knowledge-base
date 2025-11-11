/**
 * Wellness Types
 * Daily symptom tracking and mood journaling
 */

export interface SymptomEntry {
  id: string;
  userId: string;
  date: Date;
  mood: number; // 1-10 scale
  energy: number; // 1-10 scale
  notes?: string;
  symptoms?: Symptom[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Symptom {
  name: string;
  severity: number; // 1-10 scale
}

export interface WellnessSummary {
  period: 'week' | 'month';
  startDate: Date;
  endDate: Date;
  avgMood: number;
  avgEnergy: number;
  totalEntries: number;
  trends: {
    moodTrend: 'improving' | 'declining' | 'stable';
    energyTrend: 'improving' | 'declining' | 'stable';
  };
}

export interface Correlation {
  date: Date;
  coherence: number;
  mood: number;
  energy: number;
}

export interface CorrelationAnalysis {
  coherenceMoodCorrelation: number; // -1 to 1
  coherenceEnergyCorrelation: number; // -1 to 1
  sampleSize: number;
  period: string;
}
