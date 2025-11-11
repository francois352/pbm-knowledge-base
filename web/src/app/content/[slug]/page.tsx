'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowLeftIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { fetcher } from '@/lib/api';
import { ContentArticle } from '@pbm-knowledge-hub/shared';

export default function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetcher<ContentArticle>(`/content/articles/${slug}`),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article not found
          </h1>
          <Link href="/content" className="text-primary-600 hover:text-primary-700">
            ← Back to library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/content"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to library
          </Link>

          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 capitalize">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
            <span>•</span>
            <span className="capitalize">{article.difficulty} level</span>
            {article.publishedAt && (
              <>
                <span>•</span>
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </>
            )}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <TagIcon className="w-4 h-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>

      {/* Related Articles (Future Enhancement) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
          Continue Learning
        </h2>
        <Link
          href="/content"
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          Browse more articles →
        </Link>
      </div>
    </div>
  );
}
