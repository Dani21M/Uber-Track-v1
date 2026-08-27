# Rutia

**Rutia** (antes "RutIA") es un copiloto inteligente para conductores de apps de transporte (Uber, DiDi, inDrive) en Colombia y Latinoamérica. Analiza cada viaje en tiempo real, muestra un semáforo de rentabilidad neta (verde/ámbar/rojo) y da un resumen financiero diario para ayudar al conductor a ganar más sin adivinar.

---

## Estado actual del proyecto

Este repo tiene dos partes en paralelo, en distintas etapas:

| Carpeta | Qué es | Estado |
| :--- | :--- | :--- |
| [`index.html`](index.html) | Dashboard funcional de una sola página (HTML/CSS/JS vanilla), conectado a Supabase | 🟢 Prototipo en uso — es la versión "real" hoy |
| [`app/`](app/) | Proyecto Vite + React + TypeScript + Tailwind, pensado como base de la futura app | 🟡 Scaffold inicial, sin lógica de negocio todavía |

La visión de producto completa (V1 nativa Android con overlay flotante sobre Uber/DiDi) está descrita en `docs/`, pero **todavía no está construida**; hoy existe el dashboard web (`index.html`) como validación temprana del concepto (semáforo, metas, registro de viajes).

## Concepto del producto (V1 objetivo)

* **Semáforo de Rentabilidad Neta**: cada solicitud de viaje se evalúa contra el costo de combustible y las metas del conductor ($/km, $/hora) y se clasifica en verde/ámbar/rojo.
* **Burbuja flotante sobre Uber/DiDi/inDrive**: lee la pantalla vía `AccessibilityService` (Android) y muestra el veredicto sin salir de la app de transporte.
* **Copiloto de voz**: dicta el veredicto del viaje por audio para no distraer al conductor.
* **Coach Financiero IA**: resumen diario en lenguaje natural al cerrar turno (Supabase Edge Function + Claude API).

Detalle completo del flujo, pantallas y stack técnico objetivo: [`docs/PRODUCT_SPEC_Y_ROADMAP.md`](docs/PRODUCT_SPEC_Y_ROADMAP.md).

## Roadmap (8 semanas, ver detalle en docs)

1. **Semanas 1-2**: Accesibilidad + overlay flotante (Android/Kotlin).
2. **Semanas 3-4**: Motor de cálculo del semáforo, calibración de vehículo, copiloto de voz.
3. **Semanas 5-6**: Supabase (perfiles, viajes, config) + Coach Financiero IA + soporte inDrive.
4. **Semanas 7-8**: Beta cerrada con conductores reales, QA, publicación en Google Play.

## Mercado

Rutia compite en el espacio de "copilotos de rentabilidad" para conductores de plataforma, junto a apps como **Ruta Rentable**, **Driveria**, **Rakvio**, **Maxymo**, **Gridwise** y **Drivvo**. La diferenciación buscada es soporte real para **inDrive** (negociación de tarifa) y filtro/rechazo automático de viajes no rentables — funciones que hoy la mayoría de la competencia no resuelve bien. Análisis completo de competidores y precios: [`docs/INVESTIGACION_MERCADO.md`](docs/INVESTIGACION_MERCADO.md).

## Marca

Logo, colores, tipografía y reglas de uso en [`brand/BRAND_KIT.md`](brand/BRAND_KIT.md). El verde de marca (`#289866`) es también el color de "éxito/meta cumplida" en el sistema de semáforo de la app — no es solo un color decorativo.

## Presupuesto

Bitácora de gastos (herramientas de IA y diseño) y proyección de costos de lanzamiento (Google Play Console, dominio) en [`docs/GASTOS_Y_PRESUPUESTO.md`](docs/GASTOS_Y_PRESUPUESTO.md).

## Documentación

Todo el detalle vive en [`docs/`](docs/README.md):

1. [`PRODUCT_SPEC_Y_ROADMAP.md`](docs/PRODUCT_SPEC_Y_ROADMAP.md) — especificación funcional V1 y cronograma.
2. [`GASTOS_Y_PRESUPUESTO.md`](docs/GASTOS_Y_PRESUPUESTO.md) — gastos realizados y proyectados.
3. [`INVESTIGACION_MERCADO.md`](docs/INVESTIGACION_MERCADO.md) — análisis de competencia en Colombia/LatAm.

## Desarrollo local

```bash
# Dashboard actual (index.html): solo abrirlo en el navegador, no necesita build.

# Scaffold React (app/), si vas a construir la próxima versión ahí:
cd app
npm install
npm run dev
```
