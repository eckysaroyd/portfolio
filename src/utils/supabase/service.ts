import { createClient } from "@supabase/supabase-js";

// Service-role client — JWT key, server-side only, bypasses RLS
export const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
