import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import GallerySection from '@/components/sections/GallerySection';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/sections/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import InlineCTA from '@/components/ui/InlineCtA';
import { ConsentProvider } from '@/components/legal/ConsentProvider';
import ConsentBanner from '@/components/legal/ConsentBanner';

export default function Home() {
  return (
    <ConsentProvider requireConsent={true} consentVersion="1.0">
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          
          {/* CTA after Features */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <InlineCTA variant="features" />
            </div>
          </section>
          
          <GallerySection />
          
          {/* CTA after Gallery */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <InlineCTA variant="gallery" />
            </div>
          </section>
          
          <AboutSection />
          
          {/* Main CTA Section */}
          <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <InlineCTA variant="default" />
            </div>
          </section>
        </main>
        <Footer />
        
        {/* Floating CTA Button */}
        <FloatingCTA />
        
        {/* Consent Management */}
        <ConsentBanner variant="full" />
      </div>
    </ConsentProvider>
  );
}