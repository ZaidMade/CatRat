var activeLevel;
var entities = [];
var cat, rat;

var score = 0;

var fromEditor = false;
var moveCounter = 0;

// Wrapper function to make entity loading a little easier
function makeEntity(_x, _y, _type){
  return entities[entities.push(new Entity(_x, _y, _type)) - 1];
};

function clearLevel(){
  for(var i = 0; i < entities.length; i++){ delete entities[i]; }
  entities = [];
}

function loadLevel(_dat = undefined){
  score = 0;

  if(_dat != undefined)
    activeLevel = JSON.parse(String(_dat));
  else
    _dat = activeLevel;

  if(_dat == undefined)
    return;
  else
    _dat = activeLevel.data;

  moveCounter = 0;

  var posIter = [0, 0];
  for(var i = 0; i < _dat.length; i++){
    var t = _dat[i];

    if(t == types.CAT){ cat = makeEntity(posIter[0], posIter[1], 'CAT'); }
    else if(t == types.RAT){ rat = makeEntity(posIter[0], posIter[1], 'RAT'); }
    else{
      switch(t){
        case types.WALL: t = 'WALL'; break;
        case types.KILL: t = 'KILL'; break;
        case types.PUSH: t = 'PUSH'; break;
        case types.TRAP: t = 'TRAP'; break;
        case types.HOLE_UR: t = 'HOLE_UR'; break;
        case types.HOLE_DR: t = 'HOLE_DR'; break;
        case types.HOLE_DL: t = 'HOLE_DL'; break;
        case types.HOLE_UL: t = 'HOLE_UL'; break;
        case types.HOLE_V: t = 'HOLE_V'; break;
        case types.HOLE_H: t = 'HOLE_H'; break;
        case types.CHEESE: t = 'CHEESE'; break;
        case types.GOAL: t = 'GOAL'; break;
        default: t = 'EMPTY'; break;
      }
      if(t != 'EMPTY'){ makeEntity(posIter[0], posIter[1], t); }
    }

    posIter[0]++;
    if(posIter[0] >= MAP_SIZE[0]){ posIter[0] = 0; posIter[1]++; }
  }
}

function drawLevel(){
  // Validate that the tiles image has been loaded
  if(!tiles[1]){ return; }

  var cat = -1;
  var rat = -1;

  // Draw all entities
  for(var i = 0; i < entities.length; i++){
    var e = entities[i];

    // Skip empty tiles
    if(e.type == types.EMPTY){ continue; }

    // Don't draw the cat or the rat until last
    if(e.type == types.CAT){
      cat = entities[i];
      continue;
    }
    if(e.type == types.RAT){
      rat = entities[i];
      continue;
    }

    // Select the alternate sprite when 2nd image flag is raised
    var eSpriteX = e.sprite[0];
    if(e.bop){ eSpriteX++; };

    // Draw the sprite at the entity position
    context.drawImage(tiles[0],
      eSpriteX*TILE_SIZE, e.sprite[1]*TILE_SIZE, TILE_SIZE, TILE_SIZE,
      e.x * TILE_SIZE, e.y * TILE_SIZE, TILE_SIZE, TILE_SIZE
    );
  }

  if(rat != -1){
    // Select the alternate sprite when 2nd image flag is raised
    var eSpriteX = rat.sprite[0];
    if(rat.bop){ eSpriteX++; };

    // Draw the sprite at the entity position
    context.drawImage(tiles[0],
      eSpriteX*TILE_SIZE, rat.sprite[1]*TILE_SIZE, TILE_SIZE, TILE_SIZE,
      rat.x * TILE_SIZE, rat.y * TILE_SIZE, TILE_SIZE, TILE_SIZE
    );
  }

  if(cat != -1){
    // Select the alternate sprite when 2nd image flag is raised
    var eSpriteX = cat.sprite[0];
    if(cat.bop){ eSpriteX++; };

    // Draw the sprite at the entity position
    context.drawImage(tiles[0],
      eSpriteX*TILE_SIZE, cat.sprite[1]*TILE_SIZE, TILE_SIZE, TILE_SIZE,
      cat.x * TILE_SIZE, cat.y * TILE_SIZE, TILE_SIZE, TILE_SIZE
    );
  }

  if(mode == modes.LEVEL){
    var _cheeseX = 0;
    var _cheeseBop = rat.bop;

    for(var _i = 0; _i < score; _i++){
      context.globalAlpha = 0.8;
      context.drawImage(tiles[0], 0 + ((_cheeseBop)?32:0), 128, 32, 32, _cheeseX, 0, 32, 32);
      context.globalAlpha = 1;
      context.drawImage(tiles[0], 256 + ((_cheeseBop)?32:0), 0, 32, 32, _cheeseX, 0, 32, 32);
      _cheeseX += 32;
      _cheeseBop = !_cheeseBop;
    }

    for(var _i = 0; _i < activeLevel.par - score; _i++){
      context.globalAlpha = 0.8;
      context.drawImage(tiles[0], 0 + ((_cheeseBop)?32:0), 128, 32, 32, _cheeseX, 0, 32, 32);
      context.globalAlpha = 1;
      context.drawImage(tiles[0], 256 + ((_cheeseBop)?32:0), 32, 32, 32, _cheeseX, 0, 32, 32);
      _cheeseX += 32;
      _cheeseBop = !_cheeseBop;
    }

    if(inWall){
      context.drawImage(tiles[0], 256 + ((_cheeseBop)?32:0), 32, 32, 32, 200, 200, 32, 32);
    }

  }
}

// Draw the level passed screen
function drawPassed(){
  if(!pics[1]){ return; }
  var pic = pictures.PASSED;

  // Detemine the grade
  var grade = (activeLevel.par / moveCounter) * 100;
  if(grade >= 90){ grade = sprites.GRADE_A; }
  else if(grade >= 80){ grade = sprites.GRADE_B; }
  else if(grade >= 70){ grade = sprites.GRADE_C; }
  else if(grade >= 60){ grade = sprites.GRADE_D; }
  else{ grade = sprites.GRADE_F; }

  // Select the alternate picture when 2nd image flag is raised
  var picX = pic[0];
  if(drawBop){ picX++; }

  // Draw the picture for the title
  context.drawImage(pics[0],
    picX*CANVAS_SIZE[0], pic[1]*CANVAS_SIZE[1], CANVAS_SIZE[0], CANVAS_SIZE[1],
    0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]
  );

  drawText("Moves: " + String(moveCounter) + "/" + String(activeLevel.par), 310, 190);
  drawText("Grade:", 310, 240);

  // Draw the grade
  var gradeX = grade[0];
  if(drawBop){ gradeX++; }
  context.drawImage(tiles[0],
    gradeX*TILE_SIZE, grade[1]*TILE_SIZE, TILE_SIZE, TILE_SIZE,
    390, 220, TILE_SIZE, TILE_SIZE
  );
}

// Draw the level failed screen
function drawFailed(){
  if(!pics[1]){ return; }
  var pic = pictures.FAILED;

  // Select the alternate picture when 2nd image flag is raised
  var picX = pic[0];
  if(drawBop){ picX++; }

  // Draw the picture for the title
  context.drawImage(pics[0],
    picX*CANVAS_SIZE[0], pic[1]*CANVAS_SIZE[1], CANVAS_SIZE[0], CANVAS_SIZE[1],
    0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]
  );
}
