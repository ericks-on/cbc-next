import { 
  BlogCategory, 
  BlogCategoryConfig,
  BlogAuthor
} from './blog-types';

// Blog categories configuration for CBCTrack
export const BLOG_CATEGORIES: Record<BlogCategory, BlogCategoryConfig> = {
  'cbc-insights': {
    id: 'cbc-insights',
    name: 'CBC Insights',
    description: 'Latest insights on Competency-Based Curriculum implementation and best practices',
    icon: '📚',
    color: '#059669',
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    textColor: '#047857',
    path: '/blog/cbc-insights',
    featured: true,
    sortOrder: 1
  },
  'school-management': {
    id: 'school-management',
    name: 'School Management',
    description: 'Strategic insights and practical advice for effective primary school administration',
    icon: '🏫',
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    textColor: '#1e40af',
    path: '/blog/school-management',
    featured: true,
    sortOrder: 2
  },
  'assessment-guides': {
    id: 'assessment-guides',
    name: 'Assessment Guides',
    description: 'Comprehensive guides for formative and summative assessment in CBC',
    icon: '📝',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    textColor: '#d97706',
    path: '/blog/assessment-guides',
    featured: true,
    sortOrder: 3
  },
  'technology-tips': {
    id: 'technology-tips',
    name: 'Technology Tips',
    description: 'Educational technology trends and digital tools for modern schools',
    icon: '💻',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    borderColor: '#c4b5fd',
    textColor: '#7c3aed',
    path: '/blog/technology-tips',
    featured: true,
    sortOrder: 4
  },
  'education': {
    id: 'education',
    name: 'Education',
    description: 'General educational topics, teaching methodologies, and learning strategies',
    icon: '🎓',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    textColor: '#b91c1c',
    path: '/blog/education',
    featured: true,
    sortOrder: 5
  },
  'business': {
    id: 'business',
    name: 'Business',
    description: 'Business strategies, entrepreneurship, and management insights for educational institutions',
    icon: '💼',
    color: '#7e22ce',
    bgColor: '#faf5ff',
    borderColor: '#d8b4fe',
    textColor: '#7c3aed',
    path: '/blog/business',
    featured: true,
    sortOrder: 6
  }
};

// Blog authors for CBCTrack
export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  'sarah-mwangi': {
    id: 'sarah-mwangi',
    name: 'Sarah Mwangi',
    role: 'CBC Education Specialist',
    bio: 'Former primary school teacher with 12+ years experience in CBC implementation and teacher training across Kenya.',
    avatar: '/images/team/sarah-mwangi.jpg',
    expertise: ['CBC Implementation', 'Teacher Training', 'Curriculum Design', 'Educational Assessment']
  },
  'john-kiprotich': {
    id: 'john-kiprotich',
    name: 'John Kiprotich',
    role: 'School Administration Expert',
    bio: 'Former head teacher and education administrator with expertise in school management systems and administrative efficiency.',
    avatar: '/images/team/john-kiprotich.jpg',
    expertise: ['School Administration', 'Leadership', 'Financial Management', 'Parent Communication']
  },
  'mary-wanjiku': {
    id: 'mary-wanjiku',
    name: 'Mary Wanjiku',
    role: 'Educational Technology Specialist',
    bio: 'Technology integration specialist with focus on educational software and digital transformation in schools.',
    avatar: '/images/team/mary-wanjiku.jpg',
    expertise: ['Educational Technology', 'Digital Integration', 'Software Training', 'Data Analytics']
  }
};

// Utility functions
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const formatDate = (dateString: string, format: 'short' | 'long' | 'relative' = 'short'): string => {
  const date = new Date(dateString);
  
  if (format === 'relative') {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  }
  
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
};

export const getCategoryConfig = (category: BlogCategory): BlogCategoryConfig => {
  return BLOG_CATEGORIES[category];
};

export const getAuthor = (authorId: string): BlogAuthor | undefined => {
  return BLOG_AUTHORS[authorId];
};