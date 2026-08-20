# saasflow-portfolio

saasflow-portfolio es una aplicación web en React + TypeScript pensada para agencias y equipos de servicios que necesitan un espacio unificado para gestionar proyectos, clientes, tareas, cotizaciones, briefs, contratos y colaboradores.

## Overview
saasflow-portfolio centraliza el flujo operativo típico de negocios digitales pequeños y medianos:

- **Operación de proyectos** (proyectos, plantillas, progreso, prioridades)
- **Relación con clientes** (gestión tipo CRM)
- **Seguimiento de ejecución** (gestión de tareas en vista lista y kanban)
- **Proceso comercial** (cotizaciones, estados, totales)
- **Descubrimiento y legal** (briefs y contratos)
- **Gestión de equipo** (colaboradores y roles)

La implementación actual corresponde a un **MVP/prototipo frontend-first**: la mayoría de módulos están funcionales a nivel de interfaz, mientras que los datos todavía provienen de servicios mock locales (con notas en código para su reemplazo por Supabase/API reales).

## Features
- Dashboard con KPIs del negocio y tarjetas de resumen.
- Navegación lateral por módulos.
- Gestión de proyectos con búsqueda, filtros por estado, progreso, prioridades y equipo.
- Módulo de tareas con:
  - búsqueda y filtros múltiples
  - transición de estados
  - vista lista y kanban
  - estados vacíos y skeleton loaders
- Módulo CRM de clientes con categorización por estado y fuente.
- Sistema de cotizaciones con cálculos y seguimiento de estado.
- Sistema de briefs para levantamiento inicial y plantillas.
- Sistema de contratos con estado de firma y expiración.
- Directorio de colaboradores con roles y datos de perfil.
- Módulo de plantillas de proyecto reutilizables por fases.
- Estado global con React Context + reducer.
- Fetching/caché y mutaciones con TanStack React Query.
- Sistema de componentes reutilizables con shadcn/ui + Radix UI + Tailwind CSS.

## Tech Stack
- **Lenguaje:** TypeScript
- **Framework/UI:** React 18
- **Build tool:** Vite 5
- **Routing:** React Router DOM
- **Estado servidor:** TanStack React Query
- **Primitivas UI:** Radix UI
- **Sistema de componentes:** shadcn/ui
- **Estilos:** Tailwind CSS + tailwindcss-animate
- **Formularios/validación (disponible):** React Hook Form + Zod
- **Gráficos (disponible):** Recharts
- **Íconos:** Lucide React
- **Linting:** ESLint + TypeScript ESLint

## Architecture
El proyecto sigue una arquitectura frontend modular:

- `src/pages`: páginas funcionales (Projects, Tasks, Clients, Quotes, Briefs, Contracts, Collaborators, etc.)
- `src/components`: layout compartido, widgets de dashboard y composición UI
- `src/components/ui`: componentes reutilizables del sistema de diseño (estilo shadcn)
- `src/hooks`: hooks de consulta/mutación por dominio (`useProjects`, `useTasks`, etc.)
- `src/contexts`: contexto global y reducer (`AppContext`)
- `src/types`: modelos de dominio y tipos de formularios/filtros
- `src/lib`: utilidades compartidas

### Modelo de ejecución
1. `App.tsx` configura providers (React Query, contexto global, tooltips/toasts) y rutas.
2. Cada página consume hooks por dominio para consultas/mutaciones.
3. Los hooks llaman servicios mock (con latencia simulada) y actualizan la UI.
4. El contexto administra entidades globales, notificaciones y helpers.

## Installation
### Requisitos previos
- Node.js 18+ (recomendado 20+)
- npm (o Bun si prefieres)

### Pasos
```bash
git clone <url-de-tu-repositorio>
cd saasflow-portfolio
npm install
npm run dev
```

La aplicación corre en `http://localhost:8080` por defecto.

## Usage
- Abre el Dashboard en `/`.
- Usa la barra lateral izquierda para navegar por módulos.
- Prueba comportamientos:
  - Tareas: cambia estados, alterna lista/kanban, aplica filtros.
  - Cotizaciones/Briefs/Contratos: revisa estados de ciclo de vida y acciones.
  - Proyectos/Clientes/Colaboradores: usa búsqueda y filtros.

## Project Structure
```text
saasflow-portfolio/
├─ public/                  # assets estáticos
├─ src/
│  ├─ components/           # layout/dashboard/componentes compartidos
│  │  └─ ui/                # primitivas UI reutilizables (shadcn)
│  ├─ contexts/             # estado global (AppContext)
│  ├─ hooks/                # hooks por dominio + servicios mock
│  ├─ lib/                  # utilidades
│  ├─ pages/                # módulos por ruta
│  ├─ types/                # tipos de dominio y formularios/filtros
│  ├─ App.tsx               # providers + router
│  └─ main.tsx              # entrypoint de React
├─ tailwind.config.ts       # configuración de Tailwind
├─ vite.config.ts           # configuración de Vite + alias/plugins
└─ package.json             # scripts y dependencias
```

## Development
### Scripts disponibles
```bash
npm run dev      # servidor local
npm run build    # build de producción
npm run build:dev
npm run preview  # previsualización de build
npm run lint     # ejecutar eslint
```

### Flujo recomendado
1. Define/actualiza tipos en `src/types`.
2. Implementa comportamiento en `src/hooks`.
3. Consume hooks en `src/pages` y compón UI con `src/components/ui`.
4. Mantén estados de UI explícitos (loading, empty, error).
5. Sustituye gradualmente servicios mock por integraciones reales (Supabase/API).

## Roadmap
- Reemplazar servicios mock por persistencia/autenticación real (Supabase o backend equivalente).
- Añadir autenticación, control de acceso por rol y rutas protegidas.
- Implementar formularios CRUD completos con validación en todos los módulos.
- Completar portal de cliente y configuración (actualmente placeholders).
- Añadir pruebas automatizadas (unitarias, integración, end-to-end).
- Soporte de internacionalización en runtime (EN/ES).
- Pipeline CI/CD para lint/build/test y automatización de releases.

## License
Esto es personal y privado creado y desarrollado por **JootaCee**.

## Author
Esto es personal y privado creado y desarrollado por **JootaCee**.
