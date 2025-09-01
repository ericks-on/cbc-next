'use client';

import { useEffect } from 'react';

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  useEffect(() => {
    // Add syntax highlighting if code blocks exist
    const codeBlocks = document.querySelectorAll('pre code');
    if (codeBlocks.length > 0 && typeof window !== 'undefined') {
      // You can add Prism.js or highlight.js here
      // For now, we'll just add basic styling
      codeBlocks.forEach((block) => {
        block.classList.add('language-text');
      });
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Additional styling for better content presentation
    const style = document.createElement('style');
    style.textContent = `
      .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-weight: 700;
        line-height: 1.3;
        scroll-margin-top: 100px;
      }
      
      .prose h1 {
        font-size: 2.25rem;
        margin-top: 3rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e5e7eb;
      }
      
      .prose h2 {
        font-size: 1.875rem;
        margin-top: 2.5rem;
        padding-bottom: 0.3rem;
      }
      
      .prose h3 {
        font-size: 1.5rem;
      }
      
      .prose h4 {
        font-size: 1.25rem;
      }
      
      .prose h5 {
        font-size: 1.125rem;
      }
      
      .prose h6 {
        font-size: 1rem;
        color: #6b7280;
      }
      
      .prose p {
        margin-bottom: 1.5rem;
        line-height: 1.8;
      }
      
      .prose ul, .prose ol {
        margin-bottom: 1.5rem;
        padding-left: 1.625rem;
      }
      
      .prose li {
        margin-bottom: 0.5rem;
        line-height: 1.7;
      }
      
      .prose blockquote {
        margin: 2rem 0;
        padding: 1.5rem;
        border-left: 4px solid #10b981;
        background-color: #f9fafb;
        font-style: italic;
      }
      
      .prose blockquote p {
        margin-bottom: 0;
        color: #4b5563;
      }
      
      .prose hr {
        margin: 3rem 0;
        border: 0;
        border-top: 1px solid #e5e7eb;
      }
      
      .prose pre {
        margin: 2rem 0;
        padding: 1.5rem;
        border-radius: 0.5rem;
        background-color: #1f2937;
        overflow-x: auto;
      }
      
      .prose code {
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 0.875em;
      }
      
      .prose img {
        margin: 2rem 0;
        border-radius: 0.5rem;
      }
      
      .prose table {
        width: 100%;
        margin: 2rem 0;
        border-collapse: collapse;
      }
      
      .prose th, .prose td {
        padding: 0.75rem;
        border: 1px solid #e5e7eb;
      }
      
      .prose th {
        background-color: #f9fafb;
        font-weight: 600;
      }
      
      @media (max-width: 768px) {
        .prose h1 {
          font-size: 1.875rem;
        }
        
        .prose h2 {
          font-size: 1.5rem;
        }
        
        .prose h3 {
          font-size: 1.25rem;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [content]);

  return (
    <div 
      className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-green-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-green-600 prose-blockquote:bg-green-50 prose-blockquote:text-gray-700 prose-img:rounded-xl prose-img:shadow-md prose-table:overflow-hidden prose-table:rounded-lg prose-th:bg-gray-100 prose-th:text-gray-900"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}