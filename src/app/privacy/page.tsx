import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | CBCTrack - School Management System",
  description: "Learn how CBCTrack protects your school's data and student information. Comprehensive privacy policy covering data collection, WhatsApp communications, and GDPR compliance.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = "January 15, 2025";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              CBCTrack School Management System
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Introduction</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                CBCTrack Solutions ("we," "our," or "us") operates the CBCTrack school management platform 
                ("Service") designed specifically for Kenya's Competency-Based Curriculum (CBC) implementation. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you use our Service.
              </p>
              <p>
                We are committed to protecting the privacy and security of student data, parent information, 
                and school administrative data in compliance with applicable laws including the Data Protection 
                Act 2019 (Kenya), GDPR requirements, and WhatsApp Business API terms.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-semibold text-blue-900">Important for Parents and Guardians:</p>
                <p className="text-blue-800">
                  Your child's educational data is protected under strict privacy standards. We only process 
                  student information for legitimate educational purposes with appropriate consent.
                </p>
              </div>
            </div>
          </section>

          {/* Data We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">2.1 Student Information</h3>
            <div className="space-y-4 text-gray-700 mb-6">
              <p>With appropriate consent from schools and parents/guardians, we collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Basic Student Data:</strong> Full name, admission number, date of birth, class/grade level, parent/guardian contact information</li>
                <li><strong>Academic Records:</strong> Assessment scores, competency achievements, attendance records, CBC skill progressions</li>
                <li><strong>Communication Data:</strong> Parent phone numbers for WhatsApp notifications, communication preferences</li>
                <li><strong>Health & Emergency:</strong> Medical information relevant to school safety, emergency contact details</li>
                <li><strong>Disciplinary Records:</strong> Behavioral observations, disciplinary actions (kept confidential and secure)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">2.2 School Administrative Data</h3>
            <div className="space-y-4 text-gray-700 mb-6">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>User Accounts:</strong> Teacher and administrator login credentials, roles, and permissions</li>
                <li><strong>Financial Information:</strong> Fee structures, payment records, invoice data (encrypted and secure)</li>
                <li><strong>Institutional Data:</strong> School registration details, curriculum settings, term structures</li>
                <li><strong>Usage Analytics:</strong> System usage patterns, feature utilization (anonymized where possible)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">2.3 WhatsApp Communication Data</h3>
            <div className="space-y-4 text-gray-700">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">WhatsApp Business API Compliance:</p>
                <p className="text-green-800">
                  We use WhatsApp Business API through certified Business Solution Providers (BSPs) to ensure 
                  GDPR compliance and data security standards.
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Contact Information:</strong> Parent/guardian phone numbers for WhatsApp delivery</li>
                <li><strong>Message Content:</strong> Academic reports, school announcements, fee notifications</li>
                <li><strong>Delivery Status:</strong> Message delivery confirmations, read receipts (if enabled)</li>
                <li><strong>Opt-in Records:</strong> Consent records for WhatsApp communications</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. How We Use Your Information</h2>
            <div className="space-y-6 text-gray-700">
              <h3 className="text-xl font-semibold text-gray-900">3.1 Educational Purposes</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Track student progress and competency achievements in CBC curriculum</li>
                <li>Generate academic reports and transcripts</li>
                <li>Monitor attendance and behavioral patterns</li>
                <li>Facilitate parent-teacher communication</li>
                <li>Manage school administrative functions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">3.2 Communication and Notifications</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Send academic results and progress reports via WhatsApp</li>
                <li>Deliver important school announcements and notices</li>
                <li>Share fee statements and payment reminders</li>
                <li>Provide emergency communications</li>
                <li>Send educational resources and updates</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">3.3 System Administration</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintain system security and prevent unauthorized access</li>
                <li>Provide technical support and customer service</li>
                <li>Improve our services through analytics (anonymized)</li>
                <li>Ensure compliance with educational regulations</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. How We Share Your Information</h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="font-semibold text-red-900">Important: We Never Sell Student Data</p>
                <p className="text-red-800">
                  We do not sell, rent, or trade student information or any personal data to third parties for marketing or commercial purposes.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6">4.1 Authorized Sharing</h3>
              <p>We may share information only in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>School Personnel:</strong> Teachers, administrators, and authorized staff for educational purposes</li>
                <li><strong>Parents/Guardians:</strong> Information about their own child only</li>
                <li><strong>Ministry of Education:</strong> When required by law for educational reporting</li>
                <li><strong>Service Providers:</strong> Certified WhatsApp Business Solution Providers, secure cloud hosting services (with strict data processing agreements)</li>
                <li><strong>Legal Requirements:</strong> When required by court order or legal obligation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">4.2 WhatsApp Data Processing</h3>
              <p>
                For WhatsApp communications, we work exclusively with certified Business Solution Providers (BSPs) 
                who maintain GDPR compliance and appropriate Data Processing Agreements (DPAs). WhatsApp acts as 
                our processor, and we remain the data controller responsible for your information.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Data Security</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-semibold text-gray-900">5.1 Technical Safeguards</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Encryption:</strong> All data transmitted and stored is encrypted using industry-standard protocols</li>
                <li><strong>Access Controls:</strong> Role-based access ensuring users only see appropriate information</li>
                <li><strong>Secure Infrastructure:</strong> SOC 2 certified cloud hosting with regular security audits</li>
                <li><strong>Backup Systems:</strong> Automated, encrypted backups with disaster recovery procedures</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">5.2 Administrative Safeguards</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Regular staff training on data privacy and security protocols</li>
                <li>Incident response procedures for any potential data breaches</li>
                <li>Regular security assessments and vulnerability testing</li>
                <li>Strict vendor vetting for all third-party services</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-6">
                <p className="font-semibold text-yellow-900">Data Breach Notification:</p>
                <p className="text-yellow-800">
                  In the unlikely event of a data breach affecting personal information, we will notify 
                  affected schools and relevant authorities within 72 hours as required by law.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Your Privacy Rights</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-semibold text-gray-900">6.1 Parent/Guardian Rights</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request access to your child's information stored in our system</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of information (subject to educational record requirements)</li>
                <li><strong>Portability:</strong> Request a copy of your child's data in a portable format</li>
                <li><strong>Communication Preferences:</strong> Opt-in or opt-out of WhatsApp communications</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">6.2 School Administrator Rights</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Export all school data from the platform</li>
                <li>Control user access and permissions</li>
                <li>Manage consent settings for student communications</li>
                <li>Request data deletion upon service termination</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">6.3 How to Exercise Your Rights</h3>
              <p>To exercise any of these rights, contact us at:</p>
              <div className="bg-gray-100 p-4 rounded mt-4">
                <p><strong>Email:</strong> privacy@cbctrack.com</p>
                <p><strong>Phone:</strong> +254 701 838 713</p>
                <p><strong>Response Time:</strong> We will respond within 30 days of receiving your request</p>
              </div>
            </div>
          </section>

          {/* WhatsApp Specific */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. WhatsApp Communications</h2>
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-semibold text-gray-900">7.1 Consent and Opt-in</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>WhatsApp communications require explicit opt-in consent from parents/guardians</li>
                <li>Schools must obtain consent before enabling WhatsApp notifications for students</li>
                <li>You can withdraw consent at any time by contacting your school or us directly</li>
                <li>Opt-out requests are processed immediately</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">7.2 Message Types</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Academic Notifications:</strong> Results, progress reports, assessment updates</li>
                <li><strong>Administrative:</strong> Fee statements, important school announcements</li>
                <li><strong>Emergency:</strong> Urgent safety or security communications</li>
                <li><strong>Educational:</strong> CBC resources, learning materials (with consent)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">7.3 WhatsApp Data Processing</h3>
              <p>
                We use WhatsApp Business API in compliance with their terms and GDPR requirements. 
                Messages are processed through certified Business Solution Providers with appropriate 
                data processing agreements in place. WhatsApp may process message metadata according 
                to their privacy policy.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Data Retention</h2>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Student Academic Records:</strong> Retained for 7 years after graduation as required by education regulations</li>
                <li><strong>Financial Records:</strong> Retained for 7 years for tax and audit purposes</li>
                <li><strong>Communication Logs:</strong> WhatsApp delivery logs retained for 1 year</li>
                <li><strong>System Logs:</strong> Security and access logs retained for 2 years</li>
                <li><strong>User Accounts:</strong> Deleted within 30 days of account termination</li>
              </ul>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-6">
                <p className="font-semibold text-blue-900">Graduation and Transfer:</p>
                <p className="text-blue-800">
                  When students graduate or transfer, their academic records are archived securely and 
                  made available to authorized personnel or new institutions as legally required.
                </p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Children's Privacy Protection</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We take special care to protect the privacy of children under 18. Our service is designed 
                specifically for educational institutions and requires appropriate consent from schools and 
                parents/guardians before processing any student information.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-6">Special Protections:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>No direct marketing or advertising to students</li>
                <li>Limited data collection to educational purposes only</li>
                <li>Enhanced security measures for student data</li>
                <li>Parental control over communication preferences</li>
                <li>Immediate response to parental concerns or requests</li>
              </ul>
            </div>
          </section>

          {/* International Transfers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">10. International Data Transfers</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Our primary data storage and processing occurs within Kenya or in facilities with adequate 
                data protection standards. Any international transfers are conducted with appropriate 
                safeguards including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Standard Contractual Clauses (SCCs) for GDPR compliance</li>
                <li>Adequacy decisions where applicable</li>
                <li>Binding corporate rules for service providers</li>
                <li>Additional security measures for sensitive educational data</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Contact Us</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">CBCTrack Solutions - Privacy Team</h3>
                <p><strong>Email:</strong> privacy@cbctrack.com</p>
                <p><strong>Phone:</strong> +254 701 838 713</p>
                <p><strong>Address:</strong> Nairobi, Kenya</p>
                <p><strong>Business Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM EAT</p>
                <p className="mt-4"><strong>Data Protection Officer:</strong> Available for schools requiring GDPR compliance support</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-6">
                <p className="font-semibold text-green-900">Quick Response Guarantee:</p>
                <p className="text-green-800">
                  Privacy-related inquiries receive priority response within 24 hours. 
                  Urgent concerns (data breaches, unauthorized access) are addressed immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Policy Updates</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices, 
                technology, legal requirements, or other factors. We will notify schools and users 
                of any material changes through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email notifications to school administrators</li>
                <li>In-app notifications within the CBCTrack platform</li>
                <li>Updates posted on our website</li>
                <li>WhatsApp notifications for communication preference changes</li>
              </ul>
              
              <p className="mt-4">
                Material changes will take effect 30 days after notification, giving schools and 
                parents time to review and respond to any changes.
              </p>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Link 
                href="/terms" 
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View Terms and Conditions →
              </Link>
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-700"
              >
                ← Back to CBCTrack Home
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}