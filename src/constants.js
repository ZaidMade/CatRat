const TILE_SIZE = 32;
const MAP_SIZE = [16, 12];

// Directions
const dir = { UP: 0, DOWN: 1, LEFT: 2, RIGHT: 3 }

const sprites = {
  CAT: [0, 1],
  RAT: [2, 1],
  DEVIL: [4, 1],
  WALL: [0, 0],
  KILL: [2, 0]
}

const types = {
  EMPTY: 0,
  CAT: 1,
  RAT: 2,
  DEVIL: 3,
  WALL: 4,
  PUSH: 5,
  KILL: 6
}

const tmp_level = [
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 1, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4,
  0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
  4, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 2, 4,
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
];
