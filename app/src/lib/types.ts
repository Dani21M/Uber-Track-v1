export type AppPlataforma = "uber" | "didi" | "ambas"

export interface Jornada {
  id: number
  fecha: string
  app: AppPlataforma
  horas: number
  viajes: number
  bruto: number
  neto: number
  km: number
  gas: number
}

export type NuevaJornada = Omit<Jornada, "id">

export interface ConfigConductor {
  min: number
  meta: number
  hora: number
  tarifaMin: number
  kmMin: number
  costoKm: number
  diaPago: number
}

export const CONFIG_DEFECTO: ConfigConductor = {
  min: 107000,
  meta: 184000,
  hora: 20000,
  tarifaMin: 7000,
  kmMin: 1500,
  costoKm: 433,
  diaPago: 25,
}
