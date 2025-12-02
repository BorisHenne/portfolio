// ========================================
// COMMON TYPES
// ========================================

export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// ========================================
// USER & AUTH TYPES
// ========================================

export interface User {
  email: string;
  name: string;
  picture?: string;
  sub?: string; // Google OAuth ID
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuthenticated: (authenticated: boolean, user?: User | null) => void;
  logout: () => void;
}

// ========================================
// STORE TYPES
// ========================================

export interface UIState {
  isMenuOpen: boolean;
  activeSection: string;
  toggleMenu: () => void;
  closeMenu: () => void;
  setActiveSection: (section: string) => void;
}

export interface LanguageState {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
}

// ========================================
// PORTFOLIO CONTENT TYPES
// ========================================

export interface Experience {
  id: string;
  titleKey: string;
  company: string;
  periodKey: string;
  location: string;
  descriptionKey: string;
  tags?: string[];
  isCurrent?: boolean;
}

export interface Education {
  id: string;
  name: string;
  degree: string;
  period: string;
  description?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  url: string | null;
  github: string | null;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tags: string[];
  color: string;
  category: 'web' | '42' | 'personal';
}

export interface ProjectCategory {
  id: string;
  labelFr: string;
  labelEn: string;
}

export interface Volunteer {
  id: string;
  titleKey: string;
  orgKey: string;
  periodKey: string;
  descriptionKey: string;
}

export interface Recommendation {
  id: string;
  quoteKey: string;
  author: string;
  role?: string;
  company?: string;
}

// ========================================
// CONTACT FORM TYPES
// ========================================

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormState extends ContactFormData {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

// ========================================
// NAVIGATION TYPES
// ========================================

export interface NavItem {
  id: string;
  labelKey: string;
  href: string;
}

export interface NavState {
  items: NavItem[];
  activeItem: string;
}

// ========================================
// ANIMATION TYPES
// ========================================

export interface AnimationVariants {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
}

export interface ScrollAnimationOptions {
  once?: boolean;
  margin?: string;
  amount?: 'some' | 'all' | number;
}

// ========================================
// UTILITY TYPES
// ========================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Component props helper
export type PropsWithClassName<P = unknown> = P & {
  className?: string;
};

// Event handler types
export type ClickHandler = React.MouseEventHandler<HTMLButtonElement>;
export type SubmitHandler = React.FormEventHandler<HTMLFormElement>;
export type ChangeHandler = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
