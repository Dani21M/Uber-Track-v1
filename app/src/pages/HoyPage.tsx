import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Semaforo } from "@/components/rutia/Semaforo"
import { GaugeMeta } from "@/components/rutia/GaugeMeta"
import { StatCard } from "@/components/rutia/StatCard"
import { useJornadas } from "@/hooks/useJornadas"
import { useConfig } from "@/hooks/useConfig"
import { fmt, fechaHoy } from "@/lib/format"
import {
  estadoSemaforo,
  escalaGaugeDia,
  escalaGaugeSemana,
  totalesHoy,
  totalesSemana,
  totalesMes,
  diasParaPago,
  mensajeCuota,
} from "@/lib/calculos"

export function HoyPage() {
  const { jornadas } = useJornadas()
  const { config } = useConfig()
  const hoy = useMemo(() => fechaHoy(), [])

  const hoyTotales = totalesHoy(jornadas, hoy)
  const semanaTotales = totalesSemana(jornadas, hoy)
  const mesTotales = totalesMes(jornadas, hoy)

  const { estado, mensaje } = estadoSemaforo(hoyTotales.bruto, config, hoyTotales.cantidad > 0)
  const escalaDia = escalaGaugeDia(config)
  const semanaEscala = escalaGaugeSemana(config)
  const dias = diasParaPago(new Date(), config.diaPago)
  const cuota = mensajeCuota(mesTotales.bruto, config.diaPago)

  const horaHoy = hoyTotales.horas > 0 ? fmt(hoyTotales.bruto / hoyTotales.horas) : "—"

  return (
    <div className="flex flex-col gap-3.5">
      <Card className="p-4">
        {estado ? <Semaforo estado={estado} /> : <p className="text-sm text-tenue">{mensaje}</p>}
        {estado && <p className="mt-1.5 text-sm text-tenue">{mensaje}</p>}
        <div className="mt-3.5">
          <GaugeMeta valor={hoyTotales.bruto} meta={config.meta} escala={escalaDia} />
        </div>
        <div className="mt-3.5 grid grid-cols-3 gap-2">
          <StatCard valor={fmt(hoyTotales.bruto)} etiqueta="Bruto hoy" />
          <StatCard valor={horaHoy} etiqueta="$/hora" />
          <StatCard valor={String(hoyTotales.viajes)} etiqueta="Viajes" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="mb-1 text-[0.68rem] font-medium tracking-[0.14em] text-tenue uppercase">
          Semana
        </div>
        <GaugeMeta
          valor={semanaTotales.bruto}
          meta={semanaEscala.meta}
          escala={semanaEscala.escala}
        />
        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <StatCard valor={fmt(semanaTotales.gas)} etiqueta="Gasolina" />
          <StatCard valor={fmt(semanaTotales.neto)} etiqueta="Neto" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="mb-1 text-[0.68rem] font-medium tracking-[0.14em] text-tenue uppercase">
          Mes y cuota
        </div>
        <div className="grid grid-cols-2 gap-2">
          <StatCard valor={fmt(mesTotales.bruto)} etiqueta="Bruto mes" />
          <StatCard valor={`${dias} días`} etiqueta={`Para el día ${config.diaPago}`} />
        </div>
        <p className="mt-3 text-sm text-tenue">{cuota}</p>
      </Card>
    </div>
  )
}
