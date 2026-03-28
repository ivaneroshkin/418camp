# Project 5. Tic-Tac-Toe 2

Tic-Tac-Toe is a logic game between two opponents on a 3x3 square field. One player plays with "crosses" (X), the other with "noughts" (O).

Players take turns placing marks on the free cells of the 3x3 field (one always plays X, the other always plays O). The first player to align 3 of their marks vertically, horizontally, or diagonally wins. The player with crosses makes the first move.

Usually, after completing the game, the winning side draws a line through their three marks (noughts or crosses) that form a continuous row.

## Running the game

From the project root:

```sh
npm run install:all
npm run dev
```

This starts:

- server in dev mode (`server` via `tsx watch`)
- client in dev mode (`client` via Vite)

## Running tests

From the project root:

```sh
npm test
```

Or run tests for each part separately:

```sh
npm run test:server
npm run test:client
```
