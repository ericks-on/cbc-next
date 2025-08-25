import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | CBCTrack - School Management System",
  description: "Terms and Conditions for using CBCTrack school management platform. Learn about user responsibilities, service limitations, and legal agreements for schools in Kenya.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditions() {
  const lastUpdated = "January 15, 2025";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms and Conditions
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Agreement to Terms</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                These Terms and Conditions ("Terms") constitute a legally binding agreement between CBCTrack Solutions 
                ("Company," "we," "our," or "us") and the educational institution ("School," "you," or "your") 
                using our CBCTrack school management platform ("Service").
              </p>
              <p>
                By accessing or using our Service, you acknowledge that you have read, understood, and agree to be 
                bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not 
                access or use our Service.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-semibold text-blue-900">Important:</p>
                <p className="text-blue-800">
                  These Terms apply to all users of the CBCTrack platform including school administrators, 
                  teachers, staff, and parents/guardians accessing the system.
                </p>
              </div>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Description of Service</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                CBCTrack is a comprehensive school management platform specifically designed for Kenya's 
                Competency-Based Curriculum (CBC) implementation. Our Service includes:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900">2.1 Core Features</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Student information management and CBC progress tracking</li>
                <li>Assessment management for formative and summative evaluations</li>
                <li>Fee management and financial record keeping</li>
                <li>Parent communication via WhatsApp Business API integration</li>
                <li>Report generation and academic analytics</li>
                <li>User role management and access controls</li>
                <li>Attendance tracking and behavioral records</li>
                <li>Curriculum management aligned with KICD standards</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">2.2 Service Availability</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Target uptime: 99.9% availability</li>
                <li>Scheduled maintenance windows communicated 48 hours in advance</li>
                <li>24/7 technical support for critical issues</li>
                <li>Data backup and disaster recovery systems</li>
              </ul>
            </div>
          </section>

          {/* User Accounts */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. User Accounts and Responsibilities</h2>
            <div className="space-y-6 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">3.1 Account Registration</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Schools must provide accurate and complete information during registration</li>
                <li>Each school is responsible for maintaining the security of their account credentials</li>
                <li>Schools must promptly update account information when changes occur</li>
                <li>Multiple user accounts may be created under the school's primary account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">3.2 User Roles and Access</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>School Administrators:</strong> Full system access and user management rights</li>
                <li><strong>Teachers:</strong> Access to assigned classes and student information</li>
                <li><strong>Staff:</strong> Limited access based on assigned roles</li>
                <li><strong>Parents/Guardians:</strong> Access only to their child's information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">3.3 User Responsibilities</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="font-semibold text-yellow-900">Schools are responsible for:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-yellow-800">
                  <li>Ensuring all users receive appropriate training on the system</li>
                  <li>Obtaining necessary consent from parents for data processing and WhatsApp communications</li>
                  <li>Maintaining data accuracy and promptly reporting any errors</li>
                  <li>Complying with all applicable education and data protection laws</li>
                  <li>Securing account credentials and reporting suspected unauthorized access</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data and Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Data Ownership and Privacy</h2>
            <div className="space-y-4 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">4.1 Data Ownership</h3>
              <p>
                Schools retain full ownership of all student data, academic records, and institutional 
                information entered into the CBCTrack system. We act as a data processor, not a data owner.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">4.2 Data Processing</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We process data solely for providing the contracted services</li>
                <li>Data processing complies with Kenya's Data Protection Act 2019 and GDPR requirements</li>
                <li>We implement appropriate technical and organizational security measures</li>
                <li>Data processing agreements are established with all third-party service providers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">4.3 WhatsApp Communications</h3>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-semibold text-green-900">WhatsApp Business API Terms:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-green-800">
                  <li>Schools must obtain explicit consent from parents before enabling WhatsApp notifications</li>
                  <li>Only pre-approved message templates are used for automated communications</li>
                  <li>Parents can opt-out of WhatsApp communications at any time</li>
                  <li>WhatsApp data processing complies with Meta's Business Terms and our Privacy Policy</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Acceptable Use Policy</h2>
            <div className="space-y-6 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">5.1 Permitted Uses</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Managing student academic records and CBC competency tracking</li>
                <li>Facilitating legitimate parent-school communication</li>
                <li>Generating academic reports and institutional analytics</li>
                <li>Managing school financial operations and fee collection</li>
                <li>Supporting administrative and operational school functions</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">5.2 Prohibited Uses</h3>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="font-semibold text-red-900">You may NOT use the Service to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-red-800">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Send spam, unsolicited communications, or marketing messages via WhatsApp</li>
                  <li>Store or transmit malicious code, viruses, or harmful content</li>
                  <li>Attempt to gain unauthorized access to other accounts or systems</li>
                  <li>Use the platform for any purpose other than legitimate educational activities</li>
                  <li>Share login credentials with unauthorized individuals</li>
                  <li>Reverse engineer, copy, or create derivative works of our software</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Payment and Subscription Terms</h2>
            <div className="space-y-6 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">6.1 Subscription Plans</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Subscription fees are based on the number of students and selected features</li>
                <li>Annual subscriptions receive preferential pricing</li>
                <li>Custom enterprise pricing available for large institutions</li>
                <li>WhatsApp messaging fees may apply based on usage volumes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">6.2 Payment Terms</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Subscription fees are payable in advance</li>
                <li>Payment methods: Bank transfer, mobile money (M-Pesa), credit card</li>
                <li>Late payment may result in service suspension after 30-day grace period</li>
                <li>Refunds are provided only in cases of service failure or billing errors</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">6.3 Price Changes</h3>
              <p>
                We reserve the right to modify subscription prices with 90 days advance notice. 
                Existing subscribers maintain their current pricing until the end of their current 
                subscription period.
              </p>
            </div>
          </section>

          {/* Service Level Agreement */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Service Level Agreement</h2>
            <div className="space-y-4 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">7.1 Availability Commitment</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Uptime Target:</strong> 99.9% monthly availability</li>
                <li><strong>Scheduled Maintenance:</strong> Maximum 4 hours per month, with advance notice</li>
                <li><strong>Performance:</strong> Page load times under 3 seconds for standard operations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">7.2 Support Services</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Technical Support:</strong> Available Monday-Friday, 8 AM-6 PM EAT</li>
                <li><strong>Emergency Support:</strong> 24/7 for critical system failures</li>
                <li><strong>Response Times:</strong> Critical issues within 2 hours, other issues within 24 hours</li>
                <li><strong>Training:</strong> User training sessions available upon request</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">7.3 Service Credits</h3>
              <p>
                If monthly uptime falls below 99%, schools may be eligible for service credits 
                equivalent to pro-rated subscription fees for the downtime period.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Intellectual Property Rights</h2>
            <div className="space-y-4 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">8.1 Our Rights</h3>
              <p>
                CBCTrack retains all right, title, and interest in and to the Service, including all 
                software, technology, designs, and documentation. Schools receive only a limited, 
                non-exclusive, non-transferable license to use the Service.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">8.2 School's Rights</h3>
              <p>
                Schools retain full ownership of all content, data, and information uploaded to or 
                created within the CBCTrack platform. We claim no ownership rights to your data.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">8.3 License Grant</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Schools grant us a limited license to host, process, and transmit their data solely to provide the Service</li>
                <li>This license terminates upon service discontinuation or data deletion</li>
                <li>We may use aggregated, anonymized data for service improvement purposes</li>
              </ul>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Termination</h2>
            <div className="space-y-6 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">9.1 Termination by School</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Schools may terminate their subscription at any time with 30 days notice</li>
                <li>Data export features are available for 90 days after termination</li>
                <li>Prepaid fees for unused periods are not refundable unless required by law</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">9.2 Termination by CBCTrack</h3>
              <p>We may terminate or suspend service immediately if:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Payment is overdue by more than 60 days</li>
                <li>The school violates these Terms or our Acceptable Use Policy</li>
                <li>We receive legal requirements to discontinue service</li>
                <li>The school engages in activities that harm our systems or other users</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">9.3 Effect of Termination</h3>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-semibold text-blue-900">Upon termination:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-blue-800">
                  <li>Access to the Service will cease immediately</li>
                  <li>Schools have 90 days to export their data</li>
                  <li>We will securely delete all school data after the retention period</li>
                  <li>WhatsApp communications will be discontinued</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Liability and Warranties */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Warranties and Disclaimers</h2>
            <div className="space-y-6 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">10.1 Service Warranties</h3>
              <p>We warrant that the Service will:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Function substantially as described in our documentation</li>
                <li>Be provided using commercially reasonable skill and care</li>
                <li>Comply with applicable laws and regulations</li>
                <li>Maintain appropriate security measures for data protection</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">10.2 Disclaimers</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="font-semibold text-yellow-900">Important Limitations:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-yellow-800">
                  <li>The Service is provided "as is" without additional warranties</li>
                  <li>We do not guarantee uninterrupted or error-free operation</li>
                  <li>Schools are responsible for data backup and recovery planning</li>
                  <li>We are not responsible for issues caused by third-party services (including WhatsApp)</li>
                  <li>Internet connectivity and technical infrastructure are the school's responsibility</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">11.1 Liability Caps</h3>
              <p>
                Our total liability to any school for any claims arising from or related to the Service 
                shall not exceed the total amount paid by the school for the Service in the 12 months 
                preceding the claim.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">11.2 Excluded Damages</h3>
              <p>
                We shall not be liable for indirect, incidental, special, consequential, or punitive 
                damages, including but not limited to loss of profits, data, or business opportunities.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">11.3 Exceptions</h3>
              <p>These limitations do not apply to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our gross negligence or willful misconduct</li>
                <li>Data breaches caused by our failure to implement reasonable security measures</li>
                <li>Violations of applicable data protection laws</li>
                <li>Claims that cannot be limited by law</li>
              </ul>
            </div>
          </section>

          {/* Indemnification */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Indemnification</h2>
            <div className="space-y-4 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">12.1 School Indemnification</h3>
              <p>Schools agree to indemnify and hold CBCTrack harmless from claims arising from:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of these Terms or applicable laws</li>
                <li>Unauthorized use of the Service</li>
                <li>Failure to obtain required consents for data processing or WhatsApp communications</li>
                <li>Content or data uploaded by the school or its users</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">12.2 Our Indemnification</h3>
              <p>We will defend schools against claims that the Service infringes third-party intellectual property rights, provided the school:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Promptly notifies us of the claim</li>
                <li>Allows us to control the defense and settlement</li>
                <li>Provides reasonable cooperation in the defense</li>
              </ul>
            </div>
          </section>

          {/* Force Majeure */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">13. Force Majeure</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Neither party will be liable for any delay or failure to perform resulting from causes 
                beyond their reasonable control, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Natural disasters, pandemics, or public health emergencies</li>
                <li>Government actions, laws, or regulations</li>
                <li>Internet service provider failures or cyber attacks</li>
                <li>Labor strikes or supply chain disruptions</li>
                <li>Third-party service failures (including WhatsApp or hosting providers)</li>
              </ul>
              
              <p className="mt-4">
                If a force majeure event continues for more than 60 days, either party may terminate 
                the agreement with written notice.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">14. Governing Law and Dispute Resolution</h2>
            <div className="space-y-6 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">14.1 Governing Law</h3>
              <p>
                These Terms are governed by the laws of Kenya. Any disputes will be subject to the 
                exclusive jurisdiction of the courts in Nairobi, Kenya.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">14.2 Dispute Resolution</h3>
              <p>Before pursuing legal action, parties agree to attempt resolution through:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Direct Negotiation:</strong> Good faith discussions for 30 days</li>
                <li><strong>Mediation:</strong> If negotiation fails, mediation through a mutually agreed mediator</li>
                <li><strong>Arbitration:</strong> Binding arbitration under Kenyan arbitration law if mediation fails</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">14.3 Emergency Relief</h3>
              <p>
                Either party may seek injunctive or emergency relief in court to prevent irreparable harm 
                while dispute resolution is pending.
              </p>
            </div>
          </section>

          {/* General Provisions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">15. General Provisions</h2>
            <div className="space-y-6 text-gray-700">
              
              <h3 className="text-xl font-semibold text-gray-900">15.1 Amendment</h3>
              <p>
                We may modify these Terms with 30 days advance notice. Continued use of the Service 
                after the effective date constitutes acceptance of the modified Terms.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">15.2 Assignment</h3>
              <p>
                Schools may not assign these Terms without our written consent. We may assign these 
                Terms in connection with a merger, acquisition, or sale of assets.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">15.3 Severability</h3>
              <p>
                If any provision of these Terms is found unenforceable, the remaining provisions 
                will remain in full force and effect.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">15.4 Entire Agreement</h3>
              <p>
                These Terms, together with our Privacy Policy and any applicable Order Forms, 
                constitute the entire agreement between the parties and supersede all prior agreements.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">16. Contact Information</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                For questions about these Terms or to report violations, contact us:
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">CBCTrack Solutions - Legal Department</h3>
                <p><strong>Email:</strong> legal@cbctrack.com</p>
                <p><strong>Phone:</strong> +254 701 838 713</p>
                <p><strong>Address:</strong> Nairobi, Kenya</p>
                <p><strong>Business Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM EAT</p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded mt-6">
                <p className="font-semibold text-emerald-900">Customer Success:</p>
                <p className="text-emerald-800">
                  For service-related inquiries, technical support, or account management, 
                  contact our customer success team at support@cbctrack.com
                </p>
              </div>
            </div>
          </section>

          {/* Effective Date */}
          <section className="mb-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Effective Date</h3>
              <p className="text-gray-700">
                These Terms and Conditions are effective as of {lastUpdated} and apply to all 
                new and existing CBCTrack users. Previous versions of these Terms are superseded 
                by this version.
              </p>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <Link 
                href="/privacy" 
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View Privacy Policy →
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