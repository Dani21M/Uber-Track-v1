import { NavLink } from "react-router-dom"
import { TrafficCone, PenLine, Calculator, TrendingUp, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const ITEMS = [
  { to: "/", label: "Hoy", icon: TrafficCone, end: true },
  { to: "/registrar", label: "Registrar", icon: PenLine, end: false },
  { to: "/lo-tomo", label: "¿Lo tomo?", icon: Calculator, end: false },
  { to: "/tendencias", label: "Tendencias", icon: TrendingUp, end: false },
  { to: "/ajustes", label: "Ajustes", icon: Settings, end: false },
]

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-linea bg-panel px-1 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))]">
      {ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              "flex flex-1 flex-col items-center gap-1 rounded-[10px] py-1.5 text-[0.65rem] tracking-wide text-tenue transition-colors",
              isActive && "text-ambar"
            )
          }
        >
          <Icon className="size-5" strokeWidth={2.25} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
