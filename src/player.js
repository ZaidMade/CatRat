// Function to move the cat and the rat
function moveCatNRat(_dir){
  // Check for Game Over
  if(cat == undefined || rat == undefined){ return; }

  // Make temporary copies of the cat and rat positions for moving
  var tCat = { x: cat.x, y: cat.y };
  var tRat = { x: rat.x, y: rat.y };

  // WASD movement (tRat always does opposite of tCat)
  if(_dir == dir.UP){ tCat.y--; tRat.y++; }     // Move tCat up
  if(_dir == dir.LEFT){ tCat.x--; tRat.x++; }   // Move tCat left
  if(_dir == dir.DOWN){ tCat.y++; tRat.y--; }   // Move tCat down
  if(_dir == dir.RIGHT){ tCat.x++; tRat.x--; }  // Move tCat right

  // Wrap tCat & tRat around the map
  var pe = tCat;
  [1,2].forEach(function(){ // Repeat the following code twice
    if(pe.x < 0){ pe.x = MAP_SIZE[0] - 1; }     // Wrap to bottom
    if(pe.y < 0){ pe.y = MAP_SIZE[1] - 1; }     // Wrap to right
    if(pe.x >= MAP_SIZE[0]){ pe.x = 0; }        // Wrap to left
    if(pe.y >= MAP_SIZE[1]){ pe.y = 0; }        // Wrap to top

    pe = tRat; // Switch to the tRat
  });

  // Check the positions to move to against the entities list
  var halt = [false, false];  // Flag to stop them from moving [cat, rat]
  var kill = [false, false];  // Flag to kill them [cat, rat]
  for(var _i = 0; _i < entities.length; _i++){
    var e = entities[_i];


    switch(e.type){
      // Stop if going to move into a wall
      case types.WALL:
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){ halt[1] = true; }
        break;
      // Fail the level if going to move into a kill block
      case types.KILL:
        if(e.x == tCat.x && e.y == tCat.y){ kill[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){ kill[1] = true; }
        break;
    }
  }

  if(
    (tCat.x == rat.x && tCat.y == rat.y &&
    tRat.x == cat.x && tRat.y == cat.y) ||
    (tCat.x == tRat.x && tCat.y == tRat.y)
  ){
    // LEVEL PASSED!!
    clearLevel();
  }

  // Move the cat and rat
  if(!halt[0]){ cat.x = tCat.x; cat.y = tCat.y; }
  if(!halt[1]){ rat.x = tRat.x; rat.y = tRat.y; }

  // Kill the cat and rat
  if(kill[0]){ cat = undefined; console.log("GAME OVER! CAT DIED T_T"); }
  if(kill[1]){ rat = undefined; console.log("GAME OVER! RAT DIED Y_Y"); }
}
