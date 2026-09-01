import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/brand/Logo"
import { useAuth } from "@/hooks/useAuth"

export function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  async function entrar() {
    setError(null)
    setEnviando(true)
    const mensaje = await signIn(email.trim(), password)
    setEnviando(false)
    if (mensaje) {
      setError("Correo o contraseña incorrectos.")
      return
    }
    navigate("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-sm p-5">
        <div className="mb-4 flex justify-center">
          <Logo size={32} />
        </div>
        <div className="mb-1 text-[0.68rem] font-medium tracking-[0.14em] text-tenue uppercase">
          Iniciar sesión
        </div>

        <Label htmlFor="loginEmail" className="mt-3.5">
          Correo
        </Label>
        <Input
          id="loginEmail"
          type="email"
          autoComplete="username"
          className="mt-1.5 h-11"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label htmlFor="loginPass" className="mt-3.5">
          Contraseña
        </Label>
        <Input
          id="loginPass"
          type="password"
          autoComplete="current-password"
          className="mt-1.5 h-11"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") entrar()
          }}
        />

        {error && <p className="mt-2 text-sm text-rojo">{error}</p>}

        <Button className="mt-4 h-11 w-full text-sm" onClick={entrar} disabled={enviando}>
          Entrar
        </Button>
        <Button variant="outline" className="mt-2 h-11 w-full text-sm" onClick={signInWithGoogle}>
          Entrar con Google
        </Button>
      </Card>
    </div>
  )
}
