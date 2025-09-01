// lib/enhanced-markdown-parser.ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import type { Heading, Root as MdastRoot, Root } from 'mdast';
import type { Element, Root as HastRoot } from 'hast';

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
  excerptPlain: string;
}

// Generate unique ID for headings
function generateId(text: string, existingIds: Set<string>): string {
  const baseId = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  let id = baseId;
  let counter = 1;

  while (existingIds.has(id)) {
    id = `${baseId}-${counter}`;
    counter++;
  }

  existingIds.add(id);
  return id;
}

// Extract table of contents
function remarkToc(toc: TOCItem[], existingIds: Set<string>) {
  return (tree: Root) => {
    visit(tree, 'heading', (node: Heading) => {
      // Extract text content from heading children
      let text = '';
      if (node.children && node.children.length > 0) {
        text = node.children
          .map(child => {
            if ('value' in child) {
              return child.value;
            }
            return '';
          })
          .join('')
          .trim();
      }
      
      const id = generateId(text, existingIds);
      
      // Add id to heading
      if (!node.data) node.data = {};
      if (!node.data.hProperties) node.data.hProperties = {};
      (node.data.hProperties as any).id = id;
      
      // Add to TOC
      toc.push({
        id,
        text,
        level: node.depth
      });
    });
  };
}

// Process custom markdown syntax
function remarkCustomComponents() {
  return (tree: MdastRoot) => {
    visit(tree, (node, index, parent) => {
      // Handle callouts: [!type] content
      if (node.type === 'blockquote') {
        visit(node, 'paragraph', (pNode) => {
          visit(pNode, 'text', (textNode) => {
            const text = textNode.value;
            const calloutMatch = text.match(/^\[!(info|warning|success|error)\]\s*/);
            
            if (calloutMatch) {
              const type = calloutMatch[1];
              textNode.value = text.replace(calloutMatch[0], '');
              
              if (!node.data) node.data = {};
              if (!node.data.hProperties) node.data.hProperties = {};
              (node.data.hProperties as any).className = `callout callout-${type}`;
              (node.data.hProperties as any)['data-callout-type'] = type;
            }
          });
        });
      }

      // Handle tabs syntax: :::tabs ... :::
      if (node.type === 'paragraph') {
        visit(node, 'text', (textNode) => {
          const text = textNode.value;
          if (text.includes(':::tabs')) {
            // Mark for custom processing
            if (!node.data) node.data = {};
            if (!node.data.hProperties) node.data.hProperties = {};
            (node.data.hProperties as any)['data-component'] = 'tabs';
          }
        });
      }

      // Handle accordion syntax: :::accordion ... :::
      if (node.type === 'paragraph') {
        visit(node, 'text', (textNode) => {
          const text = textNode.value;
          if (text.includes(':::accordion')) {
            if (!node.data) node.data = {};
            if (!node.data.hProperties) node.data.hProperties = {};
            (node.data.hProperties as any)['data-component'] = 'accordion';
          }
        });
      }
    });
  };
}

// Add enhanced HTML attributes
function rehypeEnhance() {
  return (tree: HastRoot) => {
    visit(tree, 'element', (node: Element) => {
      // Add classes based on element types
      const elementClasses: Record<string, string> = {
        'h1': 'text-4xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20',
        'h2': 'text-3xl font-bold text-gray-900 mt-10 mb-5 scroll-mt-20',
        'h3': 'text-2xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20',
        'h4': 'text-xl font-semibold text-gray-900 mt-6 mb-3 scroll-mt-20',
        'h5': 'text-lg font-semibold text-gray-900 mt-4 mb-2 scroll-mt-20',
        'h6': 'text-base font-semibold text-gray-900 mt-4 mb-2 scroll-mt-20',
        'p': 'text-gray-700 leading-relaxed mb-6',
        'blockquote': 'border-l-4 border-green-600 pl-6 py-4 my-6 bg-gray-50 italic text-gray-700 rounded-r-lg',
        'ul': 'list-disc list-inside space-y-2 my-6 ml-4',
        'ol': 'list-decimal list-inside space-y-2 my-6 ml-4',
        'li': 'text-gray-700 leading-relaxed',
        'a': 'text-green-600 hover:text-green-700 underline decoration-2 underline-offset-2 transition-colors duration-200',
        'strong': 'font-semibold text-gray-900',
        'em': 'italic text-gray-700',
        'code': 'bg-gray-100 text-green-600 px-2 py-1 rounded text-sm font-mono',
        'pre': 'bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto my-8 group relative',
        'table': 'w-full border-collapse my-8 rounded-lg overflow-hidden border border-gray-200',
        'thead': 'bg-gray-50',
        'th': 'px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200',
        'td': 'px-4 py-3 text-sm text-gray-700 border-b border-gray-200',
        'tr': 'hover:bg-gray-50 transition-colors duration-200',
        'img': 'rounded-lg shadow-lg my-8 max-w-full h-auto',
        'hr': 'border-t-2 border-gray-200 my-12'
      };

      const className = elementClasses[node.tagName];
      if (className) {
        if (!node.properties) node.properties = {};
        node.properties.className = className;
      }

      // Handle callouts
      if (node.tagName === 'blockquote' && node.properties?.['data-callout-type']) {
        const type = node.properties['data-callout-type'] as string;
        const configs = {
          info: 'border-blue-600 bg-blue-50 text-blue-800',
          warning: 'border-yellow-600 bg-yellow-50 text-yellow-800',
          success: 'border-green-600 bg-green-50 text-green-800',
          error: 'border-red-600 bg-red-50 text-red-800'
        };
        
        node.properties.className = `${configs[type as keyof typeof configs]} border-l-4 pl-6 py-4 my-6 rounded-r-lg`;
      }

      // Enhance external links
      if (node.tagName === 'a' && node.properties?.href) {
        const href = node.properties.href as string;
        if (href.startsWith('http') && !href.includes(process.env.NEXT_PUBLIC_SITE_URL || 'localhost')) {
          node.properties.target = '_blank';
          node.properties.rel = 'noopener noreferrer';
          node.properties.className = (node.properties.className || '') + ' external-link';
        }
      }

      // Handle images with lazy loading
      if (node.tagName === 'img') {
        if (!node.properties) node.properties = {};
        node.properties.loading = 'lazy';
        node.properties.decoding = 'async';
      }
    });
  };
}

// Main enhanced parser
export async function parseMarkdownEnhanced(content: string): Promise<MarkdownResult> {
  const toc: TOCItem[] = [];
  const existingIds = new Set<string>();

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkCustomComponents)
    .use(remarkToc, toc, existingIds)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['heading-link'],
        ariaLabel: 'Link to section'
      }
    })
    .use(rehypeEnhance)
    .use(rehypeStringify, { allowDangerousHtml: true });

  const result = await processor.process(content);
  const html = result.toString();
  
  // Calculate metrics
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
  
  // Generate plain text excerpt
  const excerptPlain = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .split('\n')
    .find(line => line.trim().length > 0)
    ?.substring(0, 160) + '...' || '';

  return {
    html,
    toc,
    readingTime,
    wordCount,
    excerptPlain
  };
}

// Utility functions for markdown processing
export function processCustomSyntax(content: string): string {
  // Process tabs syntax
  content = content.replace(
    /:::tabs\n([\s\S]*?)\n:::/g,
    (match, tabsContent) => {
      const tabs = tabsContent
        .split(/^## /m)
        .filter((tab: string) => tab.trim())
        .map((tab: string) => {
          const lines = tab.split('\n');
          const label = lines[0].trim();
          const content = lines.slice(1).join('\n').trim();
          return { label, content };
        });

      return `<div data-tabs='${JSON.stringify(tabs)}' class="markdown-tabs"></div>`;
    }
  );

  // Process accordion syntax
  content = content.replace(
    /:::accordion\n([\s\S]*?)\n:::/g,
    (match, accordionContent) => {
      const items = accordionContent
        .split(/^### /m)
        .filter((item: string) => item.trim())
        .map((item: string, index: number) => {
          const lines = item.split('\n');
          const title = lines[0].trim();
          const content = lines.slice(1).join('\n').trim();
          return { id: `accordion-${index}`, title, content };
        });

      return `<div data-accordion='${JSON.stringify(items)}' class="markdown-accordion"></div>`;
    }
  );

  // Process two-column layout
  content = content.replace(
    /:::columns\n([\s\S]*?)\n:::/g,
    (match, columnsContent) => {
      const columns = columnsContent.split(/^---$/m);
      if (columns.length === 2) {
        return `<div class="grid md:grid-cols-2 gap-8 my-8">
          <div class="prose prose-gray max-w-none">${columns[0].trim()}</div>
          <div class="prose prose-gray max-w-none">${columns[1].trim()}</div>
        </div>`;
      }
      return match;
    }
  );

  return content;
}

// Export the main parser function
export { parseMarkdownEnhanced as parseMarkdown };