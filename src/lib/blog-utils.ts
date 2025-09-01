import { BlogCategory } from '@/lib/blog-types';


export interface CategoryConfig {
  name: string;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export const CATEGORY_CONFIGS: Record<BlogCategory, CategoryConfig> = {
  'cbc-insights': {
    name: 'CBC Insights',
    description: 'Competency-Based Curriculum insights and updates',
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-200'
  },
  'school-management': {
    name: 'School Management',
    description: 'School administration and management strategies',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200'
  },
  'assessment-guides': {
    name: 'Assessment Guides',
    description: 'Student evaluation and assessment techniques',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-200'
  },
  'technology-tips': {
    name: 'Technology Tips',
    description: 'Educational technology tools and tips',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200'
  },
  'education': {
    name: 'Education',
    description: 'General educational practices and theories',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200'
  },
  'business': {
    name: 'Business',
    description: 'Business insights and strategies for educational institutions',
    bgColor: 'bg-teal-100',
    textColor: 'text-teal-800',
    borderColor: 'border-teal-200'
  }
};

export function getCategoryConfig(category: BlogCategory): CategoryConfig {
  return CATEGORY_CONFIGS[category] || CATEGORY_CONFIGS.business;
}

export function formatDate(dateString: string, format: 'short' | 'long' = 'short'): string {
  const date = new Date(dateString);
  
  if (format === 'long') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpace) + '...';
}