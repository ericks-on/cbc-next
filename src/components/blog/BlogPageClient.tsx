'use client';

import React from 'react';
import { BlogPost } from '@/lib/blog-types';
import { FeaturedPosts } from './FeaturedPosts';

export function BlogPageClient(props: {posts: BlogPost[]}) {
  const {posts} = props
  return (
    <div className="space-y-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">All Articles</h2>
        <p className="text-gray-600">
          Comprehensive resources for CBC implementation and school management
        </p>
      </div>
      
      <FeaturedPosts 
        posts={posts} 
        variant="grid" 
        maxPosts={12} 
        featured={false}
      />
    </div>
  );
}