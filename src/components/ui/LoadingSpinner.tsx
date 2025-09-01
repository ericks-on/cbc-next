'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw, Database, Network } from 'lucide-react';

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary' | 'white' | 'minimal';
  type?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'circle' | 'tech';
  text?: string;
  className?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
  showProgress?: boolean;
  progress?: number;
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const variantClasses = {
  default: 'text-neutral-600',
  primary: 'text-primary-600',
  secondary: 'text-secondary-600',
  white: 'text-white',
  minimal: 'text-neutral-400',
};

const speedValues = {
  slow: 2,
  normal: 1,
  fast: 0.5,
};

export const LoadingSpinner = ({
  size = 'md',
  variant = 'default',
  type = 'spinner',
  text,
  className = '',
  fullScreen = false,
  overlay = false,
  speed = 'normal',
  showProgress = false,
  progress = 0,
}: LoadingSpinnerProps) => {
  const sizeClass = sizeClasses[size];
  const textSizeClass = textSizeClasses[size];
  const variantClass = variantClasses[variant];
  const animationDuration = speedValues[speed];

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center'
    : 'flex items-center justify-center';

  const backgroundClasses = overlay
    ? fullScreen
      ? 'bg-black/30 backdrop-blur-sm'
      : 'bg-white/80 backdrop-blur-sm'
    : '';

  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`${sizeClass} ${variantClass} bg-current rounded-full`}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: animationDuration * 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <motion.div
            className={`${sizeClass} ${variantClass} bg-current rounded-full`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: animationDuration * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );

      case 'bars':
        return (
          <div className="flex space-x-1 items-end">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={`w-1 ${variantClass} bg-current rounded-sm`}
                style={{ height: size === 'xs' ? '8px' : size === 'sm' ? '12px' : size === 'md' ? '16px' : size === 'lg' ? '20px' : '24px' }}
                animate={{
                  scaleY: [0.4, 1.2, 0.4],
                }}
                transition={{
                  duration: animationDuration * 1.2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );

      case 'circle':
        return (
          <motion.div
            className={`${sizeClass} border-2 ${variantClass} border-current border-t-transparent rounded-full`}
            animate={{ rotate: 360 }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );

      case 'tech':
        return (
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: animationDuration * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Network className={`${sizeClass} ${variantClass}`} />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: -360 }}
              transition={{
                duration: animationDuration * 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Database className={`${sizeClass} ${variantClass} opacity-50`} />
            </motion.div>
          </div>
        );

      default: // spinner
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Loader2 className={`${sizeClass} ${variantClass}`} />
          </motion.div>
        );
    }
  };

  const renderProgress = () => {
    if (!showProgress) return null;

    return (
      <div className="mt-4 w-full max-w-xs">
        <div className="flex justify-between text-xs text-neutral-600 mb-1">
          <span>Loading...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-1.5">
          <motion.div
            className="bg-primary-600 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`${containerClasses} ${backgroundClasses} ${className}`}>
      <div className="flex flex-col items-center">
        {renderSpinner()}
        
        {text && (
          <motion.p
            className={`mt-3 ${textSizeClass} ${variantClass} font-medium`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
        
        {renderProgress()}
      </div>
    </div>
  );
};

// Specialized loading components for common use cases
export const PageLoader = ({ text = 'Loading page...' }: { text?: string }) => (
  <LoadingSpinner
    size="lg"
    variant="primary"
    type="circle"
    text={text}
    fullScreen
    overlay
  />
);

export const ComponentLoader = ({ text }: { text?: string }) => (
  <LoadingSpinner
    size="md"
    variant="default"
    type="spinner"
    text={text}
    className="py-8"
  />
);

export const ButtonLoader = ({ size = 'sm' }: { size?: 'xs' | 'sm' | 'md' }) => (
  <LoadingSpinner
    size={size}
    variant="white"
    type="circle"
    className="mr-2"
  />
);

export const InlineLoader = ({ text }: { text?: string }) => (
  <LoadingSpinner
    size="sm"
    variant="default"
    type="dots"
    text={text}
    className="inline-flex"
  />
);

export const DataLoader = ({ text = 'Loading data...' }: { text?: string }) => (
  <LoadingSpinner
    size="lg"
    variant="primary"
    type="tech"
    text={text}
    className="py-12"
  />
);

// Loading container component
export const LoadingContainer = ({
  loading,
  children,
  fallback,
  className = '',
}: {
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}) => {
  if (loading) {
    return (
      <div className={`relative ${className}`}>
        {fallback || <ComponentLoader />}
      </div>
    );
  }

  return <>{children}</>;
};

// Suspense-like loading wrapper
export const SuspenseLoader = ({
  loading,
  error,
  children,
  loadingFallback,
  errorFallback,
  retry,
}: {
  loading: boolean;
  error?: Error | null;
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  retry?: () => void;
}) => {
  if (error) {
    return (
      errorFallback || (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-red-600 mb-4">
            <RefreshCw className="w-8 h-8" />
          </div>
          <p className="text-neutral-600 mb-4">Failed to load content</p>
          {retry && (
            <button
              onClick={retry}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )
    );
  }

  if (loading) {
    return loadingFallback || <ComponentLoader />;
  }

  return <>{children}</>;
};

// Progress loading hook
export const useProgressLoader = (initialProgress: number = 0) => {
  const [progress, setProgress] = React.useState(initialProgress);
  const [loading, setLoading] = React.useState(false);

  const startLoading = (duration: number = 3000) => {
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => {
      clearInterval(interval);
      setLoading(false);
      setProgress(100);
    };
  };

  return { progress, loading, startLoading, setProgress };
};

export default LoadingSpinner;