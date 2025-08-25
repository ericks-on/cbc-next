export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  caption: string;
  highlights: string[];
  details: FeatureDetail[];
}

export interface FeatureDetail {
  icon: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  size?: 'normal' | 'wide' | 'tall';
}

export interface Achievement {
  number: string;
  title: string;
  text: string;
}

export interface UserRole {
  type: 'admin' | 'teacher' | 'parent' | 'student' | 'staff';
  isAuthenticated: boolean;
  isSuperuser?: boolean;
  isPrincipal?: boolean;
  isTeacher?: boolean;
  isStudent?: boolean;
  isStaffMember?: boolean;
}

export interface LoginFormData {
  institution: string;
  acc: string;
  usrpass: string;
}

export interface ResetPasswordData {
  email: string;
}