// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  User, 
  Calendar, 
  Tag, 
  ArrowLeft,
  Star,
  CheckCircle,
  Award,
  Clock
} from 'lucide-react';
import { getCategoryConfig, formatDate } from '@/lib/blog-utils';
import { parseMarkdown } from '@/lib/markdown-parser';
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-api";
import { BlogBreadcrumbs } from '@/components/blog/BlogBreadcrumbs';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { SocialShare } from '@/components/blog/SocialShare';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { BlogContent } from '@/components/blog/BlogContent';
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Generate static params for all published posts
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found - Blog",
      description: "The requested blog post could not be found."
    };
  }

  const config = getCategoryConfig(post.category);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author }],
    category: config.name,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      images: post.images?.featured ? [
        {
          url: post.images?.featured,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [ post.author],
      tags: post.tags,
      section: config.name
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.images?.featured ? [post.images?.featured] : [],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

// Author info component
const AuthorInfo = ({ 
  author, 
  publishedAt, 
  updatedAt,
  readingTime 
}: { 
  author: any; 
  publishedAt: string; 
  updatedAt?: string;
  readingTime?: number;
}) => {
  const authorName = typeof author === 'string' ? author : author?.name || 'Unknown Author';
  const authorAvatar = typeof author === 'object' ? author.avatar : undefined;
  
  return (
    <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg border">
      <div className="relative">
        {authorAvatar ? (
          <Image
            src={authorAvatar}
            alt={authorName}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {authorName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="absolute -bottom-1 -right-1 bg-green-600 text-white rounded-full p-1">
          <Award className="w-3 h-3" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-gray-900">{authorName}</h4>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-600">
            {typeof author === 'object' ? author.role || 'Author' : 'Author'}
          </span>
        </div>
        
        {typeof author === 'object' && author.bio && (
          <p className="text-sm text-gray-600 mb-2">{author.bio}</p>
        )}
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Published {formatDate(publishedAt)}
          </span>
          
          {readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime} min read
            </span>
          )}
          
          {updatedAt && updatedAt !== publishedAt && (
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Updated {formatDate(updatedAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Main page component
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post || post.status !== 'published') {
    notFound();
  }

  const categoryConfig = getCategoryConfig(post.category);
  const relatedPosts = await getRelatedPosts(post, 3);
  const { html: parsedContent, toc } = await parseMarkdown(post.content);

  return (
    <>
      {/* Reading Progress */}
      <ReadingProgress />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.images?.featured ? [post.images?.featured] : [],
            "datePublished": post.publishedAt,
            "dateModified": post.updatedAt || post.publishedAt,
            "author": {
              "@type": "Person",
              "name": typeof post.author === 'string' ? post.author : post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Ervin Solutions",
              "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
              }
            },
            "wordCount": post.content.split(' ').length,
            "timeRequired": `PT${post.readingTime || 5}M`
          })
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-gray-50 border-b sticky top-0 z-40 backdrop-blur-sm ">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <BlogBreadcrumbs 
              category={post.category}
              categoryName={categoryConfig.name}
              postTitle={post.title}
            />
            
            <div className="mt-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article className="blog-post">
            {/* Post Header */}
            <header className="mb-12">
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span 
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryConfig.bgColor} ${categoryConfig.textColor}`}
                >
                  {categoryConfig.name}
                </span>
                
                {post.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    Featured
                  </span>
                )}

                {post.pinned && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    📌 Pinned
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>By {typeof post.author === 'string' ? post.author : post.author}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>

                {post.readingTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 rounded-full text-sm transition-colors duration-200"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {/* Featured Image */}
            {post.images?.featured && (
              <div className="mb-12">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={post.images?.featured}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                </div>
              </div>
            )}

            {/* Table of Contents */}
            {toc && toc.length > 0 && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
                <nav>
                  <ul className="space-y-2">
                    {toc.map((item, index) => (
                      <li key={index} style={{ marginLeft: `${(item.level - 1) * 1.5}rem` }}>
                        <a
                          href={`#${item.id}`}
                          className="text-green-600 hover:text-green-700 hover:underline transition-colors duration-200"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Social Share - Top */}
            <div className="mb-8">
              <SocialShare 
                post={post}
                variant="compact"
              />
            </div>

            {/* Post Content */}
            <BlogContent content={parsedContent} />

            {/* Author Info */}
            <div className="mt-12 mb-8">
              <AuthorInfo 
                author={post.author}
                publishedAt={post.publishedAt}
                updatedAt={post.updatedAt || post.createdAt}
                readingTime={post.readingTime}
              />
            </div>

            {/* Social Share - Bottom */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <SocialShare 
                post={post}
                variant="default"
              />
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <Suspense fallback={<SkeletonLoader />}>
              <div className="mt-16">
                <RelatedPosts posts={relatedPosts} currentPost={post} />
              </div>
            </Suspense>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-lg mb-6 text-white/90">
              Get the latest insights and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Add missing import for getAllPosts
async function getAllPosts() {
  // This should be imported from your blog-api file
  const { getAllPosts } = await import('@/lib/blog-api');
  return getAllPosts();
}