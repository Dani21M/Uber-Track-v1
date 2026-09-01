export function fmt(n: number): string {
  return "$" + Math.round(n).toLocaleString("es-CO")
}

export function fechaHoy(): string {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, "0")
  const dia = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mes}-${dia}`
}

export function fechaCorta(iso: string): string {
  const [, m, d] = iso.split("-")
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
  return `${Number(d)} ${meses[Number(m) - 1]}`
}
