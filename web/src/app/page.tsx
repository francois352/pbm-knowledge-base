'use client';

import Link from 'next/link';
import {
  AcademicCapIcon,
  HeartIcon,
  BeakerIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const categories = [
  {
    name: 'Neurofeedback',
    description: 'Learn about brain training and neurofeedback therapy',
    icon: AcademicCapIcon,
    href: '/content/neurofeedback',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Photobiomodulation',
    description: 'Discover the science and benefits of PBM therapy',
    icon: BeakerIcon,
    href: '/content/pbm',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'HRV Biofeedback',
    description: 'Track and improve your heart rate variability',
    icon: HeartIcon,
    href: '/hrv',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Community',
    description: 'Connect with practitioners and other users',
    icon: UserGroupIcon,
    href: '/forum',
    color: 'from-orange-500 to-red-500',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              PBM Knowledge Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Your comprehensive resource for photobiomodulation education, HRV biofeedback,
              and brain wellness
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/content"
                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Explore Content
              </Link>
              <Link
                href="/consultation"
                className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-colors"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
          What would you like to explore?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(category => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color}`} />
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-primary-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-12 text-center">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Rich Content Library</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access research papers, articles, and educational materials
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💓</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">HRV Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your heart rate variability with guided breathing
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Community Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with experts and share experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
