'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, MessageCircle, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface ConsentBannerProps {
  variant?: 'full' | 'compact' | 'whatsapp-specific';
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function ConsentBanner({ 
  variant = 'full', 
  onAccept, 
  onDecline 
}: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [acceptedConsents, setAcceptedConsents] = useState({
    privacy: false,
    terms: false,
    whatsapp: false,
    analytics: false
  });

  useEffect(() => {
    // Check if user has already accepted consent
    const consentAccepted = localStorage.getItem('cbctrack_consent_accepted');
    const consentVersion = localStorage.getItem('cbctrack_consent_version');
    const currentVersion = '1.0'; // Update when privacy policy changes
    
    if (!consentAccepted || consentVersion !== currentVersion) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsents = {
      privacy: true,
      terms: true,
      whatsapp: true,
      analytics: true
    };
    
    setAcceptedConsents(newConsents);
    localStorage.setItem('cbctrack_consent_accepted', 'true');
    localStorage.setItem('cbctrack_consent_version', '1.0');
    localStorage.setItem('cbctrack_consent_details', JSON.stringify(newConsents));
    localStorage.setItem('cbctrack_consent_date', new Date().toISOString());
    
    setIsVisible(false);
    onAccept?.();
  };

  const handleCustomAccept = () => {
    // Require at least privacy and terms
    if (!acceptedConsents.privacy || !acceptedConsents.terms) {
      alert('Privacy Policy and Terms of Service acceptance are required to use CBCTrack.');
      return;
    }

    localStorage.setItem('cbctrack_consent_accepted', 'true');
    localStorage.setItem('cbctrack_consent_version', '1.0');
    localStorage.setItem('cbctrack_consent_details', JSON.stringify(acceptedConsents));
    localStorage.setItem('cbctrack_consent_date', new Date().toISOString());
    
    setIsVisible(false);
    onAccept?.();
  };

  const handleDecline = () => {
    setIsVisible(false);
    onDecline?.();
    // Optionally redirect to a page explaining why consent is needed
    window.location.href = '/consent-required';
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
      >
        {/* Main Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {variant === 'compact' ? (
            // Compact Version
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Shield className="w-6 h-6 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    We use cookies and process data to improve your experience
                  </p>
                  <p className="text-xs text-gray-600">
                    By continuing, you agree to our{' '}
                    <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
                    {' '}and{' '}
                    <Link href="/terms" className="text-emerald-600 hover:underline">Terms</Link>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            // Full Version
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Privacy & Data Protection Notice
                    </h3>
                    <p className="text-gray-700 mb-3">
                      CBCTrack is committed to protecting your privacy and the privacy of student data. 
                      We process information to provide our school management services, including WhatsApp 
                      communications for parents, in compliance with Kenya's Data Protection Act and GDPR.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                        <span>Secure student data management</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MessageCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                        <span>WhatsApp parent communications (with consent)</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <FileText className="w-4 h-4 text-emerald-600 mt-0.5" />
                        <span>Academic progress tracking</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-emerald-600 mt-0.5" />
                        <span>GDPR & Kenya Data Protection Act compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDecline}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-4 text-sm">
                  <Link 
                    href="/privacy" 
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    href="/terms" 
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                    target="_blank"
                  >
                    Terms & Conditions
                  </Link>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-gray-600 hover:text-gray-800 underline"
                  >
                    {showDetails ? 'Hide' : 'Show'} Details
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleDecline}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Consent Options */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200 bg-gray-50"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Customize Your Privacy Preferences
                </h4>
                
                <div className="space-y-4">
                  {/* Required Consents */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Required (Cannot be disabled)</h5>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                        <input
                          type="checkbox"
                          id="privacy-required"
                          checked={true}
                          disabled
                          className="mt-1 w-4 h-4 text-emerald-600"
                        />
                        <div className="flex-1">
                          <label htmlFor="privacy-required" className="font-medium text-gray-900">
                            Privacy Policy & Essential Services
                          </label>
                          <p className="text-sm text-gray-600">
                            Required for basic platform functionality, data security, and legal compliance. 
                            Includes processing student academic data and secure authentication.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                        <input
                          type="checkbox"
                          id="terms-required"
                          checked={true}
                          disabled
                          className="mt-1 w-4 h-4 text-emerald-600"
                        />
                        <div className="flex-1">
                          <label htmlFor="terms-required" className="font-medium text-gray-900">
                            Terms and Conditions
                          </label>
                          <p className="text-sm text-gray-600">
                            Acceptance of our terms is required to use the CBCTrack platform and ensures 
                            proper usage of our school management services.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Optional Consents */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Optional Features</h5>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                        <input
                          type="checkbox"
                          id="whatsapp-consent"
                          checked={acceptedConsents.whatsapp}
                          onChange={(e) => setAcceptedConsents(prev => ({ 
                            ...prev, 
                            whatsapp: e.target.checked 
                          }))}
                          className="mt-1 w-4 h-4 text-emerald-600"
                        />
                        <div className="flex-1">
                          <label htmlFor="whatsapp-consent" className="font-medium text-gray-900">
                            WhatsApp Business API Communications
                          </label>
                          <p className="text-sm text-gray-600">
                            Allow us to send academic reports, school announcements, and important updates 
                            via WhatsApp. Processed through certified Business Solution Providers with GDPR compliance.
                          </p>
                          <p className="text-xs text-emerald-600 mt-1">
                            ✓ Can be disabled anytime • ✓ Only pre-approved educational content • ✓ No marketing messages
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                        <input
                          type="checkbox"
                          id="analytics-consent"
                          checked={acceptedConsents.analytics}
                          onChange={(e) => setAcceptedConsents(prev => ({ 
                            ...prev, 
                            analytics: e.target.checked 
                          }))}
                          className="mt-1 w-4 h-4 text-emerald-600"
                        />
                        <div className="flex-1">
                          <label htmlFor="analytics-consent" className="font-medium text-gray-900">
                            Analytics and Service Improvement
                          </label>
                          <p className="text-sm text-gray-600">
                            Help us improve CBCTrack by sharing anonymized usage data and performance metrics. 
                            No personal or student data is included in analytics.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Specific Notice */}
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <h6 className="font-medium text-green-900 mb-2">
                      📱 WhatsApp Business API Compliance
                    </h6>
                    <p className="text-sm text-green-800">
                      Our WhatsApp integration complies with Meta's Business Terms and GDPR requirements. 
                      Messages are processed through certified Business Solution Providers with appropriate 
                      Data Processing Agreements. You can opt-out anytime by contacting your school or us directly.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCustomAccept}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}