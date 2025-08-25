'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ConsentContextType {
  isConsentGiven: boolean;
  consentDetails: ConsentDetails | null;
  showConsentBanner: boolean;
  showConsentModal: boolean;
  giveConsent: (details: ConsentDetails) => void;
  withdrawConsent: () => void;
  updateConsent: (updates: Partial<ConsentDetails>) => void;
  checkConsentStatus: () => void;
}

interface ConsentDetails {
  privacy: boolean;
  terms: boolean;
  whatsapp: boolean;
  analytics: boolean;
  parentConsent?: boolean;
  version: string;
  date: string;
  ipAddress?: string;
  userAgent?: string;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

interface ConsentProviderProps {
  children: ReactNode;
  requireConsent?: boolean;
  consentVersion?: string;
}

export function ConsentProvider({ 
  children, 
  requireConsent = true, 
  consentVersion = '1.0' 
}: ConsentProviderProps) {
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [consentDetails, setConsentDetails] = useState<ConsentDetails | null>(null);
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);

  useEffect(() => {
    checkConsentStatus();
  }, [consentVersion]);

  const checkConsentStatus = () => {
    try {
      const consentAccepted = localStorage.getItem('cbctrack_consent_accepted');
      const storedVersion = localStorage.getItem('cbctrack_consent_version');
      const storedDetails = localStorage.getItem('cbctrack_consent_details');
      
      if (consentAccepted === 'true' && storedVersion === consentVersion && storedDetails) {
        const details = JSON.parse(storedDetails);
        setConsentDetails(details);
        setIsConsentGiven(true);
        setShowConsentBanner(false);
        setShowConsentModal(false);
      } else if (requireConsent) {
        // Show consent UI if required and not given or version mismatch
        setIsConsentGiven(false);
        setShowConsentBanner(true);
        
        // Show modal for first-time users or major policy updates
        const isFirstVisit = !localStorage.getItem('cbctrack_consent_accepted');
        const isPolicyUpdate = storedVersion && storedVersion !== consentVersion;
        
        if (isFirstVisit || isPolicyUpdate) {
          setShowConsentModal(true);
          setShowConsentBanner(false);
        }
      } else {
        // Consent not required
        setIsConsentGiven(true);
        setShowConsentBanner(false);
        setShowConsentModal(false);
      }
    } catch (error) {
      console.error('Error checking consent status:', error);
      if (requireConsent) {
        setShowConsentBanner(true);
      }
    }
  };

  const giveConsent = (details: ConsentDetails) => {
    try {
      const consentRecord = {
        ...details,
        version: consentVersion,
        date: new Date().toISOString(),
        ipAddress: '', // Should be captured server-side for privacy
        userAgent: navigator.userAgent
      };

      localStorage.setItem('cbctrack_consent_accepted', 'true');
      localStorage.setItem('cbctrack_consent_version', consentVersion);
      localStorage.setItem('cbctrack_consent_details', JSON.stringify(consentRecord));
      localStorage.setItem('cbctrack_consent_date', consentRecord.date);

      setConsentDetails(consentRecord);
      setIsConsentGiven(true);
      setShowConsentBanner(false);
      setShowConsentModal(false);

      // Send consent record to server for audit trail
      sendConsentToServer(consentRecord);

      // Track consent for analytics (if analytics consent given)
      if (details.analytics) {
        trackConsentEvent('consent_given', consentRecord);
      }

    } catch (error) {
      console.error('Error saving consent:', error);
    }
  };

  const withdrawConsent = () => {
    try {
      localStorage.removeItem('cbctrack_consent_accepted');
      localStorage.removeItem('cbctrack_consent_version');
      localStorage.removeItem('cbctrack_consent_details');
      localStorage.removeItem('cbctrack_consent_date');

      setConsentDetails(null);
      setIsConsentGiven(false);
      
      // Send withdrawal notice to server
      sendConsentWithdrawalToServer();

      if (requireConsent) {
        setShowConsentBanner(true);
      }

      // Track withdrawal for audit purposes
      trackConsentEvent('consent_withdrawn', null);

    } catch (error) {
      console.error('Error withdrawing consent:', error);
    }
  };

  const updateConsent = (updates: Partial<ConsentDetails>) => {
    if (!consentDetails) return;

    try {
      const updatedDetails = {
        ...consentDetails,
        ...updates,
        version: consentVersion,
        date: new Date().toISOString()
      };

      localStorage.setItem('cbctrack_consent_details', JSON.stringify(updatedDetails));
      localStorage.setItem('cbctrack_consent_date', updatedDetails.date);

      setConsentDetails(updatedDetails);

      // Send updated consent to server
      sendConsentToServer(updatedDetails);

      // Track update for audit purposes
      if (updatedDetails.analytics) {
        trackConsentEvent('consent_updated', updatedDetails);
      }

    } catch (error) {
      console.error('Error updating consent:', error);
    }
  };

  const sendConsentToServer = async (consent: ConsentDetails) => {
    try {
      // This would send to your backend API for audit logging
      await fetch('/api/consent/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consent,
          timestamp: new Date().toISOString(),
          // Include session info if available
        }),
      });
    } catch (error) {
      console.error('Failed to send consent record to server:', error);
      // Handle gracefully - don't block user flow
    }
  };

  const sendConsentWithdrawalToServer = async () => {
    try {
      await fetch('/api/consent/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to send consent withdrawal to server:', error);
    }
  };

  const trackConsentEvent = (event: string, details: ConsentDetails | null) => {
    try {
      // Only track if analytics consent is given
      if (details?.analytics || event === 'consent_withdrawn') {
        // Send to analytics service (e.g., Google Analytics, Mixpanel)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', event, {
            event_category: 'consent',
            event_label: consentVersion,
            consent_details: details ? Object.keys(details).filter(k => details[k as keyof ConsentDetails]).join(',') : 'withdrawn'
          });
        }
      }
    } catch (error) {
      console.error('Error tracking consent event:', error);
    }
  };

  const contextValue: ConsentContextType = {
    isConsentGiven,
    consentDetails,
    showConsentBanner,
    showConsentModal,
    giveConsent,
    withdrawConsent,
    updateConsent,
    checkConsentStatus,
  };

  return (
    <ConsentContext.Provider value={contextValue}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}

// Utility functions for checking specific consents
export function useWhatsAppConsent() {
  const { consentDetails } = useConsent();
  return consentDetails?.whatsapp || false;
}

export function useAnalyticsConsent() {
  const { consentDetails } = useConsent();
  return consentDetails?.analytics || false;
}

export function useParentConsent() {
  const { consentDetails } = useConsent();
  return consentDetails?.parentConsent || false;
}