'use client';

import React from 'react';
import Link from 'next/link';
import { BLOG_CATEGORIES } from '@/lib/blog';

interface BlogCategoriesProps {
  layout?: 'horizontal' | 'grid';
  showPostCounts?: boolean;
  currentCategory?: string;
}

export function BlogCategories({ 
  layout = 'horizontal', 
  showPostCounts = false,
  currentCategory 
}: BlogCategoriesProps) {
  const categories = Object.values(BLOG_CATEGORIES);

  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.path}
            className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
              currentCategory === category.id
                ? 'border-emerald-600 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-600 hover:bg-emerald-50'
            }`}
          >
            <div className="text-3xl mb-3">{category.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-gray-600 text-sm">{category.description}</p>
            {showPostCounts && (
              <div className="mt-3 text-xs text-gray-500">
                5 articles {/* Replace with actual count */}
              </div>
            )}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          !currentCategory
            ? 'bg-emerald-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
        }`}
      >
        All Categories
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.path}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            currentCategory === category.id
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
          {showPostCounts && (
            <span className="text-xs opacity-75">(5)</span>
          )}
        </Link>
      ))}
    </div>
  );
}