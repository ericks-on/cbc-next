import React, { useState } from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function Logo({ className = '', width = 180, height = 40, priority = false }: LogoProps) {
  const [logoError, setLogoError] = useState(false);
  const [currentLogo, setCurrentLogo] = useState('/images/logos/logo.png');

  const handleError = () => {
    console.log('Logo error with:', currentLogo);
    if (currentLogo === '/images/logos/smart.png') {
      // Try main logo
      setCurrentLogo('/images/logos/logo.png');
    } else if (currentLogo === '/images/logos/logo.png') {
      // Try logo with background
      setCurrentLogo('/images/logos/logo_bg.png');
    } else {
      // Give up and show text
      setLogoError(true);
    }
  };

  if (logoError) {
    return (
      <div className={`flex items-center text-2xl font-bold ${className}`}>
        <span className="text-green-primary">CBC</span>
        <span className="text-gray-700">Track</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={currentLogo}
        alt="CBCTrack Logo"
        fill
        className="object-contain object-left"
        priority={priority}
        onError={handleError}
        onLoad={() => console.log('Logo loaded successfully:', currentLogo)}
      />
    </div>
  );
}