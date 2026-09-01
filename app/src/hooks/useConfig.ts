import { useState } from "react"
import { CONFIG_DEFECTO, type ConfigConductor } from "@/lib/types"

const PREFIJO = "tablero_"

function leer(): ConfigConductor {
  const salida = { ...CONFIG_DEFECTO }
  for (const clave of Object.keys(CONFIG_DEFECTO) as (keyof ConfigConductor)[]) {
    const guardado = localStorage.getItem(PREFIJO + clave)
    if (guardado !== null) salida[clave] = Number(guardado)
  }
  return salida
}

export function useConfig() {
  const [config, setConfig] = useState<ConfigConductor>(leer)

  function guardar(next: ConfigConductor) {
    for (const [clave, valor] of Object.entries(next)) {
      localStorage.setItem(PREFIJO + clave, String(valor))
    }
    setConfig(next)
  }

  return { config, guardar }
}
