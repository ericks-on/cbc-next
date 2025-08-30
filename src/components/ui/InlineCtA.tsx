'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, MessageCircle } from 'lucide-react';

interface InlineCTAProps {
  variant?: 'default' | 'features' | 'gallery' | 'compact';
  className?: string;
}

export default function InlineCTA({ variant = 'default', className = '' }: InlineCTAProps) {
  const variants = {
    default: {
      title: "Ready to Transform Your School Management?",
      subtitle: "Join 50+ Kenyan primary schools already using CBCTrack to streamline their CBC implementation and administrative processes.",
      background: "bg-gradient-to-r from-emerald-600 to-green-600",
      showStats: true
    },
    features: {
      title: "Experience CBCTrack's Powerful Features",
      subtitle: "See how our comprehensive platform can simplify your school's daily operations and enhance CBC implementation.",
      background: "bg-gradient-to-r from-blue-600 to-purple-600",
      showStats: false
    },
    gallery: {
      title: "Ready to See CBCTrack in Action?",
      subtitle: "Schedule a personalized demo to explore how CBCTrack can transform your school's management processes.",
      background: "bg-gradient-to-r from-green-600 to-teal-600",
      showStats: false
    },
    compact: {
      title: "Get Started Today",
      subtitle: "Transform your school management with CBCTrack",
      background: "bg-emerald-600",
      showStats: false
    }
  };

  const config = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`${config.background} rounded-2xl p-8 md:p-12 text-white ${className}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h3 className={`font-bold text-white mb-4 ${variant === 'compact' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
          {config.title}
        </h3>
        
        <p className={`text-white/90 mb-8 ${variant === 'compact' ? 'text-base' : 'text-lg'} max-w-2xl mx-auto leading-relaxed`}>
          {config.subtitle}
        </p>

        {config.showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-white/80">Schools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">30K+</div>
              <div className="text-sm text-white/80">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">95%</div>
              <div className="text-sm text-white/80">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/80">Support</div>
            </div>
          </div>
        )}

        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${variant === 'compact' ? 'items-center' : ''}`}>
          <a 
            href="https://cbctrack.com/demo-request" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 shadow-lg transition-all duration-200 hover:scale-105 ${variant === 'compact' ? 'text-sm' : 'text-base'}`}
          >
            <Calendar className="w-5 h-5" />
            Schedule Free Demo
          </a>
          
          <a 
            href="tel:+254701838713"
            className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-200 hover:scale-105 ${variant === 'compact' ? 'text-sm' : 'text-base'}`}
          >
            <Phone className="w-5 h-5" />
            Call +254 701 838 713
          </a>

          {variant !== 'compact' && (
            <a 
              href="https://wa.me/254701838713?text=Hi, I'm interested in CBCTrack for my school"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-200 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          )}
        </div>

        {variant === 'default' && (
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/80 text-sm mb-4">
              Trusted by leading schools across Kenya including counties like Nairobi, Kiambu, Machakos, and Nakuru
            </p>
            <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
              <span>✓ Ministry of Education Compliant</span>
              <span className="mx-2">•</span>
              <span>✓ KICD Aligned</span>
              <span className="mx-2">•</span>
              <span>✓ 99.9% Uptime</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}