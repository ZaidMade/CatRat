var cursor = 2;

function clearPosition(x, y){
  for(var i = 0; i < entities.length; i++){
    var e = entities[i];
    if(e.x == x && e.y == y){ entities.splice(i, 1); }
  }
}

// Makes sure there is only 1 instance of either the cat or the rat
function clearCatRat(forCat = true){
  for(var i = 0; i < entities.length; i++){
    var e = entities[i];

    if(forCat){
      if(e.type == types.CAT){
        entities.splice(i, 1);
        cat = undefined;
      }
    }
    else{
      if(e.type == types.RAT){
        entities.splice(i, 1);
        rat = undefined;
      }
    }

  }
}

function editorHandleClick(left = true){
  if(mode != modes.EDITOR || mousePos == undefined)
    return;

  var e = { x: mousePos.x - (TILE_SIZE/2), y: mousePos.y - (TILE_SIZE/2) };
  e.x = Math.floor(e.x / TILE_SIZE);
  e.y = Math.floor(e.y / TILE_SIZE);

  if(e.x >= MAP_SIZE[0] || e.x < 0 || e.y >= MAP_SIZE[1] || e.y < 0)
    return;

  clearPosition(e.x, e.y);
  if(left){
    switch(type_list[cursor]){
      case "CAT":
        clearCatRat(true);
        cat = makeEntity(e.x, e.y, "CAT");
        break;
      case "RAT":
        clearCatRat(false);
        rat = makeEntity(e.x, e.y, "RAT");
        break;
      default:
        makeEntity(e.x, e.y, type_list[cursor]);
        break;
    }
  }

  draw();

}

function drawEditor(){
  drawLevel();

  if(mousePos == undefined)
    return;

  var sprite = eval("sprites." + type_list[cursor]);
  var e = { x: mousePos.x - (TILE_SIZE/2), y: mousePos.y - (TILE_SIZE/2) };

  e.x = Math.floor(e.x / TILE_SIZE);
  e.y = Math.floor(e.y / TILE_SIZE);

  var eSpriteX = sprite[0];
  if(drawBop){ eSpriteX++; };

  // Draw the sprite at the entity position
  context.drawImage(tiles[0],
    eSpriteX*TILE_SIZE, sprite[1]*TILE_SIZE, TILE_SIZE, TILE_SIZE,
    e.x * TILE_SIZE, e.y * TILE_SIZE, TILE_SIZE, TILE_SIZE
  );
}

function exportLevel(){
  $("#game-io").css('display', 'block');
}
