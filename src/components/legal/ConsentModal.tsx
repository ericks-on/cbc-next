'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, MessageCircle, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: (consents: ConsentOptions) => void;
  type?: 'first-time' | 'whatsapp-specific' | 'policy-update';
  schoolName?: string;
}

interface ConsentOptions {
  privacy: boolean;
  terms: boolean;
  whatsapp: boolean;
  analytics: boolean;
  parentConsent?: boolean; // For WhatsApp parent communications
}

export default function ConsentModal({ 
  isOpen, 
  onClose, 
  onAccept, 
  type = 'first-time',
  schoolName
}: ConsentModalProps) {
  const [step, setStep] = useState(1);
  const [consents, setConsents] = useState<ConsentOptions>({
    privacy: false,
    terms: false,
    whatsapp: false,
    analytics: false,
    parentConsent: false
  });

  const handleConsentChange = (key: keyof ConsentOptions, value: boolean) => {
    setConsents(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = consents.privacy && consents.terms;

  const handleAccept = () => {
    if (!canProceed) {
      alert('You must accept the Privacy Policy and Terms of Service to continue.');
      return;
    }
    
    onAccept(consents);
    onClose();
  };

  const getModalContent = () => {
    switch (type) {
      case 'whatsapp-specific':
        return {
          title: 'WhatsApp Communication Consent',
          subtitle: 'Enable parent notifications via WhatsApp',
          description: `${schoolName || 'Your school'} wants to send academic reports and important updates to parents via WhatsApp. This requires explicit consent in compliance with data protection laws.`
        };
      case 'policy-update':
        return {
          title: 'Updated Privacy Policy',
          subtitle: 'We\'ve updated our privacy practices',
          description: 'We\'ve made improvements to our privacy policy to better serve you. Please review and accept the updated terms.'
        };
      default:
        return {
          title: 'Welcome to CBCTrack',
          subtitle: 'Privacy & Data Protection Notice',
          description: 'Before you begin using CBCTrack, please review and accept our privacy and terms policies to ensure compliance with data protection laws.'
        };
    }
  };

  const content = getModalContent();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{content.title}</h2>
                    <p className="text-emerald-100 mt-1">{content.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
              {step === 1 ? (
                // Step 1: Introduction and Required Consents
                <div className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    {content.description}
                  </p>

                  {type === 'whatsapp-specific' && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                      <div className="flex items-start space-x-3">
                        <MessageCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-900">WhatsApp Business API Integration</h4>
                          <p className="text-green-800 text-sm mt-1">
                            Messages are sent through certified Business Solution Providers in compliance with 
                            GDPR and WhatsApp's Business Terms. Only pre-approved educational content is sent.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Required Consents */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Required Agreements</h3>
                    <div className="space-y-3">
                      <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consents.privacy}
                          onChange={(e) => handleConsentChange('privacy', e.target.checked)}
                          className="mt-1 w-4 h-4 text-emerald-600 rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Privacy Policy</div>
                          <p className="text-sm text-gray-600 mt-1">
                            I have read and accept the{' '}
                            <Link href="/privacy" target="_blank" className="text-emerald-600 hover:underline">
                              Privacy Policy
                            </Link>
                            , including how student data is processed and protected.
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consents.terms}
                          onChange={(e) => handleConsentChange('terms', e.target.checked)}
                          className="mt-1 w-4 h-4 text-emerald-600 rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">Terms and Conditions</div>
                          <p className="text-sm text-gray-600 mt-1">
                            I agree to the{' '}
                            <Link href="/terms" target="_blank" className="text-emerald-600 hover:underline">
                              Terms and Conditions
                            </Link>
                            {' '}governing the use of CBCTrack services.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Next Step Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!canProceed}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        canProceed
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Continue to Optional Settings
                    </button>
                  </div>
                </div>
              ) : (
                // Step 2: Optional Consents
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Optional Features</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      These features can be enabled now or later in your account settings.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* WhatsApp Consent */}
                    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consents.whatsapp}
                        onChange={(e) => handleConsentChange('whatsapp', e.target.checked)}
                        className="mt-1 w-4 h-4 text-emerald-600 rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-gray-900">WhatsApp Communications</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Receive academic reports, school announcements, and important updates via WhatsApp. 
                          Compliant with GDPR and processed through certified Business Solution Providers.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            ✓ Can be disabled anytime
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            ✓ No marketing messages
                          </span>
                        </div>
                      </div>
                    </label>

                    {/* Parent Consent for WhatsApp */}
                    {type === 'whatsapp-specific' && (
                      <label className="flex items-start space-x-3 p-4 border-2 border-orange-200 bg-orange-50 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consents.parentConsent}
                          onChange={(e) => handleConsentChange('parentConsent', e.target.checked)}
                          className="mt-1 w-4 h-4 text-orange-600 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                            <span className="font-medium text-orange-900">Parent/Guardian Consent</span>
                          </div>
                          <p className="text-sm text-orange-800 mt-1">
                            I confirm that I have obtained proper consent from parents/guardians to send 
                            their children's academic information and school updates via WhatsApp.
                          </p>
                        </div>
                      </label>
                    )}

                    {/* Analytics Consent */}
                    <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consents.analytics}
                        onChange={(e) => handleConsentChange('analytics', e.target.checked)}
                        className="mt-1 w-4 h-4 text-emerald-600 rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-gray-900">Service Improvement Analytics</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Help improve CBCTrack by sharing anonymized usage data. No personal or student 
                          information is included in analytics.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Legal Notice */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">Your Privacy Rights</h4>
                        <p className="text-blue-800 text-sm mt-1">
                          You can withdraw consent, request data deletion, or modify these preferences 
                          anytime by contacting us at privacy@cbctrack.com or through your account settings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              {step === 1 ? (
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Required agreements must be accepted to continue
                  </p>
                  <div className="text-sm text-gray-500">
                    Step 1 of 2
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <div className="flex items-center space-x-3">
                    <p className="text-sm text-gray-500">Step 2 of 2</p>
                    <button
                      onClick={handleAccept}
                      className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Complete Setup</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}