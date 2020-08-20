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
  CAT: 0,
  RAT: 1,
  DEVIL: 2,
  WALL: 3,
  PUSH: 4,
  KILL: 5
}
