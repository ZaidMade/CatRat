const TILE_SIZE   = 32;
const MAP_SIZE    = [16, 12];
const CANVAS_SIZE = [512, 384];

// Directions
const dir = { UP: 0, DOWN: 1, LEFT: 2, RIGHT: 3 }

const modes = {
  LOGO: 0,
  TITLE: 1,
  SELECT: 2,
  LEVEL: 3,
  PASSED: 4,
  FAILED: 5
}

const sprites = {
  CAT: [0, 1],
  RAT: [2, 1],
  DEVIL: [4, 1],
  WALL: [0, 0],
  KILL: [2, 0],
  GRADE_A: [0, 2],
  GRADE_B: [2, 2],
  GRADE_C: [4, 2],
  GRADE_D: [6, 2],
  GRADE_F: [8, 2]
}

const pictures = {
  PASSED: [0, 0],
  ZAID: [0, 3]
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

const tmp_level = {
  par: 20,
  data: [
    0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 4, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 2, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0
  ]
};
