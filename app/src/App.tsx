import { lazy, Suspense } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { AppShell } from "@/components/rutia/AppShell"
import { RequireAuth } from "@/components/rutia/RequireAuth"
import { LoginPage } from "@/pages/LoginPage"
import { HoyPage } from "@/pages/HoyPage"
import { RegistrarPage } from "@/pages/RegistrarPage"

const ProximamentePage = lazy(() =>
  import("@/pages/ProximamentePage").then((m) => ({ default: m.ProximamentePage }))
)

function AuthedLayout() {
  return (
    <RequireAuth>
      <AppShell>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </AppShell>
    </RequireAuth>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AuthedLayout />}>
        <Route path="/" element={<HoyPage />} />
        <Route path="/registrar" element={<RegistrarPage />} />
        <Route path="/lo-tomo" element={<ProximamentePage />} />
        <Route path="/tendencias" element={<ProximamentePage />} />
        <Route path="/ajustes" element={<ProximamentePage />} />
      </Route>
    </Routes>
  )
}

export default App
