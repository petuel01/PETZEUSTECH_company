export type UserRole = 'customer' | 'staff' | 'admin' | 'super_admin' | 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  isVerified: boolean;
  authProvider: 'email' | 'google' | 'github';
  createdAt: string;
}

export type BookingStatus =
  | 'Pending'
  | 'Confirmed'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'Needs More Information'
  | 'NEW'
  | 'CONTACTED'
  | 'QUOTED'
  | 'NEGOTIATING'
  | 'APPROVED';

export interface Booking {
  id: number;
  bookingReference: string;
  userId?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  departmentName: string;
  serviceName: string;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  locationTown: string;
  budgetRange?: string;
  heardAbout?: string;
  preferredContactMethod?: 'WhatsApp' | 'Phone Call' | 'Email';
  status: BookingStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUOTED'
  | 'NEGOTIATING'
  | 'APPROVED'
  | 'IN PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  department: string;
  message: string;
  budget: string;
  date: string;
  status: LeadStatus;
  notes: string;
  bookingRef?: string;
}

export interface Department {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  simpleWording: string;
  iconName: string;
  sortOrder: number;
  isActive: boolean;
  services: Service[];
}

export interface Service {
  id: number;
  departmentId: number;
  departmentName: string;
  name: string;
  slug: string;
  description: string;
  fullDescription?: string;
  iconName?: string;
  priceHint?: string;
  pricingType?: 'Fixed' | 'Starting From' | 'Custom Quote' | 'Hourly / Session';
  estimatedDelivery?: string;
  features?: string[];
  isBookable: boolean;
  popular?: boolean;
  isPublished?: boolean;
  sortOrder?: number;
}

export type ProjectStatus = 'Completed' | 'In Progress' | 'Prototype' | 'Planned';

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  fullDescription?: string;
  category?: string;
  departmentName: string;
  clientName?: string;
  industry?: string;
  completionDate?: string;
  status: ProjectStatus;
  featured: boolean;
  isPublished?: boolean;
  
  // Links (Only rendered when they exist)
  liveUrl?: string;
  githubUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  docsUrl?: string;
  demoUrl?: string;
  isLiveHosted?: boolean;
  allowIframeEmbed?: boolean;
  iframeUrl?: string;

  // Technologies
  technologies: string[];

  // Media
  imageUrl?: string;
  logoUrl?: string;
  screenshots?: string[];
  demoVideoUrl?: string;

  // Project Story & Case Study
  problem?: string;
  solution?: string;
  keyFeatures?: string[];
  process?: string;
  challenges?: string;
  challenge?: string;
  results?: string;

  // SEO
  seoTitle?: string;
  seoKeywords?: string;
  metaDescription?: string;
  ogImageUrl?: string;
}

export interface AcademyCourse {
  id: number;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  category: string;
  instructor: string;
  duration: string;
  priceHint: string;
  isFree?: boolean;
  imageUrl?: string;
  status: 'Enrollment Open' | 'Upcoming' | 'In Session';
  enrolledStudents: number;
  syllabus?: string[];
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

export interface Testimonial {
  id: number;
  clientName: string;
  company: string;
  position: string;
  testimonial: string;
  photoUrl?: string;
  relatedService?: string;
  isPublished: boolean;
  rating: number;
}

export interface SiteStatistic {
  id: number;
  number: string;
  label: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

export type BlogCategory =
  | 'Web Development'
  | 'Hosting & Cloud'
  | 'Digital Marketing'
  | 'Graphic Design'
  | 'AI & Productivity'
  | 'IT Tips'
  | 'PETZEUSTECH Updates';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: BlogCategory;
  summary: string;
  content: string;
  authorName: string;
  readTimeMinutes: number;
  isPublished: boolean;
  publishedAt: string;
  featuredImage?: string;
  tags?: string[];
  seoTitle?: string;
  metaDescription?: string;
}

export interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: string;
}

export interface AuditLog {
  id: number;
  userId?: number;
  action: string;
  details: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

