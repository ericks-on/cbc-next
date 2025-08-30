'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FEATURES } from '@/lib/constants';
import { Feature } from '@/types';

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState<{ [key: string]: boolean }>({});

  const toggleFeatureDetails = (featureId: string) => {
    setActiveFeature(activeFeature === featureId ? null : featureId);
  };

  const toggleImageZoom = (featureId: string) => {
    setImageZoom(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CBCTrack provides comprehensive tools designed specifically for Kenya&apos;s Competency-Based Curriculum
          </p>
        </motion.div>

        <div className="space-y-20">
          {FEATURES.map((feature, index) => (
            <FeatureSpread 
              key={feature.id} 
              feature={feature} 
              index={index}
              isActive={activeFeature === feature.id}
              onToggle={() => toggleFeatureDetails(feature.id)}
              onImageClick={() => toggleImageZoom(feature.id)}
              isImageZoomed={imageZoom[feature.id]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureSpreadProps {
  feature: Feature;
  index: number;
  isActive: boolean;
  onToggle: () => void;
  onImageClick: () => void;
  isImageZoomed: boolean;
}

function FeatureSpread({ 
  feature, 
  index, 
  isActive, 
  onToggle, 
  onImageClick, 
  isImageZoomed 
}: FeatureSpreadProps) {
  const isReverse = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className={`flex flex-col lg:flex-row items-center gap-12 ${
        isReverse ? 'lg:flex-row-reverse' : ''
      }`}>
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <div>
            <span className="text-green-primary font-semibold text-sm uppercase tracking-wide">
              {feature.id.replace('-', ' & ')}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              {feature.title}
            </h3>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            {feature.description}
          </p>

          <ul className="space-y-3">
            {feature.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{highlight}</span>
              </li>
            ))}
          </ul>

          <Button
            variant="primary"
            onClick={onToggle}
            className="flex items-center gap-2"
          >
            Learn More <ArrowRight size={16} />
          </Button>
        </div>

        {/* Visual Content */}
        <div className="flex-1 relative">
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className="relative cursor-pointer"
            onClick={onImageClick}
          >
            <Image
              src={feature.image}
              alt={feature.title}
              width={600}
              height={400}
              className="w-full h-auto rounded-xl shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 bg-green-primary text-white px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">{feature.caption}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-gray-900">{feature.title} - In Detail</h4>
                <button
                  onClick={onToggle}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feature.details.map((detail, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-primary font-bold">{detail.icon}</span>
                    </div>
                    <h5 className="font-semibold text-gray-900">{detail.title}</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-center mb-4">
                  All features are fully customizable to meet your school&apos;s specific needs and workflows.
                </p>
                <div className="text-center">
                  <Button variant="primary">
                    <a href="https://cbctrack.com/demo-request" target="_blank" rel="noopener noreferrer">
                      Schedule a Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={onImageClick}
          >
            <Image
              src={feature.image}
              alt={feature.title}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={onImageClick}
              className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}