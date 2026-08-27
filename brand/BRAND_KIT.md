# Rutia — Brand Kit

**Rutia · Driver Track** — dashboard personal para conductores de plataformas (Uber/DiDi) para trackear ingresos, metas y decidir qué viajes tomar.

## Logo

Concepto: la letra "R" se transforma en un camino/ruta que converge hacia un punto (destino/ubicación), representando dirección y navegación — coherente con el propósito de la app (tracking de rutas y ganancias).

| Variante | Uso | Archivo |
|---|---|---|
| Positivo | Fondos claros / blanco | [`logo/rutia-logo-positivo.svg`](logo/rutia-logo-positivo.svg) |
| Negativo | Fondos oscuros (`#313031` — fondo real de la app) | [`logo/rutia-logo-negativo.svg`](logo/rutia-logo-negativo.svg) |

### ⚠️ Reglas de uso importantes
- Estos SVG **no tienen fondo transparente real**: las líneas de "ruta" dentro de la R están dibujadas como formas sólidas (casi blancas en la versión positiva, oscuras en la negativa), no como recortes verdaderos.
- **Positivo**: solo sobre fondo blanco puro (`#FFFFFF`).
- **Negativo**: solo sobre `#313031` exacto (coincide con el fondo real de la app).
- Pendiente (mejora futura): recrear el ícono con compound paths reales para que sea 100% transparente y funcione sobre cualquier fondo.

## Colores — fuente única de verdad

El logo definió la paleta; la app (`index.html`) ya la implementa vía CSS variables.

| Nombre | Variable CSS | HEX | Uso |
|---|---|---|---|
| Asfalto (fondo base) | `--asfalto` | `#313031` | Fondo principal de la app, tomado del oscuro del logo |
| Panel | `--panel` | `#3D3B3D` | Fondo de tarjetas/cards |
| Panel 2 | `--panel2` | `#383638` | Fondo de inputs, datos secundarios, insets |
| Línea | `--linea` | `#4C494C` | Bordes, separadores |
| Texto | `--texto` | `#E8ECF1` | Texto principal |
| Tenue | `--tenue` | `#A7A2A6` | Texto secundario/labels |
| Verde Rutia | `--verde` | `#289866` | Acento de marca (positivo/éxito/meta cumplida) — mismo verde del logo |
| Ámbar | `--ambar` | `#FFB020` | Estado de alerta/advertencia (semáforo, CTA principal) |
| Rojo | `--rojo` | `#FF4D5E` | Estado negativo/peligro |

Verde, ámbar y rojo forman el sistema "semáforo" — la metáfora visual central de la app (facturación del día = luz roja/ámbar/verde según meta).

## Tipografía

Dos fuentes con roles distintos:

| Fuente | Rol | Peso(s) |
|---|---|---|
| **Space Grotesk** | Solo el wordmark del logo (marca) | Bold (700) |
| **Inter** | Toda la interfaz de producto (títulos, botones, datos, formularios) | 400 / 500 / 700 / 800 |

**Por qué dos fuentes:** Space Grotesk le da personalidad geométrica al logo (dialoga con el ícono angular). Inter es neutral, extremadamente legible a tamaños pequeños, y tiene excelente soporte de números tabulares (`tabular-nums`) — crítico porque la app está llena de cifras (montos, horas, km) que cambian constantemente y no deben "saltar" el layout.

- Descarga: [Inter en Google Fonts](https://fonts.google.com/specimen/Inter) · [Space Grotesk en Google Fonts](https://fonts.google.com/specimen/Space+Grotesk)

## Casing (mayúsculas/minúsculas)

- **Sentence case (normal)**: títulos, botones, nav inferior, labels de formulario.
- **UPPERCASE**: reservado solo para micro-etiquetas de categoría a tamaño pequeño (`.eyebrow`, labels de datos tipo "$ / hora hoy", "días para el pago") — ahí sí cumplen función de jerarquía visual.

## Espaciado del lockup (logo)

- Espacio vertical ícono–wordmark: ~15–20% de la altura del ícono.
- Ícono y texto deben leerse como una sola unidad, no como dos bloques separados.

## Do's / Don'ts

✅ Usar el logo positivo sobre blanco y el negativo sobre `#313031`
✅ Verde/ámbar/rojo solo para su función de estado (semáforo), no como colores decorativos genéricos
✅ Inter en toda la UI; Space Grotesk únicamente en el wordmark del logo
✅ Sentence case en textos de acción (botones, nav, labels)

❌ No estirar ni deformar el ícono o el wordmark
❌ No usar el verde/ámbar/rojo fuera de su significado de estado
❌ No colocar el logo sobre fondos de color distintos a los definidos sin crear una versión adaptada
❌ No volver a mayúsculas en textos largos o de acción (reduce legibilidad y velocidad de lectura)
