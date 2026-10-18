#!/usr/bin/env node
/**
 * seed-portfolio.mjs
 * Creates Supabase tables and seeds all portfolio data from user_info.ts
 * Run: node --env-file=.env.local scripts/seed-portfolio.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ── Raw SQL via PostgREST RPC bootstrap ─────────────────────────────────────
// We POST a function-creation SQL via the management API endpoint.
// If that's blocked, we fall back to direct fetch to the db endpoint.
async function execSQL(sql) {
  // Try calling an exec_sql rpc if it exists
  const { error: rpcError } = await supabase.rpc("exec_sql", { sql });
  if (!rpcError) return { error: null };

  // Bootstrap: create the exec_sql function using a raw REST call to PostgreSQL
  // via the Supabase pg REST API endpoint (available on hosted projects)
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ sql }),
  });

  if (resp.ok) return { error: null };
  return { error: new Error(`SQL failed: ${await resp.text()}`) };
}

// ── Bootstrap exec_sql function ──────────────────────────────────────────────
async function bootstrapExecSQL() {
  // Create exec_sql as a superuser function — requires service role
  const createFnSQL = `
    CREATE OR REPLACE FUNCTION exec_sql(sql text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql;
    END;
    $$;
  `;

  // We need to create this function itself — use a direct DB call
  // Supabase exposes /query endpoint on hosted projects when using service role
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ sql: "SELECT 1" }),
  });

  if (resp.ok) {
    console.log("✅  exec_sql function already exists");
    return true;
  }

  console.log("⚙️   exec_sql not found — creating via direct SQL...");

  // Use the Supabase pg endpoint for initial bootstrap
  const pgResp = await fetch(`${SUPABASE_URL}/pg/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: createFnSQL }),
  });

  if (pgResp.ok) {
    console.log("✅  exec_sql created via pg endpoint");
    return true;
  }

  console.log("⚠️   pg endpoint unavailable — using table-based SQL workaround");
  return false;
}

// ── Create tables via direct REST insertions ─────────────────────────────────
// Since PostgREST doesn't allow DDL, we create tables by calling exec_sql rpc
// which must be pre-created, OR we rely on the tables already existing.
// Strategy: attempt to insert into each table; if 42P01 (relation not found),
// create table via Supabase pg endpoint.

async function createTables() {
  console.log("\n📦  Creating tables...");

  const tables = [
    {
      name: "portfolio_meta",
      sql: `CREATE TABLE IF NOT EXISTS portfolio_meta (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        name text, role text, description text, summary text,
        photo text, email text, location text, availability text,
        github text, linkedin text,
        contact_title text, contact_description text, contact_note text,
        about_title text, about_highlight text, about_body text,
        about_quote text, about_traits text[], footer text
      );`,
    },
    {
      name: "projects",
      sql: `CREATE TABLE IF NOT EXISTS projects (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        sort_order int DEFAULT 0,
        title text NOT NULL, category text, description text,
        technologies text, highlights text[],
        github text, link text, featured boolean DEFAULT false, screenshot text
      );`,
    },
    {
      name: "skill_categories",
      sql: `CREATE TABLE IF NOT EXISTS skill_categories (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        sort_order int DEFAULT 0,
        key text UNIQUE NOT NULL, label text NOT NULL
      );`,
    },
    {
      name: "skills",
      sql: `CREATE TABLE IF NOT EXISTS skills (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        category_key text REFERENCES skill_categories(key) ON DELETE CASCADE,
        name text NOT NULL, sort_order int DEFAULT 0
      );`,
    },
    {
      name: "experience",
      sql: `CREATE TABLE IF NOT EXISTS experience (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        sort_order int DEFAULT 0,
        position text NOT NULL, company text, duration text,
        image text, descriptions text[]
      );`,
    },
    {
      name: "education",
      sql: `CREATE TABLE IF NOT EXISTS education (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        sort_order int DEFAULT 0,
        school text NOT NULL, degree text, duration text, image text
      );`,
    },
    {
      name: "certifications",
      sql: `CREATE TABLE IF NOT EXISTS certifications (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        sort_order int DEFAULT 0,
        title text NOT NULL, description text, icon text, link text
      );`,
    },
    {
      name: "services",
      sql: `CREATE TABLE IF NOT EXISTS services (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        sort_order int DEFAULT 0, name text NOT NULL
      );`,
    },
  ];

  for (const table of tables) {
    // Try exec_sql rpc first
    const { error } = await supabase.rpc("exec_sql", { sql: table.sql });
    if (!error) {
      console.log(`  ✅  ${table.name}`);
      continue;
    }

    // Try direct pg endpoint
    const resp = await fetch(`${SUPABASE_URL}/pg/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: table.sql }),
    });

    if (resp.ok) {
      console.log(`  ✅  ${table.name} (via pg)`);
    } else {
      const text = await resp.text();
      console.error(`  ❌  ${table.name}: ${text}`);
    }
  }
}

// ── Data ─────────────────────────────────────────────────────────────────────

const META = {
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
  github: "http://github.com/eckysaroyd",
  linkedin: "https://www.linkedin.com/in/eckysaroyd/",
  contact_title: "Connect With Me",
  contact_description:
    "Open to Senior Full-Stack or AI Automation roles, remote engineering teams, high-impact SaaS or AI projects, and contract or long-term opportunities.",
  contact_note:
    "Feel free to reach out via email or LinkedIn. I respond within 24 hours and look forward to exploring opportunities to build impactful systems together.",
  about_title: "About Me",
  about_highlight: "Senior Full-Stack & AI Automation Engineer",
  about_body:
    "I'm a Senior Full-Stack and AI Automation Engineer with 6+ years of proven experience designing, building, and deploying production-grade systems that solve real business problems at scale. I specialize in modern JavaScript ecosystems — Next.js, Node.js, TypeScript — cloud-native architectures, and intelligent automation powered by large language models.",
  about_quote:
    "I don't just write code — I build systems that create measurable business impact.",
  about_traits: ["Problem Solver", "Systems Thinker", "AI-First Engineer", "Clean Code Advocate"],
  footer: "© 2026 Eckysaroyd Nyato. All Rights Reserved.",
};

const PROJECTS = [
  {
    sort_order: 0,
    title: "Faanoole Properties",
    category: "Real Estate Platform",
    description:
      "Faanoole Properties is a production-grade, full-stack apartment management platform serving Faanoole Apartments — live with real tenants, leases, payments, and maintenance operations. The platform spans three layers: a polished public marketing website showcasing the building and available units, a MakeMyTrip-style unit booking and reservation system with reference-code tracking and unit holds requiring no login, and a fully featured resident portal where tenants manage lease documents, rent payments, maintenance tickets, and service requests. A powerful admin dashboard gives management complete control over tenants, units, payments, technician assignments, and a real-time maintenance mode toggle. Post-launch, the platform was expanded with a technician role workflow, vehicle tracking, PDF receipt generation, an AI assistant, tour scheduling, and advanced admin settings. Built on Next.js and Supabase with a battle-tested schema — audited for RLS, indexing, and additive migrations — Faanoole Properties is a blueprint for serious, production-ready real estate management engineering.",
    technologies: "Next.js,TypeScript,Supabase,Tailwind CSS,PLpgSQL",
    highlights: [
      "Live in production with real tenants",
      "Booking system with reference-code tracking",
      "Resident portal with payments & tickets",
      "AI assistant + technician workflow",
    ],
    github: "https://github.com/faanooleproperties/faanoole_properties",
    link: "https://faanooleapartments.com/",
    featured: true,
    screenshot: "/images/projects/faanoole.png",
  },
  {
    sort_order: 1,
    title: "Somali Fuel Company",
    category: "Business Website",
    description:
      "Somali Fuel Company is a full-stack digital platform built for a fuel distribution business — engineered to establish professional credibility, streamline client engagement, and support operational workflows in a sector where trust and reliability are non-negotiable. Built on Next.js and TypeScript with Supabase as the data backbone and Python-powered backend services for operational processing, the platform delivers a responsive, high-performance corporate presence with structured service showcasing, inquiry management, and a scalable architecture ready to grow with the business. Deployed on Vercel for global performance and zero-downtime reliability, this project demonstrates purposeful engineering for infrastructure-sector clients where digital professionalism is increasingly a differentiator.",
    technologies: "Next.js,TypeScript,Supabase,Python,Tailwind CSS",
    highlights: [
      "Full-stack corporate platform",
      "Python-powered backend services",
      "Supabase real-time backend",
      "Deployed on Vercel",
    ],
    github: "https://github.com/JoyUnityInnovations/somali-fuel-company",
    link: "https://www.somalifuelcompany.com/login",
    featured: false,
    screenshot: "/images/projects/somali-fuel.png",
  },
  {
    sort_order: 2,
    title: "Ruach Coffee",
    category: "Business Website",
    description:
      "Ruach Coffee is a premium coffee brand platform engineered to reflect the quality, identity, and customer experience that the Ruach Premium brand demands. Built on Next.js and TypeScript with a Supabase backend, the platform combines brand storytelling with a polished product showcase and customer engagement layer — delivering a fast, visually compelling digital presence that converts visitors into loyal customers. The architecture is built for performance and scale: server-side rendering for instant load times, Supabase for real-time data management, and a fully responsive design tuned for the modern consumer browsing on any device. Ruach Coffee is proof that premium brand engineering and technical rigour are not mutually exclusive.",
    technologies: "Next.js,TypeScript,Supabase,Tailwind CSS",
    highlights: [
      "Premium brand digital presence",
      "Next.js SSR for fast load times",
      "Supabase real-time backend",
      "Responsive across all devices",
    ],
    github: "https://github.com/shaunSoftwareHub/ruach-coffee",
    link: "https://ruachpremium.com/",
    featured: false,
    screenshot: "/images/projects/ruach-coffee.png",
  },
  {
    sort_order: 3,
    title: "AutoOps Schools",
    category: "AI SaaS Platform",
    description:
      "AutoOps Schools is a production-ready, multi-tenant AI SaaS platform purpose-built for Tanzanian primary and secondary schools — turning days of manual academic reporting work into minutes. Administrators upload a single Excel file and the system automatically validates data, calculates scores, applies Tanzania's standard grading boundaries (primary A–E, secondary O-Level divisions), and ranks every student by position within their class. Claude AI then generates uniquely personalized, curriculum-aligned report comments for each pupil based on their individual subject strengths and weaknesses. Professional branded PDF report cards — complete with school logo, full subject table, total/average/position, AI comment, and headteacher signature fields — are produced and ready for print or digital distribution in under five minutes. Built on Supabase with row-level security for strict school-level data isolation, role-based access control (admin/teacher), and AI comment caching to control API costs, AutoOps Schools is the focused academic automation system engineered for Africa's growing private education sector.",
    technologies: "Next.js,TypeScript,Supabase,Claude AI,pdf-lib",
    highlights: [
      "Report cards ready in under 5 minutes",
      "Claude AI personalized comments per pupil",
      "Auto grade, rank & O-Level division calculation",
      "Multi-tenant with Supabase RLS school isolation",
    ],
    github: "https://github.com/eckysaroyd",
    link: "https://tz-schools-auto-ops-cloud.vercel.app/",
    featured: true,
    screenshot: "/images/projects/autoops-schools.png",
  },
  {
    sort_order: 4,
    title: "FastTrack Transportation",
    category: "Transportation Platform",
    description:
      "FastTrack Transportation is a mission-critical, full-stack NEMT (Non-Emergency Medical Transportation) platform serving FastTrack Transportation LLC in Madison, Wisconsin. The platform powers end-to-end trip lifecycle management: real-time ride booking, wheelchair-accessible vehicle scheduling, Medicaid billing data integration, driver dispatch, and live GPS tracking all through a high-performance, mobile-optimized interface. Backed by a Supabase real-time database and a Next.js frontend, the system processes thousands of trips monthly with a 98% on-time pickup rate, serving 500+ registered clients and maintaining a 4.9/5 client satisfaction rating. Built for compliance, scale, and zero-downtime reliability — this platform is a blueprint for operational excellence in healthcare transportation.",
    technologies: "Next.js,Supabase,TypeScript,Tailwind CSS,AOS",
    highlights: [
      "10,000+ trips completed",
      "98% on-time pickup rate",
      "4.9/5 from 500+ reviews",
      "Wheelchair-accessible booking",
    ],
    github: "https://github.com/eckysaroyd",
    link: "https://www.fasttracktransportationllc.com/",
    featured: true,
    screenshot: "/images/projects/fasttrack.png",
  },
  {
    sort_order: 5,
    title: "Niccian Group Ltd",
    category: "Business Website",
    description:
      "Niccian Group Ltd needed more than a website they needed a digital presence that commands authority, builds trust, and converts visitors into clients. This project delivered a fully responsive, professionally architected corporate website on a robust Laravel backend with a polished, conversion-focused frontend. The result was a 60% measurable increase in client inquiries within months of launch. Every page was engineered to reflect the company's credibility from structured service portfolios and company milestones to a guided contact flow that routes prospects to the right team. For any business looking to establish or elevate their digital brand in the Tanzanian and East African market, this project is proof of what purposeful web engineering delivers.",
    technologies: "Laravel,HTML5,CSS3,JavaScript,Bootstrap,MySQL",
    highlights: [
      "60% more inquiries",
      "Responsive design",
      "Service portfolios",
      "Professional presentation",
    ],
    github: "https://github.com/eckysaroyd",
    link: "https://nicciangroup.co.tz/",
    featured: false,
    screenshot: "/images/projects/niccian-group.png",
  },
  {
    sort_order: 6,
    title: "Brightway Home Care",
    category: "Healthcare Platform",
    description:
      "Brightway Home Care is a full-stack digital platform purpose-built for a licensed adult family home in Madison, Wisconsin where trust, professionalism, and accessibility are non-negotiable. The platform features a polished service showcase, caregiver profile pages, structured inquiry forms with real-time Supabase backend processing, and a 24/7 accessible portal for prospective clients and their families. Designed with HIPAA-conscious principles minimal data exposure, secure form handling, and privacy-first architecture the platform earns family trust before they even make contact. Mobile-responsive, fast-loading, and engineered for conversion, Brightway's digital presence now serves as a round-the-clock client acquisition engine in a highly regulated, relationship-driven market.",
    technologies: "Next.js,Supabase,TypeScript,Tailwind CSS",
    highlights: [
      "Real-time inquiry management",
      "HIPAA-conscious design",
      "24/7 service portal",
      "Mobile-responsive",
    ],
    github: "https://github.com/eckysaroyd",
    link: "https://www.brightwayhomecarellc.com/",
    featured: false,
    screenshot: "/images/projects/brightway.png",
  },
  {
    sort_order: 7,
    title: "Shaun Racing",
    category: "Browser Game",
    description:
      "Shaun Racing is a fully browser-native, WebGL-powered car-dodging game engineered from the ground up with Phaser 3 — one of the most respected HTML5 game frameworks in the industry. Players choose from 4 premium vehicles (BMW, Ford, Lamborghini, Pagani) and race across 6 distinct environments (Canyon, City, Desert, Prairie, Icefield, Bridge), surviving an ever-escalating difficulty curve where obstacles spawn faster and top speed ramps every 10 seconds. The architecture spans 7 dedicated Phaser scenes with clean separation of concerns — PreloadScene, MenuScene, OptionScene, GameScene, ResultScene, HelpScene, and AboutScene — demonstrating the same modular engineering discipline applied to full-stack production systems. A custom sprite-numeral HUD, localStorage-persisted high scores, smooth lane-tween animations, and Phaser's FIT scale mode deliver a polished, fully responsive experience across all devices. The entire project is end-to-end tested with Playwright across all 24 car × road combination matrices and 800 m endurance runs, and deployed to Vercel via a Vite-optimised production build. Shaun Racing proves that serious, well-architected game engineering is fully achievable within the modern JavaScript ecosystem.",
    technologies: "Phaser 3,Vite,JavaScript,Playwright",
    highlights: [
      "4 cars × 6 environments",
      "WebGL/Canvas rendering",
      "Playwright E2E tested",
      "Responsive on any screen",
    ],
    github: "https://github.com/eckysaroyd/cargame",
    link: "https://shauncargame.vercel.app/",
    featured: false,
    screenshot: "/images/projects/shaun-racing.png",
  },
];

const SKILL_CATEGORIES = [
  { sort_order: 0, key: "ai_automation", label: "AI & Automation" },
  { sort_order: 1, key: "frontend",      label: "Frontend"        },
  { sort_order: 2, key: "backend",       label: "Backend"         },
  { sort_order: 3, key: "databases",     label: "Databases"       },
  { sort_order: 4, key: "devops",        label: "DevOps"          },
  { sort_order: 5, key: "design",        label: "Design"          },
  { sort_order: 6, key: "testing",       label: "Testing"         },
];

const SKILLS_BY_CATEGORY = {
  ai_automation: [
    "LLM Integrations", "AI Automation", "RAG Pipelines", "Prompt Engineering",
    "LLM Fine-tuning", "AI Agent Development", "Playwright", "Workflow Automation", "n8n", "Supabase Vector",
  ],
  frontend:  ["Next.js", "React.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap", "Phaser 3", "Vite"],
  backend:   ["Node.js", "Express.js", "Laravel", "PHP", "REST APIs", "Microservices", "CodeIgniter"],
  databases: ["PostgreSQL", "Supabase", "MySQL", "MongoDB"],
  devops:    ["AWS", "Docker", "CI/CD", "GitHub Actions", "GitLab", "Coolify", "Linux"],
  design:    ["Figma", "Photoshop", "CorelDRAW"],
  testing:   ["Playwright", "API Testing", "JWT Security"],
};

const EXPERIENCE = [
  {
    sort_order: 0,
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
    sort_order: 1,
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
    sort_order: 2,
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
    sort_order: 3,
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
    sort_order: 4,
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
    sort_order: 5,
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
    sort_order: 6,
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
    sort_order: 7,
    position: "Full-Stack Developer",
    company: "navQuery | Tanzania, Dar es Salaam",
    duration: "Oct 2018 – Jun 2021",
    image: "/images/navquery.webp",
    descriptions: [
      "Contributed to a MERN-based search engine platform React, Node.js, Express, MongoDB.",
      "Designed user interfaces and backend services for scalable search architecture.",
    ],
  },
];

const EDUCATION = [
  {
    sort_order: 0,
    school: "Punjabi University / India, Punjab",
    degree: "Master of Computer Applications (MCA)",
    duration: "2022 - 2024",
    image: "/images/punjabiuniverysity.webp",
  },
  {
    sort_order: 1,
    school: "Lovely Professional University / India, Punjab",
    degree: "Bachelor of Computer Applications (BCA)",
    duration: "2017 - 2020",
    image: "/images/lpu.webp",
  },
];

const CERTIFICATIONS = [
  {
    sort_order: 0,
    title: "Full Stack Developer",
    description: "React.js, Express.js and +2 skills  Issued by Board Infinity (Nov 2019)",
    icon: "/images/board_infinity_logo.webp",
    link: "#",
  },
  {
    sort_order: 1,
    title: "Software Advanced Test Development",
    description: "Advanced QA methodologies and tools  Issued by QAMatters (Jul 2019)",
    icon: "/images/qat360_logo.webp",
    link: "#",
  },
];

const SERVICES = [
  { sort_order: 0, name: "Full-Stack Web Development" },
  { sort_order: 1, name: "AI & LLM Integration"       },
  { sort_order: 2, name: "SaaS Platform Architecture" },
  { sort_order: 3, name: "API Design & Development"   },
  { sort_order: 4, name: "Database Design & Optimization" },
  { sort_order: 5, name: "Cloud Deployment & DevOps"  },
];

// ── Seed helpers ─────────────────────────────────────────────────────────────

async function clearAndSeed(tableName, rows) {
  // Delete all existing rows
  const { error: delError } = await supabase.from(tableName).delete().gte("sort_order", -999999);
  if (delError) {
    // Table might not have sort_order — try deleting by id
    const { data: existing } = await supabase.from(tableName).select("id");
    if (existing?.length) {
      const ids = existing.map((r) => r.id);
      await supabase.from(tableName).delete().in("id", ids);
    }
  }

  const { error: insError } = await supabase.from(tableName).insert(rows);
  if (insError) throw new Error(`Insert into ${tableName}: ${insError.message}`);
  console.log(`  ✅  ${tableName}: ${rows.length} row(s)`);
}

async function clearMeta() {
  const { data } = await supabase.from("portfolio_meta").select("id");
  if (data?.length) {
    await supabase.from("portfolio_meta").delete().in("id", data.map((r) => r.id));
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀  Portfolio seed script starting...\n");

  // Step 1: Create tables
  await createTables();

  // Step 2: Seed data
  console.log("\n🌱  Seeding data...");

  // portfolio_meta (single row)
  await clearMeta();
  const { error: metaError } = await supabase.from("portfolio_meta").insert(META);
  if (metaError) throw new Error(`Insert portfolio_meta: ${metaError.message}`);
  console.log("  ✅  portfolio_meta: 1 row");

  // projects
  await clearAndSeed("projects", PROJECTS);

  // skill_categories (clear skills first due to FK)
  const { data: existingSkillCats } = await supabase.from("skill_categories").select("id");
  if (existingSkillCats?.length) {
    // Delete skills first (FK cascade may handle this, but be safe)
    await supabase.from("skills").delete().gte("sort_order", -999999);
    await supabase.from("skill_categories").delete().in("id", existingSkillCats.map((r) => r.id));
  }
  const { error: catError } = await supabase.from("skill_categories").insert(SKILL_CATEGORIES);
  if (catError) throw new Error(`Insert skill_categories: ${catError.message}`);
  console.log(`  ✅  skill_categories: ${SKILL_CATEGORIES.length} row(s)`);

  // skills
  const skillRows = [];
  for (const [catKey, skillNames] of Object.entries(SKILLS_BY_CATEGORY)) {
    skillNames.forEach((name, i) => {
      skillRows.push({ category_key: catKey, name, sort_order: i });
    });
  }
  const { error: skillError } = await supabase.from("skills").insert(skillRows);
  if (skillError) throw new Error(`Insert skills: ${skillError.message}`);
  console.log(`  ✅  skills: ${skillRows.length} row(s)`);

  // experience
  await clearAndSeed("experience", EXPERIENCE);

  // education
  await clearAndSeed("education", EDUCATION);

  // certifications
  await clearAndSeed("certifications", CERTIFICATIONS);

  // services
  await clearAndSeed("services", SERVICES);

  console.log("\n✅  Seed complete! All data inserted successfully.");

  // Verify counts
  console.log("\n📊  Verification:");
  const tables = ["portfolio_meta", "projects", "skill_categories", "skills", "experience", "education", "certifications", "services"];
  for (const t of tables) {
    const { count } = await supabase.from(t).select("*", { count: "exact", head: true });
    console.log(`  ${t}: ${count} rows`);
  }
}

main().catch((err) => {
  console.error("\n❌  Seed failed:", err.message);
  process.exit(1);
});
