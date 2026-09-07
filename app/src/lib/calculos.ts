import type { ConfigConductor, Jornada } from "@/lib/types"
import type { EstadoSemaforo } from "@/components/rutia/Semaforo"
import { fmt } from "@/lib/format"

export function lunesDe(fechaISO: string): string {
  const d = new Date(fechaISO + "T12:00:00")
  const dia = (d.getDay() + 6) % 7 // lun=0
  d.setDate(d.getDate() - dia)
  return d.toISOString().slice(0, 10)
}

export function estadoSemaforo(
  brutoHoy: number,
  config: ConfigConductor,
  hayRegistrosHoy: boolean
): { estado: EstadoSemaforo | null; mensaje: string } {
  if (!hayRegistrosHoy) return { estado: null, mensaje: "Sin registros hoy" }
  if (brutoHoy >= config.meta) return { estado: "verde", mensaje: "🟢 ¡Meta completa lograda!" }
  if (brutoHoy >= config.min)
    return { estado: "ambar", mensaje: "🟡 El carro ya se pagó · vas por la meta" }
  return {
    estado: "rojo",
    mensaje: `🔴 Bajo el mínimo · faltan ${fmt(config.min - brutoHoy)}`,
  }
}

export function escalaGaugeDia(config: ConfigConductor): number {
  return config.meta * 1.2
}

export function escalaGaugeSemana(config: ConfigConductor): {
  min: number
  meta: number
  escala: number
} {
  const min = config.min * 6
  const meta = config.meta * 6
  return { min, meta, escala: meta * 1.15 }
}

export function porcentajeGauge(valor: number, escala: number): number {
  if (escala <= 0) return 0
  return Math.min(100, (valor / escala) * 100)
}

export function totalesHoy(
  jornadas: Jornada[],
  hoy: string
): { bruto: number; horas: number; viajes: number; cantidad: number } {
  const deHoy = jornadas.filter((j) => j.fecha === hoy)
  return {
    bruto: deHoy.reduce((s, j) => s + j.bruto, 0),
    horas: deHoy.reduce((s, j) => s + j.horas, 0),
    viajes: deHoy.reduce((s, j) => s + j.viajes, 0),
    cantidad: deHoy.length,
  }
}

export function totalesSemana(
  jornadas: Jornada[],
  hoy: string
): { bruto: number; gas: number; neto: number } {
  const lunes = lunesDe(hoy)
  const deSemana = jornadas.filter((j) => j.fecha >= lunes && j.fecha <= hoy)
  const bruto = deSemana.reduce((s, j) => s + j.bruto, 0)
  const gas = deSemana.reduce((s, j) => s + j.gas, 0)
  const neto = deSemana.reduce((s, j) => s + j.neto, 0) - gas
  return { bruto, gas, neto }
}

export function totalesMes(
  jornadas: Jornada[],
  hoy: string
): { bruto: number; neto: number; horas: number; km: number } {
  const mesIni = hoy.slice(0, 8) + "01"
  const deMes = jornadas.filter((j) => j.fecha >= mesIni && j.fecha <= hoy)
  return {
    bruto: deMes.reduce((s, j) => s + j.bruto, 0),
    neto: deMes.reduce((s, j) => s + j.neto, 0) - deMes.reduce((s, j) => s + j.gas, 0),
    horas: deMes.reduce((s, j) => s + j.horas, 0),
    km: deMes.reduce((s, j) => s + j.km, 0),
  }
}

export function diasParaPago(hoy: Date, diaPago: number): number {
  const proximo = new Date(hoy.getFullYear(), hoy.getMonth(), diaPago, 12)
  if (proximo < hoy) proximo.setMonth(proximo.getMonth() + 1)
  const msPorDia = 1000 * 60 * 60 * 24
  return Math.ceil((proximo.getTime() - hoy.getTime()) / msPorDia)
}

export const CUOTA_PRESTAMO_APROX = 1115705

export function mensajeCuota(brutoMes: number, diaPago: number): string {
  if (brutoMes >= CUOTA_PRESTAMO_APROX) {
    return "Ya cubriste la cuota del mes con lo generado ✓"
  }
  return `Necesitas ${fmt(CUOTA_PRESTAMO_APROX - brutoMes)} más antes del día ${diaPago} para cubrir la cuota`
}
