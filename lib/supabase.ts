import { createClient } from "@supabase/supabase-js";

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create a singleton instance of the Supabase client
const createSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};

// For client components
export const createBrowserClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be defined");
  }
  return createSupabaseClient();
};

// For server components and actions
export const createServerClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be defined");
  }
  return createSupabaseClient();
};
