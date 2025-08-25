'use client';

import React, { useState, useEffect } from 'react';
import { BlogPost } from '@/lib/blog-types';
import { getAllPosts } from '@/lib/blog-server';
import { FeaturedPosts } from './FeaturedPosts';

export function BlogPageClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        const publishedPosts = allPosts.filter(post => post.status === 'published');
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
            <div className="bg-gray-200 rounded h-4 mb-2"></div>
            <div className="bg-gray-200 rounded h-4 w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

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
      />
    </div>
  );
}