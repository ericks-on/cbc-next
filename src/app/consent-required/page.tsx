import type { Metadata } from "next";
import Link from "next/link";
import { Shield, AlertTriangle, ArrowLeft, MessageCircle } from 'lucide-react';
import ConsentButton from "@/components/legal/ConsentButton";

export const metadata: Metadata = {
  title: "Consent Required | CBCTrack",
  description: "CBCTrack requires your consent to process data and provide school management services in compliance with privacy laws.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConsentRequiredPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Icon and Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Consent Required
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your privacy matters to us
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow px-6 py-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Why We Need Your Consent</h3>
                <p className="text-sm text-gray-600 mt-1">
                  CBCTrack processes student data and educational information to provide school management services. 
                  Under Kenya&apos;s Data Protection Act and GDPR, we need your explicit consent.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MessageCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">WhatsApp Communications</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Our WhatsApp Business API integration requires explicit consent to send academic reports 
                  and school updates to parents in compliance with Meta&apos;s Business Terms.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Without Consent
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  We cannot provide our school management services or process any educational data 
                  without proper consent. This ensures we comply with all data protection laws.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">What happens when you give consent:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                Access to full CBCTrack platform features
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                Secure processing of student academic data
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                Optional WhatsApp notifications for parents
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                Full control over your data and privacy settings
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <ConsentButton />
              
              <div className="flex items-center justify-center space-x-4 text-sm">
                <Link 
                  href="/privacy" 
                  className="text-emerald-600 hover:text-emerald-500"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-300">|</span>
                <Link 
                  href="/terms" 
                  className="text-emerald-600 hover:text-emerald-500"
                  target="_blank"
                >
                  Terms & Conditions
                </Link>
              </div>
              
              <div className="pt-3">
                <Link 
                  href="/"
                  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-500"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Have questions about our privacy practices?</p>
          <p>
            Contact us at{' '}
            <a 
              href="mailto:privacy@cbctrack.com" 
              className="text-emerald-600 hover:text-emerald-500"
            >
              privacy@cbctrack.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}