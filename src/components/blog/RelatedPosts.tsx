import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog-types';
import { getCategoryConfig, formatDate } from '@/lib/blog-utils';
import { Clock, ArrowRight } from 'lucide-react';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPost: BlogPost;
}

export function RelatedPosts({ posts, currentPost }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          const categoryConfig = getCategoryConfig(post.category);
          
          return (
            <article
              key={post.id}
              className="group bg-white rounded-lg border border-gray-200 hover:border-green-200 hover:shadow-lg transition-all duration-300"
            >
              {post.images?.thumbnail && (
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={post.images.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryConfig.bgColor} ${categoryConfig.textColor}`}>
                      {categoryConfig.name}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>{formatDate(post.publishedAt)}</span>
                    {post.readingTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} min
                      </span>
                    )}
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
                  >
                    Read more
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
