import { useEffect, useState } from "react"

export interface ToastState {
  mensaje: string
  error: boolean
}

type Listener = (estado: ToastState | null) => void

let listeners: Listener[] = []
let timer: ReturnType<typeof setTimeout> | undefined

export function mostrarToast(mensaje: string, error = false) {
  const estado: ToastState = { mensaje, error }
  listeners.forEach((l) => l(estado))
  clearTimeout(timer)
  timer = setTimeout(() => listeners.forEach((l) => l(null)), 2200)
}

export function useToastState() {
  const [estado, setEstado] = useState<ToastState | null>(null)
  useEffect(() => {
    listeners.push(setEstado)
    return () => {
      listeners = listeners.filter((l) => l !== setEstado)
    }
  }, [])
  return estado
}
