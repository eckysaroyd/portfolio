#!/usr/bin/env node
/**
 * create-tables.mjs
 * Creates all portfolio tables via Supabase Management API
 * Run: node --env-file=.env.local scripts/create-tables.mjs
 */

const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const PROJECT_REF  = "wwklyyiphpvizdniyczp";
const BASE         = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

if (!ACCESS_TOKEN) {
  console.error("Missing SUPABASE_ACCESS_TOKEN");
  process.exit(1);
}

async function runSQL(sql, label) {
  const resp = await fetch(BASE, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  if (resp.ok) {
    console.log(`  ✅  ${label}`);
    return true;
  } else {
    const text = await resp.text();
    console.error(`  ❌  ${label} (${resp.status}): ${text}`);
    return false;
  }
}

async function main() {
  console.log("📦  Creating tables via Supabase Management API...\n");

  await runSQL(`
    CREATE TABLE IF NOT EXISTS portfolio_meta (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      name text, role text, description text, summary text,
      photo text, email text, location text, availability text,
      github text, linkedin text,
      contact_title text, contact_description text, contact_note text,
      about_title text, about_highlight text, about_body text,
      about_quote text, about_traits text[], footer text
    );
  `, "portfolio_meta");

  await runSQL(`
    CREATE TABLE IF NOT EXISTS projects (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      sort_order int DEFAULT 0,
      title text NOT NULL, category text, description text,
      technologies text, highlights text[],
      github text, link text, featured boolean DEFAULT false, screenshot text
    );
  `, "projects");

  await runSQL(`
    CREATE TABLE IF NOT EXISTS skill_categories (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      sort_order int DEFAULT 0,
      key text UNIQUE NOT NULL, label text NOT NULL
    );
  `, "skill_categories");

  await runSQL(`
    CREATE TABLE IF NOT EXISTS skills (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      category_key text REFERENCES skill_categories(key) ON DELETE CASCADE,
      name text NOT NULL, sort_order int DEFAULT 0
    );
  `, "skills");

  await runSQL(`
    CREATE TABLE IF NOT EXISTS experience (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      sort_order int DEFAULT 0,
      position text NOT NULL, company text, duration text,
      image text, descriptions text[]
    );
  `, "experience");

  await runSQL(`
    CREATE TABLE IF NOT EXISTS education (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      sort_order int DEFAULT 0,
      school text NOT NULL, degree text, duration text, image text
    );
  `, "education");

  await runSQL(`
    CREATE TABLE IF NOT EXISTS certifications (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      sort_order int DEFAULT 0,
      title text NOT NULL, description text, icon text, link text
    );
  `, "certifications");

  await runSQL(`
    CREATE TABLE IF NOT EXISTS services (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      sort_order int DEFAULT 0, name text NOT NULL
    );
  `, "services");

  // Verify
  console.log("\n📊  Verifying tables exist...");
  const resp = await fetch(BASE, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name;",
    }),
  });
  const tables = await resp.json();
  console.log("  Tables:", tables.map((r) => r.table_name).join(", "));
  console.log("\n✅  Done!");
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
