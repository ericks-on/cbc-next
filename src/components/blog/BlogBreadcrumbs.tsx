import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BlogBreadcrumbsProps {
  category?: string;
  categoryName?: string;
  postTitle?: string;
  items?: BreadcrumbItem[];
}

export function BlogBreadcrumbs({ 
  category, 
  categoryName, 
  postTitle,
  items 
}: BlogBreadcrumbsProps) {
  const breadcrumbItems = items || [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    category && categoryName 
      ? { label: categoryName, href: `/blog/category/${category}` }
      : null,
    postTitle ? { label: postTitle, current: true } : null
  ].filter(Boolean) as BreadcrumbItem[];

  return (
    <div className="relative">
      {/* Larger logo - absolute positioned on large screens */}
      <Link 
        href="/" 
        className="flex-shrink-0 flex items-center absolute left-0 top-1/2 -translate-y-1/2 z-10"
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
          <Image
            src="/images/logos/logo.png"
            alt="CBCTrack Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>

      {/* Breadcrumb trail with left padding for logo space */}
      <nav 
        aria-label="Breadcrumb" 
        className="flex items-center gap-2 text-sm pl-20 md:pl-24 lg:pl-28 min-h-16"
      >
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" />
            )}
            
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-green-600 transition-colors duration-200 whitespace-nowrap flex-shrink-0 text-base"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium whitespace-nowrap flex-shrink-0 text-base">
                {index === breadcrumbItems.length - 1 ? (
                  <>
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">Post</span>
                  </>
                ) : (
                  item.label
                )}
              </span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}