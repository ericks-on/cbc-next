'use client';

import { useState } from 'react';
import { Share2, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { BlogPost } from '@/lib/blog-types';

interface SocialShareProps {
  post: BlogPost;
  variant?: 'default' | 'compact';
}

export function SocialShare({ post, variant = 'default' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  
  const postUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/blog/${post.slug}`
    : '';

  const shareData = {
    title: post.title,
    text: post.excerpt,
    url: postUrl,
  };

  const handleShare = async (platform: string) => {
    const urls = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
    };

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(postUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
      return;
    }

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Failed to share:', err);
      }
      return;
    }

    const url = urls[platform as keyof typeof urls];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  
  const XIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Share:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleShare('x')}
            className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Share on X"
          >
            <XIcon />
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleShare('copy')}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
            aria-label="Copy link"
          >
            {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 border">
      <div className="flex items-center gap-3 mb-4">
        <Share2 className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-900">Share this post</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => handleShare('x')}
          className="flex items-center justify-center gap-2 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <XIcon />
          <span className="text-sm">X</span>
        </button>
        
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Facebook className="w-4 h-4" />
          <span className="text-sm">Facebook</span>
        </button>
        
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center justify-center gap-2 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
        >
          <Linkedin className="w-4 h-4" />
          <span className="text-sm">LinkedIn</span>
        </button>
        
        <button
          onClick={() => handleShare('copy')}
          className="flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
          <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      {typeof navigator !== 'undefined' &&  typeof navigator.share === 'function' && (
        <button
          onClick={() => handleShare('native')}
          className="w-full mt-3 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Share via device
        </button>
      )}
    </div>
  );
}