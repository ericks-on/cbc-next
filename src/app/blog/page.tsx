import type { Metadata } from "next";
import { Suspense } from 'react';
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { FeaturedPosts } from "@/components/blog/FeaturedPosts";
import { BlogCategories } from "@/components/blog/BlogCategories";
import { BlogBreadcrumbs } from "@/components/blog/BlogBreadcrumbs";
import { getAllPosts } from '@/lib/blog-server';
import { BlogPost } from '@/lib/blog-types';
import { Eye, BookOpen, Users, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: "Blog - CBC Implementation Insights & Educational Resources | CBCTrack",
  description: "Stay updated with the latest CBC curriculum insights, school management best practices, and educational technology trends from our experts in Kenya's primary education sector.",
  keywords: [
    "CBC blog Kenya",
    "school management insights",
    "competency based curriculum",
    "Kenya education technology",
    "primary school management",
    "CBC implementation guides",
    "educational technology trends"
  ],
  openGraph: {
    title: "CBC & School Management Blog | CBCTrack Kenya",
    description: "Expert insights on CBC implementation, school management, and educational technology for Kenya's primary schools.",
    type: "website",
    images: [
      {
        url: "/images/blog/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "CBCTrack Blog - Educational Insights"
      }
    ]
  },
  alternates: {
    types: {
      'application/rss+xml': '/blog/rss.xml'
    }
  }
};

export default async function BlogPage() {
  let initialPosts: BlogPost[] = [];
  let blogStats = null;
  
  try {
    const posts = await getAllPosts();
    initialPosts = posts.filter(post => post.status === 'published').slice(0, 6);
    
    const publishedPosts = posts.filter(post => post.status === 'published');
    blogStats = {
      totalPosts: publishedPosts.length,
      totalCategories: 4,
      totalAuthors: 3,
      avgReadingTime: Math.round(publishedPosts.reduce((sum, post) => sum + (post.readingTime || 5), 0) / publishedPosts.length)
    };
  } catch (error) {
    console.error('Error loading blog data:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 relative">
      <div className="bg-white border-b border-gray-200 pt-16 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BlogBreadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog', current: true }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">CBC Knowledge Hub</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Educational Insights &
            <span className="block text-emerald-600">CBC Resources</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Stay ahead with practical guides, CBC implementation insights, and expert knowledge on 
            school management and educational technology for Kenya's primary schools.
          </p>

          {blogStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{blogStats.totalPosts}</div>
                <div className="text-sm text-gray-600">Articles</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{blogStats.totalCategories}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{blogStats.totalAuthors}</div>
                <div className="text-sm text-gray-600">Authors</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Eye className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{blogStats.avgReadingTime}</div>
                <div className="text-sm text-gray-600">Avg. Read</div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-12">
          <BlogCategories 
            layout="horizontal"
            showPostCounts={true}
          />
        </div>

        {initialPosts.length > 0 && (
          <div className="mb-16">
            <Suspense fallback={<div className="animate-pulse h-64 bg-gray-200 rounded-lg"></div>}>
              <FeaturedPosts 
                posts={initialPosts}
                variant="grid"
                maxPosts={6}
              />
            </Suspense>
          </div>
        )}

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
                <div className="bg-gray-200 rounded h-4 mb-2"></div>
                <div className="bg-gray-200 rounded h-4 w-3/4"></div>
              </div>
            ))}
          </div>
        }>
          <BlogPageClient />
        </Suspense>
      </div>
    </div>
  );
}