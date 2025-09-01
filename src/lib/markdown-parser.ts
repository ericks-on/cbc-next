// lib/markdown-parser.ts
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import type { Root } from 'mdast';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface MarkdownResult {
  html: string;
  toc: TOCItem[];
  readingTime: number;
  wordCount: number;
}

// Generate slug from heading text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Extract table of contents from markdown AST
function remarkToc(toc: TOCItem[]) {
  return (tree: Root) => {
    visit(tree, 'heading', (node) => {
      const text = toString(node);
      const id = generateSlug(text);
      
      // Add id to heading
      node.data = node.data || {};
      node.data.hProperties = { id };
      
      // Add to TOC
      toc.push({
        id,
        text,
        level: node.depth
      });
    });
  };
}

// Add custom classes and enhance HTML
function remarkEnhance() {
  return (tree: Root) => {
    visit(tree, (node: any) => {
      // Add classes to different elements
      if (node.type === 'element') {
        switch (node.tagName) {
          case 'blockquote':
            node.properties = {
              ...node.properties,
              className: 'border-l-4 border-green-600 pl-6 py-4 my-6 bg-gray-50 italic text-gray-700'
            };
            break;
          case 'pre':
            node.properties = {
              ...node.properties,
              className: 'bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-6'
            };
            break;
          case 'code':
            if (!node.properties?.className?.includes('language-')) {
              node.properties = {
                ...node.properties,
                className: 'bg-gray-100 text-gray-900 px-2 py-1 rounded text-sm'
              };
            }
            break;
          case 'table':
            node.properties = {
              ...node.properties,
              className: 'w-full border-collapse border border-gray-300 my-6'
            };
            break;
          case 'th':
            node.properties = {
              ...node.properties,
              className: 'border border-gray-300 px-4 py-2 bg-gray-50 font-semibold text-left'
            };
            break;
          case 'td':
            node.properties = {
              ...node.properties,
              className: 'border border-gray-300 px-4 py-2'
            };
            break;
          case 'ul':
            node.properties = {
              ...node.properties,
              className: 'list-disc list-inside space-y-2 my-4 ml-4'
            };
            break;
          case 'ol':
            node.properties = {
              ...node.properties,
              className: 'list-decimal list-inside space-y-2 my-4 ml-4'
            };
            break;
          case 'li':
            node.properties = {
              ...node.properties,
              className: 'text-gray-700 leading-relaxed'
            };
            break;
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            const headingClasses = {
              h1: 'text-4xl font-bold text-gray-900 mt-12 mb-6',
              h2: 'text-3xl font-bold text-gray-900 mt-10 mb-5',
              h3: 'text-2xl font-semibold text-gray-900 mt-8 mb-4',
              h4: 'text-xl font-semibold text-gray-900 mt-6 mb-3',
              h5: 'text-lg font-semibold text-gray-900 mt-4 mb-2',
              h6: 'text-base font-semibold text-gray-900 mt-4 mb-2'
            };
            node.properties = {
              ...node.properties,
              className: headingClasses[node.tagName as keyof typeof headingClasses]
            };
            break;
          case 'p':
            node.properties = {
              ...node.properties,
              className: 'text-gray-700 leading-relaxed mb-6'
            };
            break;
          case 'a':
            node.properties = {
              ...node.properties,
              className: 'text-green-600 hover:text-green-700 underline transition-colors duration-200'
            };
            break;
          case 'img':
            node.properties = {
              ...node.properties,
              className: 'rounded-lg shadow-lg my-8 max-w-full h-auto'
            };
            break;
        }
      }
    });
  };
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Main markdown parser function
export async function parseMarkdown(content: string): Promise<MarkdownResult> {
  const toc: TOCItem[] = [];
  
  const processor = remark()
    .use(remarkGfm) // GitHub Flavored Markdown
    .use(remarkBreaks) // Line breaks
    .use(remarkToc, toc) // Table of contents
    .use(remarkHtml, { sanitize: false }) // Convert to HTML
    .use(remarkEnhance); // Add custom classes

  const result = await processor.process(content);
  const html = result.toString();
  
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = calculateReadingTime(content);

  return {
    html,
    toc,
    readingTime,
    wordCount
  };
}

// Utility function to extract plain text from markdown (for excerpts)
export async function extractPlainText(content: string): Promise<string> {
  const processor = remark()
    .use(remarkGfm);
  
  const result = await processor.process(content);
  
  // Convert to plain text by visiting all text nodes
  let plainText = '';
  visit(result.data.value as Root, 'text', (node: any) => {
    plainText += node.value + ' ';
  });
  
  return plainText.trim();
}

// Generate excerpt from content
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find the last complete sentence within maxLength
  const truncated = plainText.substring(0, maxLength);
  const lastSentence = truncated.lastIndexOf('.');
  
  if (lastSentence > maxLength * 0.5) {
    return truncated.substring(0, lastSentence + 1);
  }
  
  // If no sentence break found, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpace) + '...';
}