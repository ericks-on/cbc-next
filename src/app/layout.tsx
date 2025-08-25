import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "CBCTrack - Kenya's Premier School Management System for CBC Implementation",
  description: "Efficiently manage all school operations through CBCTrack's integrated dashboards. Monitor fees, attendance, academic progress, and administrative tasks in one centralized platform designed for Kenya's CBC curriculum. Serving 50+ primary schools across Kenya.",
  keywords: [
    "CBC Kenya", 
    "school management system Kenya", 
    "primary school software Nairobi", 
    "competency-based curriculum tracking", 
    "Kenya education technology", 
    "KICD approved", 
    "Ministry of Education", 
    "school administration Kenya",
    "CBC assessment tracking",
    "Kenya school management",
    "primary school management software",
    "CBC curriculum management"
  ],
  authors: [{ name: "CBCTrack Team" }],
  creator: "CBCTrack Solutions Kenya",
  publisher: "CBCTrack Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cbctrack.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CBCTrack - Kenya's Premier School Management System for CBC Implementation",
    description: "Transform your school's CBC implementation with our comprehensive management platform. Serving 50+ primary schools across Kenya with automated results delivery via WhatsApp.",
    type: "website",
    locale: "en_KE",
    siteName: "CBCTrack",
    countryName: "Kenya",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CBCTrack - Kenya's Premier School Management System"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CBCTrack - Kenya's Premier School Management System",
    description: "Transform your school's CBC implementation with our comprehensive management platform",
    images: ["/images/twitter-card.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

// Structured data for CBCTrack
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CBCTrack",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "description": "Kenya's premier school management system for CBC implementation. Comprehensive platform for managing fees, attendance, academic progress, and administrative tasks in primary schools.",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "KES"
  },
  "provider": {
    "@type": "Organization",
    "@id": "https://cbctrack.com/#organization",
    "name": "CBCTrack Solutions",
    "url": "https://cbctrack.com",
    "logo": "https://cbctrack.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254-701-838-713",
      "contactType": "Customer Support",
      "areaServed": "Kenya",
      "availableLanguage": ["English", "Swahili"]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    },
    "sameAs": [
      "https://www.facebook.com/cbctrack",
      "https://twitter.com/cbctrack",
      "https://www.linkedin.com/company/cbctrack"
    ]
  },
  "featureList": [
    "CBC Curriculum Management",
    "Student Assessment Tracking",
    "Fee Management System",
    "Parent Communication via WhatsApp",
    "Attendance Management",
    "Report Generation",
    "User Role Management",
    "Real-time Analytics"
  ],
  "audience": {
    "@type": "Audience",
    "audienceType": "Primary Schools in Kenya"
  },
  "inLanguage": "en-KE"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}