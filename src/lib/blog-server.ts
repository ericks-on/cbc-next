import { BlogPost, BlogCategory } from './blog-types';

// Mock blog posts for CBCTrack - replace with your actual data source
const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Complete Guide to CBC Implementation in Kenyan Primary Schools',
    slug: 'cbc-implementation-guide-kenya',
    excerpt: 'A comprehensive guide covering everything you need to know about implementing the Competency-Based Curriculum in your primary school, from planning to assessment.',
    content: '# Complete Guide to CBC Implementation\n\nThe Competency-Based Curriculum (CBC) represents a fundamental shift in Kenya\'s education system...',
    author: 'sarah-mwangi',
    category: 'cbc-insights',
    tags: ['CBC', 'Implementation', 'Primary School', 'Kenya Education', 'Curriculum'],
    publishedAt: '2024-01-15',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    status: 'published',
    featured: true,
    readingTime: 8,
    images: {
      featured: '/images/blog/cbc-implementation.jpg',
      thumbnail: '/images/blog/thumbs/cbc-implementation.jpg'
    }
  },
  {
    id: '2',
    title: 'Effective Parent Communication Using WhatsApp in Schools',
    slug: 'whatsapp-parent-communication-schools',
    excerpt: 'Learn how to set up and maintain effective parent communication channels using WhatsApp, including best practices and automated messaging strategies.',
    content: '# WhatsApp Parent Communication\n\nModern schools need modern communication methods...',
    author: 'john-kiprotich',
    category: 'school-management',
    tags: ['Parent Communication', 'WhatsApp', 'School Management', 'Digital Communication'],
    publishedAt: '2024-01-20',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-20',
    status: 'published',
    featured: true,
    readingTime: 6,
    images: {
      featured: '/images/blog/whatsapp-communication.jpg',
      thumbnail: '/images/blog/thumbs/whatsapp-communication.jpg'
    }
  },
  {
    id: '3',
    title: 'Formative vs Summative Assessment in CBC: A Practical Guide',
    slug: 'formative-summative-assessment-cbc',
    excerpt: 'Understanding the differences between formative and summative assessment in CBC and how to implement both effectively in your classroom.',
    content: '# Assessment in CBC\n\nAssessment is at the heart of the CBC system...',
    author: 'sarah-mwangi',
    category: 'assessment-guides',
    tags: ['Assessment', 'CBC', 'Formative Assessment', 'Summative Assessment', 'Teaching'],
    publishedAt: '2024-01-25',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-25',
    status: 'published',
    featured: false,
    readingTime: 7,
    images: {
      featured: '/images/blog/cbc-assessment.jpg',
      thumbnail: '/images/blog/thumbs/cbc-assessment.jpg'
    }
  },
  {
    id: '4',
    title: 'Digital Transformation in Primary Schools: Where to Start',
    slug: 'digital-transformation-primary-schools',
    excerpt: 'A step-by-step guide to implementing digital tools and technologies in your primary school, focusing on practical and affordable solutions.',
    content: '# Digital Transformation for Schools\n\nTechnology is reshaping education globally...',
    author: 'mary-wanjiku',
    category: 'technology-tips',
    tags: ['Digital Transformation', 'Educational Technology', 'Primary Schools', 'Technology Integration'],
    publishedAt: '2024-02-01',
    createdAt: '2024-01-28',
    updatedAt: '2024-02-01',
    status: 'published',
    featured: true,
    readingTime: 5,
    images: {
      featured: '/images/blog/digital-transformation.jpg',
      thumbnail: '/images/blog/thumbs/digital-transformation.jpg'
    }
  },
  {
    id: '5',
    title: 'Managing School Fees and Financial Records Efficiently',
    slug: 'school-fees-financial-management',
    excerpt: 'Best practices for managing school fees, generating invoices, and maintaining accurate financial records in primary schools.',
    content: '# Financial Management for Schools\n\nEffective financial management is crucial...',
    author: 'john-kiprotich',
    category: 'school-management',
    tags: ['Financial Management', 'School Fees', 'Accounting', 'School Administration'],
    publishedAt: '2024-02-05',
    createdAt: '2024-02-02',
    updatedAt: '2024-02-05',
    status: 'published',
    featured: false,
    readingTime: 6,
    images: {
      featured: '/images/blog/financial-management.jpg',
      thumbnail: '/images/blog/thumbs/financial-management.jpg'
    }
  }
];

// Server-side functions for blog data
export async function getAllPosts(): Promise<BlogPost[]> {
  // In a real implementation, this would fetch from your database or CMS
  return MOCK_POSTS;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.status === 'published');
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter(post => post.featured);
}

export async function getPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter(post => post.category === category);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  const currentPost = posts.find(post => post.id === postId);
  
  if (!currentPost) return [];
  
  // Get posts from the same category, excluding the current post
  const relatedPosts = posts
    .filter(post => post.id !== postId && post.category === currentPost.category)
    .slice(0, limit);
  
  // If we don't have enough related posts, fill with other published posts
  if (relatedPosts.length < limit) {
    const otherPosts = posts
      .filter(post => post.id !== postId && post.category !== currentPost.category)
      .slice(0, limit - relatedPosts.length);
    relatedPosts.push(...otherPosts);
  }
  
  return relatedPosts;
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  const lowercaseQuery = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}