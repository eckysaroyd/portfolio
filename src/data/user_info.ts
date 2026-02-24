import type { UserInfo } from "@/types";

const info: UserInfo = {
  // ============ MAIN DETAILS ============
  main: {
    name: "Eckysaroyd Nyato",
    role: "Senior Full-Stack & AI Automation Engineer | Next.js · Node.js · LLM Integrations · Scalable SaaS Architect",
    description:
      "Senior Full-Stack and AI Automation Engineer with 6+ years of experience building scalable web platforms, automation systems, and AI-powered applications. I specialize in modern JavaScript ecosystems, cloud-ready architectures, and intelligent automation using LLMs  helping teams ship faster with production-grade systems.",
    summary:
      "I have designed and delivered everything from SaaS dashboards and multi-tenant platforms to AI workflow bots powered by Playwright and LLM integrations. My engineering approach combines clean architecture, automation-first thinking, and strong business awareness.",
    photo: "/ecky.jpg",
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
      title: "FastTrack Transportation",
      category: "Transportation Platform",
      description:
        "Full-stack NEMT (Non-Emergency Medical Transportation) platform for FastTrack Transportation LLC — Madison, WI. Features real-time booking, wheelchair-accessible ride scheduling, Medicaid billing integration, GPS tracking, and a Supabase-powered backend serving 500+ clients monthly.",
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
        "Modern business website for Tanzanian company with responsive design, service portfolios, and professional presentation — increasing client inquiries by 60%.",
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
        "Full-stack care management platform for a licensed adult family home in Madison, WI — featuring service showcases, inquiry forms, caregiver profiles, and Supabase-powered backend for real-time data management.",
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
        "Enterprise-grade herbal eCommerce platform built with Laravel and Vue.js, serving 10,000+ customers with comprehensive inventory management and seamless payment processing.",
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
        "Full-stack laundry service platform with automated scheduling, real-time tracking, and eco-friendly service options — increasing operational efficiency by 40%.",
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
        "Cross-platform creator monetization app with live streaming capabilities, wallet integration, and audience engagement tools — supporting 5,000+ content creators.",
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
        "Professional corporate website with custom CMS, featuring dynamic content management, team profiles, and service showcases with improved SEO performance.",
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
      image: "/punjabiuniverysity.webp",
    },
    {
      school: "Lovely Professional University / India, Punjab",
      degree: "Bachelor of Computer Applications (BCA)",
      duration: "2017 - 2020",
      image: "/lpu.webp",
    },
  ],

  // ============ EXPERIENCE ============
  experience: [
    {
      position: "Software Engineer",
      company: "Shaun Software Hub | India",
      duration: "Feb 2025 – Present",
      image: "/shaunsoftwarehub.png",
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
      image: "/chandorkar.webp",
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
      image: "/tascript.webp",
      descriptions: [
        "Led frontend and backend development for mobile and web platforms with Laravel, Node.js, React, and Vue.",
        "Optimised deployment pipelines and improved system stability across production environments.",
      ],
    },
    {
      position: "Full-Stack Developer (Part-time)",
      company: "InIndia | India, Bengaluru",
      duration: "Mar 2022 – Dec 2022",
      image: "/inindia_logo.webp",
      descriptions: [
        "Designed and developed an employee management system using Laravel, MySQL, and JWT authentication.",
        "Delivered a secure, production-ready system for internal operations.",
      ],
    },
    {
      position: "PHP Web Developer",
      company: "Protolabz eServices | India, Phagwara",
      duration: "Oct 2021 – Jul 2022",
      image: "/protolabz_eservices_logo.webp",
      descriptions: [
        "Built and maintained CMS and eCommerce platforms using PHP, Laravel, WordPress, and Shopify.",
        "Improved performance, modernised UI components, and delivered backend API integrations.",
      ],
    },
    {
      position: "Full-Stack Developer",
      company: "navQuery | Tanzania, Dar es Salaam",
      duration: "Oct 2018 – Jun 2021",
      image: "/navquery.webp",
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
      icon: "/board_infinity_logo.webp",
      link: "#",
    },
    {
      title: "Software Advanced Test Development",
      description: "Advanced QA methodologies and tools  Issued by QAMatters (Jul 2019)",
      icon: "/qat360_logo.webp",
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
