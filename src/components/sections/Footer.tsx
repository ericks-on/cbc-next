'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center">
              <Logo 
                className="h-12" 
                width={200} 
                height={48} 
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Kenya's premier school management system designed specifically for CBC implementation. 
              Empowering schools with digital solutions for modern education.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-green-primary" />
                <Link 
                  href="mailto:info@cbctrack.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@cbctrack.com
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-green-primary" />
                <Link 
                  href="tel:+254701838713"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +254 701 838 713
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { href: '/#about', label: 'About Us' },
                { href: '/#features', label: 'Features' },
                { href: '/blog', label: 'Blog' },
                { href: 'https://cbctrack.com/demo-request', label: 'Request Demo', external: true }
              ].map((link: any) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ) : link.href.startsWith('#') ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {currentYear} CBCTrack. All Rights Reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/accessibility', label: 'Accessibility' },
                { href: '/sitemap', label: 'Site Map' }
              ].map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}