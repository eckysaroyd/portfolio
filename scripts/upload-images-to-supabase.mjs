#!/usr/bin/env node
/**
 * Uploads all images from /public/images to Supabase portfolio-images bucket.
 * Run: node scripts/upload-images-to-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  console.error("Run: source .env.local first, or pass them as env vars");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const BUCKET = "portfolio-images";
const PUBLIC_DIR = join(__dirname, "..", "public", "images");

const MIME_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
};

function collectFiles(dir, prefix = "") {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const storagePath = prefix ? `${prefix}/${entry}` : entry;
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...collectFiles(fullPath, storagePath));
    } else {
      const ext = extname(entry).toLowerCase();
      if (MIME_TYPES[ext]) {
        files.push({ fullPath, storagePath, contentType: MIME_TYPES[ext] });
      }
    }
  }
  return files;
}

async function uploadAll() {
  const files = collectFiles(PUBLIC_DIR);
  console.log(`Found ${files.length} images to upload to bucket "${BUCKET}"\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const { fullPath, storagePath, contentType } of files) {
    const fileData = readFileSync(fullPath);
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileData, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error(`  FAILED  ${storagePath}: ${error.message}`);
      failed++;
    } else {
      console.log(`  OK      ${storagePath}`);
      uploaded++;
    }
  }

  console.log(`\nDone: ${uploaded} uploaded, ${failed} failed, ${skipped} skipped`);
}

uploadAll().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
