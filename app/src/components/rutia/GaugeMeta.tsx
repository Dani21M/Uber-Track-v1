import { fmt } from "@/lib/format"
import { porcentajeGauge } from "@/lib/calculos"

export function GaugeMeta({
  valor,
  meta,
  escala,
}: {
  valor: number
  meta: number
  escala: number
}) {
  const pct = porcentajeGauge(valor, escala)
  const metaPct = escala > 0 ? Math.min(100, (meta / escala) * 100) : 0

  return (
    <div className="pb-5">
      <div className="num text-2xl font-bold text-texto">{fmt(valor)}</div>
      <div className="relative mt-2 h-[18px] rounded-full border border-linea bg-panel-2">
        <div
          className="h-full max-w-full rounded-full bg-[linear-gradient(90deg,var(--rojo),var(--ambar)_55%,var(--verde))] transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute -top-1 -bottom-1 w-0.5 bg-texto/70"
          style={{ left: `${metaPct}%` }}
        />
        <div
          className="num absolute top-[22px] -translate-x-1/2 text-[0.62rem] whitespace-nowrap text-tenue"
          style={{ left: `${metaPct}%` }}
        >
          meta {fmt(meta)}
        </div>
      </div>
    </div>
  )
}
