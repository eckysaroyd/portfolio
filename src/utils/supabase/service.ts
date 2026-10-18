import { createClient } from "@supabase/supabase-js";

// Service-role client — lazy so env vars are read at request time, not build time
export function getSupabaseService() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
