// components/blog/MarkdownRenderer.tsx
'use client';

import { useEffect } from 'react';
import { 
  CodeBlock, 
  Tabs, 
  Accordion, 
  Callout, 
  EnhancedImage, 
  Video, 
  Table, 
  Quote, 
  Stats,
  TwoColumn 
} from './MarkdownComponents';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  useEffect(() => {
    // Initialize custom markdown components
    const initializeComponents = () => {
      // Handle tabs
      document.querySelectorAll('[data-tabs]').forEach((element) => {
        const tabsData = JSON.parse(element.getAttribute('data-tabs') || '[]');
        if (tabsData.length > 0) {
          // Render Tabs component
          const tabsContainer = document.createElement('div');
          element.replaceWith(tabsContainer);
          // You would render the Tabs component here using ReactDOM
        }
      });

      // Handle accordions
      document.querySelectorAll('[data-accordion]').forEach((element) => {
        const accordionData = JSON.parse(element.getAttribute('data-accordion') || '[]');
        if (accordionData.length > 0) {
          // Render Accordion component
          const accordionContainer = document.createElement('div');
          element.replaceWith(accordionContainer);
          // You would render the Accordion component here using ReactDOM
        }
      });

      // Handle callouts
      document.querySelectorAll('blockquote').forEach((blockquote) => {
        const text = blockquote.textContent || '';
        if (text.startsWith('[!')) {
          const type = text.match(/\[!(info|warning|success|error)\]/)?.[1];
          if (type) {
            blockquote.className = `callout callout-${type}`;
          }
        }
      });

      // Handle code blocks with copy functionality
      document.querySelectorAll('pre code').forEach((codeBlock) => {
        const pre = codeBlock.parentElement;
        if (pre && !pre.querySelector('.copy-button')) {
          const copyButton = document.createElement('button');
          copyButton.className = 'copy-button absolute top-2 right-2 p-2 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200';
          copyButton.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>';
          
          copyButton.addEventListener('click', async (e) => {
            e.stopPropagation();
            const code = codeBlock.textContent || '';
            try {
              await navigator.clipboard.writeText(code);
              copyButton.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
              setTimeout(() => {
                copyButton.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>';
              }, 2000);
            } catch (err) {
              console.error('Failed to copy code:', err);
            }
          });

          pre.style.position = 'relative';
          pre.classList.add('group');
          pre.appendChild(copyButton);
        }
      });
    };

    initializeComponents();
  }, [content]);

  return (
    <div 
      className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-green-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}