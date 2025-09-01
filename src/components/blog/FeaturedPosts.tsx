'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog-types';
import { getCategoryConfig, getAuthor, formatDate } from '@/lib/blog';
import { Clock, User } from 'lucide-react';

interface FeaturedPostsProps {
  posts: BlogPost[];
  variant?: 'grid' | 'list';
  maxPosts?: number;
  featured?: boolean;
}

export function FeaturedPosts({ 
  posts,
  featured = true,
  variant = 'grid', 
  maxPosts = 6 
}: FeaturedPostsProps) {
  const displayPosts = posts.slice(0, maxPosts);

  if (displayPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No featured posts available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {featured && 
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Articles</h2>
        <p className="text-gray-600">Latest insights on CBC implementation and school management</p>
      </div> }

      <div className={`grid gap-8 ${variant === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {displayPosts.map((post) => {
          const category = getCategoryConfig(post.category);
          const author = getAuthor(post.author);
          
          return (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Featured Image */}
              {post.images?.thumbnail && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.images.thumbnail}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: category.bgColor,
                        color: category.textColor,
                        border: `1px solid ${category.borderColor}`
                      }}
                    >
                      {category.icon} {category.name}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-emerald-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    {author && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{author.name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime || 5} min read</span>
                    </div>
                  </div>
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>

                {/* Read More Link */}
                <div className="mt-4">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}