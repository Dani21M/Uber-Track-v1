import { useCallback, useEffect, useState } from "react"
import { getSupabase } from "@/lib/supabase"
import type { Jornada, NuevaJornada } from "@/lib/types"

const supabase = getSupabase()
const CLAVE_LOCAL = "tablero_entradas"

function leerLocal(): Jornada[] {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_LOCAL) ?? "[]")
  } catch {
    return []
  }
}

function guardarLocal(jornadas: Jornada[]) {
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(jornadas))
}

export function useJornadas() {
  const [jornadas, setJornadas] = useState<Jornada[]>(leerLocal)
  const [loading, setLoading] = useState(true)

  const recargar = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("jornadas")
      .select("*")
      .order("fecha", { ascending: false })
    if (error) {
      setJornadas(leerLocal())
      setLoading(false)
      return
    }
    const siguientes = (data ?? []).map((d) => ({
      id: d.id,
      fecha: d.fecha,
      app: d.app,
      horas: +d.horas || 0,
      viajes: d.viajes || 0,
      bruto: d.bruto || 0,
      neto: d.neto || 0,
      km: +d.km || 0,
      gas: d.gas || 0,
    }))
    setJornadas(siguientes)
    guardarLocal(siguientes)
    setLoading(false)
  }, [])

  useEffect(() => {
    recargar()
  }, [recargar])

  async function agregar(nueva: NuevaJornada) {
    const { data, error } = await supabase.from("jornadas").insert(nueva).select().single()
    if (error || !data) return error?.message ?? "No se pudo guardar"
    setJornadas((prev) => {
      const siguientes = [data as Jornada, ...prev]
      guardarLocal(siguientes)
      return siguientes
    })
    return null
  }

  async function eliminar(id: number) {
    const { error } = await supabase.from("jornadas").delete().eq("id", id)
    if (error) return false
    setJornadas((prev) => {
      const siguientes = prev.filter((j) => j.id !== id)
      guardarLocal(siguientes)
      return siguientes
    })
    return true
  }

  async function vaciarTodo() {
    const { error } = await supabase.from("jornadas").delete().gt("id", 0)
    if (error) return false
    setJornadas([])
    guardarLocal([])
    return true
  }

  return { jornadas, loading, agregar, eliminar, vaciarTodo, recargar }
}
