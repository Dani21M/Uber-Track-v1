import { cn } from "@/lib/utils"

export type EstadoSemaforo = "rojo" | "ambar" | "verde"

const COLOR_ACTIVO: Record<EstadoSemaforo, string> = {
  rojo: "bg-rojo shadow-[0_0_12px_var(--rojo)]",
  ambar: "bg-ambar shadow-[0_0_12px_var(--ambar)]",
  verde: "bg-verde shadow-[0_0_12px_var(--verde)]",
}

const LUCES: EstadoSemaforo[] = ["rojo", "ambar", "verde"]

export function Semaforo({ estado }: { estado: EstadoSemaforo }) {
  return (
    <div className="flex gap-1.5">
      {LUCES.map((luz) => (
        <div
          key={luz}
          className={cn(
            "size-3.5 rounded-full bg-linea transition-all",
            estado === luz && COLOR_ACTIVO[luz]
          )}
        />
      ))}
    </div>
  )
}
