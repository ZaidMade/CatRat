// Function to move the cat and the rat
function moveCatNRat(_dir){
  // Check for Game Over
  if(cat == undefined || rat == undefined){ return; }

  // Make temporary copies of the cat and rat positions for moving
  var tCat = { x: cat.x, y: cat.y };
  var tRat = { x: rat.x, y: rat.y };

  // WASD movement (tRat always does opposite of tCat)
  if(_dir == dir.UP){ tCat.y++; tRat.y--; }     // Move tCat up
  if(_dir == dir.LEFT){ tCat.x++; tRat.x--; }   // Move tCat left
  if(_dir == dir.DOWN){ tCat.y--; tRat.y++; }   // Move tCat down
  if(_dir == dir.RIGHT){ tCat.x--; tRat.x++; }  // Move tCat right

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
  var goal = false;
  for(var _i = 0; _i < entities.length; _i++){
    var e = entities[_i];

    switch(e.type){
      // Stop if going to move into a wall
      case types.WALL:
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){ halt[1] = true; }
        break;

      case types.HOLE_UP:
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){
          if(e.x != rat.x || e.y != rat.y + 1){ halt[1] = true; }
        }
        else if(e.x == rat.x && e.y == rat.y){
          if(e.x != tRat.x || e.y != tRat.y + 1){ halt[1] = true; }
        }
        break;

      case types.HOLE_RIGHT:
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){
          if(e.x != rat.x - 1 || e.y != rat.y){ halt[1] = true; }
        }
        else if(e.x == rat.x && e.y == rat.y){
          if(e.x != tRat.x - 1 || e.y != tRat.y){ halt[1] = true; }
        }
        break;

      case types.HOLE_DOWN:
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){
          if(e.x != rat.x || e.y != rat.y - 1){ halt[1] = true; }
        }
        else if(e.x == rat.x && e.y == rat.y){
          if(e.x != tRat.x || e.y != tRat.y - 1){ halt[1] = true; }
        }
        break;

      case types.HOLE_LEFT:
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){
          if(e.x != rat.x + 1 || e.y != rat.y){ halt[1] = true; }
        }
        else if(e.x == rat.x && e.y == rat.y){
          if(e.x != tRat.x + 1 || e.y != tRat.y){ halt[1] = true; }
        }
        break;

      // Push blocks if able to
      case types.PUSH:
        if(e.x == tCat.x && e.y == tCat.y){
          var tPush = { x: e.x + (tCat.x - cat.x), y: e.y + (tCat.y - cat.y) };
          for(var _i1 = 0; _i1 < entities.length; _i1++){
            var e1 = entities[_i1];
            if(e1.x == tPush.x && e1.y == tPush.y){
              // Destroy the push block
              if(e1.type == types.KILL){ entities.splice(_i, 1); break; }
              // Block the push block
              else{ halt[0] = true; break; }
            }
          }
          // Move the push block
          if(!halt[0]){
            e.x = tPush.x;
            e.y = tPush.y;
          }
        }
        if(e.x == tRat.x && e.y == tRat.y){ halt[1] = true; }
        break;
      // Fail the level if going to move into a kill block
      case types.KILL:
        if(e.x == tCat.x && e.y == tCat.y){ kill[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){ kill[1] = true; }
        break;
      // Fail the level if the rat falls into a trap
      case types.TRAP:
        if(e.x == tRat.x && e.y == tRat.y){ kill[1] = true; }
        if(e.x == tCat.x && e.y == tCat.y){ entities.splice(_i, 1); }
        break;
      case types.CHEESE:
        if(e.x == tRat.x && e.y == tRat.y){
          score++;
          entities.splice(_i, 1);
        }
        break;
      case types.GOAL:
        if(e.x == tRat.x && e.y == tRat.y)
          goal = true;
        break;
    }
  }

  // Check if the level was just passed
  if(
    /* Make sure they can run into each other... */
    ((!halt[0] || !halt[1]) && (!kill[0] && !kill[1])) &&
    /* Then check if they're swapping positions... */
    ((tCat.x == rat.x && tCat.y == rat.y && tRat.x == cat.x && tRat.y == cat.y) ||
    /* OR if they're moving into the same cell... */
    (tCat.x == tRat.x && tCat.y == tRat.y))
  )
    kill[1] = true;

  if(goal){
    // LEVEL PASSED!!
    clearLevel();
    mode = modes.PASSED;
    makeButton(375, 300, "Continue", function(){
      mode = modes.LOGO;
      clearButtons();
      init();
    });
    return;
  }

  // Move the cat and rat
  if(!halt[0]){ cat.x = tCat.x; cat.y = tCat.y; }
  if(!halt[1]){ rat.x = tRat.x; rat.y = tRat.y; }

  // Add to the move counter
  if(!halt[0] || !halt[1]){ moveCounter++; }

  // Kill the cat and rat
  if(kill[0] || kill[1]){
    cat = undefined;
    rat = undefined;
    mode = modes.FAILED;

    makeButton(370, 255, "Retry Level", function(){
      clearLevel();
      loadLevel(tmp_level.data);
      mode = modes.LEVEL;
      clearButtons();
    });

    makeButton(370, 310, "Give Up T_T");

  }
}
