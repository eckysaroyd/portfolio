import type { UserInfo } from "@/types";

const info: UserInfo = {
  // ============ MAIN DETAILS ============
  main: {
    name: "Eckysaroyd Nyato",
    role: "Head of Engineering · Full-Stack & AI Engineer",
    description:
      "Senior Full-Stack and AI Automation Engineer with 6+ years of proven experience designing, building, and deploying production-grade systems that solve real business problems at scale. I specialize in modern JavaScript ecosystems — Next.js, Node.js, TypeScript — cloud-native architectures, and intelligent automation powered by large language models. From multi-tenant SaaS platforms and AI-driven workflow engines to high-traffic eCommerce and healthcare portals, I help organizations ship faster, operate smarter, and scale confidently.",
    summary:
      "I architect and deliver complete digital solutions — from multi-tenant SaaS dashboards and AI workflow automation to enterprise eCommerce platforms and mission-critical healthcare portals. Every system I build is engineered with clean architecture, performance-first thinking, and a clear focus on measurable business outcomes. If you need a technical partner who understands both the code and the business impact it creates, let's build something exceptional together.",
    photo: "/images/ecky.jpg",
    email: "enyato98@gmail.com",
    location: "Tanzania / Remote",
    availability: "Available for new projects",
  },

  // ============ SOCIAL LINKS ============
  socials: {
    github: "http://github.com/eckysaroyd",
    linkedin: "https://www.linkedin.com/in/eckysaroyd/",
  },

  // ============ CORE SKILLS ============
  skills: {
    ai_automation: [
      "LLM Integrations",
      "AI Automation",
      "RAG Pipelines",
      "Prompt Engineering",
      "LLM Fine-tuning",
      "AI Agent Development",
      "Playwright",
      "Workflow Automation",
      "n8n",
      "Supabase Vector",
    ],
    frontend: ["Next.js", "React.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap", "Phaser 3", "Vite"],
    backend: ["Node.js", "Express.js", "Laravel", "PHP", "REST APIs", "Microservices", "CodeIgniter"],
    databases: ["PostgreSQL", "Supabase", "MySQL", "MongoDB"],
    devops: ["AWS", "Docker", "CI/CD", "GitHub Actions", "GitLab", "Coolify", "Linux"],
    design: ["Figma", "Photoshop", "CorelDRAW"],
    testing: ["Playwright", "API Testing", "JWT Security"],
  },

  // ============ PROJECTS ============
  projects: [
    {
      title: "Faanoole Properties",
      category: "Real Estate Platform",
      description:
        "Faanoole Properties is a production-grade, full-stack apartment management platform serving Faanoole Apartments — live with real tenants, leases, payments, and maintenance operations. The platform spans three layers: a polished public marketing website showcasing the building and available units, a MakeMyTrip-style unit booking and reservation system with reference-code tracking and unit holds requiring no login, and a fully featured resident portal where tenants manage lease documents, rent payments, maintenance tickets, and service requests. A powerful admin dashboard gives management complete control over tenants, units, payments, technician assignments, and a real-time maintenance mode toggle. Post-launch, the platform was expanded with a technician role workflow, vehicle tracking, PDF receipt generation, an AI assistant, tour scheduling, and advanced admin settings. Built on Next.js and Supabase with a battle-tested schema — audited for RLS, indexing, and additive migrations — Faanoole Properties is a blueprint for serious, production-ready real estate management engineering.",
      technologies: "Next.js,TypeScript,Supabase,Tailwind CSS,PLpgSQL",
      highlights: ["Live in production with real tenants", "Booking system with reference-code tracking", "Resident portal with payments & tickets", "AI assistant + technician workflow"],
      github: "",
      link: "https://faanooleapartments.com/",
      featured: true,
      screenshot: "/images/projects/faanoole.png",
    },
    {
      title: "Somali Fuel Company",
      category: "Business Website",
      description:
        "Somali Fuel Company is a full-stack digital platform built for a fuel distribution business — engineered to establish professional credibility, streamline client engagement, and support operational workflows in a sector where trust and reliability are non-negotiable. Built on Next.js and TypeScript with Supabase as the data backbone and Python-powered backend services for operational processing, the platform delivers a responsive, high-performance corporate presence with structured service showcasing, inquiry management, and a scalable architecture ready to grow with the business. Deployed on Vercel for global performance and zero-downtime reliability, this project demonstrates purposeful engineering for infrastructure-sector clients where digital professionalism is increasingly a differentiator.",
      technologies: "Next.js,TypeScript,Supabase,Python,Tailwind CSS",
      highlights: ["Full-stack corporate platform", "Python-powered backend services", "Supabase real-time backend", "Deployed on Vercel"],
      github: "",
      link: "https://www.somalifuelcompany.com/login",
      featured: false,
      screenshot: "/images/projects/somali-fuel.png",
    },
    {
      title: "Ruach Coffee",
      category: "Business Website",
      description:
        "Ruach Coffee is a premium coffee brand platform engineered to reflect the quality, identity, and customer experience that the Ruach Premium brand demands. Built on Next.js and TypeScript with a Supabase backend, the platform combines brand storytelling with a polished product showcase and customer engagement layer — delivering a fast, visually compelling digital presence that converts visitors into loyal customers. The architecture is built for performance and scale: server-side rendering for instant load times, Supabase for real-time data management, and a fully responsive design tuned for the modern consumer browsing on any device. Ruach Coffee is proof that premium brand engineering and technical rigour are not mutually exclusive.",
      technologies: "Next.js,TypeScript,Supabase,Tailwind CSS",
      highlights: ["Premium brand digital presence", "Next.js SSR for fast load times", "Supabase real-time backend", "Responsive across all devices"],
      github: "",
      link: "https://ruachpremium.com/",
      featured: false,
      screenshot: "/images/projects/ruach-coffee.png",
    },
    {
      title: "AutoOps Schools",
      category: "AI SaaS Platform",
      description:
        "AutoOps Schools is a production-ready, multi-tenant AI SaaS platform purpose-built for Tanzanian primary and secondary schools — turning days of manual academic reporting work into minutes. Administrators upload a single Excel file and the system automatically validates data, calculates scores, applies Tanzania's standard grading boundaries (primary A–E, secondary O-Level divisions), and ranks every student by position within their class. Claude AI then generates uniquely personalized, curriculum-aligned report comments for each pupil based on their individual subject strengths and weaknesses. Professional branded PDF report cards — complete with school logo, full subject table, total/average/position, AI comment, and headteacher signature fields — are produced and ready for print or digital distribution in under five minutes. Built on Supabase with row-level security for strict school-level data isolation, role-based access control (admin/teacher), and AI comment caching to control API costs, AutoOps Schools is the focused academic automation system engineered for Africa's growing private education sector.",
      technologies: "Next.js,TypeScript,Supabase,Claude AI,pdf-lib",
      highlights: ["Report cards ready in under 5 minutes", "Claude AI personalized comments per pupil", "Auto grade, rank & O-Level division calculation", "Multi-tenant with Supabase RLS school isolation"],
      github: "",
      link: "https://tz-schools-auto-ops-cloud.vercel.app/",
      featured: true,
      screenshot: "/images/projects/autoops-schools.png",
    },
    {
      title: "FastTrack Transportation",
      category: "Transportation Platform",
      description:
        "FastTrack Transportation is a mission-critical, full-stack NEMT (Non-Emergency Medical Transportation) platform serving FastTrack Transportation LLC in Madison, Wisconsin. The platform powers end-to-end trip lifecycle management: real-time ride booking, wheelchair-accessible vehicle scheduling, Medicaid billing data integration, driver dispatch, and live GPS tracking all through a high-performance, mobile-optimized interface. Backed by a Supabase real-time database and a Next.js frontend, the system processes thousands of trips monthly with a 98% on-time pickup rate, serving 500+ registered clients and maintaining a 4.9/5 client satisfaction rating. Built for compliance, scale, and zero-downtime reliability — this platform is a blueprint for operational excellence in healthcare transportation.",
      technologies: "Next.js,Supabase,TypeScript,Tailwind CSS,AOS",
      highlights: ["10,000+ trips completed", "98% on-time pickup rate", "4.9/5 from 500+ reviews", "Wheelchair-accessible booking"],
      github: "",
      link: "https://www.fasttracktransportationllc.com/",
      featured: true,
      screenshot: "/images/projects/fasttrack.png",
    },
    {
      title: "Super Select Motors",
      category: "E-Commerce Platform",
      description:
        "Super Select Motors is a production-ready, full-stack automotive marketplace and showroom platform built for Tanzania's car market — engineered across three complete layers: a Next.js 16 + TypeScript frontend, a Laravel 13 + Filament-powered admin backend, and a cross-platform Expo/React Native mobile app for iOS and Android. Buyers browse multi-seller car listings with advanced search filters, image galleries, and wishlists, while the showroom lead system manages the full deal flow — from online selection through agent-assisted showroom delivery to completed purchase. A Filament admin panel gives staff control over listing approvals, lead assignment, accessories e-commerce, and bulk newsletter campaigns across subscriber segments. Role-based access (admin, staff, seller, buyer) is secured end-to-end with Laravel Sanctum, and the mobile app mirrors the web marketplace via the same API backend. Super Select Motors is a multi-layer, revenue-generating commerce platform engineered for the realities of emerging automotive markets.",
      technologies: "Next.js,TypeScript,Laravel,MySQL,Expo,React Native,Tailwind CSS,Filament",
      highlights: ["Next.js + Laravel + Mobile App (3-layer platform)", "Showroom lead system with agent workflow", "Filament admin: listings, leads, accessories e-commerce", "Cross-platform Expo/React Native mobile app"],
      github: "",
      link: "https://superselectmotors.com/",
      featured: true,
      screenshot: "/images/projects/super-select-motors.png",
    },
    {
      title: "Liropani",
      category: "Corporate Website",
      description:
        "LIROPANI (T) CO. LIMITED is a diversified Tanzanian company — and this platform is their complete multilingual digital presence, built on Next.js 16, React 19, and Tailwind CSS v4. The site spans the company's full portfolio: Mountain G Hotel for accommodation and guest services, Quickzy Tanzania (an Uber-like ride-hailing and logistics platform with App Store and Google Play integration), beverages, food services, and real estate. Built in both English and Kiswahili with dynamic language switching, the site showcases all 14 registered business activities and drives customer enquiries through an SMTP-powered contact form. A clean, data-driven architecture in lib/data/ ensures content updates never require touching components. Playwright E2E tested across all routes — Liropani is proof that enterprise-grade engineering and Tanzanian market reach go hand in hand.",
      technologies: "Next.js,React 19,TypeScript,Tailwind CSS,Nodemailer,Playwright",
      highlights: ["Multilingual (English + Kiswahili)", "Quickzy Tanzania — Uber-like ride-hailing service", "14 business activities across hotel, transport, beverages", "Playwright E2E tested across all routes"],
      github: "",
      link: "https://www.liropani.com/",
      featured: false,
      screenshot: "/images/projects/liropani.png",
    },
    {
      title: "Niccian Group Ltd",
      category: "Business Website",
      description:
        "Niccian Group Ltd needed more than a website they needed a digital presence that commands authority, builds trust, and converts visitors into clients. This project delivered a fully responsive, professionally architected corporate website on a robust Laravel backend with a polished, conversion-focused frontend. The result was a 60% measurable increase in client inquiries within months of launch. Every page was engineered to reflect the company's credibility from structured service portfolios and company milestones to a guided contact flow that routes prospects to the right team. For any business looking to establish or elevate their digital brand in the Tanzanian and East African market, this project is proof of what purposeful web engineering delivers.",
      technologies: "Laravel,HTML5,CSS3,JavaScript,Bootstrap,MySQL",
      highlights: ["60% more inquiries", "Responsive design", "Service portfolios", "Professional presentation"],
      github: "",
      link: "https://nicciangroup.co.tz/",
      featured: false,
      screenshot: "/images/projects/niccian-group.png",
    },
    {
      title: "Brightway Home Care",
      category: "Healthcare Platform",
      description:
        "Brightway Home Care is a full-stack digital platform purpose-built for a licensed adult family home in Madison, Wisconsin where trust, professionalism, and accessibility are non-negotiable. The platform features a polished service showcase, caregiver profile pages, structured inquiry forms with real-time Supabase backend processing, and a 24/7 accessible portal for prospective clients and their families. Designed with HIPAA-conscious principles minimal data exposure, secure form handling, and privacy-first architecture the platform earns family trust before they even make contact. Mobile-responsive, fast-loading, and engineered for conversion, Brightway's digital presence now serves as a round-the-clock client acquisition engine in a highly regulated, relationship-driven market.",
      technologies: "Next.js,Supabase,TypeScript,Tailwind CSS",
      highlights: ["Real-time inquiry management", "HIPAA-conscious design", "24/7 service portal", "Mobile-responsive"],
      github: "",
      link: "https://www.brightwayhomecarellc.com/",
      featured: false,
      screenshot: "/images/projects/brightway.png",
    },
    {
      title: "Shaun Racing",
      category: "Browser Game",
      description:
        "Shaun Racing is a fully browser-native, WebGL-powered car-dodging game engineered from the ground up with Phaser 3 — one of the most respected HTML5 game frameworks in the industry. Players choose from 4 premium vehicles (BMW, Ford, Lamborghini, Pagani) and race across 6 distinct environments (Canyon, City, Desert, Prairie, Icefield, Bridge), surviving an ever-escalating difficulty curve where obstacles spawn faster and top speed ramps every 10 seconds. The architecture spans 7 dedicated Phaser scenes with clean separation of concerns — PreloadScene, MenuScene, OptionScene, GameScene, ResultScene, HelpScene, and AboutScene — demonstrating the same modular engineering discipline applied to full-stack production systems. A custom sprite-numeral HUD, localStorage-persisted high scores, smooth lane-tween animations, and Phaser's FIT scale mode deliver a polished, fully responsive experience across all devices. The entire project is end-to-end tested with Playwright across all 24 car × road combination matrices and 800 m endurance runs, and deployed to Vercel via a Vite-optimised production build. Shaun Racing proves that serious, well-architected game engineering is fully achievable within the modern JavaScript ecosystem.",
      technologies: "Phaser 3,Vite,JavaScript,Playwright",
      highlights: ["4 cars × 6 environments", "WebGL/Canvas rendering", "Playwright E2E tested", "Responsive on any screen"],
      github: "",
      link: "https://shauncargame.vercel.app/",
      featured: false,
      screenshot: "/images/projects/shaun-racing.png",
    },
  ],

  // ============ EDUCATION ============
  education: [
    {
      school: "Punjabi University / India, Punjab",
      degree: "Master of Computer Applications (MCA)",
      duration: "2022 - 2024",
      image: "/images/punjabiuniverysity.webp",
    },
    {
      school: "Lovely Professional University / India, Punjab",
      degree: "Bachelor of Computer Applications (BCA)",
      duration: "2017 - 2020",
      image: "/images/lpu.webp",
    },
  ],

  // ============ EXPERIENCE ============
  experience: [
    {
      position: "Head of Engineering Team",
      company: "Matchez | UK",
      duration: "Nov 2025 – Present",
      image: "/images/matchez.png",
      descriptions: [
        "Joined as Senior Software Developer (Nov 2025 – Jul 2026), architecting and delivering core platform features for the Matchez app — a production matchmaking and social platform.",
        "Promoted to Head of Engineering Team (Jul 2026 – Present), leading the full engineering function: technical strategy, system architecture, team coordination, and delivery.",
        "Driving platform scalability, engineering standards, and end-to-end ownership of the technical roadmap across the entire product.",
      ],
    },
    {
      position: "CTO / Head Manager",
      company: "JoyUnity Innovations | United States",
      duration: "Feb 2025 – Present",
      image: "/images/joyunityinnovations.png",
      descriptions: [
        "Leading all technical operations as CTO — defining the engineering vision, architecture decisions, and technology strategy across all JoyUnity Innovations products.",
        "Managing and mentoring the engineering team, overseeing product development cycles, and ensuring scalable, production-grade delivery.",
        "Driving innovation in full-stack systems, AI integration, and cross-platform engineering as the company's most senior technical leader.",
      ],
    },
    {
      position: "Software Engineer",
      company: "Shaun Software Hub | Pune, India",
      duration: "Feb 2025 – Present",
      image: "/images/shaunsoftwarehub.png",
      descriptions: [
        "Designing and deploying scalable full-stack applications for client and internal products.",
        "Building AI-powered automation systems to streamline business workflows using LLMs and Playwright.",
        "Leading architecture, development, and end-to-end testing of production systems.",
      ],
    },
    {
      position: "Software Developer",
      company: "Chandorkar Technologies OPC Pvt. Ltd | India, Pune",
      duration: "Jul 2023 – Feb 2025",
      image: "/images/chandorkar.webp",
      descriptions: [
        "Built scalable web applications and APIs used across multiple client platforms React, Vue, Next.js, Node.js, Laravel.",
        "Improved system performance by 35% and optimised database efficiency across projects.",
        "Deployed secure cloud-based solutions using Docker, AWS, and modern DevOps practices.",
      ],
    },
    {
      position: "Senior Software Developer",
      company: "TaScript | India, Patiala",
      duration: "Jun 2022 – Jun 2023",
      image: "/images/tascript.webp",
      descriptions: [
        "Led frontend and backend development for mobile and web platforms with Laravel, Node.js, React, and Vue.",
        "Optimised deployment pipelines and improved system stability across production environments.",
      ],
    },
    {
      position: "Full-Stack Developer (Part-time)",
      company: "InIndia | India, Bengaluru",
      duration: "Mar 2022 – Dec 2022",
      image: "/images/inindia_logo.webp",
      descriptions: [
        "Designed and developed an employee management system using Laravel, MySQL, and JWT authentication.",
        "Delivered a secure, production-ready system for internal operations.",
      ],
    },
    {
      position: "PHP Web Developer",
      company: "Protolabz eServices | India, Phagwara",
      duration: "Oct 2021 – Jul 2022",
      image: "/images/protolabz_eservices_logo.webp",
      descriptions: [
        "Built and maintained CMS and eCommerce platforms using PHP, Laravel, WordPress, and Shopify.",
        "Improved performance, modernised UI components, and delivered backend API integrations.",
      ],
    },
    {
      position: "Full-Stack Developer",
      company: "navQuery | Tanzania, Dar es Salaam",
      duration: "Oct 2018 – Jun 2021",
      image: "/images/navquery.webp",
      descriptions: [
        "Contributed to a MERN-based search engine platform React, Node.js, Express, MongoDB.",
        "Designed user interfaces and backend services for scalable search architecture.",
      ],
    },
  ],

  // ============ CERTIFICATES ============
  certificates: [
    {
      title: "Full Stack Developer",
      description: "React.js, Express.js and +2 skills  Issued by Board Infinity (Nov 2019)",
      icon: "/images/board_infinity_logo.webp",
      link: "#",
    },
    {
      title: "Software Advanced Test Development",
      description: "Advanced QA methodologies and tools  Issued by QAMatters (Jul 2019)",
      icon: "/images/qat360_logo.webp",
      link: "#",
    },
  ],

  // ============ CONTACT ============
  contact: {
    title: "Connect With Me",
    description:
      "Open to Senior Full-Stack or AI Automation roles, remote engineering teams, high-impact SaaS or AI projects, and contract or long-term opportunities.",
    note: "Feel free to reach out via email or LinkedIn. I respond within 24 hours and look forward to exploring opportunities to build impactful systems together.",
  },

  // ============ FOOTER ============
  footer: "© 2026 Eckysaroyd Nyato. All Rights Reserved.",

  // ============ ABOUT ============
  about: {
    title: "About Me",
    highlight: "Senior Full-Stack & AI Automation Engineer",
    body: "I'm a Senior Full-Stack and AI Automation Engineer with 6+ years of proven experience designing, building, and deploying production-grade systems that solve real business problems at scale. I specialize in modern JavaScript ecosystems — Next.js, Node.js, TypeScript — cloud-native architectures, and intelligent automation powered by large language models.",
    quote: "I don't just write code — I build systems that create measurable business impact.",
    traits: ["Problem Solver", "Systems Thinker", "AI-First Engineer", "Clean Code Advocate"],
  },

  // ============ SERVICES ============
  services: [
    "Full-Stack Web Development",
    "AI & LLM Integration",
    "SaaS Platform Architecture",
    "API Design & Development",
    "Database Design & Optimization",
    "Cloud Deployment & DevOps",
  ],
};

export default info;
