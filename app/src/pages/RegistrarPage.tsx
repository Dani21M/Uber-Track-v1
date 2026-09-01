import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RegistroItem } from "@/components/rutia/RegistroItem"
import { useJornadas } from "@/hooks/useJornadas"
import { mostrarToast } from "@/hooks/useToast"
import { fechaHoy } from "@/lib/format"
import type { AppPlataforma } from "@/lib/types"
import { cn } from "@/lib/utils"

const APPS: { valor: AppPlataforma; etiqueta: string }[] = [
  { valor: "uber", etiqueta: "Uber" },
  { valor: "didi", etiqueta: "DiDi" },
  { valor: "ambas", etiqueta: "Ambas" },
]

const CAMPOS_VACIOS = { horas: "", viajes: "", bruto: "", neto: "", km: "", gas: "" }
type Campo = keyof typeof CAMPOS_VACIOS

export function RegistrarPage() {
  const { jornadas, agregar, eliminar } = useJornadas()
  const [fecha, setFecha] = useState(fechaHoy())
  const [app, setApp] = useState<AppPlataforma>("uber")
  const [campos, setCampos] = useState(CAMPOS_VACIOS)
  const [enviando, setEnviando] = useState(false)

  function actualizar(campo: Campo, valor: string) {
    setCampos((prev) => ({ ...prev, [campo]: valor }))
  }

  async function guardar() {
    const horas = parseFloat(campos.horas) || 0
    const bruto = parseInt(campos.bruto, 10) || 0
    if (!horas && !bruto) {
      mostrarToast("Ingresa al menos horas y facturado", true)
      return
    }
    setEnviando(true)
    const error = await agregar({
      fecha,
      app,
      horas,
      viajes: parseInt(campos.viajes, 10) || 0,
      bruto,
      neto: parseInt(campos.neto, 10) || 0,
      km: parseFloat(campos.km) || 0,
      gas: parseInt(campos.gas, 10) || 0,
    })
    setEnviando(false)
    if (error) {
      mostrarToast("Sin conexión: intenta de nuevo", true)
      return
    }
    setCampos(CAMPOS_VACIOS)
    mostrarToast("Jornada guardada ✓")
  }

  async function borrar(id: number) {
    const ok = await eliminar(id)
    if (!ok) {
      mostrarToast("Sin conexión: intenta de nuevo", true)
      return
    }
    mostrarToast("Jornada borrada")
  }

  return (
    <div className="flex flex-col gap-3.5">
      <Card className="p-4">
        <div className="mb-1 text-[0.68rem] font-medium tracking-[0.14em] text-tenue uppercase">
          Registrar jornada · 2 minutos
        </div>

        <Label htmlFor="rFecha" className="mt-3.5">
          Fecha
        </Label>
        <Input
          id="rFecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="mt-1.5 h-11"
        />

        <Label className="mt-3.5">App</Label>
        <div className="mt-1.5 flex gap-2">
          {APPS.map(({ valor, etiqueta }) => (
            <button
              key={valor}
              type="button"
              onClick={() => setApp(valor)}
              className={cn(
                "flex-1 rounded-[10px] border border-linea bg-panel-2 py-3 text-sm font-bold text-tenue transition-colors",
                app === valor && "border-ambar bg-ambar text-asfalto"
              )}
            >
              {etiqueta}
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div>
            <Label htmlFor="rHoras">Horas conectada</Label>
            <Input
              id="rHoras"
              type="number"
              inputMode="decimal"
              step="0.5"
              placeholder="6.5"
              className="mt-1.5 h-11"
              value={campos.horas}
              onChange={(e) => actualizar("horas", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rViajes">Viajes</Label>
            <Input
              id="rViajes"
              type="number"
              inputMode="numeric"
              placeholder="11"
              className="mt-1.5 h-11"
              value={campos.viajes}
              onChange={(e) => actualizar("viajes", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <div>
            <Label htmlFor="rBruto">Facturado bruto $</Label>
            <Input
              id="rBruto"
              type="number"
              inputMode="numeric"
              placeholder="145000"
              className="mt-1.5 h-11"
              value={campos.bruto}
              onChange={(e) => actualizar("bruto", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rNeto">Neto (post comisión) $</Label>
            <Input
              id="rNeto"
              type="number"
              inputMode="numeric"
              placeholder="108000"
              className="mt-1.5 h-11"
              value={campos.neto}
              onChange={(e) => actualizar("neto", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <div>
            <Label htmlFor="rKm">Km del día</Label>
            <Input
              id="rKm"
              type="number"
              inputMode="numeric"
              placeholder="95"
              className="mt-1.5 h-11"
              value={campos.km}
              onChange={(e) => actualizar("km", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rGas">Gasolina $</Label>
            <Input
              id="rGas"
              type="number"
              inputMode="numeric"
              placeholder="41000"
              className="mt-1.5 h-11"
              value={campos.gas}
              onChange={(e) => actualizar("gas", e.target.value)}
            />
          </div>
        </div>

        <Button className="mt-4 h-11 w-full text-sm" onClick={guardar} disabled={enviando}>
          Guardar jornada
        </Button>
      </Card>

      <Card className="p-4">
        <div className="mb-1 text-[0.68rem] font-medium tracking-[0.14em] text-tenue uppercase">
          Últimas jornadas
        </div>
        {jornadas.length === 0 ? (
          <p className="py-6 text-center text-sm leading-relaxed text-tenue">
            Aún no hay jornadas.
            <br />
            Tu primera se guarda aquí y alimenta todo el tablero.
          </p>
        ) : (
          <div className="divide-y divide-linea">
            {jornadas.slice(0, 15).map((j) => (
              <RegistroItem key={j.id} jornada={j} onBorrar={() => borrar(j.id)} />
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
