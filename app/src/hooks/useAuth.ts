import { useEffect, useState } from "react"
import type { Session } from "@supabase/supabase-js"
import { getSupabase } from "@/lib/supabase"

const supabase = getSupabase()

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return error?.message ?? null
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href },
    })
    return error?.message ?? null
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return { session, loading, signIn, signInWithGoogle, signOut }
}
