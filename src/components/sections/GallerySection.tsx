'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { GALLERY_IMAGES } from '@/lib/constants';
import { GalleryImage } from '@/types';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'admin', label: 'Administration' },
  { id: 'finance', label: 'Finance' },
  { id: 'reports', label: 'Reports' },
  { id: 'assessment', label: 'Assessment' }
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const filteredImages = selectedCategory === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(image => image.category === selectedCategory);

  const openImageViewer = (image: GalleryImage) => {
    const index = filteredImages.findIndex(image => image.id === image.id);
    setCurrentIndex(index);
    setSelectedImage(image);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleZoom = (type: 'in' | 'out' | 'reset') => {
    if (type === 'in') {
      setZoomLevel(prev => Math.min(prev * 1.5, 4));
    } else if (type === 'out') {
      setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
    } else {
      setZoomLevel(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const closeViewer = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-green-primary font-semibold text-sm uppercase tracking-wide">
            Visual Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            CBCTrack <span className="text-green-primary">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive educational management platform through real screenshots and interface examples.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-green-primary text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-primary border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <GalleryItem
                key={`${selectedCategory}-${image.id}`}
                image={image}
                index={index}
                onClick={() => openImageViewer(image)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Show count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-gray-500"
        >
          Showing {filteredImages.length} of {GALLERY_IMAGES.length} images
        </motion.div>
      </div>

      {/* Enhanced Image Viewer Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageViewer
            image={selectedImage}
            currentIndex={currentIndex}
            totalImages={filteredImages.length}
            zoomLevel={zoomLevel}
            imagePosition={imagePosition}
            onClose={closeViewer}
            onNavigate={navigateImage}
            onZoom={handleZoom}
            onPositionChange={setImagePosition}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}

function GalleryItem({ image, index, onClick }: GalleryItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
        {!hasError ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={400}
            height={256}
            className={`w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">🖼️</div>
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Loading placeholder */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="text-center text-white p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ZoomIn className="w-10 h-10 mx-auto mb-3" />
            <h3 className="font-semibold mb-2 text-lg">{image.title}</h3>
            <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>
          </div>
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-green-primary text-white text-xs px-2 py-1 rounded-full font-medium capitalize transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {image.category}
        </div>
      </div>
    </motion.div>
  );
}

interface ImageViewerProps {
  image: GalleryImage;
  currentIndex: number;
  totalImages: number;
  zoomLevel: number;
  imagePosition: { x: number; y: number };
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onZoom: (type: 'in' | 'out' | 'reset') => void;
  onPositionChange: (position: { x: number; y: number }) => void;
}

function ImageViewer({ 
  image, 
  currentIndex, 
  totalImages, 
  zoomLevel, 
  imagePosition, 
  onClose, 
  onNavigate, 
  onZoom,
  onPositionChange 
}: ImageViewerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      onPositionChange({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Header Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-lg px-4 py-2 text-white z-10">
        <h3 className="font-semibold">{image.title}</h3>
        <p className="text-sm text-gray-300">{currentIndex + 1} of {totalImages}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 p-3 bg-black/50 rounded-full z-10 transition-colors"
      >
        <X size={24} />
      </button>

      {/* Navigation Arrows */}
      {totalImages > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-3 bg-black/50 rounded-full z-10 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-3 bg-black/50 rounded-full z-10 transition-colors"
          >
            <ArrowRight size={24} />
          </button>
        </>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 rounded-lg p-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onZoom('out');
          }}
          className="text-white hover:text-gray-300 p-2 rounded transition-colors"
          title="Zoom Out"
        >
          <div className="w-6 h-6 flex items-center justify-center text-lg font-bold">−</div>
        </button>
        
        <div className="text-white px-3 py-2 text-sm">
          {Math.round(zoomLevel * 100)}%
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onZoom('in');
          }}
          className="text-white hover:text-gray-300 p-2 rounded transition-colors"
          title="Zoom In"
        >
          <div className="w-6 h-6 flex items-center justify-center text-lg font-bold">+</div>
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onZoom('reset');
          }}
          className="text-white hover:text-gray-300 p-2 rounded transition-colors"
          title="Reset Zoom"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Image Container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="max-w-7xl max-h-[90vh] mx-auto px-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={800}
          className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-200"
          style={{
            transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
            transformOrigin: 'center center'
          }}
          draggable={false}
        />
      </motion.div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-white max-w-2xl px-4"
      >
        <p className="text-gray-300">{image.description}</p>
      </motion.div>
    </motion.div>
  );
}