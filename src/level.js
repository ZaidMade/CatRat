var entities = [];

// Wrapper function to make entity loading a little easier
function makeEntity(_x, _y, _type){
  return entities[entities.push(new Entity(_x, _y, _type)) - 1];
};

var cat = makeEntity(0, 0, 'CAT');
var rat = makeEntity(15, 11, 'RAT');

function loadLevel(){
  makeEntity(8, 2, 'WALL');
  makeEntity(8, 5, 'KILL');
}

function drawLevel(){
  // Validate that the tiles image has been loaded
  if(!tiles[1]){ return; }

  // Draw all entities
  for(var i = 0; i < entities.length; i++){
    var e = entities[i];

    // Select the alternate sprite when 2nd image flag is raised
    var eSpriteX = e.sprite[0];
    if(tiles[2]){ eSpriteX++; };

    // Draw the sprite at the entity position
    context.drawImage(tiles[0],
      eSpriteX*TILE_SIZE, e.sprite[1]*TILE_SIZE, TILE_SIZE, TILE_SIZE,
      e.x * TILE_SIZE, e.y * TILE_SIZE, TILE_SIZE, TILE_SIZE,
    );
  }
}
