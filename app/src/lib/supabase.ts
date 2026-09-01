import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let cliente: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (cliente) return cliente

  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (import.meta.env.DEV && !url?.startsWith("https://")) {
    throw new Error("VITE_SUPABASE_URL no está configurado — revisa app/.env.local")
  }

  cliente = createClient(url, anonKey)
  return cliente
}
