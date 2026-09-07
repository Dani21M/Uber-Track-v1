import type { ReactNode } from "react"
import { Logo } from "@/components/brand/Logo"
import { BottomNav } from "@/components/rutia/BottomNav"
import { Toast } from "@/components/rutia/Toast"

function fechaLarga() {
  return new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-24">
      <header className="flex items-baseline justify-between border-b border-linea px-4.5 py-3.5">
        <Logo size={26} />
        <span className="num text-xs text-tenue capitalize">{fechaLarga()}</span>
      </header>
      <main className="mx-auto max-w-lg px-3.5 pt-4">{children}</main>
      <BottomNav />
      <Toast />
    </div>
  )
}
