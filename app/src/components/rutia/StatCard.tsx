export function StatCard({ valor, etiqueta }: { valor: string; etiqueta: string }) {
  return (
    <div className="rounded-[10px] border border-linea bg-panel-2 px-3.5 py-2.5">
      <div className="num text-xl font-extrabold text-foreground">{valor}</div>
      <div className="text-[0.68rem] tracking-wide text-tenue uppercase">{etiqueta}</div>
    </div>
  )
}
