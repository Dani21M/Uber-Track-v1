import { useToastState } from "@/hooks/useToast"
import { cn } from "@/lib/utils"

export function Toast() {
  const estado = useToastState()
  return (
    <div
      className={cn(
        "num pointer-events-none fixed bottom-24 left-1/2 z-60 -translate-x-1/2 rounded-full px-5.5 py-2.5 text-sm font-extrabold text-asfalto opacity-0 transition-opacity",
        estado && "opacity-100",
        estado?.error ? "bg-rojo text-white" : "bg-verde"
      )}
    >
      {estado?.mensaje}
    </div>
  )
}
