import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogCategory } from '@/lib/blog-types';
import { calculateReadingTime } from './blog-utils';

const POSTS_DIRECTORY = path.join(process.cwd(), 'src/content/posts');


export async function getAllPosts(): Promise<BlogPost[]> {
  // Check if directory exists
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }
  
  const filenames = fs.readdirSync(POSTS_DIRECTORY);
  
  const posts = filenames
    .filter(name => name.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(POSTS_DIRECTORY, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Calculate reading time from content
      const readingTime = calculateReadingTime(content);
      
      return {
        id: data.id || filename.replace(/\.md$/, ''),
        slug: data.slug || filename.replace(/\.md$/, ''),
        title: data.title || 'Untitled',
        excerpt: data.excerpt || '',
        content,
        author: data.author || 'admin',
        category: data.category || 'cbc-insights',
        tags: data.tags || [],
        publishedAt: data.publishedAt || new Date().toISOString(),
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
        status: data.status || 'published',
        featured: data.featured || false,
        readingTime: data.readingTime || readingTime,
        images: {
          featured: data.featuredImage || '/images/blog/default-featured.jpg',
          thumbnail: data.thumbnail || '/images/blog/thumbs/default-thumbnail.jpg'
        }
      } as BlogPost;
    });
  
  return posts
    .filter(post => post.status === 'published')
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  
  return allPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
}

export async function getPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.category === category);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}