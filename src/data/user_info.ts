import type { UserInfo } from "@/types";

const info: UserInfo = {
  // ============ MAIN DETAILS ============
  main: {
    name: "Eckysaroyd Nyato",
    role: "Senior Full-Stack & AI Automation Engineer | Next.js · Node.js · LLM Integrations · Scalable SaaS Architect",
    description:
      "Senior Full-Stack and AI Automation Engineer with 6+ years of proven experience designing, building, and deploying production-grade systems that solve real business problems at scale. I specialize in modern JavaScript ecosystems — Next.js, Node.js, TypeScript — cloud-native architectures, and intelligent automation powered by large language models. From multi-tenant SaaS platforms and AI-driven workflow engines to high-traffic eCommerce and healthcare portals, I help organizations ship faster, operate smarter, and scale confidently.",
    summary:
      "I architect and deliver complete digital solutions — from multi-tenant SaaS dashboards and AI workflow automation to enterprise eCommerce platforms and mission-critical healthcare portals. Every system I build is engineered with clean architecture, performance-first thinking, and a clear focus on measurable business outcomes. If you need a technical partner who understands both the code and the business impact it creates, let's build something exceptional together.",
    photo: "/images/ecky.jpg",
    email: "enyato98@gmail.com",
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
    frontend: ["Next.js", "React.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap"],
    backend: ["Node.js", "Express.js", "Laravel", "PHP", "REST APIs", "Microservices", "CodeIgniter"],
    databases: ["PostgreSQL", "Supabase", "MySQL", "MongoDB"],
    devops: ["AWS", "Docker", "CI/CD", "GitHub Actions", "GitLab", "Coolify", "Linux"],
    design: ["Figma", "Photoshop", "CorelDRAW"],
    testing: ["Playwright", "API Testing", "JWT Security"],
  },

  // ============ PROJECTS ============
  projects: [
    {
      title: "AutoOps Cloud",
      category: "AI SaaS Platform",
      description:
        "AutoOps Cloud is a production-ready, multi-tenant AI SaaS platform engineered to eliminate the most time-consuming burden in Tanzanian private schools: academic result processing. What once consumed days of manual spreadsheet work now takes minutes administrators upload a single Excel file and the system automatically calculates scores, applies grade boundaries, ranks every student by class and stream, and leverages Claude AI to generate uniquely personalized, curriculum-aligned report comments for each pupil. Professional PDF report cards are rendered and ready for print or digital distribution in under five minutes. Built on a robust multi-tenant architecture with role-based access control, school-level data isolation, and Supabase real-time infrastructure, AutoOps Cloud is the scalable academic automation solution built for Africa's growing private education sector.",
      technologies: "Next.js,TypeScript,Supabase,Tailwind CSS,Claude AI",
      highlights: ["70% reduction in report prep time", "AI-generated student comments", "Auto ranking & grading", "Multi-school multi-tenant"],
      github: "https://github.com/eckysaroyd",
      link: "https://github.com/eckysaroyd",
      featured: true,
    },
    {
      title: "FastTrack Transportation",
      category: "Transportation Platform",
      description:
        "FastTrack Transportation is a mission-critical, full-stack NEMT (Non-Emergency Medical Transportation) platform serving FastTrack Transportation LLC in Madison, Wisconsin. The platform powers end-to-end trip lifecycle management: real-time ride booking, wheelchair-accessible vehicle scheduling, Medicaid billing data integration, driver dispatch, and live GPS tracking all through a high-performance, mobile-optimized interface. Backed by a Supabase real-time database and a Next.js frontend, the system processes thousands of trips monthly with a 98% on-time pickup rate, serving 500+ registered clients and maintaining a 4.9/5 client satisfaction rating. Built for compliance, scale, and zero-downtime reliability — this platform is a blueprint for operational excellence in healthcare transportation.",
      technologies: "Next.js,Supabase,TypeScript,Tailwind CSS,AOS",
      highlights: ["10,000+ trips completed", "98% on-time pickup rate", "4.9/5 from 500+ reviews", "Wheelchair-accessible booking"],
      github: "https://github.com/eckysaroyd",
      link: "https://www.fasttracktransportationllc.com/",
      featured: true,
    },
    {
      title: "Niccian Group Ltd",
      category: "Business Website",
      description:
        "Niccian Group Ltd needed more than a website they needed a digital presence that commands authority, builds trust, and converts visitors into clients. This project delivered a fully responsive, professionally architected corporate website on a robust Laravel backend with a polished, conversion-focused frontend. The result was a 60% measurable increase in client inquiries within months of launch. Every page was engineered to reflect the company's credibility from structured service portfolios and company milestones to a guided contact flow that routes prospects to the right team. For any business looking to establish or elevate their digital brand in the Tanzanian and East African market, this project is proof of what purposeful web engineering delivers.",
      technologies: "Laravel,HTML5,CSS3,JavaScript,Bootstrap,MySQL",
      highlights: ["60% more inquiries", "Responsive design", "Service portfolios", "Professional presentation"],
      github: "https://github.com/eckysaroyd",
      link: "https://nicciangroup.shaunsoftwarehub.com/",
      featured: false,
    },
    {
      title: "Brightway Home Care",
      category: "Healthcare Platform",
      description:
        "Brightway Home Care is a full-stack digital platform purpose-built for a licensed adult family home in Madison, Wisconsin where trust, professionalism, and accessibility are non-negotiable. The platform features a polished service showcase, caregiver profile pages, structured inquiry forms with real-time Supabase backend processing, and a 24/7 accessible portal for prospective clients and their families. Designed with HIPAA-conscious principles minimal data exposure, secure form handling, and privacy-first architecture the platform earns family trust before they even make contact. Mobile-responsive, fast-loading, and engineered for conversion, Brightway's digital presence now serves as a round-the-clock client acquisition engine in a highly regulated, relationship-driven market.",
      technologies: "Next.js,Supabase,TypeScript,Tailwind CSS",
      highlights: ["Real-time inquiry management", "HIPAA-conscious design", "24/7 service portal", "Mobile-responsive"],
      github: "https://github.com/eckysaroyd",
      link: "https://brightwayhomecare.vercel.app/",
      featured: false,
    },
    {
      title: "Kasudia Herbs",
      category: "E-Commerce Platform",
      description:
        "Kasudia Herbs is a fully custom-engineered, enterprise-grade eCommerce platform serving 10,000+ customers built to compete at scale without compromise on performance, reliability, or user experience. The Laravel backend drives comprehensive inventory management, dynamic product categorization, promotional pricing, and order lifecycle tracking, while the Vue.js storefront delivers a fast, intuitive shopping experience across all devices. Deployed via Docker and Coolify for containerized, zero-downtime production releases, the platform sustains 99.9% uptime with 30% faster page load times than its predecessor. This is not an off-the-shelf solution it is a custom-engineered retail engine designed to grow with the business and built to handle the demands of a serious eCommerce operation.",
      technologies: "Laravel,MySQL,Vue.js,Coolify,Docker,Tailwind CSS",
      highlights: ["10,000+ active users", "99.9% uptime", "30% faster load times", "Secure payment processing"],
      github: "https://github.com/eckysaroyd",
      link: "http://kasudia.com/",
      featured: true,
    },
    {
      title: "WoW Laundry",
      category: "Service Management",
      description:
        "WoW Laundry transformed a traditional laundry operation into a digitally-driven, efficiency-optimized service business and the numbers prove it. The full-stack platform features automated job scheduling, real-time order tracking, customer self-service booking, driver assignment workflows, service tier management, and a powerful admin dashboard unified into a single cohesive system. The result was a 40% increase in operational efficiency and a measurable reduction in manual coordination overhead and missed pickups. Built with Laravel and Vue.js on a responsive, mobile-first UI, WoW Laundry is a compelling example of how purposeful technology investment in service businesses translates directly into competitive advantage, customer loyalty, and bottom-line growth.",
      technologies: "Laravel,Vue.js,Tailwind CSS,JavaScript,MySQL",
      highlights: ["40% efficiency increase", "Real-time tracking", "Mobile-responsive", "Automated scheduling"],
      github: "https://github.com/eckysaroyd",
      link: "https://products.shaunsoftwarehub.com/",
      featured: true,
    },
    {
      title: "JoyUnity",
      category: "Social Platform",
      description:
        "JoyUnity is a cross-platform creator monetization ecosystem a technically sophisticated social platform engineered to empower 5,000+ content creators to build audiences, broadcast live, and earn revenue at scale. The platform combines a Laravel API backend with a Flutter mobile application and responsive web interface, delivering real-time live streaming, integrated digital wallets and payout processing, audience engagement tools, subscription management, and a unified creator dashboard. An API-first architecture ensures seamless consistency across web and mobile, while a scalable MySQL backend handles high-concurrency creator and viewer interactions without degradation. JoyUnity is a testament to what full-stack, cross-platform engineering looks like when built for scale — designed for creators, engineered for growth.",
      technologies: "Laravel,Flutter,PHP,JavaScript,Bootstrap,MySQL,API Integration",
      highlights: ["5,000+ creators", "Cross-platform support", "Live streaming", "Monetization tools"],
      github: "https://github.com/eckysaroyd",
      link: "https://joyunity.com/",
      featured: true,
    },
    {
      title: "mgcs.ca",
      category: "Corporate Website",
      description:
        "mgcs.ca is a professional corporate website built with a fully custom content management system delivering the flexibility of an enterprise platform without the overhead of off-the-shelf solutions. Built on Laravel with a jQuery-powered frontend, the platform features dynamic service pages, team profile management, project portfolio showcasing, and a secure admin panel that empowers non-technical staff to independently manage all website content. SEO-optimised from the ground up with structured metadata, semantic HTML, and fast-loading assets, the site drives organic search discovery and supports the company's long-term digital marketing strategy. A clean, well-documented codebase ensures the platform remains easy to extend and maintain as the business evolves a corporate digital asset that delivers lasting value.",
      technologies: "Laravel,PHP,MySQL,jQuery,HTML5,Bootstrap,CSS3",
      highlights: ["Custom CMS", "SEO optimized", "Admin panel", "Dynamic content"],
      github: "http://github.com/eckysaroyd",
      link: "http://mgcs.ca/",
      featured: false,
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
      position: "Software Engineer",
      company: "Shaun Software Hub | India",
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
  footer: "© 2025 Eckysaroyd Nyato. All Rights Reserved.",
};

export default info;
