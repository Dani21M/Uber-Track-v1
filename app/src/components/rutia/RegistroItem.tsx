import { Trash2 } from "lucide-react"
import type { Jornada } from "@/lib/types"
import { fmt, fechaCorta } from "@/lib/format"

const ETIQUETA_APP: Record<Jornada["app"], string> = {
  uber: "Uber",
  didi: "DiDi",
  ambas: "Ambas",
}

export function RegistroItem({ jornada, onBorrar }: { jornada: Jornada; onBorrar: () => void }) {
  const porHora = jornada.horas > 0 ? `${fmt(jornada.bruto / jornada.horas)}/h` : ""
  return (
    <div className="flex items-center justify-between gap-2 py-2.5">
      <div>
        <div className="num flex items-center gap-1.5 text-sm font-bold">
          {fechaCorta(jornada.fecha)}
          <span className="rounded-full border border-linea px-1.5 py-0.5 text-[0.6rem] text-tenue">
            {ETIQUETA_APP[jornada.app]}
          </span>
        </div>
        <div className="num text-[0.72rem] text-tenue">
          {jornada.horas}h · {jornada.viajes} viajes · {jornada.km} km
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <div className="num font-extrabold">{fmt(jornada.bruto)}</div>
          <div className="num text-[0.72rem] text-tenue">{porHora}</div>
        </div>
        <button
          type="button"
          onClick={onBorrar}
          aria-label="Borrar jornada"
          className="p-1.5 text-tenue transition-colors hover:text-rojo"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  )
}
