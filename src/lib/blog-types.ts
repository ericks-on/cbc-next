// Blog type definitions for CBCTrack

export type BlogCategory = 'cbc-insights' | 'school-management' | 'assessment-guides' | 'technology-tips' |'education'| 'business';

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
  role?: string;
  bio?: string;
  avatar?: string;
  expertise?: string[];
}

export type Author = string | BlogAuthor;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  pinned?: boolean;
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

export interface BlogMeta {
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  postsPerPage: number;
  categories: {
    [key in BlogCategory]: number;
  };
  tags: {
    name: string;
    count: number;
  }[];
}

export interface SearchResult {
  posts: BlogPost[];
  total: number;
  query: string;
  suggestions?: string[];
}

export interface CategoryPageData {
  category: BlogCategory;
  posts: BlogPost[];
  meta: BlogMeta;
}

export interface TagPageData {
  tag: string;
  posts: BlogPost[];
  meta: BlogMeta;
}
export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalAuthors: number;
  avgReadingTime: number;
}