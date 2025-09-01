// components/blog/MarkdownComponents.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ChevronDown, 
  ChevronRight, 
  Copy, 
  Check, 
  ExternalLink,
  Play,
  Pause,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Enhanced Code Block Component
interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group my-6">
      {filename && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-gray-700">
          {filename}
        </div>
      )}
      
      <pre className={`bg-gray-900 text-gray-100 p-4 overflow-x-auto ${filename ? 'rounded-b-lg' : 'rounded-lg'}`}>
        <code className={`language-${language || 'text'}`}>
          {code}
        </code>
      </pre>
      
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-300" />
        )}
      </button>
    </div>
  );
}

// Interactive Tabs Component
interface TabsProps {
  tabs: {
    id: string;
    label: string;
    content: string;
  }[];
}

export function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div className="my-8 border border-gray-200 rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'text-green-600 border-green-600 bg-white'
                  : 'text-gray-600 border-transparent hover:text-green-600 hover:border-green-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-6 bg-white">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`prose prose-gray max-w-none ${
              activeTab === tab.id ? 'block' : 'hidden'
            }`}
            dangerouslySetInnerHTML={{ __html: tab.content }}
          />
        ))}
      </div>
    </div>
  );
}

// Accordion Component
interface AccordionProps {
  items: {
    id: string;
    title: string;
    content: string;
  }[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      if (!allowMultiple) {
        newOpenItems.clear();
      }
      newOpenItems.add(id);
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div className="my-8 space-y-2">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        
        return (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">{item.title}</span>
              {isOpen ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {isOpen && (
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <div 
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Callout/Alert Component
interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const configs = {
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900',
      textColor: 'text-blue-800'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-900',
      textColor: 'text-yellow-800'
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      titleColor: 'text-green-900',
      textColor: 'text-green-800'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      titleColor: 'text-red-900',
      textColor: 'text-red-800'
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={`my-6 p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold ${config.titleColor} mb-2`}>
              {title}
            </h4>
          )}
          <div className={`${config.textColor} prose prose-sm max-w-none`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Image Component
interface EnhancedImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function EnhancedImage({ 
  src, 
  alt, 
  caption, 
  width = 800, 
  height = 600 
}: EnhancedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <figure className="my-8">
      <div 
        className="relative cursor-zoom-in group"
        onClick={() => setIsZoomed(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-auto rounded-lg shadow-lg transition-all duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:shadow-xl`}
          onLoad={() => setIsLoaded(true)}
        />
        
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse" />
        )}
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-lg flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
            <ExternalLink className="w-5 h-5 text-gray-700" />
          </div>
        </div>
      </div>
      
      {caption && (
        <figcaption className="text-sm text-gray-600 text-center mt-3 italic">
          {caption}
        </figcaption>
      )}

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 bg-black/20 rounded-full"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
      )}
    </figure>
  );
}

// Video Component
interface VideoProps {
  src: string;
  poster?: string;
  caption?: string;
}

export function Video({ src, poster, caption }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = document.querySelector(`video[src="${src}"]`) as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <figure className="my-8">
      <div className="relative group">
        <video
          src={src}
          poster={poster}
          className="w-full h-auto rounded-lg shadow-lg"
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300 rounded-lg"
        >
          <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-gray-700" />
            ) : (
              <Play className="w-8 h-8 text-gray-700 ml-1" />
            )}
          </div>
        </button>
      </div>
      
      {caption && (
        <figcaption className="text-sm text-gray-600 text-center mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Table Component with enhanced styling
interface TableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export function Table({ headers, rows, caption }: TableProps) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full">
          {caption && (
            <caption className="p-4 text-sm text-gray-600 bg-gray-50 border-b border-gray-200">
              {caption}
            </caption>
          )}
          
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="bg-white">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-200">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

// Quote Component
interface QuoteProps {
  quote: string;
  author?: string;
  role?: string;
  avatar?: string;
}

export function Quote({ quote, author, role, avatar }: QuoteProps) {
  return (
    <blockquote className="my-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600 rounded-r-lg">
      <div className="text-lg text-gray-700 italic mb-4 leading-relaxed">
        &quot;{quote}&quot;
      </div>
      
      {author && (
        <div className="flex items-center gap-3">
          {avatar ? (
            <Image
              src={avatar}
              alt={author}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
              {author.charAt(0).toUpperCase()}
            </div>
          )}
          
          <div>
            <div className="font-semibold text-gray-900">{author}</div>
            {role && <div className="text-sm text-gray-600">{role}</div>}
          </div>
        </div>
      )}
    </blockquote>
  );
}

// Stats/Metrics Component
interface StatsProps {
  stats: {
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            {stat.label}
          </div>
          {stat.change && (
            <div className={`text-xs font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 
              stat.trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {stat.change}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Two Column Layout Component
interface TwoColumnProps {
  leftContent: string;
  rightContent: string;
  leftTitle?: string;
  rightTitle?: string;
}

export function TwoColumn({ leftContent, rightContent, leftTitle, rightTitle }: TwoColumnProps) {
  return (
    <div className="my-8 grid md:grid-cols-2 gap-8">
      <div>
        {leftTitle && (
          <h4 className="text-lg font-semibold text-gray-900 mb-4">{leftTitle}</h4>
        )}
        <div 
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: leftContent }}
        />
      </div>
      
      <div>
        {rightTitle && (
          <h4 className="text-lg font-semibold text-gray-900 mb-4">{rightTitle}</h4>
        )}
        <div 
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: rightContent }}
        />
      </div>
    </div>
  );
}

