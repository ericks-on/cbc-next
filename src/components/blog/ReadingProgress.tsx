'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('article.blog-post');
      if (!article || !(article instanceof HTMLElement)) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      const articleStart = articleTop - windowHeight * 0.2;
      const articleEnd = articleTop + articleHeight - windowHeight * 0.8;
      const totalScrollDistance = articleEnd - articleStart;

      if (scrollTop < articleStart) {
        setProgress(0);
      } else if (scrollTop > articleEnd) {
        setProgress(100);
      } else {
        const scrollProgress = (scrollTop - articleStart) / totalScrollDistance;
        setProgress(Math.min(Math.max(scrollProgress * 100, 0), 100));
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-green-600 to-green-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
