# 418camp

This repository is a collection of simple and entertaining games built using Node.js.

> Modernized legacy game projects: updated tech stack and refactored codebase (originally created 6+ years ago).



## Getting Started

To get started, make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/en)

## 1. Bulls and Cows

[Open game](https://github.com/ivaneroshkin/418camp/tree/master/01%20-%20bulls%20and%20cows)

Drive fast feedback loops with a CLI deduction engine that validates every move and scores positional accuracy in real time.

### Tech Stack

- **Logic/Engine**: Unique-digit generator, bulls/cows scoring, attempt validation pipeline
- **Interface (CLI)**: Node.js `readline/promises`, terminal styling via `node:util` `styleText`

### Key Features & Learning Goals

- Built clear scoring logic for bulls and cows based on digit position
- Handled async terminal input with retry loops and clean quit flow
- Added strict input checks (only digits, correct length, no repeated numbers) before each move

## 2. RPG Battle

[Open game](https://github.com/ivaneroshkin/418camp/tree/master/02%20-%20rpg%20battle)

Orchestrate turn-based combat where cooldowns, armor math, and move order create a tactical backend simulation in the terminal.

### Tech Stack

- **Logic/Engine**: Turn scheduler, cooldown state maps, mixed physical/magical damage calculation, difficulty-based health scaling
- **Interface (CLI)**: Node.js `readline/promises`, styled combat events, interactive move selection

### Key Features & Learning Goals

- Built the battle as a reusable state machine with resettable game state
- Managed skill cooldowns with counters that decrease each turn
- Combined player async choices with enemy AI moves in alternating turns

## 3. Quiz

[Open game](https://github.com/ivaneroshkin/418camp/tree/master/03%20-%20quiz)

Power a data-driven quiz flow that streams JSON questions into a resilient CLI interaction cycle.

### Tech Stack

- **Logic/Engine**: JSON question loader, random question sampler, answer validation and scoring pipeline
- **Interface (CLI)**: Node.js `readline/promises`, colorized question/result rendering

### Key Features & Learning Goals

- Generated dynamic quiz sessions by selecting random questions from one question bank
- Handled user input errors with a second-chance validation step
- Showed clear final results (perfect, good, retry) based on score thresholds

## 4. Tic-Tac-Toe

[Open game](https://github.com/ivaneroshkin/418camp/tree/master/04%20-%20tic%20tac%20toe)

Run a clean turn engine that validates moves, detects winners, and emits game events for an expressive terminal UX.

### Tech Stack

- **Logic/Engine**: 3x3 board state management, winner/dead-heat evaluation, player switch control
- **Interface (CLI)**: Terminal event messaging, structured board string rendering

### Key Features & Learning Goals

- Implemented reliable win detection using board patterns and state checks
- Prevented invalid moves by checking board state before and after each action
- Organized game flow with event functions to keep code easy to read and test

## 5. Tic-Tac-Toe 2

[Open game](https://github.com/ivaneroshkin/418camp/tree/master/05%20-%20tic%20tac%20toe%202)

Connect a validated Express game backend to a React frontend so board state, winner checks, and resets stay synchronized across layers.

### Tech Stack

- **Logic/Engine**: TypeScript, Express, Zod request validation, winner evaluation, reset flow
- **Interface (Browser)**: React 19, Vite, custom `useGame` hook, Fetch API service layer, component-based board UI

### Key Features & Learning Goals

- Connected frontend actions to backend rules through typed REST endpoints (`/move`, `/getField`, `/winner`, `/reset`)
- Improved request safety with schema validation and protected handling for busy cells
- Kept UI state consistent with a custom hook that loads data and refreshes after moves

