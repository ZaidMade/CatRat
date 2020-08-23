var entities = [];
var cat, rat;

var moveCounter = 0;

// Wrapper function to make entity loading a little easier
function makeEntity(_x, _y, _type){
  return entities[entities.push(new Entity(_x, _y, _type)) - 1];
};

function clearLevel(){
  for(var i = 0; i < entities.length; i++){ delete entities[i]; }
  entities = [];
}

function loadLevel(_dat = []){
  moveCounter = 0;

  var posIter = [0, 0];
  for(var i = 0; i < _dat.length; i++){
    var t = _dat[i];

    if(t == types.CAT){ cat = makeEntity(posIter[0], posIter[1], 'CAT'); }
    else if(t == types.RAT){ rat = makeEntity(posIter[0], posIter[1], 'RAT'); }
    else{
      switch(t){
        case types.WALL:
          t = 'WALL';
          break;
        case types.KILL:
          t = 'KILL';
          break;
        default:
          t = 'EMPTY';
          break;
      }
      makeEntity(posIter[0], posIter[1], t);
    }

    posIter[0]++;
    if(posIter[0] >= MAP_SIZE[0]){ posIter[0] = 0; posIter[1]++; }
  }
}

function drawLevel(){
  // Validate that the tiles image has been loaded
  if(!tiles[1]){ return; }

  // Draw all entities
  for(var i = 0; i < entities.length; i++){
    var e = entities[i];

    // Skip empty tiles
    if(e.type == types.EMPTY){ continue; }

    // Select the alternate sprite when 2nd image flag is raised
    var eSpriteX = e.sprite[0];
    if(e.bop){ eSpriteX++; };

    // Draw the sprite at the entity position
    context.drawImage(tiles[0],
      eSpriteX*TILE_SIZE, e.sprite[1]*TILE_SIZE, TILE_SIZE, TILE_SIZE,
      e.x * TILE_SIZE, e.y * TILE_SIZE, TILE_SIZE, TILE_SIZE
    );

    context.fillStyle = "white";
    context.fillText(String(moveCounter), 64, 64);
  }
}
