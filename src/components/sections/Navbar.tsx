'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { UserRole } from '@/types';

interface NavbarProps {
  user?: UserRole;
}

export default function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getDashboardUrl = () => {
    if (!user?.isAuthenticated) return '';
    
    if (user.isSuperuser) return '/admin';
    if (user.isPrincipal) return '/principal';
    if (user.isTeacher) return '/teacher-dashboard';
    if (user.isStudent) return '/student-dashboard';
    if (user.isStaffMember) return '/principal';
    return '';
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Logo 
                className="h-10" 
                width={180} 
                height={40} 
                priority 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-green-primary px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-green-primary px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user?.isAuthenticated ? (
              <>
                {getDashboardUrl() && (
                  <Button variant="primary" size="sm">
                    <Link href={getDashboardUrl()}>Dashboard</Link>
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Link href="/logout">Logout</Link>
                </Button>
              </>
            ) : (
              <Button variant="primary" size="sm">
                <a href="https://cbctrack.com/login" target="_blank" rel="noopener noreferrer">
                  Login
                </a>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAVIGATION_ITEMS.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-green-primary block px-3 py-2 text-base font-medium"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-green-primary block px-3 py-2 text-base font-medium"
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200">
                {user?.isAuthenticated ? (
                  <>
                    {getDashboardUrl() && (
                      <Button variant="primary" size="sm" className="w-full mb-2">
                        <Link href={getDashboardUrl()}>Dashboard</Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      <Link href="/logout">Logout</Link>
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" size="sm" className="w-full">
                    <a href="https://cbctrack.com/login" target="_blank" rel="noopener noreferrer">
                      Login
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}