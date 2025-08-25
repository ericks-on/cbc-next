// Blog type definitions for CBCTrack

export type BlogCategory = 'cbc-insights' | 'school-management' | 'assessment-guides' | 'technology-tips';

export interface BlogCategoryConfig {
  id: BlogCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  path: string;
  featured: boolean;
  sortOrder: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
  linkedin?: string;
  twitter?: string;
  expertise: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  readingTime?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonical?: string;
  };
  images?: {
    featured?: string;
    thumbnail?: string;
    gallery?: string[];
  };
}

export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalAuthors: number;
  avgReadingTime: number;
}