import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Portfolio meta (single row) ──────────────────────────────────────────────
export async function getPortfolioMeta() {
  const { data, error } = await supabase
    .from("portfolio_meta")
    .select("*")
    .single();
  if (error) throw new Error(`getPortfolioMeta: ${error.message}`);
  return data as {
    id: string;
    name: string;
    role: string;
    description: string;
    summary: string;
    photo: string;
    email: string;
    location: string;
    availability: string;
    github: string;
    linkedin: string;
    contact_title: string;
    contact_description: string;
    contact_note: string;
    about_title: string;
    about_highlight: string;
    about_body: string;
    about_quote: string;
    about_traits: string[];
    footer: string;
  };
}

// ── Projects ─────────────────────────────────────────────────────────────────
export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");
  if (error) throw new Error(`getProjects: ${error.message}`);
  return (data ?? []) as Array<{
    id: string;
    sort_order: number;
    title: string;
    category: string;
    description: string;
    technologies: string;
    highlights: string[];
    github: string;
    link: string;
    featured: boolean;
    screenshot?: string;
  }>;
}

// ── Skills ───────────────────────────────────────────────────────────────────
export async function getSkills() {
  const { data: categories, error } = await supabase
    .from("skill_categories")
    .select("key, skills(name, sort_order)")
    .order("sort_order");
  if (error) throw new Error(`getSkills: ${error.message}`);

  // Transform to: { ai_automation: string[], frontend: string[], ... }
  const result: Record<string, string[]> = {};
  for (const cat of categories ?? []) {
    result[cat.key] = ((cat.skills as Array<{ name: string; sort_order: number }>) ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => s.name);
  }
  return result as {
    ai_automation: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    devops: string[];
    design: string[];
    testing: string[];
  };
}

// ── Experience ───────────────────────────────────────────────────────────────
export async function getExperience() {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order");
  if (error) throw new Error(`getExperience: ${error.message}`);
  return (data ?? []) as Array<{
    id: string;
    sort_order: number;
    position: string;
    company: string;
    duration: string;
    image?: string;
    descriptions: string[];
  }>;
}

// ── Education ────────────────────────────────────────────────────────────────
export async function getEducation() {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("sort_order");
  if (error) throw new Error(`getEducation: ${error.message}`);
  return (data ?? []) as Array<{
    id: string;
    sort_order: number;
    school: string;
    degree: string;
    duration: string;
    image: string;
  }>;
}

// ── Certifications ───────────────────────────────────────────────────────────
export async function getCertifications() {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order");
  if (error) throw new Error(`getCertifications: ${error.message}`);
  return (data ?? []) as Array<{
    id: string;
    sort_order: number;
    title: string;
    description: string;
    icon: string;
    link: string;
  }>;
}

// ── Services ─────────────────────────────────────────────────────────────────
export async function getServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");
  if (error) throw new Error(`getServices: ${error.message}`);
  return ((data ?? []) as Array<{ name: string }>).map((s) => s.name);
}
