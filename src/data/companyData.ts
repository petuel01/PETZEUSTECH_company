import { Department, Project, BlogPost } from '../types';

export const COMPANY_INFO = {
  name: 'PETZEUSTECH',
  tagline: "Powering Africa's Digital Future",
  positioning: 'A Technology & Innovation Company — Powering Africa\'s Digital Future',
  domain: 'petzeustech.com',
  whatsapp: '+237 677 251 088',
  whatsappRaw: '237677251088',
  email: 'baifempetuel0.2@gmail.com',
  location: 'Cameroon',
  founder: {
    name: 'Petuel Baifem',
    title: 'Founder & Lead Technology Architect',
    bio: 'Software engineer, systems administrator, and tech educator dedicated to building practical, resilient digital tools and elevating digital capability across Cameroon and Africa.',
    location: 'Cameroon'
  }
};

export const DEPARTMENTS: Department[] = [
  {
    id: 1,
    slug: 'software-labs',
    name: 'PETZEUSTECH Software & App Labs',
    shortDescription: 'Mobile app development (Android & iOS), website development, cloud web applications, and custom enterprise software.',
    simpleWording: 'We engineer mobile apps, websites, web applications, and custom business software tailored to your goals.',
    iconName: 'Code',
    sortOrder: 1,
    isActive: true,
    services: [
      {
        id: 101,
        departmentId: 1,
        departmentName: 'PETZEUSTECH Software & App Labs',
        name: 'Mobile Application Development (Android & iOS)',
        slug: 'mobile-app-development',
        description: 'Native and cross-platform smartphone mobile applications (Android APK & iOS) with offline support, push notifications, and fast UI.',
        priceHint: 'From 150,000 XAF',
        isBookable: true,
        popular: true
      },
      {
        id: 102,
        departmentId: 1,
        departmentName: 'PETZEUSTECH Software & App Labs',
        name: 'Website Development & Portals',
        slug: 'website-development',
        description: 'Clean, fast-loading, mobile-friendly websites designed for businesses, schools, and organizations.',
        priceHint: 'From 75,000 XAF',
        isBookable: true,
        popular: true
      },
      {
        id: 103,
        departmentId: 1,
        departmentName: 'PETZEUSTECH Software & App Labs',
        name: 'Full-Stack Web Applications (SaaS)',
        slug: 'web-applications',
        description: 'Interactive web software with user accounts, client portals, real-time dashboards, and automated business workflows.',
        priceHint: 'Custom Quote',
        isBookable: true,
        popular: true
      },
      {
        id: 104,
        departmentId: 1,
        departmentName: 'PETZEUSTECH Software & App Labs',
        name: 'Custom Enterprise Software & POS',
        slug: 'custom-enterprise-software',
        description: 'Bespoke management software, inventory systems, point of sale (POS), accounting, and workflow automation systems.',
        priceHint: 'Custom Quote',
        isBookable: true,
        popular: true
      },
      {
        id: 105,
        departmentId: 1,
        departmentName: 'PETZEUSTECH Software & App Labs',
        name: 'Custom PHP/MySQL & API Systems',
        slug: 'custom-php-mysql-systems',
        description: 'Robust, battle-tested database systems and REST APIs built for speed, easy hosting, and high durability.',
        priceHint: 'From 120,000 XAF',
        isBookable: true
      },
      {
        id: 106,
        departmentId: 1,
        departmentName: 'PETZEUSTECH Software & App Labs',
        name: 'Progressive Web Apps (PWAs)',
        slug: 'progressive-web-apps',
        description: 'Installable app-like web applications that install directly to phones and desktops without app store friction.',
        priceHint: 'From 90,000 XAF',
        isBookable: true
      },
      {
        id: 107,
        departmentId: 1,
        departmentName: 'PETZEUSTECH Software & App Labs',
        name: 'WordPress & E-Commerce Stores',
        slug: 'wordpress-websites',
        description: 'Professional WordPress websites and WooCommerce online stores you can easily manage with zero coding knowledge.',
        priceHint: 'From 65,000 XAF',
        isBookable: true
      },
      {
        id: 108,
        departmentId: 1,
        departmentName: 'PETZEUSTECH Software & App Labs',
        name: 'Software Maintenance & Bug Fixes',
        slug: 'software-maintenance',
        description: 'Emergency bug fixes, security patches, performance optimization, and ongoing maintenance for apps and websites.',
        priceHint: 'From 20,000 XAF',
        isBookable: true
      }
    ]
  },
  {
    id: 2,
    slug: 'cloudcore',
    name: 'PETZEUSTECH CloudCore',
    shortDescription: 'VPS provisioning, Linux server administration, Nginx, Docker, hosting, and domain configuration.',
    simpleWording: 'We help businesses put their websites and applications online safely and reliably.',
    iconName: 'Server',
    sortOrder: 2,
    isActive: true,
    services: [
      {
        id: 201,
        departmentId: 2,
        departmentName: 'PETZEUSTECH CloudCore',
        name: 'VPS Setup & Configuration',
        slug: 'vps-setup',
        description: 'Setting up clean Ubuntu/Debian virtual private servers with firewalls and system security.',
        priceHint: 'From 35,000 XAF',
        isBookable: true,
        popular: true
      },
      {
        id: 202,
        departmentId: 2,
        departmentName: 'PETZEUSTECH CloudCore',
        name: 'Linux Server Setup',
        slug: 'linux-server-setup',
        description: 'Command-line configuration, SSH keys, user management, and performance tuning.',
        priceHint: 'From 30,000 XAF',
        isBookable: true
      },
      {
        id: 203,
        departmentId: 2,
        departmentName: 'PETZEUSTECH CloudCore',
        name: 'Nginx Configuration',
        slug: 'nginx-configuration',
        description: 'High-performance reverse proxying, SSL termination, caching, and rate limiting setup.',
        priceHint: 'From 25,000 XAF',
        isBookable: true
      },
      {
        id: 204,
        departmentId: 2,
        departmentName: 'PETZEUSTECH CloudCore',
        name: 'Web Hosting Setup',
        slug: 'web-hosting-setup',
        description: 'Assisting in purchasing and configuring dependable web hosting and business email accounts.',
        priceHint: 'From 20,000 XAF',
        isBookable: true
      },
      {
        id: 205,
        departmentId: 2,
        departmentName: 'PETZEUSTECH CloudCore',
        name: 'Docker Deployment',
        slug: 'docker-deployment',
        description: 'Containerizing web applications and microservices for dependable, zero-downtime deployment.',
        priceHint: 'From 40,000 XAF',
        isBookable: true
      },
      {
        id: 206,
        departmentId: 2,
        departmentName: 'PETZEUSTECH CloudCore',
        name: 'Domain & DNS Configuration',
        slug: 'domain-dns-configuration',
        description: 'Connecting domain names, configuring Cloudflare, MX records for email, and DNS propagation.',
        priceHint: 'From 10,000 XAF',
        isBookable: true
      },
      {
        id: 207,
        departmentId: 2,
        departmentName: 'PETZEUSTECH CloudCore',
        name: 'SSL/TLS Certificate Setup',
        slug: 'ssl-tls-setup',
        description: 'Installing and auto-renewing Let\'s Encrypt certificates to secure your site with HTTPS.',
        priceHint: 'From 10,000 XAF',
        isBookable: true
      },
      {
        id: 208,
        departmentId: 2,
        departmentName: 'PETZEUSTECH CloudCore',
        name: 'cPanel / aaPanel Support',
        slug: 'cpanel-aapanel-support',
        description: 'Management, website migrations, email setup, and backups on control panels.',
        priceHint: 'From 20,000 XAF',
        isBookable: true
      },
      {
        id: 209,
        departmentId: 2,
        departmentName: 'PETZEUSTECH CloudCore',
        name: 'Basic DevOps Setup & GitHub Workflows',
        slug: 'basic-devops-github-workflows',
        description: 'Automated deployment pipelines so pushing code to GitHub updates your live server automatically.',
        priceHint: 'From 45,000 XAF',
        isBookable: true
      },
      {
        id: 210,
        departmentId: 2,
        departmentName: 'PETZEUSTECH CloudCore',
        name: 'Backup & Recovery Setup',
        slug: 'backup-recovery-setup',
        description: 'Automated daily/weekly offsite database and file backups to protect against data loss.',
        priceHint: 'From 25,000 XAF',
        isBookable: true
      }
    ]
  },
  {
    id: 3,
    slug: 'graphics',
    name: 'PETZEUSTECH Graphics',
    shortDescription: 'Modern visual design, marketing flyers, business branding, posters, and social media creative.',
    simpleWording: 'We create clean visual designs that help your message stand out.',
    iconName: 'Palette',
    sortOrder: 3,
    isActive: true,
    services: [
      {
        id: 301,
        departmentId: 3,
        departmentName: 'PETZEUSTECH Graphics',
        name: 'Flyers & Posters',
        slug: 'flyers-posters',
        description: 'High-impact promotional graphics for events, business promotions, church programs, or conferences.',
        priceHint: 'From 5,000 XAF',
        isBookable: true,
        popular: true
      },
      {
        id: 302,
        departmentId: 3,
        departmentName: 'PETZEUSTECH Graphics',
        name: 'Social Media Graphics',
        slug: 'social-media-graphics',
        description: 'Eye-catching graphics optimized for WhatsApp Status, Facebook, Instagram, and LinkedIn.',
        priceHint: 'Packages from 15,000 XAF',
        isBookable: true,
        popular: true
      },
      {
        id: 303,
        departmentId: 3,
        departmentName: 'PETZEUSTECH Graphics',
        name: 'Simple Branding Materials',
        slug: 'simple-branding-materials',
        description: 'Business cards, letterheads, brand color guides, and official company profile design.',
        priceHint: 'From 20,000 XAF',
        isBookable: true
      },
      {
        id: 304,
        departmentId: 3,
        departmentName: 'PETZEUSTECH Graphics',
        name: 'Canva Design & Templates',
        slug: 'canva-design-templates',
        description: 'Custom editable Canva templates your internal team can reuse effortlessly.',
        priceHint: 'From 10,000 XAF',
        isBookable: true
      },
      {
        id: 305,
        departmentId: 3,
        departmentName: 'PETZEUSTECH Graphics',
        name: 'Event Designs',
        slug: 'event-designs',
        description: 'Complete visual event packages: banners, invitation cards, badges, and program brochures.',
        priceHint: 'From 25,000 XAF',
        isBookable: true
      }
    ]
  },
  {
    id: 4,
    slug: 'electronics',
    name: 'PETZEUSTECH Electronics',
    shortDescription: 'Smartphone troubleshooting, screen replacement, laptop maintenance, OS installations, and tech repairs.',
    simpleWording: 'We help with common phone, laptop and electronic problems.',
    iconName: 'Smartphone',
    sortOrder: 4,
    isActive: true,
    services: [
      {
        id: 401,
        departmentId: 4,
        departmentName: 'PETZEUSTECH Electronics',
        name: 'Phone Troubleshooting & Diagnostics',
        slug: 'phone-troubleshooting',
        description: 'Diagnosing battery issues, charging port faults, unresponsive touch, and hardware checks.',
        priceHint: 'Free Diagnostic / Repair from 5,000 XAF',
        isBookable: true,
        popular: true
      },
      {
        id: 402,
        departmentId: 4,
        departmentName: 'PETZEUSTECH Electronics',
        name: 'Supported Cracked-Screen Replacement',
        slug: 'screen-replacement',
        description: 'Screen replacement for popular Android smartphones and iPhones where parts are readily verified.',
        priceHint: 'Parts Cost + 5,000 XAF Labor',
        isBookable: true,
        popular: true
      },
      {
        id: 403,
        departmentId: 4,
        departmentName: 'PETZEUSTECH Electronics',
        name: 'Phone Software Support',
        slug: 'phone-software-support',
        description: 'Fixing bootloops, unlocking forgotten patterns (with proof of ownership), OS flashing, and malware removal.',
        priceHint: 'From 5,000 XAF',
        isBookable: true
      },
      {
        id: 404,
        departmentId: 4,
        departmentName: 'PETZEUSTECH Electronics',
        name: 'Windows & Linux Installation',
        slug: 'windows-installation',
        description: 'Clean installation of genuine Windows 10/11 or Ubuntu Linux with full driver configuration.',
        priceHint: 'From 5,000 XAF',
        isBookable: true,
        popular: true
      },
      {
        id: 405,
        departmentId: 4,
        departmentName: 'PETZEUSTECH Electronics',
        name: 'Laptop Troubleshooting & Tune-up',
        slug: 'laptop-troubleshooting',
        description: 'Speeding up slow laptops, cleaning dust/thermal paste, upgrading SSDs and RAM.',
        priceHint: 'From 8,000 XAF',
        isBookable: true
      },
      {
        id: 406,
        departmentId: 4,
        departmentName: 'PETZEUSTECH Electronics',
        name: 'Laptop Software & Tools Setup',
        slug: 'laptop-software-setup',
        description: 'Installing Microsoft Office, development tools, design software, and antivirus protection.',
        priceHint: 'From 5,000 XAF',
        isBookable: true
      },
      {
        id: 407,
        departmentId: 4,
        departmentName: 'PETZEUSTECH Electronics',
        name: 'Device Setup & Peripheral Config',
        slug: 'device-setup',
        description: 'Configuring printers, Wi-Fi routers, projectors, and peripheral hardware for home or office.',
        priceHint: 'From 10,000 XAF',
        isBookable: true
      }
    ]
  },
  {
    id: 5,
    slug: 'ads-marketing',
    name: 'PETZEUSTECH Ads & Digital Marketing',
    shortDescription: 'Targeted Facebook Ads, Google Ads, local SEO, social media growth, and conversion strategy.',
    simpleWording: 'We help businesses get seen and reach the right people online.',
    iconName: 'Megaphone',
    sortOrder: 5,
    isActive: true,
    services: [
      {
        id: 501,
        departmentId: 5,
        departmentName: 'PETZEUSTECH Ads & Digital Marketing',
        name: 'Facebook & Instagram Ads',
        slug: 'facebook-ads',
        description: 'Setting up targeted ad campaigns to reach customers directly in Cameroon, Nigeria, or globally.',
        priceHint: 'From 30,000 XAF Management',
        isBookable: true,
        popular: true
      },
      {
        id: 502,
        departmentId: 5,
        departmentName: 'PETZEUSTECH Ads & Digital Marketing',
        name: 'Google Search Ads',
        slug: 'google-ads',
        description: 'Getting your business shown when customers search on Google for your exact products or services.',
        priceHint: 'From 40,000 XAF Management',
        isBookable: true
      },
      {
        id: 503,
        departmentId: 5,
        departmentName: 'PETZEUSTECH Ads & Digital Marketing',
        name: 'Local Business SEO',
        slug: 'local-seo',
        description: 'Google Business Profile verification, map optimization, and ranking higher in local search results.',
        priceHint: 'From 25,000 XAF',
        isBookable: true,
        popular: true
      },
      {
        id: 504,
        departmentId: 5,
        departmentName: 'PETZEUSTECH Ads & Digital Marketing',
        name: 'Social Media Promotion Strategy',
        slug: 'social-media-strategy',
        description: 'A practical content calendar, posting strategy, and audience engagement plan to grow real followers.',
        priceHint: 'From 20,000 XAF',
        isBookable: true
      },
      {
        id: 505,
        departmentId: 5,
        departmentName: 'PETZEUSTECH Ads & Digital Marketing',
        name: 'High-Converting Landing Pages',
        slug: 'landing-pages',
        description: 'Fast, single-page promotional sites engineered specifically to turn clicks into WhatsApp calls.',
        priceHint: 'From 45,000 XAF',
        isBookable: true
      },
      {
        id: 506,
        departmentId: 5,
        departmentName: 'PETZEUSTECH Ads & Digital Marketing',
        name: 'Digital Marketing Consultation',
        slug: 'marketing-consultation',
        description: 'One-on-one strategy review to determine where your business should invest for maximum return.',
        priceHint: '15,000 XAF / Session',
        isBookable: true
      }
    ]
  },
  {
    id: 6,
    slug: 'it-academy',
    name: 'PETZEUSTECH IT Academy',
    shortDescription: 'Practical, beginner-friendly technology training in web development, design, cloud hosting, and AI.',
    simpleWording: 'We teach practical technology skills that people can use.',
    iconName: 'GraduationCap',
    sortOrder: 6,
    isActive: true,
    services: [
      {
        id: 601,
        departmentId: 6,
        departmentName: 'PETZEUSTECH IT Academy',
        name: 'Web Development Training',
        slug: 'web-development-training',
        description: 'Learn HTML, CSS, JavaScript, PHP, and MySQL by building real websites from scratch.',
        priceHint: 'From 50,000 XAF / Cohort',
        isBookable: true,
        popular: true
      },
      {
        id: 602,
        departmentId: 6,
        departmentName: 'PETZEUSTECH IT Academy',
        name: 'Graphic Design Training',
        slug: 'graphic-design-training',
        description: 'Master Canva, Photoshop basics, color theory, and typography to produce professional flyers.',
        priceHint: 'From 35,000 XAF',
        isBookable: true,
        popular: true
      },
      {
        id: 603,
        departmentId: 6,
        departmentName: 'PETZEUSTECH IT Academy',
        name: 'Essential Digital Skills',
        slug: 'digital-skills-training',
        description: 'Computer fundamentals, fast typing, Microsoft Word & Excel, cloud storage, and email etiquette.',
        priceHint: 'From 25,000 XAF',
        isBookable: true
      },
      {
        id: 604,
        departmentId: 6,
        departmentName: 'PETZEUSTECH IT Academy',
        name: 'AI Tools & Productivity Training',
        slug: 'ai-tools-training',
        description: 'How to use AI assistants (ChatGPT, Gemini) to research, draft documents, and automate tasks.',
        priceHint: 'From 20,000 XAF',
        isBookable: true
      },
      {
        id: 605,
        departmentId: 6,
        departmentName: 'PETZEUSTECH IT Academy',
        name: 'Basic Hosting & Server Training',
        slug: 'hosting-server-training',
        description: 'Understand how domains, DNS, cPanel, and Linux servers work to publish your own sites.',
        priceHint: 'From 40,000 XAF',
        isBookable: true
      }
    ]
  }
];

export const COMMERCIAL_SKILLS = [
  'Full-Stack Web Development',
  'PHP / MySQL Systems',
  'WordPress Architecture',
  'Search Engine Optimization (SEO)',
  'Facebook Ads & Lead Gen',
  'Google Ads',
  'Canva & Brand Design',
  'WhatsApp Automation',
  'VPS & Web Hosting Setup',
  'cPanel / aaPanel Operations',
  'Docker Containers',
  'Linux Administration (Ubuntu/Debian)',
  'Nginx Reverse Proxy',
  'Git & GitHub Workflows',
  'DevOps Fundamentals',
  'Jenkins CI/CD',
  'Maven & Tomcat',
  'Nexus Repository',
  'SonarQube Code Quality',
  'Bash Scripting',
  'Office Productivity Tools'
];

export const LAB_AREAS = [
  'Laravel Modern Frameworks',
  'React 19 & Next.js Ecosystems',
  'Flutter Cross-Platform Mobile Apps',
  'AI / Machine Learning Integration',
  'Advanced Data Analysis',
  'Advanced Motherboard Hardware Repair'
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'PETZEUSTECH Corporate & Customer Portal',
    slug: 'petzeustech-portal',
    summary: 'The flagship unified digital platform for PETZEUSTECH featuring a service booking workflow, safe WhatsApp messaging, customer dashboard, and administrative console.',
    challenge: 'Need for a high-performance, mobile-first web presence tailored for African connectivity that allows customers in Cameroon and abroad to seamlessly request services and communicate via WhatsApp.',
    solution: 'Engineered a modern TypeScript platform with zero bloat, persistent database backend, clean WHITE PETZEUSTECH design system, and multi-tier authentication.',
    status: 'Completed',
    departmentName: 'PETZEUSTECH Software Labs',
    technologies: ['React 19', 'TypeScript', 'Node Express', 'Tailwind CSS v4', 'Gemini AI'],
    liveUrl: 'https://petzeustech.com',
    featured: true
  },
  {
    id: 2,
    title: 'University Orientation System',
    slug: 'university-orientation-system',
    summary: 'An interactive digital guidance portal helping secondary school graduates in Cameroon select university majors based on their GCE Advanced Level subject series.',
    challenge: 'Many students lack guidance counselors and make uninformed degree selections, leading to high dropout and underemployment rates.',
    solution: 'Designed an algorithmic decision matrix analyzing subject combinations, career prospects, and university admission cutoffs across Cameroon institutions.',
    status: 'In Progress',
    departmentName: 'PETZEUSTECH Software Labs',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'REST API'],
    featured: true
  },
  {
    id: 3,
    title: 'FixmateCM — Electronics & Repair Service Desk',
    slug: 'fixmatecm',
    summary: 'A localized customer ticketing and diagnostic tracker for smartphone repairs, screen replacements, and computer maintenance in Cameroon.',
    challenge: 'Repair customers often lose paper receipts or experience communication breakdowns regarding the progress and cost of hardware repairs.',
    solution: 'Built a lightweight web tracker with SMS/WhatsApp updates where customers track their device status from intake to pickup.',
    status: 'In Progress',
    departmentName: 'PETZEUSTECH Electronics',
    technologies: ['Web Tech', 'MySQL', 'WhatsApp Webhook API', 'Responsive UI'],
    featured: true
  },
  {
    id: 4,
    title: 'WhatsApp Business Bot for Customer Inquiries',
    slug: 'whatsapp-business-bot',
    summary: 'An automated responder that answers standard customer inquiries about PETZEUSTECH services, office hours, pricing estimates, and department contacts 24/7.',
    challenge: 'High volume of repetitive questions on WhatsApp regarding prices and business hours during late hours.',
    solution: 'Implemented a lightweight webhook automation that guides prospective customers through interactive menus directly inside WhatsApp.',
    status: 'Prototype',
    departmentName: 'PETZEUSTECH Software Labs',
    technologies: ['Node.js', 'WhatsApp Cloud API', 'Webhooks', 'Express'],
    featured: true
  },
  {
    id: 5,
    title: 'ZeusAI Technology Assistant',
    slug: 'zeus-ai',
    summary: 'An intelligent conversational assistant embedded within PETZEUSTECH to help customers troubleshoot technology issues and draft project scopes in simple English.',
    challenge: 'Non-technical business owners often struggle to explain what technical service or hosting plan they actually need.',
    solution: 'Integrated Google Gemini server-side with structured prompt guidelines to act as a patient, beginner-friendly African tech consultant.',
    status: 'Prototype',
    departmentName: 'PETZEUSTECH Software Labs',
    technologies: ['Gemini 2.5 API', 'TypeScript', 'Server-Side AI'],
    featured: true
  },
  {
    id: 6,
    title: 'CloudCore Managed Hosting Infrastructure',
    slug: 'cloudcore-hosting-infra',
    summary: 'A resilient Linux VPS configuration blueprint with Nginx reverse proxy, automated SSL renewal, daily off-site backups, and Dockerized deployments for local business sites.',
    challenge: 'Frequent local power cuts and server misconfigurations caused high downtime for small business websites.',
    solution: 'Architected hardened Ubuntu VPS images with automated container health checks, Cloudflare DNS shielding, and remote backup routines.',
    status: 'Completed',
    departmentName: 'PETZEUSTECH CloudCore',
    technologies: ['Linux Ubuntu', 'Nginx', 'Docker', 'Bash', 'SSL/TLS'],
    featured: false
  },
  {
    id: 7,
    title: 'PETZEUSTECH Cloud Hosting Platform',
    slug: 'petzeus-cloud-platform',
    summary: 'A planned self-service hosting and domain management dashboard for African freelancers and small businesses to provision WordPress and PHP apps with local payment methods.',
    challenge: 'African developers struggle to pay for international cloud providers (AWS, DigitalOcean) due to credit card restrictions.',
    solution: 'Designing an African-first hosting control panel supporting MTN Mobile Money and Orange Money for VPS and domain provisioning.',
    status: 'Planned',
    departmentName: 'PETZEUSTECH CloudCore',
    technologies: ['Linux', 'aaPanel API', 'MoMo Gateway', 'React', 'Node.js'],
    featured: false
  }
];

export const BLOG_POSTS: BlogPost[] = [
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
    publishedAt: '2026-08-20'
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
    publishedAt: '2026-08-28'
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
    publishedAt: '2026-09-02'
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
    publishedAt: '2026-09-08'
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
    publishedAt: '2026-09-10'
  },
  {
    id: 6,
    title: 'Graphic Design Basics: The Golden Rules for Event Posters and Flyers',
    slug: 'graphic-design-basics-event-flyers',
    category: 'Graphic Design',
    summary: 'Why less is more: how visual hierarchy, high contrast, and white space make your promotional flyers impossible to ignore.',
    content: `The biggest mistake beginner designers make is trying to fill every square millimeter with text, colors, and 3D effects.

When designing a flyer or poster, remember the "3-Second Rule": a passerby or WhatsApp status viewer must comprehend three things in three seconds:
1. WHAT is the event or offer?
2. WHEN and WHERE is it happening?
3. HOW do I attend or buy?

Keep fonts to a maximum of two complimentary styles. Ensure dark text sits on light backgrounds (or vice-versa) so that viewing outdoors under direct sunlight remains effortless.

PETZEUSTECH Graphics creates striking, memorable flyers for businesses, conferences, and community programs.`,
    authorName: 'Petuel Baifem',
    readTimeMinutes: 4,
    isPublished: true,
    publishedAt: '2026-09-11'
  },
  {
    id: 7,
    title: 'PETZEUSTECH Launches Official Platform & Unified Customer Portal',
    slug: 'petzeustech-launches-unified-portal',
    category: 'PETZEUSTECH Updates',
    summary: 'A major milestone in our mission to power Africa\'s digital future: announcing our unified service portal, real booking system, and ZeusAI assistant.',
    content: `Today, PETZEUSTECH officially launches its comprehensive web platform and customer portal.

Founded in Cameroon by Petuel Baifem, PETZEUSTECH represents the new generation of African technology craftsmanship: grounded in real community needs, committed to high quality, and completely honest about our capabilities.

Our new platform brings together:
- Six specialized departments (Software Labs, CloudCore, Graphics, Electronics, Ads, IT Academy)
- An instant booking generator with safe WhatsApp integration
- Transparent project statuses (Completed, In Progress, Prototype, Planned)
- Our interactive ZeusAI technology assistant to help you choose the right solution

We welcome you to explore our services and build the future together with us.`,
    authorName: 'Petuel Baifem',
    readTimeMinutes: 3,
    isPublished: true,
    publishedAt: '2026-09-13'
  }
];
