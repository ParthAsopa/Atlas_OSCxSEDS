# ☢️ ATLAS CTF: FINAL STAGE - REACTOR CONTROL

> **WARNING: CRITICAL SYSTEM FAILURE DETECTED**  
> **SECTOR 7G - RBMK-1000 CORE INTEGRITY: COMPROMISED**

Welcome to the final stage of the **ATLAS CTF**, collaboratively organized by **OSC (Open Source Community)** and **SEDS (Students for the Exploration and Development of Space)**.

This repository contains the source code for the "PROJECT ATLAS – ORBITAL CASCADE" challenge. Below is a detailed technical breakdown of how the application is structured, what the files do, and how the simulation logic operates.

---

## 📂 Project Structure & Code Breakdown

This application is built with **React 19**, **TypeScript**, and **Tailwind CSS**. It simulates an old-school Soviet reactor control interface without requiring any external backend or API keys.

### 1. Core Logic (`App.tsx`)

The heart of the application. It manages the global state machine:

- **`gameState`**: Tracks the current phase:
  - `BOOT`: The initial terminal scrolling sequence.
  - `ACTIVE`: The interactive gameplay phase.
  - `MELTDOWN`: Triggered if `stability` hits 0.
  - `SUCCESS`: Triggered when all 3 required nozzles are activated.
- **`stability`**: A numeric value (0-100). If this depletes, the game ends.
- **`activatedIds`**: An array tracking which correct nozzles have been successfully enabled.
- **`pendingAuthNozzleId`**: Tracks if the user is currently typing a password for a specific nozzle in the terminal.

### 2. Configuration & Secrets (`constants.ts`)

This file acts as the "database" and rule definition for the challenge. It contains:

- **`NOZZLES`**: An array defining every switch on the board.
  - **`id`**: Unique identifier.
  - **`type`**: Determines behavior (Working, Broken, or Proxy).
  - **`unlockCode`**: The secret password required to activate a `WORKING` nozzle (e.g., "PUMP-1").
- **`ACTIVATION_SEQUENCE`**: An array (currently `[2, 7, 10]`) defining the strict order in which nozzles must be activated.
- **`REQUIRED_ACTIVATIONS`**: The number of successful activations needed to win (3).

### 3. Component Architecture

#### `components/Switch.tsx`

Renders the physical knobs/switches.

- **Visual States**: It handles the CSS for **Neutral** (Gray), **Active** (Green/Glowing), and **Error** (Red/Blinking).
- **Interaction**: It handles the mouse-down/up logic to simulate the physical depression of a button.

#### `components/SystemTerminal.tsx`

The interactive command line interface on the right.

- **`logs`**: Displays system messages (e.g., "ACCESS DENIED", "SEQUENCE ERROR").
- **Input**: When `isInputActive` is true (triggered by clicking a locked nozzle), this component renders an `<input>` field to capture the user's password attempt.

#### `components/Gauge.tsx`

The analog dials at the top.

- **Rendering**: Uses CSS `conic-gradient` to dynamically draw the colored arcs based on props.
- **Animation**: Includes a `useEffect` hook that introduces random "jitter" to the rotation value, simulating an unstable analog needle.

#### `components/CRTOverlay.tsx`

Purely aesthetic. It overlays a fixed `div` with scanlines, a vignette, and color separation to mimic the look of an old CRT monitor.

---

## 🧩 Game Mechanics Explained

### Node Types (`types.ts`)

The `NOZZLES` array in `constants.ts` defines the behavior of each button:

1.  **`WORKING`**: The target switches (Pump, Cooling, Rods). Clicking these triggers the Sequence Check and then the Auth Check.
2.  **`BROKEN`**: Traps. Clicking these immediately reduces `stability` by 15% and flashes a red error light.
3.  **`PROXY`**: Decoys. These buttons do nothing but log a "Connection Refused" message to waste the user's time.

### The Sequence Logic

The application enforces a strict order of operations defined in `ACTIVATION_SEQUENCE`.

- **Logic**: Inside the `handleSwitchClick` function in `App.tsx`, the code checks `ACTIVATION_SEQUENCE.indexOf(id)`.
- **Constraint**: If a user tries to activate step 2 (Cooling) before step 1 (Pump) is in the `activatedIds` array, the system:
  1.  Logs a `SEQUENCE ERROR`.
  2.  Applies a minor stability penalty.
  3.  Prevents the password prompt from appearing.

### Authentication Flow

When a correct `WORKING` nozzle is clicked in the correct order:

1.  `pendingAuthNozzleId` is set to that ID.
2.  The Terminal focuses and waits for input.
3.  When the user presses `Enter`:
    - The input is compared against `nozzle.unlockCode` from `constants.ts`.
    - **Correct**: The nozzle turns green, and the ID is added to `activatedIds`.
    - **Incorrect**: Stability drops (-5%), and access is denied.

---

## 🛠️ Tech Stack Details

- **React 19**: Utilizes modern hooks (`useCallback`, `useEffect`, `useRef`) for performant state management.
- **Tailwind CSS**: Used for rapid styling, specifically for the complex shadows (`box-shadow`) and gradients needed to make the buttons look "3D" and metallic.
- **Lucide React**: Provides the SVG icons (Power, Lock, Skull) used in the UI.

## 🚀 Running the Simulation

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start the App**:
    ```bash
    npm start
    ```
3.  **Solution Path**:
    - To verify the win state, activate the nozzles in this order:
      1.  **НАСОС-1** (Code: `PUMP-1`)
      2.  **ОХЛ-2** (Code: `COOL-X`)
      3.  **СТЕРЖ** (Code: `ROD-99`)

---

**Developed by SEDS.**
