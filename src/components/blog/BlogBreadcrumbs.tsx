'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BlogBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function BlogBreadcrumbs({ items }: BlogBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
          {item.current ? (
            <span className="text-gray-600 font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-green-primary transition-colors"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}