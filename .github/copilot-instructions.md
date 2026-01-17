# AI Coding Agent Instructions for Atlas_OSCxSEDS

## Project Overview

This workspace contains **two distinct React+TypeScript applications** for a SEDS x OSC (Students for the Exploration and Development of Space x Open Source Community) space-themed CTF/hackathon platform:

1. **LANDINGPAGE-OSCxSEDS**: Marketing/information site with Gemini AI integration
2. **real_control_room**: Interactive CTF game/control room simulator
3. **Legacy**: chat_webpage, 2nd_chat_webpage (chat interfaces)

## Architecture & Key Patterns

### Monorepo Structure (Independent Vite Projects)

- Each project (`LANDINGPAGE-OSCxSEDS`, `real_control_room`) is **completely independent** with separate `package.json`, `tsconfig.json`, and Vite configs
- Build/run commands must be executed from within each project directory
- **Common tech stack**: React 19, TypeScript 5.8, Vite 6, Tailwind CSS

### LANDINGPAGE-OSCxSEDS: Multi-View Navigation

- Uses **client-side view routing** managed in `App.tsx` via `useState<'home' | 'gallery' | 'news' | 'forbidden'>()`
- No routing library (Router); views are conditionally rendered components
- **Scroll-based UI state**: Navbar blur effect triggers at `scrollY > 20px` (see [App.tsx](LANDINGPAGE-OSCxSEDS/App.tsx#L13-L22))
- Component props use `onNavigate` callback to change views (example: [Hero.tsx](LANDINGPAGE-OSCxSEDS/components/Hero.tsx#L3-L4))
- **Styling**: Tailwind with custom animations (`animate-in`, `fade-in`, `slide-in-from-bottom-4`)

### real_control_room: Game State Machine

- **Four game states**: `BOOT` → `ACTIVE` → `MELTDOWN` or `SUCCESS` (see [types.ts](real_control_room/types.ts))
- **Core mechanics** (see [constants.ts](real_control_room/constants.ts)):
  - 12 nozzles in grid layout (3 types: WORKING, BROKEN, PROXY)
  - 3-button activation sequence: IDs `[2, 7, 10]` must be activated in order
  - Each WORKING nozzle has an `unlockCode` (e.g., "PUMP-1", "COOL-X", "ROD-99")
  - Stability system: starts at 100, decreases by 15 per wrong attempt, regenerates at 0.5/tick
- **Terminal-based input**: [SystemTerminal](real_control_room/components/SystemTerminal.tsx) captures unlock codes via `onCommandSubmit(cmd: string)`
- **Boot sequence**: Triggered on BOOT state, runs 4 sequential log messages before transitioning to ACTIVE

### External Integrations

- **Gemini API** (LANDINGPAGE): [geminiService.ts](LANDINGPAGE-OSCxSEDS/geminiService.ts) uses `@google/genai` package
  - Model: `gemini-3-flash-preview`
  - System instruction: "You are the SEDS X OSC 'Neural Link' Mainframe" (cyber-punk tone)
  - Returns grounded responses with web search citations (`GroundingSource`)
  - API key injected via `process.env.GEMINI_API_KEY` (loaded in Vite config)

## Developer Workflows

### Build & Run

```bash
# LANDINGPAGE-OSCxSEDS
cd LANDINGPAGE-OSCxSEDS
npm install
npm run dev      # Vite dev server on port 3000
npm run build    # Outputs to dist/

# real_control_room
cd real_control_room
npm install
npm run dev      # Vite dev server on port 3000
npm run build
```

### Environment Setup

- **LANDINGPAGE**: Requires `.env` with `GEMINI_API_KEY` (set in Vite's `define` plugin)
- **real_control_room**: No external dependencies; runs standalone

### Type System

- Shared pattern: define interfaces in `types.ts` per project
- LANDINGPAGE types: [Mission, GroundingSource, ChatMessage](LANDINGPAGE-OSCxSEDS/types.ts)
- real_control_room types: [NozzleData, GameState, SystemLog](real_control_room/types.ts)
- Always use `React.FC<Props>` for component typing

## Project-Specific Conventions

### Component Props Pattern

All interactive components accept **navigation/callback props**:

- `onNavigate`: (view: 'home' | 'gallery' | 'news' | 'forbidden') => void
- `onBack`: () => void (for back navigation)
- `onCommandSubmit`: (cmd: string) => void (for terminal input)

Example: [Navbar.tsx](LANDINGPAGE-OSCxSEDS/components/Navbar.tsx#L7-L18) accepts `isScrolled`, `onNavigate`, `currentView`

### Styling Conventions

- **Color palette**: Dark mode (`bg-[#020617]`, slate/slate-900, cyan-500 accents)
- **Backdrop effects**: `backdrop-blur-xl`, `drop-shadow-[0_20px_80px_rgba(0,0,0,1)]`
- **Responsive**: `md:` breakpoint heavily used; mobile-first approach
- **Animations**: Tailwind built-ins + custom classes (check meta content for definitions)

### Game Logic Pattern (real_control_room)

State updates flow: **User Action** → `useCallback` handler → `setGameState` + `setActivatedIds`/`setErrorIds` + `addLog`

Example flow:

1. User clicks nozzle → checks if BROKEN/PROXY/WORKING
2. If WORKING → asks for terminal input (sets `pendingAuthNozzleId`)
3. Terminal submission → validates unlock code
4. Success → adds to `activatedIds`, checks if sequence complete
5. Failure → adds to `errorIds`, decreases stability, logs error

## Critical Files by Purpose

| File                                                                                               | Purpose                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [LANDINGPAGE-OSCxSEDS/App.tsx](LANDINGPAGE-OSCxSEDS/App.tsx)                                       | View routing + scroll state management             |
| [LANDINGPAGE-OSCxSEDS/geminiService.ts](LANDINGPAGE-OSCxSEDS/geminiService.ts)                     | Gemini API client + prompt engineering             |
| [real_control_room/App.tsx](real_control_room/App.tsx)                                             | Game state machine + core logic (301 lines)        |
| [real_control_room/constants.ts](real_control_room/constants.ts)                                   | Nozzle definitions + unlock codes + game constants |
| [real_control_room/components/SystemTerminal.tsx](real_control_room/components/SystemTerminal.tsx) | Terminal UI + command input (password validation)  |

## Common Tasks

**Adding a new view to LANDINGPAGE**:

1. Create component in `components/`, export it
2. Add type to `App.tsx` view state union
3. Add route handler + navigation button in Navbar
4. Use `onNavigate('newView')` to trigger

**Adding nozzle interaction to real_control_room**:

1. Update `NOZZLES` array in `constants.ts`
2. Add unlock code if WORKING type
3. Handle activation logic in `App.tsx`'s nozzle click handler
4. Update win condition check (`ACTIVATION_SEQUENCE` validation)

**Using Gemini API responses**:

- Always handle `GroundingSource[]` return value for citations
- Wrap API calls with error boundary; return "ENCRYPTION STRENGTH TOO HIGH. ACCESS DENIED." fallback
- Respect `process.env.GEMINI_API_KEY` being empty in production

## Performance & Accessibility Notes

- Vite config sets `host: '0.0.0.0'` for network access
- Real control room keeps logs limited to last 20 entries (see [App.tsx](real_control_room/App.tsx#L38))
- Navbar uses `passive: true` event listener for scroll performance
- Terminal auto-scrolls on log updates; inputs auto-focus when active
