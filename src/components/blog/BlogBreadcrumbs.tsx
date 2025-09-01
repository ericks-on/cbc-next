import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BlogBreadcrumbsProps {
  category: string;
  categoryName: string;
  postTitle: string;
}

export function BlogBreadcrumbs({ category, categoryName, postTitle }: BlogBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
      <Link
        href="/"
        className="text-gray-500 hover:text-green-600 transition-colors duration-200"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      <ChevronRight className="w-4 h-4 text-gray-400" />
      
      <Link
        href="/blog"
        className="text-gray-500 hover:text-green-600 transition-colors duration-200"
      >
        Blog
      </Link>
      
      <ChevronRight className="w-4 h-4 text-gray-400" />
      
      <Link
        href={`/blog/category/${category}`}
        className="text-gray-500 hover:text-green-600 transition-colors duration-200"
      >
        {categoryName}
      </Link>
      
      <ChevronRight className="w-4 h-4 text-gray-400" />
      
      <span className="text-gray-900 font-medium truncate max-w-xs">
        {postTitle}
      </span>
    </nav>
  );
}