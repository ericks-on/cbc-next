import { Feature, GalleryImage, Achievement } from '@/types';

export const FEATURES: Feature[] = [
  {
    id: 'comprehensive-system',
    title: 'CBCTrack: Comprehensive CBC Performance & School Administration',
    description: 'Efficiently manage all school operations through CBCTrack\'s integrated dashboards. Monitor fees, attendance, academic progress, and administrative tasks in one centralized platform.',
    icon: '📊',
    image: '/images/features/comprehensive_system.jpg',
    caption: 'Intuitive admin dashboard',
    highlights: [
      'Admin Dashboard: Track fee collections, student/teacher counts, and subscription details',
      'Parent Dashboard: View grades, disciplinary records, and student diaries',
      'Comprehensive Management: Oversee students, teachers, classes, and monitor academic performance with detailed grade tracking'
    ],
    details: [
      {
        icon: 'speedometer2',
        title: 'Admin Dashboard',
        description: 'A powerful and intuitive admin panel that provides real-time analytics and insights across all key institutional metrics. Track fee collection rates, monitor student enrollment trends, and manage staff activities efficiently.'
      },
      {
        icon: 'people',
        title: 'Student Profiles',
        description: 'Access dynamic and detailed student profiles that capture a 360-degree view of each learner. Includes academic performance history, daily attendance logs, behavior observations, and skill progression tracking.'
      },
      {
        icon: 'journal-check',
        title: 'Comprehensive Management',
        description: 'Gain full oversight of your institution with tools that empower you to manage students, teachers, and classes seamlessly. Monitor academic performance through advanced grade tracking.'
      }
    ]
  },
  {
    id: 'accounting-system',
    title: 'Streamline Fees, Invoices & Receipts with Ease',
    description: 'Our comprehensive accounting suite simplifies fee structure creation, invoice generation, payment tracking, and bulk document handling—tailored for institutions of all sizes.',
    icon: '💰',
    image: '/images/features/invoces.jpg',
    caption: 'Accounting management tools',
    highlights: [
      'Customizable fee structures per student, class, or group',
      'Automated invoice generation with bulk download support',
      'Real-time payment tracking and bulk receipt downloads'
    ],
    details: [
      {
        icon: 'cash-coin',
        title: 'Flexible Fee Structures',
        description: 'Create tailored fee plans for individuals, specific classes, or entire student groups. Include optional charges, recurring fees, discounts, and financial aid support.'
      },
      {
        icon: 'receipt',
        title: 'Invoice Management',
        description: 'Automatically generate invoices upon fee assignment. View, print, or download invoices in bulk, and customize them with institutional branding.'
      },
      {
        icon: 'wallet2',
        title: 'Fee Collection & Tracking',
        description: 'Track fee payments in real-time, view pending balances, and send automated payment reminders. Support for various payment modes.'
      }
    ]
  },
  {
    id: 'user-roles',
    title: 'Manage Roles & Permissions Across the System',
    description: 'Our platform provides robust role-based access control to ensure secure and structured interactions for administrators, teachers, parents, and staff.',
    icon: '👥',
    image: '/images/features/roles.png',
    caption: 'Individualized access and dashboards per user role',
    highlights: [
      'Separate portals for Admin, Teachers, Parents, and Staff',
      'Role assignment and permission customization',
      'Secure and limited access per user type'
    ],
    details: [
      {
        icon: 'shield-lock',
        title: 'Administrator',
        description: 'Full access to all system features, including management of users, curriculum, assessments, accounting, and reports.'
      },
      {
        icon: 'person-video2',
        title: 'Teacher',
        description: 'Access limited to their own classes. Teachers can manage student grades, record attendance, send diary entries, and perform assigned duties.'
      },
      {
        icon: 'people',
        title: 'Student / Parent',
        description: 'Parents and students can view academic performance, attendance records, diary entries, and discipline notes with real-time access.'
      }
    ]
  },
  {
    id: 'assessment-system',
    title: 'Support for Formative & Summative Evaluation',
    description: 'Empower educators and parents with real-time access to student progress using a holistic assessment platform. Track and report on both competency-based and national evaluations.',
    icon: '📝',
    image: '/images/features/assessment.png',
    caption: 'Assessment overview and reporting interface',
    highlights: [
      'Formative & summative tracking',
      'CBC-aligned competency monitoring',
      'Integrated parent access to grades and performance'
    ],
    details: [
      {
        icon: 'book-half',
        title: 'Formative Assessments',
        description: 'Daily assessments like class tasks, projects, and portfolios are recorded to measure learner progress and identify support needs early.'
      },
      {
        icon: 'clipboard-check',
        title: 'Summative Evaluation',
        description: 'Supports national-level assessments with structured reporting. Summative grades are integrated with school-based records.'
      },
      {
        icon: 'bar-chart-line',
        title: 'Competency Tracking',
        description: 'Track proficiency levels across key competencies using visual dashboards. Automatically compute performance trends across terms.'
      }
    ]
  },
  {
    id: 'whatsapp-communication',
    title: 'WhatsApp Parent Communication & Results Delivery',
    description: 'Keep parents engaged and informed through automated WhatsApp messaging. Send student results, progress reports, school announcements, and important documents directly to parents\' phones.',
    icon: '📱',
    image: '/images/features/whatsapp_communication.jpg',
    caption: 'WhatsApp integration for parent communication',
    highlights: [
      'Automated delivery of student results and report cards via WhatsApp',
      'Real-time progress updates and competency achievements',
      'School announcements, fee reminders, and important notices',
      'Secure document sharing including certificates and reports'
    ],
    details: [
      {
        icon: 'chat-dots',
        title: 'Automated Results Delivery',
        description: 'Student assessment results, report cards, and competency achievements are automatically sent to parents via WhatsApp immediately after teacher input, ensuring instant communication.'
      },
      {
        icon: 'graph-up-arrow',
        title: 'Progress Updates',
        description: 'Weekly and monthly progress summaries with detailed competency tracking, attendance updates, and personalized insights about each student\'s academic journey.'
      },
      {
        icon: 'megaphone',
        title: 'School Communications',
        description: 'Broadcast important school announcements, event notifications, fee reminders, and emergency alerts to all parents or specific groups instantly through WhatsApp.'
      },
      {
        icon: 'file-earmark-pdf',
        title: 'Document Sharing',
        description: 'Securely share reports, certificates, permission slips, and educational resources with parents through encrypted WhatsApp document delivery.'
      }
    ]
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gallery1',
    src: '/images/gallery/admin_dash.png',
    alt: 'Admin Dashboard Interface',
    title: 'Admin Dashboard',
    description: 'Intuitive management interface for educational administrators',
    category: 'admin'
  },
  {
    id: 'gallery2',
    src: '/images/gallery/timetable.png',
    alt: 'School Timetable',
    title: 'Timetable Management',
    description: 'Comprehensive scheduling system for classes and activities',
    category: 'admin',
    size: 'tall'
  },
  {
    id: 'gallery3',
    src: '/images/gallery/parent.png',
    alt: 'Parent Communication Portal',
    title: 'Parents Portal',
    description: 'Seamless communication between parents and educational institutions',
    category: 'admin',
    size: 'wide'
  },
  {
    id: 'gallery4',
    src: '/images/gallery/report_card.png',
    alt: 'Student Report Card',
    title: 'Report Card System',
    description: 'Comprehensive student performance reporting with competency tracking',
    category: 'reports'
  },
  {
    id: 'gallery5',
    src: '/images/gallery/assessment_report.png',
    alt: 'Formative Assessment Report',
    title: 'Formative Assessment',
    description: 'Detailed analytics for ongoing student progress evaluation',
    category: 'reports'
  },
  {
    id: 'gallery6',
    src: '/images/gallery/receipt_sample.png',
    alt: 'Receipt Sample',
    title: 'Receipt Management',
    description: 'Streamlined payment receipting and tracking system',
    category: 'finance',
    size: 'tall'
  },
  {
    id: 'gallery7',
    src: '/images/gallery/invoice_sample.png',
    alt: 'Invoice Sample',
    title: 'Invoice System',
    description: 'Professional invoicing solution for educational institutions',
    category: 'finance'
  },
  {
    id: 'gallery8',
    src: '/images/gallery/permission_page.png',
    alt: 'Permissions Management',
    title: 'Permissions Control',
    description: 'Advanced role-based access control for staff and administrators',
    category: 'admin'
  },
  {
    id: 'gallery9',
    src: '/images/gallery/expenses.png',
    alt: 'Expenses Management',
    title: 'Expenses Tracking',
    description: 'Comprehensive expense management with recurring payment tracking',
    category: 'finance',
    size: 'wide'
  },
  {
    id: 'gallery10',
    src: '/images/gallery/role_management.png',
    alt: 'Role Management System',
    title: 'Role Management',
    description: 'Comprehensive system for defining and assigning staff roles and responsibilities',
    category: 'admin'
  },
  {
    id: 'gallery11',
    src: '/images/gallery/assessment_management.png',
    alt: 'Assessment Management',
    title: 'Assessment Management',
    description: 'Powerful tools for creating, distributing and evaluating student assessments',
    category: 'assessment',
    size: 'tall'
  },
  {
    id: 'gallery12',
    src: '/images/gallery/grades_management.png',
    alt: 'Grade Management System',
    title: 'Grade Management',
    description: 'Intuitive interface for recording, analyzing and reporting student grades',
    category: 'assessment'
  },
  {
    id: 'gallery13',
    src: '/images/gallery/class_performance.png',
    alt: 'Performance Analytics Dashboard',
    title: 'Performance Analytics',
    description: 'Advanced data visualization and predictive insights for student and institutional performance',
    category: 'reports',
    size: 'wide'
  },
  {
    id: 'gallery14',
    src: '/images/logos/logo.png',
    alt: 'CBCTrack Logo',
    title: 'CBCTrack Brand',
    description: 'Official CBCTrack logo representing modern CBC education management',
    category: 'admin'
  },
  {
    id: 'gallery15',
    src: '/images/logos/logo_bg.png',
    alt: 'CBCTrack Logo with Background',
    title: 'CBCTrack Brand Variant',
    description: 'CBCTrack logo variation with background styling for different contexts',
    category: 'admin'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    number: '50+',
    title: 'Primary Schools',
    text: 'Across Kenya using CBCTrack to manage their CBC implementation'
  },
  {
    number: '30,000+',
    title: 'Learners',
    text: 'Having their progress tracked and assessments managed through our system'
  },
  {
    number: '95%',
    title: 'Time Saved',
    text: 'On administrative tasks related to CBC documentation and reporting'
  },
  {
    number: '24/7',
    title: 'Support',
    text: 'Technical assistance available to all schools through our Nairobi-based team'
  }
];

export const TYPING_TEXTS = [
  'Simplify school operations',
  'Track student progress',
  'Manage CBC curriculum',
  'Automate administrative tasks',
  'Connect parents & teachers'
];

export const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About Us' },
  { href: '#footer', label: 'Contact' },
  { href: '/blog', label: 'Blog' }
];