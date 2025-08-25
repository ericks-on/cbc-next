'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TYPING_TEXTS } from '@/lib/constants';

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    '/images/backgrounds/school1.jpg',
    '/images/backgrounds/school2.jpg',
    '/images/backgrounds/school3.jpg'
  ];

  // Typing effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = TYPING_TEXTS[currentTextIndex];
      
      if (!isDeleting) {
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex]);

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {backgrounds.map((bg, index) => (
          <motion.div
            key={bg}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === backgroundIndex ? 1 : 0 
            }}
            transition={{ duration: 1 }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm md:text-base font-semibold tracking-wider uppercase text-green-300"
          >
            Competency-Based Curriculum Management
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            Manage Your School, <br />
            <span className="text-green-primary">Not The Paperwork</span>
          </motion.h1>

          {/* Typing Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="h-8 md:h-12"
          >
            <span className="text-xl md:text-2xl text-green-300">
              {currentText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto"
          >
            {[
              { icon: '📊', title: 'Progress Tracking', desc: 'Monitor student achievements in real-time' },
              { icon: '📝', title: 'Paperless Management', desc: 'Digitize all your documentation' },
              { icon: '🔄', title: 'Automated Workflows', desc: 'Streamline repetitive tasks' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-200">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 mt-12 max-w-lg mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-primary">50+</div>
              <div className="text-sm text-gray-300">Schools Using CBCTrack</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-primary">20+</div>
              <div className="text-sm text-gray-300">Hours Saved Weekly</div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-8"
          >
            <Button variant="primary" size="lg" className="bg-green-primary hover:bg-green-600">
              <a href="https://cbctrack.com/demo-request" target="_blank" rel="noopener noreferrer">
                Schedule a Demo
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}