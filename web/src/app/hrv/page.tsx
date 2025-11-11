'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  HeartIcon,
  FireIcon,
  CalendarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { fetcher } from '@/lib/api';
import { HRVSession, HRVSessionSummary } from '@pbm-knowledge-hub/shared';
import { formatDate } from '@pbm-knowledge-hub/shared';

export default function HRVDashboard() {
  const [period, setPeriod] = useState(30);

  // In a real app, this would check auth status
  const isAuthenticated = false;

  const { data: stats } = useQuery({
    queryKey: ['hrv-stats', period],
    queryFn: () => fetcher<HRVSessionSummary>(`/hrv/stats?period=${period}`),
    enabled: isAuthenticated,
  });

  const { data: sessions } = useQuery({
    queryKey: ['hrv-sessions'],
    queryFn: () => fetcher<HRVSession[]>('/hrv/sessions?limit=10'),
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <HeartIcon className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            HRV Biofeedback
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Track your heart rate variability and improve your coherence with guided breathing
            sessions.
          </p>
          <div className="space-y-4">
            <Link
              href="/login"
              className="block btn-primary"
            >
              Sign In to Continue
            </Link>
            <Link
              href="/register"
              className="block btn-secondary"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                HRV Biofeedback
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Track your progress and start new sessions
              </p>
            </div>
            <Link
              href="/hrv/session"
              className="btn-primary"
            >
              Start Session
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</span>
              <ChartBarIcon className="w-5 h-5 text-primary-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats?.totalSessions || 0}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Avg Coherence</span>
              <HeartIcon className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats?.averageCoherence.toFixed(1) || 0}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Current Streak</span>
              <FireIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats?.currentStreak || 0} days
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Minutes</span>
              <CalendarIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats?.totalMinutes || 0}
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="card">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
            Recent Sessions
          </h2>

          {sessions && sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((session: HRVSession) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatDate(new Date(session.sessionDate))}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.floor(session.duration / 60)} minutes • {session.avgHeartRate.toFixed(0)} BPM
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {session.coherenceScore.toFixed(0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Coherence</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HeartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No sessions yet. Start your first HRV session!
              </p>
              <Link href="/hrv/session" className="btn-primary inline-block">
                Start Session
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
