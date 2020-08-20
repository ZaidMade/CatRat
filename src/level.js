var entities = [];

// Wrapper function to make entity loading a little easier
function makeEntity(_x, _y, _type){
  return entities[entities.push(new Entity(_x, _y, _type)) - 1];
};

var cat = makeEntity(0, 0, 'CAT');
var rat = makeEntity(15, 11, 'RAT');

function loadLevel(){
  makeEntity(8, 2, 'WALL');
}

function drawLevel(){
  // Validate that the tiles image has been loaded
  if(!tiles[1]){ return; }

  // Draw all entities
  for(var i = 0; i < entities.length; i++){
    var e = entities[i];
    context.drawImage(tiles[0],
      e.sprite[0]*TILE_SIZE, e.sprite[1]*TILE_SIZE, TILE_SIZE, TILE_SIZE,
      e.x * TILE_SIZE, e.y * TILE_SIZE, TILE_SIZE, TILE_SIZE,
    );
  }
}
