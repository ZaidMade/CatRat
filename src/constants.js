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
  RAT: [1, 1],
  RAT_SLEEP: [2, 1],
  ZZZ: [4, 1],
  WALL: [0, 0],
  KILL: [2, 0],
  PUSH: [4, 0],
  TRAP: [6, 0],
  GRADE_A: [0, 2],
  GRADE_B: [2, 2],
  GRADE_C: [4, 2],
  GRADE_D: [6, 2],
  GRADE_F: [8, 2],
  HOLE_UR: [0, 3],
  HOLE_DR: [2, 3],
  HOLE_DL: [4, 3],
  HOLE_UL: [6, 3],
  HOLE_V: [2, 4],
  HOLE_H: [4, 4],
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
    "WALL",
    "KILL",
    "PUSH",
    "TRAP",
    "HOLE_UR",
    "HOLE_DR",
    "HOLE_DL",
    "HOLE_UL",
    "HOLE_V",
    "HOLE_H",
    "GOAL",
    "CHEESE"
];

const types = {
  EMPTY: 0,
  CAT: 1,
  RAT: 2,
  WALL: 3,
  PUSH: 4,
  KILL: 5,
  TRAP: 6,
  HOLE_UR: 7,
  HOLE_DR: 8,
  HOLE_DL: 9,
  HOLE_UL: 10,
  GOAL: 11,
  CHEESE: 12,
  HOLE_V: 13,
  HOLE_H: 14
}

const tmp_level = '{"title":"","par":2,"data":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,3,0,0,0,3,0,0,3,3,0,0,1,0,0,0,4,14,0,0,11,14,0,12,3,3,0,0,0,0,0,0,5,3,0,0,0,3,0,0,3,3,0,0,0,0,0,0,0,3,3,3,3,3,5,5,3,3,0,0,0,0,0,0,0,3,0,0,0,0,0,2,3,3,3,3,3,12,3,3,3,8,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,13,0,0,0,0,0,0,3,3,0,0,0,6,0,0,0,10,0,0,0,0,0,0,3,3,0,0,6,12,6,0,0,3,0,0,0,0,0,0,3,3,0,0,0,6,0,0,0,3,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]}';

const levels = [

];
