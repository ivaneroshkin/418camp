# Project 4. Tic-Tac-Toe

Tic-Tac-Toe is a logic game between two opponents on a 3x3 square field. One player plays with "crosses", the other with "circles".

Players take turns placing their marks (one always crosses, the other always circles) on free cells of the 3x3 field. The first player to line up 3 of their marks vertically, horizontally, or diagonally wins. The player placing crosses goes first.

Usually, when the game ends, the winning side draws a line through their three marks (circles or crosses) that form a continuous row.

In this version of the game, instead of crosses and circles, "1" and "2" are used, corresponding to the player order.

## Requirements

- Node.js >= 24.0.0

## Installation

```sh
npm install
```

## Run the game

```sh
npm start
```

For development mode with hot reload:

```sh
npm run dev
```

## Run tests

Unit tests:

```sh
npm test
```

BDD tests with Cucumber:

```sh
npm run cucumber
```

## Linting

```sh
npm run lint
npm run lint:fix
```
