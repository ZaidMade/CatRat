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
  FAILED: 5,
  EDITOR: 6
}

const sprites = {
  CAT: [0, 1],
  RAT: [2, 1],
  DEVIL: [4, 1],
  WALL: [0, 0],
  KILL: [2, 0],
  PUSH: [4, 0],
  TRAP: [6, 0],
  GRADE_A: [0, 2],
  GRADE_B: [2, 2],
  GRADE_C: [4, 2],
  GRADE_D: [6, 2],
  GRADE_F: [8, 2],
  HOLE_UP: [0, 3],
  HOLE_RIGHT: [2, 3],
  HOLE_DOWN: [4, 3],
  HOLE_LEFT: [6, 3],
  GOAL: [8, 3],
  CHEESE: [8, 0]
}

const pictures = {
  PASSED: [0, 0],
  FAILED: [0, 1],
  LOGO: [0, 2],
  ZAID: [0, 3]
}

const type_list = [
    "CAT",
    "RAT",
    "DEVIL",
    "WALL",
    "KILL",
    "PUSH",
    "TRAP",
    "HOLE_UP",
    "HOLE_RIGHT",
    "HOLE_DOWN",
    "HOLE_LEFT",
    "GOAL",
    "CHEESE"
];

const types = {
  EMPTY: 0,
  CAT: 1,
  RAT: 2,
  DEVIL: 3,
  WALL: 4,
  PUSH: 5,
  KILL: 6,
  TRAP: 7,
  HOLE_UP: 8,
  HOLE_RIGHT: 9,
  HOLE_DOWN: 10,
  HOLE_LEFT: 11,
  GOAL: 12,
  CHEESE: 13
}

const tmp_level = '{"title":"","par":4,"data":[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,14,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,4,4,9,4,4,4,11,4,4,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]}';

const levels = [

];
