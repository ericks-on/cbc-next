'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Calendar, ChevronUp } from 'lucide-react';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ctaOptions = [
    {
      icon: Calendar,
      label: 'Schedule Demo',
      description: 'Book a free demo',
      href: 'https://cbctrack.com/demo-request',
      color: 'bg-emerald-600 hover:bg-emerald-700',
      external: true
    },
    {
      icon: Phone,
      label: 'Call Us',
      description: '+254 701 838 713',
      href: 'tel:+254701838713',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      description: 'Chat with us',
      href: 'https://wa.me/254701838713?text=Hi, I\'m interested in CBCTrack for my school',
      color: 'bg-green-500 hover:bg-green-600',
      external: true
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 space-y-3"
          >
            {ctaOptions.map((option, index) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={option.href}
                  target={option.external ? '_blank' : '_self'}
                  rel={option.external ? 'noopener noreferrer' : undefined}
                  className={`${option.color} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-200 hover:scale-105 hover:shadow-xl group min-w-[200px]`}
                >
                  <div className="p-2 bg-white/20 rounded-full">
                    <option.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{option.label}</div>
                    <div className="text-xs opacity-90">{option.description}</div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main CTA Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 ${isOpen ? 'bg-gray-600 hover:bg-gray-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse effect for main button when closed */}
      {!isOpen && (
        <div className="absolute inset-0 w-14 h-14 bg-emerald-600 rounded-full animate-ping opacity-20"></div>
      )}
    </div>
  );
}