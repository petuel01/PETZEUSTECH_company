export interface DbProject {
  id: number;
  title: string;
  slug: string;
  summary: string;
  fullDescription?: string;
  category: string;
  departmentName: string;
  clientName?: string;
  industry?: string;
  completionDate?: string;
  status: 'Completed' | 'In Progress' | 'Prototype' | 'Planned';
  featured: boolean;
  isPublished: boolean;
  liveUrl?: string;
  githubUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  docsUrl?: string;
  demoUrl?: string;
  technologies: string[];
  imageUrl?: string;
  logoUrl?: string;
  screenshots?: string[];
  demoVideoUrl?: string;
  problem?: string;
  solution?: string;
  keyFeatures?: string[];
  process?: string;
  challenges?: string;
  results?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface DbService {
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
  isPublished: boolean;
  sortOrder: number;
}

export interface DbDepartment {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  simpleWording: string;
  iconName: string;
  sortOrder: number;
  isActive: boolean;
}

export interface DbLead {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  department: string;
  message: string;
  budget: string;
  date: string;
  status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'NEGOTIATING' | 'APPROVED' | 'IN PROGRESS' | 'COMPLETED' | 'CANCELLED';
  notes: string;
  bookingRef?: string;
}

export interface DbAcademyCourse {
  id: number;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  category: string;
  instructor: string;
  duration: string;
  priceHint: string;
  isFree: boolean;
  imageUrl?: string;
  status: 'Enrollment Open' | 'Upcoming' | 'In Session';
  enrolledStudents: number;
  syllabus: string[];
}

export interface DbAnnouncement {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  isActive: boolean;
}

export interface DbTestimonial {
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

export interface DbSiteStat {
  id: number;
  number: string;
  label: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

export interface DbBlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  authorName: string;
  readTimeMinutes: number;
  isPublished: boolean;
  publishedAt: string;
  tags?: string[];
  seoTitle?: string;
  metaDescription?: string;
}

// Initial Seed Data
export const SEED_DEPARTMENTS: DbDepartment[] = [
  {
    id: 1,
    slug: 'software-labs',
    name: 'PETZEUSTECH Software Labs',
    shortDescription: 'Custom web development, PHP/MySQL systems, business portals, and WordPress solutions.',
    simpleWording: 'We build practical websites and software that solve real problems.',
    iconName: 'Code',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 2,
    slug: 'cloudcore',
    name: 'PETZEUSTECH CloudCore',
    shortDescription: 'VPS provisioning, Linux server administration, Nginx, Docker, hosting, and domain configuration.',
    simpleWording: 'We help businesses put their websites and applications online safely and reliably.',
    iconName: 'Server',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 3,
    slug: 'graphics',
    name: 'PETZEUSTECH Graphics',
    shortDescription: 'Event flyers, posters, Canva designs, business branding materials, and social media creative.',
    simpleWording: 'We make designs and flyers that look professional and get attention.',
    iconName: 'Palette',
    sortOrder: 3,
    isActive: true
  },
  {
    id: 4,
    slug: 'electronics',
    name: 'PETZEUSTECH Electronics',
    shortDescription: 'Smartphone diagnostics, verified screen replacements, OS flashing, laptop tune-ups, and Windows installation.',
    simpleWording: 'We fix phones, laptops, and computers in Cameroon.',
    iconName: 'Cpu',
    sortOrder: 4,
    isActive: true
  },
  {
    id: 5,
    slug: 'ads-marketing',
    name: 'PETZEUSTECH Ads & Digital Marketing',
    shortDescription: 'Targeted Facebook Ads, Google Ads, local SEO, social media growth, and conversion strategy.',
    simpleWording: 'We help businesses get seen and reach the right people online.',
    iconName: 'Megaphone',
    sortOrder: 5,
    isActive: true
  },
  {
    id: 6,
    slug: 'it-academy',
    name: 'PETZEUSTECH IT Academy',
    shortDescription: 'Practical, beginner-friendly technology training in web development, design, cloud hosting, and AI.',
    simpleWording: 'We teach practical technology skills that people can use immediately.',
    iconName: 'GraduationCap',
    sortOrder: 6,
    isActive: true
  }
];

export const SEED_SERVICES: DbService[] = [
  // Software Labs
  {
    id: 101,
    departmentId: 1,
    departmentName: 'PETZEUSTECH Software Labs',
    name: 'Website Development',
    slug: 'website-development',
    description: 'Clean, fast-loading, mobile-friendly websites designed for businesses, schools, and organizations.',
    fullDescription: 'Custom website development designed for African mobile speeds. Fully responsive, clean code, SEO-ready, and optimized for low bandwidth.',
    priceHint: 'From 75,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '7-14 business days',
    features: ['Mobile First Design', 'Speed Optimized', 'SSL Certificate', 'WhatsApp Direct Button', 'Contact Form Integration'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 1
  },
  {
    id: 102,
    departmentId: 1,
    departmentName: 'PETZEUSTECH Software Labs',
    name: 'Web Applications',
    slug: 'web-applications',
    description: 'Interactive web software with user accounts, dashboards, and automated business workflows.',
    fullDescription: 'Full-stack web applications tailored for specific business workflows, member portals, school management, and transactional systems.',
    priceHint: 'Custom Quote',
    pricingType: 'Custom Quote',
    estimatedDelivery: '14-30 business days',
    features: ['User Roles & Authentication', 'Custom Database Schema', 'Reporting Dashboards', 'API Integrations', 'Data Export'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 2
  },
  {
    id: 103,
    departmentId: 1,
    departmentName: 'PETZEUSTECH Software Labs',
    name: 'Custom PHP/MySQL Systems',
    slug: 'custom-php-mysql-systems',
    description: 'Robust, battle-tested database systems built for speed, easy hosting, and high durability.',
    fullDescription: 'Proven PHP & MySQL architecture that runs effortlessly on economical hosting without requiring expensive cloud tiers.',
    priceHint: 'From 120,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '10-20 business days',
    features: ['High Concurrency', 'Zero Heavy Dependencies', 'Low Hosting Cost', 'Automated Database Backups', 'Relational Integrity'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 3
  },
  {
    id: 104,
    departmentId: 1,
    departmentName: 'PETZEUSTECH Software Labs',
    name: 'Business Systems & Portals',
    slug: 'business-systems',
    description: 'Inventory, customer tracking, invoicing, and internal management tools tailored to your workflow.',
    fullDescription: 'Replace chaotic spreadsheets with a centralized, password-protected company portal accessible by staff.',
    priceHint: 'Custom Quote',
    pricingType: 'Custom Quote',
    estimatedDelivery: '15-25 business days',
    features: ['Inventory Control', 'Invoice Generation', 'Customer Database', 'Staff Activity Logs'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 4
  },
  {
    id: 105,
    departmentId: 1,
    departmentName: 'PETZEUSTECH Software Labs',
    name: 'WordPress Websites',
    slug: 'wordpress-websites',
    description: 'Professional WordPress websites you can easily update yourself with zero coding knowledge.',
    fullDescription: 'Customized WordPress themes and plugins configured securely for blogs, news, institutions, and businesses.',
    priceHint: 'From 65,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '5-10 business days',
    features: ['Visual Editor (Elementor/Gutenberg)', 'Anti-Spam Security', 'Contact Forms', 'Social Media Sharing'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 5
  },
  {
    id: 106,
    departmentId: 1,
    departmentName: 'PETZEUSTECH Software Labs',
    name: 'WordPress Customization',
    slug: 'wordpress-customization',
    description: 'Fixing plugin conflicts, speed optimization, and custom design tweaks on your existing WordPress site.',
    priceHint: 'From 25,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '2-4 business days',
    features: ['Speed Optimization', 'Security Patching', 'Plugin Conflict Resolution', 'Design Tweaks'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 6
  },
  {
    id: 107,
    departmentId: 1,
    departmentName: 'PETZEUSTECH Software Labs',
    name: 'Website Maintenance',
    slug: 'website-maintenance',
    description: 'Regular security updates, backups, bug fixes, and uptime checks so your site stays healthy.',
    priceHint: 'From 15,000 XAF / month',
    pricingType: 'Starting From',
    estimatedDelivery: 'Monthly retainer',
    features: ['Weekly Backups', 'Uptime Monitoring', 'Security Patches', 'Content Updates'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 7
  },
  {
    id: 108,
    departmentId: 1,
    departmentName: 'PETZEUSTECH Software Labs',
    name: 'Website Deployment',
    slug: 'website-deployment',
    description: 'Publishing your coded website to live hosting, setting up custom domains, and testing live forms.',
    priceHint: 'From 20,000 XAF',
    pricingType: 'Fixed',
    estimatedDelivery: '24-48 hours',
    features: ['DNS Setup', 'SSL Certificates', 'cPanel / aaPanel Migration', 'Email Routing'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 8
  },
  {
    id: 109,
    departmentId: 1,
    departmentName: 'PETZEUSTECH Software Labs',
    name: 'SEO-Friendly Website Setup',
    slug: 'seo-friendly-website-setup',
    description: 'Configuring meta tags, sitemaps, Google Search Console, and fast mobile loading so people find you.',
    priceHint: 'From 30,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '3-5 business days',
    features: ['Google Search Console', 'XML Sitemap', 'Meta Tags', 'Schema Markup'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 9
  },
  {
    id: 110,
    departmentId: 1,
    departmentName: 'PETZEUSTECH Software Labs',
    name: 'Website Troubleshooting',
    slug: 'website-troubleshooting',
    description: 'Emergency fixes for white screens, database connection errors, hacked sites, or broken layouts.',
    priceHint: 'From 15,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '2-12 hours',
    features: ['Error Log Analysis', 'Database Repair', 'Malware Cleanup', 'Layout Recovery'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 10
  },

  // CloudCore
  {
    id: 201,
    departmentId: 2,
    departmentName: 'PETZEUSTECH CloudCore',
    name: 'VPS Server Setup',
    slug: 'vps-server-setup',
    description: 'Initial provisioning and hardening of Ubuntu or Debian Linux VPS on providers like Contabo, Hetzner, or DigitalOcean.',
    priceHint: 'From 25,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '24-48 hours',
    features: ['SSH Key Auth', 'UFW Firewall', 'Swap Optimization', 'User Isolation'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 11
  },
  {
    id: 202,
    departmentId: 2,
    departmentName: 'PETZEUSTECH CloudCore',
    name: 'Web Hosting Deployment',
    slug: 'web-hosting-deployment',
    description: 'Moving your site from local development to production hosting with zero downtime.',
    priceHint: 'From 15,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '24 hours',
    features: ['Zero Downtime Migration', 'Database Import', 'File Integrity Check', 'SSL Verification'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 12
  },
  {
    id: 203,
    departmentId: 2,
    departmentName: 'PETZEUSTECH CloudCore',
    name: 'Nginx Configuration & Reverse Proxy',
    slug: 'nginx-reverse-proxy',
    description: 'Setting up Nginx to serve static assets rapidly and route backend traffic to Node, PHP-FPM, or Docker.',
    priceHint: 'From 20,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '24 hours',
    features: ['Gzip & Brotli Compression', 'HTTP/2 Protocol', 'SSL Termination', 'Rate Limiting'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 13
  },
  {
    id: 204,
    departmentId: 2,
    departmentName: 'PETZEUSTECH CloudCore',
    name: 'Docker Container Deployment',
    slug: 'docker-deployment',
    description: 'Containerizing your web application with Docker Compose for consistent, reliable, isolated running.',
    priceHint: 'From 30,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '24-72 hours',
    features: ['Dockerfile Creation', 'Docker Compose Setup', 'Volume Persistence', 'Auto-Restart Policies'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 14
  },
  {
    id: 205,
    departmentId: 2,
    departmentName: 'PETZEUSTECH CloudCore',
    name: 'Domain Connection & DNS Management',
    slug: 'domain-dns-management',
    description: 'Configuring domain records (A, CNAME, MX, TXT) and pointing your custom domain name correctly.',
    priceHint: 'From 5,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: 'Same day',
    features: ['Cloudflare DNS Setup', 'Propagation Testing', 'SPF/DKIM/DMARC Setup'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 15
  },
  {
    id: 206,
    departmentId: 2,
    departmentName: 'PETZEUSTECH CloudCore',
    name: 'SSL Certificate Installation',
    slug: 'ssl-certificate-setup',
    description: 'Installing free Let’s Encrypt or commercial SSL certificates with automated renewal to keep your site green-locked.',
    priceHint: 'From 10,000 XAF',
    pricingType: 'Fixed',
    estimatedDelivery: 'Same day',
    features: ['HTTPS Enforced', 'Automated Cron Renewal', 'A+ SSL Rating'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 16
  },
  {
    id: 207,
    departmentId: 2,
    departmentName: 'PETZEUSTECH CloudCore',
    name: 'aaPanel / cPanel Setup',
    slug: 'control-panel-setup',
    description: 'Installing and optimizing lightweight server control panels so you can manage domains, mail, and databases easily.',
    priceHint: 'From 20,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '24 hours',
    features: ['aaPanel / cPanel Installation', 'PHP Extension Setup', 'One-Click Backups'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 17
  },
  {
    id: 208,
    departmentId: 2,
    departmentName: 'PETZEUSTECH CloudCore',
    name: 'Server Security Hardening',
    slug: 'server-security-hardening',
    description: 'Disabling root SSH password login, configuring Fail2ban brute-force protection, and firewall tuning.',
    priceHint: 'From 25,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '24 hours',
    features: ['Fail2ban', 'Custom SSH Port', 'Brute-Force Shield', 'Audit Logs'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 18
  },

  // Graphics
  {
    id: 301,
    departmentId: 3,
    departmentName: 'PETZEUSTECH Graphics',
    name: 'Flyer & Poster Design',
    slug: 'flyer-poster-design',
    description: 'Striking, high-contrast flyers for church events, music releases, business sales, and conferences.',
    priceHint: 'From 5,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '24-48 hours',
    features: ['Print & Social Formats', 'High Resolution 300DPI', 'WhatsApp Optimized'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 19
  },
  {
    id: 302,
    departmentId: 3,
    departmentName: 'PETZEUSTECH Graphics',
    name: 'Social Media Graphics',
    slug: 'social-media-graphics',
    description: 'Cohesive Instagram, Facebook, and WhatsApp status banners tailored to your business identity.',
    priceHint: 'From 4,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '24 hours',
    features: ['Story & Feed Sizes', 'Brand Color Consistency', 'Editable Source Options'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 20
  },
  {
    id: 303,
    departmentId: 3,
    departmentName: 'PETZEUSTECH Graphics',
    name: 'Canva Design & Templates',
    slug: 'canva-design-templates',
    description: 'Clean, professional Canva templates that you can edit yourself whenever you need to announce a new price or product.',
    priceHint: 'From 8,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '2 business days',
    features: ['Transferable Canva Links', 'Brand Kit Setup', 'Custom Icons'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 21
  },
  {
    id: 304,
    departmentId: 3,
    departmentName: 'PETZEUSTECH Graphics',
    name: 'Event Branding Kits',
    slug: 'event-branding-kits',
    description: 'Complete branding package for programs: main flyer, speaker badges, program schedule, roll-up banner.',
    priceHint: 'From 25,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '3-5 business days',
    features: ['Roll-up Banner', 'Badges & Lanyards', 'Stage Backdrop Design', 'Social Media Kit'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 22
  },
  {
    id: 305,
    departmentId: 3,
    departmentName: 'PETZEUSTECH Graphics',
    name: 'Logo & Visual Identity',
    slug: 'logo-brand-identity',
    description: 'Distinctive, meaningful logo marks with typography guidelines and color palettes that stand the test of time.',
    priceHint: 'From 15,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '3-6 business days',
    features: ['Vector SVG/PNG/PDF', 'Transparent Formats', 'Dark/Light Variations', 'Brand Guide Sheet'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 23
  },

  // Electronics
  {
    id: 401,
    departmentId: 4,
    departmentName: 'PETZEUSTECH Electronics',
    name: 'Phone Troubleshooting & Diagnostics',
    slug: 'phone-troubleshooting',
    description: 'Finding the real cause of charging failures, overheating, sound issues, or sudden restarts.',
    priceHint: 'From 2,000 XAF Check',
    pricingType: 'Fixed',
    estimatedDelivery: 'Same day',
    features: ['Hardware Diagnostic', 'Battery Health Test', 'Port Inspection', 'Honest Scoping'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 24
  },
  {
    id: 402,
    departmentId: 4,
    departmentName: 'PETZEUSTECH Electronics',
    name: 'Screen Replacement',
    slug: 'screen-replacement',
    description: 'Careful replacement of broken smartphone and tablet displays with verified quality replacement screens.',
    priceHint: 'Price depends on phone model',
    pricingType: 'Custom Quote',
    estimatedDelivery: '24-48 hours',
    features: ['Grade-A Replacement Screens', 'Proper Adhesive Sealing', 'Touch Responsiveness Guarantee'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 25
  },
  {
    id: 403,
    departmentId: 4,
    departmentName: 'PETZEUSTECH Electronics',
    name: 'OS Flashing & Firmware Recovery',
    slug: 'os-flashing-recovery',
    description: 'Fixing bootloops, unlocking forgotten patterns (with proof of ownership), OS flashing, and malware removal.',
    priceHint: 'From 5,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: 'Same day',
    features: ['Official Stock Firmware', 'Pattern/PIN Unlocking with Proof', 'Bootloop Resolution'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 26
  },
  {
    id: 404,
    departmentId: 4,
    departmentName: 'PETZEUSTECH Electronics',
    name: 'Windows & Linux Installation',
    slug: 'windows-installation',
    description: 'Clean installation of genuine Windows 10/11 or Ubuntu Linux with full driver configuration.',
    priceHint: 'From 5,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: 'Same day',
    features: ['Full Driver Installation', 'Essential Utilities Included', 'Thermal Dust Cleaning'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 27
  },
  {
    id: 405,
    departmentId: 4,
    departmentName: 'PETZEUSTECH Electronics',
    name: 'Laptop Troubleshooting & Tune-up',
    slug: 'laptop-troubleshooting',
    description: 'Speeding up slow laptops, cleaning dust/thermal paste, upgrading SSDs and RAM.',
    priceHint: 'From 8,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: 'Same day',
    features: ['Thermal Paste Replacement', 'SSD Upgrade Recommendation', 'RAM Diagnostics', 'Startup Cleanup'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 28
  },

  // Ads & Digital Marketing
  {
    id: 501,
    departmentId: 5,
    departmentName: 'PETZEUSTECH Ads & Digital Marketing',
    name: 'Facebook & Instagram Ads',
    slug: 'facebook-ads',
    description: 'Setting up targeted ad campaigns to reach customers directly in Cameroon, Nigeria, or globally.',
    priceHint: 'From 30,000 XAF Management',
    pricingType: 'Starting From',
    estimatedDelivery: '3 business days setup',
    features: ['Geo-Targeted Audience', 'Ad Copy & Creative', 'Direct WhatsApp Click Routing', 'Weekly Reporting'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 29
  },
  {
    id: 502,
    departmentId: 5,
    departmentName: 'PETZEUSTECH Ads & Digital Marketing',
    name: 'Google Search Ads',
    slug: 'google-ads',
    description: 'Getting your business shown when customers search on Google for your exact products or services.',
    priceHint: 'From 40,000 XAF Management',
    pricingType: 'Starting From',
    estimatedDelivery: '3-5 business days',
    features: ['High-Intent Keyword Bidding', 'Negative Keyword Lists', 'Ad Extensions', 'Conversion Tracking'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 30
  },
  {
    id: 503,
    departmentId: 5,
    departmentName: 'PETZEUSTECH Ads & Digital Marketing',
    name: 'Local Business SEO',
    slug: 'local-seo',
    description: 'Google Business Profile verification, map optimization, and ranking higher in local search results.',
    priceHint: 'From 25,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '5-7 business days',
    features: ['Google Maps Pinning', 'Review Generation Strategy', 'Category Optimization'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 31
  },

  // IT Academy
  {
    id: 601,
    departmentId: 6,
    departmentName: 'PETZEUSTECH IT Academy',
    name: 'Web Development Training',
    slug: 'web-development-training',
    description: 'Learn HTML, CSS, JavaScript, PHP, and MySQL by building real websites from scratch.',
    priceHint: 'From 50,000 XAF / Cohort',
    pricingType: 'Starting From',
    estimatedDelivery: '6-8 Weeks Cohort',
    features: ['Hands-on Real Projects', 'Direct Mentorship from Petuel Baifem', 'Live Server Deployment Experience'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 32
  },
  {
    id: 602,
    departmentId: 6,
    departmentName: 'PETZEUSTECH IT Academy',
    name: 'Graphic Design Training',
    slug: 'graphic-design-training',
    description: 'Master Canva, Photoshop basics, color theory, and typography to produce professional flyers.',
    priceHint: 'From 35,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '4 Weeks Cohort',
    features: ['Color Theory', 'Typography Principles', 'Social Media Formats', 'Portfolio Building'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 33
  },
  {
    id: 603,
    departmentId: 6,
    departmentName: 'PETZEUSTECH IT Academy',
    name: 'Essential Digital Skills',
    slug: 'digital-skills-training',
    description: 'Computer fundamentals, fast typing, Microsoft Word & Excel, cloud storage, and email etiquette.',
    priceHint: 'From 25,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '3 Weeks Cohort',
    features: ['Typing Mastery', 'Spreadsheet Formulas', 'Cloud Storage (Drive)', 'Professional Email'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 34
  },
  {
    id: 604,
    departmentId: 6,
    departmentName: 'PETZEUSTECH IT Academy',
    name: 'AI Tools & Productivity Training',
    slug: 'ai-tools-training',
    description: 'How to use AI assistants (ChatGPT, Gemini) to research, draft documents, and automate tasks.',
    priceHint: 'From 20,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '2 Weeks Practical Lab',
    features: ['Prompt Engineering Basics', 'Business Writing with AI', 'Data Analysis with AI'],
    isBookable: true,
    popular: true,
    isPublished: true,
    sortOrder: 35
  },
  {
    id: 605,
    departmentId: 6,
    departmentName: 'PETZEUSTECH IT Academy',
    name: 'Basic Hosting & Server Training',
    slug: 'hosting-server-training',
    description: 'Understand how domains, DNS, cPanel, and Linux servers work to publish your own sites.',
    priceHint: 'From 40,000 XAF',
    pricingType: 'Starting From',
    estimatedDelivery: '4 Weeks Hands-on',
    features: ['Domain Registration & DNS', 'cPanel & aaPanel', 'Ubuntu Terminal Commands', 'SSL Setup'],
    isBookable: true,
    popular: false,
    isPublished: true,
    sortOrder: 36
  }
];

export const SEED_PROJECTS: DbProject[] = [
  {
    id: 1,
    title: 'PETZEUSTECH Corporate & Customer Portal',
    slug: 'petzeustech-portal',
    summary: 'The flagship unified digital platform for PETZEUSTECH featuring a service booking workflow, safe WhatsApp messaging, customer dashboard, and administrative console.',
    fullDescription: 'PETZEUSTECH Corporate & Customer Portal is an enterprise-grade digital platform engineered specifically for African network resilience. It unifies project discovery, real customer booking pipelines, authenticated customer dashboards, and a complete administrative control room into one lightning-fast experience.',
    category: 'Full-Stack Web Platform',
    departmentName: 'PETZEUSTECH Software Labs',
    clientName: 'PETZEUSTECH Internal Flagship',
    industry: 'Technology & Digital Services',
    completionDate: '2026-09-15',
    status: 'Completed',
    featured: true,
    isPublished: true,
    liveUrl: 'https://petzeustech.com',
    githubUrl: 'https://github.com/petzeustech/petzeustech-portal',
    demoUrl: 'https://petzeustech.com',
    technologies: ['React 19', 'TypeScript', 'Node.js Express', 'Tailwind CSS v4', 'Gemini AI', 'Docker'],
    problem: 'PETZEUSTECH needed an authoritative corporate digital home that seamlessly serves clients across Cameroon and international diaspora without heavy page-load penalties or third-party service locks.',
    solution: 'Engineered a modern, zero-bloat TypeScript platform with local JSON/DB persistence, real CRM lead tracking, automated reference generation, and a server-side ZeusAI consultant.',
    keyFeatures: [
      'Multi-tier Role-Based Access Control (User, Admin, Super Admin)',
      'Automated Booking Reference Generator with WhatsApp Bridge',
      'Real-time CRM Lead Lifecycle Management (NEW through COMPLETED)',
      'Interactive ZeusAI Technology Diagnostic Assistant',
      'Production Docker Multi-Stage Deployment & Automated Bash Scripts'
    ],
    process: 'Structured research on African mobile browsing habits, iterative design with a refined dark-navy/purple palette, rapid backend scaffolding, and automated CI/CD pipeline integration.',
    challenges: 'Ensuring rich features and animations remain smooth on low-spec Android devices and 3G mobile connections.',
    results: 'Sub-second page load times across Cameroon mobile networks, over 40 structured commercial services catalogue, and zero external database latency.'
  },
  {
    id: 2,
    title: 'University Orientation System',
    slug: 'university-orientation-system',
    summary: 'An interactive digital guidance portal helping secondary school graduates in Cameroon select university majors based on their GCE Advanced Level subject series.',
    fullDescription: 'A decision-support web application tailored for students in Cameroon transitioning from secondary education (GCE A-Levels) to state and private universities, calculating admission viability across faculties.',
    category: 'Educational Software',
    departmentName: 'PETZEUSTECH Software Labs',
    clientName: 'Cameroon Higher Education Guidance Initiative',
    industry: 'Education & Career Development',
    completionDate: '2026-10-30',
    status: 'In Progress',
    featured: true,
    isPublished: true,
    githubUrl: 'https://github.com/petzeustech/university-orientation-system',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'REST API'],
    problem: 'Many students lack guidance counselors and make uninformed degree selections, leading to high dropout and underemployment rates.',
    solution: 'Designed an algorithmic decision matrix analyzing subject combinations, career prospects, and university admission cutoffs across Cameroon institutions.',
    keyFeatures: [
      'GCE A-Level Points Calculator',
      'Faculty Matching Engine (UB, UBa, UY1, UDs, etc.)',
      'Career Pathways & Labor Market Insights',
      'Printable Guidance Profile Sheet'
    ],
    challenges: 'Gathering up-to-date admission requirements across fragmented university faculties in Cameroon.',
    results: 'Beta testing with secondary school students demonstrated an 85% increase in student confidence regarding faculty selection.'
  },
  {
    id: 3,
    title: 'FixmateCM — Electronics & Repair Service Desk',
    slug: 'fixmatecm',
    summary: 'A localized customer ticketing and diagnostic tracker for smartphone repairs, screen replacements, and computer maintenance in Cameroon.',
    fullDescription: 'A repair desk operations tracker built to eliminate lost paper tickets, disputed repair prices, and communication delays between hardware technicians and device owners.',
    category: 'Operations Management',
    departmentName: 'PETZEUSTECH Electronics',
    clientName: 'PETZEUSTECH Electronics Repair Center',
    industry: 'Consumer Electronics & Hardware',
    completionDate: '2026-11-15',
    status: 'In Progress',
    featured: true,
    isPublished: true,
    technologies: ['Node.js', 'MySQL', 'WhatsApp Webhook API', 'Responsive UI'],
    problem: 'Repair customers often lose paper receipts or experience communication breakdowns regarding the progress and cost of hardware repairs.',
    solution: 'Built a lightweight web tracker with SMS/WhatsApp updates where customers track their device status from intake to pickup.',
    keyFeatures: [
      'Barcode / Reference Intake System',
      'Diagnostic Notes & Customer Approval for Screen Replacement',
      'Direct WhatsApp Readiness Ping',
      'Warranty Logging & Technician Accountability'
    ]
  },
  {
    id: 4,
    title: 'WhatsApp Business Bot for Customer Inquiries',
    slug: 'whatsapp-business-bot',
    summary: 'An automated responder that answers standard customer inquiries about PETZEUSTECH services, office hours, pricing estimates, and department contacts 24/7.',
    fullDescription: 'A lightweight Node.js webhook service connected to WhatsApp Cloud API that intelligently routes prospective clients to appropriate department services even while the office is closed.',
    category: 'Automation & Messaging',
    departmentName: 'PETZEUSTECH Software Labs',
    clientName: 'PETZEUSTECH Operations',
    industry: 'Customer Support & Telecommunications',
    completionDate: '2026-08-10',
    status: 'Prototype',
    featured: true,
    isPublished: true,
    githubUrl: 'https://github.com/petzeustech/whatsapp-business-bot',
    technologies: ['Node.js', 'WhatsApp Cloud API', 'Webhooks', 'Express'],
    problem: 'High volume of repetitive inquiries on WhatsApp regarding service pricing and business hours outside normal operational shifts.',
    solution: 'Implemented a structured webhook responder that provides instant answers and logs customer leads into the central CRM.',
    keyFeatures: [
      'Interactive Numbered Menu',
      'Pricing Estimates for Common Hardware Repairs & Websites',
      'Escalation to Founder Petuel Baifem on Complex Requests'
    ]
  },
  {
    id: 5,
    title: 'ZeusAI Technology Assistant',
    slug: 'zeus-ai',
    summary: 'An intelligent conversational assistant embedded within PETZEUSTECH to help customers troubleshoot technology issues and draft project scopes in simple English.',
    fullDescription: 'An AI-powered technology advisory engine powered by Google Gemini server-side, grounded in Cameroonian context to demystify complex IT and hardware challenges for business founders.',
    category: 'Artificial Intelligence',
    departmentName: 'PETZEUSTECH Software Labs',
    clientName: 'PETZEUSTECH Community',
    industry: 'Artificial Intelligence & Consulting',
    completionDate: '2026-09-12',
    status: 'Completed',
    featured: true,
    isPublished: true,
    demoUrl: 'https://petzeustech.com',
    technologies: ['Google Gemini API', 'TypeScript', 'Server-Side Streaming', 'Express'],
    problem: 'Non-technical business owners often struggle to articulate what software framework, server configuration, or repair they actually require.',
    solution: 'Designed an approachable AI consultant that converses patiently in simple English and recommends the exact PETZEUSTECH department.',
    keyFeatures: [
      'Zero Front-End API Key Exposure',
      'Intelligent Offline Heuristic Fallback',
      'One-Click WhatsApp Booking Transfer'
    ]
  },
  {
    id: 6,
    title: 'CloudCore Managed Hosting Infrastructure',
    slug: 'cloudcore-hosting-infra',
    summary: 'A resilient Linux VPS configuration blueprint with Nginx reverse proxy, automated SSL renewal, daily off-site backups, and Dockerized deployments for local business sites.',
    fullDescription: 'Standardized infrastructure deployment blueprint used by PETZEUSTECH CloudCore to host African client websites with 99.9% uptime and low latency.',
    category: 'Cloud & Infrastructure',
    departmentName: 'PETZEUSTECH CloudCore',
    clientName: 'CloudCore Client Fleet',
    industry: 'Hosting & Cloud Infrastructure',
    completionDate: '2026-07-20',
    status: 'Completed',
    featured: false,
    isPublished: true,
    technologies: ['Linux Ubuntu', 'Nginx', 'Docker', 'Bash', 'Let\'s Encrypt SSL'],
    problem: 'Local business websites often experience severe downtime from unmaintained shared hosting accounts and misconfigured DNS.',
    solution: 'Architected hardened Ubuntu VPS images with automated container health checks and Cloudflare DNS shielding.',
    keyFeatures: [
      'Hardened Linux OS with Fail2ban',
      'Automated Encrypted Backups',
      'Docker Isolated Workloads'
    ]
  },
  {
    id: 7,
    title: 'PETZEUSTECH Cloud Hosting Platform',
    slug: 'petzeus-cloud-platform',
    summary: 'A planned self-service hosting and domain management dashboard for African freelancers and small businesses to provision WordPress and PHP apps with local payment methods.',
    fullDescription: 'An African-first cloud hosting dashboard bridging local mobile payment methods (MTN MoMo, Orange Money) with automated VPS and domain provisioning.',
    category: 'Cloud & Infrastructure',
    departmentName: 'PETZEUSTECH CloudCore',
    clientName: 'African Tech Ecosystem',
    industry: 'FinTech & Cloud',
    completionDate: '2027-03-01',
    status: 'Planned',
    featured: false,
    isPublished: true,
    technologies: ['React', 'Node.js', 'aaPanel API', 'MTN MoMo API', 'Orange Money API'],
    problem: 'African developers struggle to pay for international cloud providers (AWS, DigitalOcean) due to credit card restrictions.',
    solution: 'Designing an African-first hosting control panel supporting MTN Mobile Money and Orange Money for VPS and domain provisioning.'
  }
];

export const SEED_BLOG_POSTS: DbBlogPost[] = [
  {
    id: 1,
    title: 'Why Every Small Business in Cameroon Needs a Real Website in 2026',
    slug: 'why-businesses-need-website-2026',
    category: 'Web Development',
    summary: 'Social media pages are rented land. Here is why having your own custom website builds genuine credibility, ownership, and direct customer trust.',
    content: `Many entrepreneurs in Cameroon believe having a Facebook page or WhatsApp business catalog is enough. While social media is a fantastic marketing channel, it has serious limitations.

1. You Do Not Own Your Social Media Followers
Algorithms change overnight. Accounts can get restricted without warning. When you have your own website, you own the platform and your customer database permanently.

2. Professional Credibility
When potential clients, international partners, or corporate customers look up your business, a clean website with your own domain name (like yourbusiness.com) immediately signals that you are a legitimate, serious organization.

3. 24/7 Service Booking & Information
A well-designed website answers questions while you sleep: your pricing, services, work samples, and booking forms are always accessible to anyone, anywhere in the world.

At PETZEUSTECH, we engineer websites that load fast even on 3G mobile networks, ensuring every visitor enjoys a smooth experience.`,
    authorName: 'Petuel Baifem',
    readTimeMinutes: 4,
    isPublished: true,
    publishedAt: '2026-08-20',
    tags: ['Web Development', 'Business Growth', 'Cameroon Tech']
  },
  {
    id: 2,
    title: 'Understanding Shared Hosting vs VPS: Which One Does Your Website Need?',
    slug: 'shared-hosting-vs-vps-explained',
    category: 'Hosting & Cloud',
    summary: 'A simple, jargon-free explanation of how web hosting works and when it is time to move from basic cPanel hosting to a dedicated Virtual Private Server.',
    content: `Think of web hosting like living in a building:

Shared Hosting is like renting a room in a shared apartment. You share the kitchen, water pressure, and electricity with many neighbors. If one neighbor throws a loud party (a traffic spike or hacked site), your room gets slow or disrupted too.

A VPS (Virtual Private Server) is like having your own private townhouse. You have dedicated RAM, CPU, and disk space that belong strictly to you. No neighbor can slow you down.

When should you choose a VPS?
- When your website handles daily customer transactions
- When you are running custom web software or APIs
- When you need specific software (like Docker, Redis, or Node.js)
- When speed and uptime directly impact your income

PETZEUSTECH CloudCore specializes in setting up secure, cost-effective Linux VPS environments configured specifically for your workload.`,
    authorName: 'Petuel Baifem',
    readTimeMinutes: 5,
    isPublished: true,
    publishedAt: '2026-08-28',
    tags: ['Cloud', 'VPS', 'Linux', 'Hosting']
  },
  {
    id: 3,
    title: '5 Common Smartphone Habits That Damage Your Screen and Battery',
    slug: 'smartphone-care-screen-battery-tips',
    category: 'IT Tips',
    summary: 'Practical daily habits that will keep your smartphone screen safe from cracks and prolong your lithium battery lifespan.',
    content: `At PETZEUSTECH Electronics, we repair smartphones and laptops every week. Many of the issues we see could have been prevented with simple daily habits:

1. Using Cheap, Unregulated Chargers
Cheap car chargers or low-quality cables deliver irregular voltage spikes that blow the power IC or degrade the battery chemistry rapidly. Always use quality-tested charging bricks.

2. Carrying Phones in Tight Back Pockets
Sitting down with a smartphone in your back pocket exerts structural pressure on the frame, causing microscopic bends that crack the AMOLED screen or disconnect the display flex cable.

3. Using the Phone While Playing Games on Heavy Charge
Fast charging produces heat. Gaming produces heat. Combining both causes thermal stress that severely shortens battery health.

4. Delaying Screen Protector Replacement
A cracked glass screen protector no longer absorbs impact shock. If your protector is chipped, replace it immediately before the actual phone screen takes the hit.`,
    authorName: 'Petuel Baifem',
    readTimeMinutes: 3,
    isPublished: true,
    publishedAt: '2026-09-02',
    tags: ['Smartphone Care', 'Electronics Repair', 'Hardware Tips']
  },
  {
    id: 4,
    title: 'How to Run Facebook Ads in Cameroon That Actually Convert to WhatsApp Sales',
    slug: 'facebook-ads-cameroon-whatsapp-conversion',
    category: 'Digital Marketing',
    summary: 'Stop wasting ad money on empty page likes. Learn how to target real buyers and route them directly into high-converting WhatsApp conversations.',
    content: `Most business owners in Cameroon click "Boost Post" and wonder why they got 500 likes but zero orders. 

The Secret: Direct WhatsApp Traffic
In Central and West Africa, transactions happen on WhatsApp. Customers want to ask questions, verify stock, negotiate, and confirm delivery in real-time.

Key Steps for High Conversion:
1. Use Clear, Direct Graphics: State your product and the price upfront. Avoid clutter.
2. Target Specifically: Do not target "all of Cameroon". Focus on specific cities (Douala, Yaounde, Buea, Limbe) where you can reliably deliver.
3. Hook in the First 2 Lines: Mention the exact problem you solve.
4. Call to Action: Direct them to click the WhatsApp button with a pre-written greeting so they don't hesitate.

PETZEUSTECH Ads helps businesses configure high-converting campaign funnels that turn modest ad budgets into consistent client inquiries.`,
    authorName: 'Petuel Baifem',
    readTimeMinutes: 5,
    isPublished: true,
    publishedAt: '2026-09-08',
    tags: ['Facebook Ads', 'Digital Marketing', 'WhatsApp Sales']
  },
  {
    id: 5,
    title: 'How Artificial Intelligence Can Boost Everyday Productivity for African Businesses',
    slug: 'ai-tools-productivity-african-businesses',
    category: 'AI & Productivity',
    summary: 'Simple ways small businesses can use AI tools like Gemini and ChatGPT to draft letters, create marketing copy, and organize tasks.',
    content: `Artificial Intelligence is not science fiction or a replacement for human work—it is a powerful assistant for anyone willing to learn how to communicate with it.

1. Professional Business Correspondence
Struggling to write a formal partnership proposal or debt reminder? Describe the situation to an AI tool and ask for a courteous, firm draft.

2. Social Media Caption Ideas
Provide your product details and ask for 5 engaging social media post concepts tailored to your audience.

3. Learning New Skills Faster
Instead of searching through dense manuals, ask AI to explain technical concepts "in simple English with real-life examples".

At PETZEUSTECH IT Academy, we conduct hands-on training showing entrepreneurs, students, and workers how to ethically and effectively integrate AI into their daily work.`,
    authorName: 'Petuel Baifem',
    readTimeMinutes: 4,
    isPublished: true,
    publishedAt: '2026-09-10',
    tags: ['Artificial Intelligence', 'Productivity', 'Gemini AI']
  }
];

export const SEED_ACADEMY_COURSES: DbAcademyCourse[] = [
  {
    id: 1,
    title: 'Practical Web Development Cohort',
    slug: 'web-dev-cohort',
    description: 'Learn modern HTML, CSS, JavaScript, PHP, and MySQL by building real, production websites from scratch.',
    fullDescription: 'A comprehensive 8-week bootcamp designed for beginners and intermediate coders. You will build a portfolio of 4 functional web projects and deploy them live to a Linux VPS.',
    category: 'Software Engineering',
    instructor: 'Petuel Baifem',
    duration: '8 Weeks (3 sessions/week)',
    priceHint: '50,000 XAF',
    isFree: false,
    status: 'Enrollment Open',
    enrolledStudents: 14,
    syllabus: [
      'Week 1: Web Fundamentals, Semantic HTML5 & Modern CSS Grid/Flexbox',
      'Week 2: Responsive Design for Mobile Networks & Media Queries',
      'Week 3: JavaScript DOM Manipulation & Event Handling',
      'Week 4: Asynchronous JS, Fetch API & Working with JSON',
      'Week 5: Backend Basics with PHP & Server Superglobals',
      'Week 6: Relational Databases with MySQL & SQL Queries',
      'Week 7: Building a Full CRUD System (Inventory / Portal)',
      'Week 8: Linux VPS Deployment, DNS, SSL & Final Project Showcase'
    ]
  },
  {
    id: 2,
    title: 'Commercial Graphic Design Mastery',
    slug: 'graphic-design-mastery',
    description: 'Master Canva, Photoshop fundamentals, color theory, typography, and commercial flyer design.',
    fullDescription: 'Designed for aspiring creative freelancers and marketers. Learn how to craft visual content that sells and builds professional credibility.',
    category: 'Design & Creative',
    instructor: 'Petuel Baifem & Creative Staff',
    duration: '4 Weeks (3 sessions/week)',
    priceHint: '35,000 XAF',
    isFree: false,
    status: 'Enrollment Open',
    enrolledStudents: 22,
    syllabus: [
      'Week 1: Visual Hierarchy, The 3-Second Rule & White Space',
      'Week 2: Color Psychology, Palette Generation & High Contrast',
      'Week 3: Advanced Canva Workflows & Custom Templates',
      'Week 4: Commercial Event Flyers & Social Media Ad Creatives'
    ]
  },
  {
    id: 3,
    title: 'Essential Digital Skills & Office Productivity',
    slug: 'digital-skills-productivity',
    description: 'Computer fundamentals, fast typing, Microsoft Word & Excel formulas, cloud storage, and email etiquette.',
    fullDescription: 'The foundational program for students, job seekers, and office workers wanting to gain 100% confidence with computers.',
    category: 'Foundations',
    instructor: 'PETZEUSTECH Academy Staff',
    duration: '3 Weeks (Daily 1-Hour Labs)',
    priceHint: '25,000 XAF',
    isFree: false,
    status: 'Enrollment Open',
    enrolledStudents: 19,
    syllabus: [
      'Module 1: Computer Hardware, File Management & Keyboard Speed',
      'Module 2: Professional Word Document Formatting & CV Creation',
      'Module 3: Excel Essentials (SUM, AVERAGE, VLOOKUP, Invoicing)',
      'Module 4: Cloud Storage (Google Drive), Security & Email Etiquette'
    ]
  },
  {
    id: 4,
    title: 'AI Tools & Modern Workflow Automation',
    slug: 'ai-tools-automation',
    description: 'Harness ChatGPT, Gemini, and AI productivity suites to accelerate business research and communication.',
    fullDescription: 'Practical hands-on workshop focused on ethical, high-impact AI application for African entrepreneurs and content creators.',
    category: 'Emerging Tech',
    instructor: 'Petuel Baifem',
    duration: '2 Weeks Intensive',
    priceHint: '20,000 XAF',
    isFree: false,
    status: 'Upcoming',
    enrolledStudents: 8,
    syllabus: [
      'Session 1: The Anatomy of an Effective Prompt',
      'Session 2: Drafting Business Proposals, Contracts & Reports',
      'Session 3: AI-Assisted Market Research & Customer Insights',
      'Session 4: Workflow Automation with Zapier & Webhooks'
    ]
  },
  {
    id: 5,
    title: 'Linux Server Administration & VPS Hosting',
    slug: 'linux-vps-hosting',
    description: 'Understand how domains, DNS, Nginx, cPanel, aaPanel, and Ubuntu Linux servers work in production.',
    fullDescription: 'Deep-dive systems engineering course for web developers looking to take full control of their servers.',
    category: 'Cloud & Infrastructure',
    instructor: 'Petuel Baifem',
    duration: '4 Weeks Practical Labs',
    priceHint: '40,000 XAF',
    isFree: false,
    status: 'Upcoming',
    enrolledStudents: 6,
    syllabus: [
      'Week 1: Linux CLI Mastery, File Permissions & SSH Keys',
      'Week 2: Nginx Web Server, Virtual Hosts & Reverse Proxies',
      'Week 3: SSL Certificates, Firewalls & Server Security',
      'Week 4: Docker Containers, aaPanel Management & Remote Backups'
    ]
  }
];

export const SEED_ANNOUNCEMENT: DbAnnouncement = {
  id: 1,
  title: '🔥 PETZEUSTECH IT Academy Cohort 2026 Registration is Now Open!',
  description: 'Practical hands-on courses in Web Development, Graphic Design, and Cloud Hosting in Cameroon & Online.',
  buttonText: 'View Academy Courses',
  buttonUrl: 'academy',
  isActive: true
};

export const SEED_TESTIMONIALS: DbTestimonial[] = [
  {
    id: 1,
    clientName: 'Emmanuel Forgwe',
    company: 'AgriCommerce South West',
    position: 'Managing Director',
    testimonial: 'PETZEUSTECH developed our inventory and order processing system in record time. What impressed me most was the honest scoping—Petuel explained exactly what we needed without trying to inflate the budget.',
    relatedService: 'Custom PHP/MySQL Systems',
    isPublished: true,
    rating: 5
  },
  {
    id: 2,
    clientName: 'Beatrice Enow',
    company: 'Grace Event Planners',
    position: 'Lead Coordinator',
    testimonial: 'The event flyers and Canva branding kits created by PETZEUSTECH Graphics completely changed how clients view our business. Every flyer they design receives compliments on WhatsApp.',
    relatedService: 'Flyer & Poster Design',
    isPublished: true,
    rating: 5
  },
  {
    id: 3,
    clientName: 'Collins Mbah',
    company: 'Freelance Software Developer',
    position: 'Frontend Engineer',
    testimonial: 'Setting up my Ubuntu VPS and Nginx configuration used to give me headaches. PETZEUSTECH CloudCore secured my server, connected my domain, and configured Docker in under 24 hours.',
    relatedService: 'VPS Server Setup',
    isPublished: true,
    rating: 5
  },
  {
    id: 4,
    clientName: 'Miriam Tanyi',
    company: 'IT Academy Graduate',
    position: 'IT Academy Graduate',
    testimonial: 'Before the PETZEUSTECH IT Academy, I was intimidated by coding. Petuel Baifem taught us step-by-step with real practical examples. Today I build and publish my own websites!',
    relatedService: 'Web Development Training',
    isPublished: true,
    rating: 5
  }
];

export const SEED_SITE_STATS: DbSiteStat[] = [
  {
    id: 1,
    number: '6',
    label: 'Core Departments',
    description: 'Software Labs, CloudCore, Graphics, Electronics, Ads, and IT Academy.',
    icon: 'Layers',
    displayOrder: 1,
    isActive: true
  },
  {
    id: 2,
    number: '40+',
    label: 'Commercial Services',
    description: 'Specialized digital solutions ready for immediate booking.',
    icon: 'CheckCircle2',
    displayOrder: 2,
    isActive: true
  },
  {
    id: 3,
    number: '< 24h',
    label: 'WhatsApp Response',
    description: 'Fast, human communication directly with lead technical staff.',
    icon: 'Clock',
    displayOrder: 3,
    isActive: true
  },
  {
    id: 4,
    number: '100%',
    label: 'Honest Scoping',
    description: 'Transparent estimates with zero hidden fees or fake promises.',
    icon: 'ShieldCheck',
    displayOrder: 4,
    isActive: true
  }
];

export const SEED_LEADS: DbLead[] = [
  {
    id: 1,
    name: 'David Ndive',
    phone: '+237670000111',
    email: 'client@example.com',
    service: 'Custom PHP/MySQL Systems',
    department: 'PETZEUSTECH Software Labs',
    message: 'We need an inventory tracking and sales recording system for our pharmacy in Buea.',
    budget: '120,000 - 250,000 XAF',
    date: '2026-09-10',
    status: 'IN PROGRESS',
    notes: 'Initial scope agreed. Demo phase starting next week.',
    bookingRef: 'PTZ-20260910-3841'
  },
  {
    id: 2,
    name: 'Sarah Mbong',
    phone: '+237671234567',
    email: 'sarah.m@gmail.com',
    service: 'Screen Replacement',
    department: 'PETZEUSTECH Electronics',
    message: 'Samsung Galaxy A52 dropped on concrete, screen is completely black but phone vibrates.',
    budget: 'Standard Replacement Screen',
    date: '2026-09-12',
    status: 'CONTACTED',
    notes: 'Quoted 32,000 XAF for genuine AMOLED replacement screen.',
    bookingRef: 'PTZ-20260912-7492'
  },
  {
    id: 3,
    name: 'Pastor John Ashu',
    phone: '+237675558899',
    email: 'pastor.ashu@gmail.com',
    service: 'Flyer & Poster Design',
    department: 'PETZEUSTECH Graphics',
    message: 'Annual Youth Conference 2026 flyer needed with 3 speaker photos and venue details.',
    budget: '10,000 XAF',
    date: '2026-09-14',
    status: 'APPROVED',
    notes: 'Design drafts sent via WhatsApp for review.',
    bookingRef: 'PTZ-20260914-1102'
  }
];
