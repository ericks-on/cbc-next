import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog-server'
import { BLOG_CATEGORIES } from '@/lib/blog'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cbctrack.com'

// Static pages with priorities and change frequencies
const staticPages = [
  {
    url: '',
    priority: 1.0,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/features',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/gallery',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    url: '/about',
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/contact',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/blog',
    priority: 0.8,
    changeFrequency: 'daily' as const,
  },
  {
    url: '/demo-request',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    url: '/privacy',
    priority: 0.3,
    changeFrequency: 'yearly' as const,
  },
  {
    url: '/terms',
    priority: 0.3,
    changeFrequency: 'yearly' as const,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add static pages
  for (const page of staticPages) {
    sitemapEntries.push({
      url: `${baseUrl}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  }

  try {
    // Add blog posts
    const posts = await getAllPosts()
    const publishedPosts = posts.filter(post => post.status === 'published')
    
    for (const post of publishedPosts) {
      sitemapEntries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt || post.createdAt),
        changeFrequency: 'weekly',
        priority: post.featured ? 0.8 : 0.6,
      })
    }
  } catch (error) {
    console.error('Error generating blog post sitemap entries:', error)
  }

  try {
    // Add blog category pages
    const blogCategories = Object.keys(BLOG_CATEGORIES)
    for (const categoryKey of blogCategories) {
      sitemapEntries.push({
        url: `${baseUrl}/blog/category/${categoryKey}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  } catch (error) {
    console.error('Error generating blog category sitemap entries:', error)
  }

  // Sort by priority (highest first) then by URL
  sitemapEntries.sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0)
    }
    return a.url.localeCompare(b.url)
  })

  return sitemapEntries
}