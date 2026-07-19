import "server-only";

import { createClient } from "@supabase/supabase-js";

export const SUPABASE_BUCKET = "portfolio-assets";
const SUPABASE_TIMEOUT_MS = 2500;
let adminClient;

export function hasSupabaseConfig() {
  return Boolean(
    process.env.SUPABASE_ENABLED === "true" &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function createSupabaseAdmin() {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not enabled or its environment variables are incomplete.");
  }

  if (adminClient) {
    return adminClient;
  }

  adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        fetch: (input, init = {}) =>
          fetch(input, {
            ...init,
            signal: init.signal ?? AbortSignal.timeout(SUPABASE_TIMEOUT_MS),
          }),
      },
    },
  );

  return adminClient;
}
