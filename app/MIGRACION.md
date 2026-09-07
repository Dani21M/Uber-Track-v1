# Migración de Rutia: HTML plano → React (app/)

Este documento resume el plan y el estado de la migración de la app de un único
`index.html` (JS vanilla) a esta carpeta `app/` (React + Vite + TypeScript). Está pensado
para retomar el trabajo en una nueva sesión sin perder contexto.

## Contexto y objetivo

`index.html` (raíz del repo) es la app "Rutia" para trackear jornadas de Uber/DiDi: 744
líneas de JS vanilla, sin build, con Supabase como backend (tabla `jornadas`). El usuario
quiere que la app siga siendo **web por ahora**, pero con una arquitectura que facilite
portarla a Android/iOS más adelante — por eso se migra a React (`app/`), separando la
lógica de negocio (cálculos, acceso a datos) en `lib/`/`hooks/` sin dependencias de
DOM/navegador, para que esa capa se reutilice si algún día se porta a React Native.

**Decisiones ya tomadas:**
- El campo `app` en Supabase se migró a minúsculas (`uber`/`didi`/`ambas`) para coincidir
  con el tipo ya existente en `types.ts` — **ya ejecutado y verificado** (ver Fase 1).
- El proyecto es personal, de un solo usuario — no se configura `vitest`/cobertura/
  `eslint-plugin-security` todavía; se retoma cuando haya más código que proteger.
- Supabase siempre está configurado en este proyecto (`.env.local` tiene credenciales
  reales) — el modo "solo local sin Supabase" del HTML original no se replica.

## ⚠️ Incidente de pérdida de datos (2026-09-01) — leer antes de continuar

Durante la Fase 2, otra sesión/terminal ejecutó (aparentemente) un `git clean -fd` +
reset/checkout sobre el repo completo mientras esta sesión trabajaba, **borrando todo el
trabajo no commiteado**: Fases 1 y 2 completas, brand kit copiado a `app/public/logo/`,
varios componentes `ui/` (avatar, separator, switch, tabs) y skills instalados en
`.agents/skills/`. Se reconstruyó lo que había en el contexto de la conversación (este
documento incluido), pero `LoginPage.tsx`, `Semaforo.tsx`, `GaugeMeta.tsx`,
`RequireAuth.tsx` y `Logo.tsx` son **reconstrucciones desde cero** (basadas en el
`index.html` original y las convenciones del resto del código), no los archivos
originales exactos — revisar su diseño visual con calma la próxima vez que se abra la app.

**Lección reforzada: nunca correr más de una sesión (de IA o terminal) editando este
repo al mismo tiempo, y hacer commits frecuentes de trabajo en progreso** (aunque sea a
una rama `wip`) para que un incidente así no vuelva a perder días de trabajo.

## Estructura de carpetas objetivo

```
app/src/
  pages/
    LoginPage.tsx         ✅ hecho (reconstruido tras el incidente)
    HoyPage.tsx            ✅ hecho
    RegistrarPage.tsx      ✅ hecho (Fase 2)
    CalculadoraPage.tsx    ⏳ pendiente (Fase 3, "¿Lo tomo?")
    TendenciasPage.tsx     ⏳ pendiente (Fase 4)
    AjustesPage.tsx        ⏳ pendiente (Fase 5)
    ProximamentePage.tsx   ✅ placeholder para las rutas de arriba
  components/
    rutia/
      AppShell.tsx          ✅ (header + children + BottomNav + Toast)
      BottomNav.tsx          ✅ 5 pestañas reales
      RequireAuth.tsx        ✅ gate de auth (reconstruido)
      Semaforo.tsx            ✅ (reconstruido)
      GaugeMeta.tsx            ✅ (reconstruido, con prop `escala`)
      StatCard.tsx              ✅
      RegistroItem.tsx           ✅ (Fase 2, fila de jornada con borrar)
      Toast.tsx                   ✅ (Fase 2, toast global sin dependencias nuevas)
    brand/Logo.tsx              ✅ (reconstruido, usa brand/logo/*.svg copiado a public/logo/)
    ui/                          shadcn — avatar/separator/switch/tabs pendientes de
                                  regenerar con `npx shadcn add <componente>` cuando se
                                  necesiten (se perdieron en el incidente, no tenían
                                  lógica custom)
  hooks/
    useAuth.ts               ✅ signInWithGoogle, usa getSupabase()
    useConfig.ts              sin cambios
    useJornadas.ts              ✅ usa getSupabase() + mirror a localStorage + fallback
                                 offline + vaciarTodo() + eliminar() → Promise<boolean>
    useToast.ts                 ✅ (Fase 2, toast global con listeners)
  lib/
    calculos.ts               ✅ funciones puras para Hoy (ver abajo)
    supabase.ts                 ✅ getSupabase() con memoización + error claro en dev
    format.ts                    ✅ fechaHoy() corregido a horario local
    types.ts                      sin cambios
  App.tsx                     ✅ routing con BrowserRouter, lazy+Suspense en rutas futuras
  main.tsx                     ✅ envuelto en BrowserRouter
```

## Fase 1 — Login + Hoy ✅ COMPLETADA

Implementado y verificado en el navegador (`npm run dev`):
- Login con email/contraseña + botón "Entrar con Google" (`useAuth.signInWithGoogle`).
- Redirección correcta a `/` tras login exitoso (`useNavigate` en `LoginPage`).
- `RequireAuth` redirige a `/login` si no hay sesión.
- Vista "Hoy": semáforo, gauge del día (meta real vs. escala visual separadas), gauge de
  semana, tarjetas de bruto/$-hora/viajes, tarjeta de mes y cuenta regresiva de pago,
  mensaje de cuota del préstamo.
- Migración de datos en Supabase: campo `app` normalizado a minúsculas (2 filas, sin
  pérdida de datos, verificado con `SELECT app, COUNT(*) FROM jornadas GROUP BY app`).
- `lib/calculos.ts` (framework-agnostic, sin DOM): `lunesDe`, `estadoSemaforo`,
  `escalaGaugeDia`/`escalaGaugeSemana`, `porcentajeGauge`, `totalesHoy`/`totalesSemana`/
  `totalesMes`, `diasParaPago`, `CUOTA_PRESTAMO_APROX` + `mensajeCuota`.

**Incidente durante la Fase 1** (para tenerlo presente): hubo dos sesiones de Claude Code
corriendo en paralelo sobre esta misma carpeta, y una sobrescribió `calculos.ts` con una
versión incompatible (rompiendo el build). Se restauró la versión correcta. Ver también
el incidente más grave de pérdida de datos del 2026-09-01 arriba.

## Fase 2 — Registrar ✅ COMPLETADA

- `useJornadas.ts` extendido: mirror a `localStorage` (`tablero_entradas`), fallback de
  lectura offline si Supabase falla, `vaciarTodo()`, y `eliminar()` devuelve
  `Promise<boolean>`.
- `useToast.ts` + `Toast.tsx`: sistema de toast global sin dependencias nuevas (no existe
  primitivo de toast en shadcn todavía), montado una sola vez en `AppShell`.
- `RegistroItem.tsx`: fila de jornada con botón borrar.
- `RegistrarPage.tsx`: formulario (fecha, app, horas, viajes, bruto, neto, km, gas),
  validación igual al original (`bruto || horas` requerido), lista de últimas 15.

## Fases pendientes (mismo patrón: hook + funciones puras en `calculos.ts` + página delgada)

### Fase 3 — Calculadora ("¿Lo tomo?")
- `evaluarViaje()` en `calculos.ts`: checks de tarifa/$-km/$-hora/recogida≤7min, veredicto
  tomalo/dudoso/dejalo, neto aproximado (comisión 25%, gasto = km_total × costoKm).
- `Veredicto.tsx` + `CalculadoraPage.tsx`.

### Fase 4 — Tendencias
- Agregaciones en `calculos.ts`: `$/hora` por día de la semana (bucket lun-dom) y por app.
- `BarraFila.tsx` + `TendenciasPage.tsx`, reutiliza `totalesMes`.

### Fase 5 — Ajustes
- `exportarCSV()` en `calculos.ts` (string puro, `navigator.clipboard` se queda en el
  componente).
- Formulario de config (7 campos), botón borrar-todo (`vaciarTodo` + `window.confirm`),
  botón cerrar sesión (`signOut`).
- Necesitará `ui/switch.tsx` — regenerar con `npx shadcn add switch` si no existe.

## Verificación manual (repetir en cada fase)

Comparar `npm run dev` (`app/`) contra `index.html` abierto directo en el navegador,
mismo proyecto Supabase.

**Pendiente de revisar visualmente tras el incidente del 2026-09-01**: `LoginPage`,
`Semaforo`, `GaugeMeta` y `Logo` son reconstrucciones — confirmar que el resultado visual
coincide con lo que había antes (colores, tamaños, comportamiento del gauge/semáforo).

## Archivos clave para retomar

- `app/src/lib/calculos.ts`
- `app/src/hooks/useJornadas.ts`
- `app/src/hooks/useAuth.ts`
- `app/src/App.tsx`
- `app/src/pages/HoyPage.tsx` (referencia de patrón para las páginas que faltan)
