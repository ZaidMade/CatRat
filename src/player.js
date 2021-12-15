// Function to move the cat and the rat
function moveCatNRat(_dir){
  // Check for Game Over
  if(cat == undefined || rat == undefined){ return; }

  // Make temporary copies of the cat and rat positions for moving
  var tCat = { x: cat.x, y: cat.y, mx: 0, my: 0 };
  var tRat = { x: rat.x, y: rat.y, mx: 0, my: 0 };

  // WASD movement (tRat always does opposite of tCat)
  if(_dir == dir.UP){ tCat.y--; if(!rat.asleep){ tRat.y++; } }     // Move tCat up
  if(_dir == dir.LEFT){ tCat.x--; if(!rat.asleep){ tRat.x++; } }   // Move tCat left
  if(_dir == dir.DOWN){ tCat.y++; if(!rat.asleep){ tRat.y--; } }   // Move tCat down
  if(_dir == dir.RIGHT){ tCat.x++; if(!rat.asleep){ tRat.x--; } }  // Move tCat right

  // Get the move vector
  tCat.mx = tCat.x - cat.x;
  tCat.my = tCat.y - cat.y;
  tRat.mx = tRat.x - rat.x;
  tRat.my = tRat.y - rat.y;

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

      /* MOUSE HOLES */
      case types.HOLE_UR: // Up-right
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){
          if(
            (e.x != rat.x || e.y != rat.y + 1) &&
            (e.x != rat.x - 1 || e.y != rat.y)
          ){ halt[1] = true; }
        }
        else if(e.x == rat.x && e.y == rat.y){
          if(
            (e.x != tRat.x || e.y != tRat.y + 1) &&
            (e.x != tRat.x - 1 || e.y != tRat.y)
          ){ halt[1] = true; }
        }
        break;

      case types.HOLE_DR: // Down-right
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){
          if(
            (e.x != rat.x || e.y != rat.y - 1) &&
            (e.x != rat.x - 1 || e.y != rat.y)
          ){ halt[1] = true; }
        }
        else if(e.x == rat.x && e.y == rat.y){
          if(
            (e.x != tRat.x || e.y != tRat.y - 1) &&
            (e.x != tRat.x - 1 || e.y != tRat.y)
          ){ halt[1] = true; }
        }
        break;

      case types.HOLE_DL: // Down-left
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){
          if(
            (e.x != rat.x || e.y != rat.y - 1) &&
            (e.x != rat.x + 1 || e.y != rat.y)
          ){ halt[1] = true; }
        }
        else if(e.x == rat.x && e.y == rat.y){
          if(
            (e.x != tRat.x || e.y != tRat.y - 1) &&
            (e.x != tRat.x + 1 || e.y != tRat.y)
          ){ halt[1] = true; }
        }
        break;

      case types.HOLE_UL: // Up-left
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){
          if(
            (e.x != rat.x || e.y != rat.y + 1) &&
            (e.x != rat.x + 1 || e.y != rat.y)
          ){ halt[1] = true; }
        }
        else if(e.x == rat.x && e.y == rat.y){
          if(
            (e.x != tRat.x || e.y != tRat.y + 1) &&
            (e.x != tRat.x + 1 || e.y != tRat.y)
          ){ halt[1] = true; }
        }
        break;

      case types.HOLE_V: // vertical
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){
          if(
            (e.x != rat.x || e.y != rat.y + 1) &&
            (e.x != rat.x || e.y != rat.y - 1)
          ){ halt[1] = true; }
        }
        else if(e.x == rat.x && e.y == rat.y){
          if(
            (e.x != tRat.x || e.y != tRat.y + 1) &&
            (e.x != tRat.x || e.y != tRat.y - 1)
          ){ halt[1] = true; }
        }
        break;

      case types.HOLE_H: // horizontal
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        if(e.x == tRat.x && e.y == tRat.y){
          if(
            (e.x != rat.x + 1 || e.y != rat.y) &&
            (e.x != rat.x - 1 || e.y != rat.y)
          ){ halt[1] = true; }
        }
        else if(e.x == rat.x && e.y == rat.y){
          if(
            (e.x != tRat.x + 1 || e.y != tRat.y) &&
            (e.x != tRat.x - 1 || e.y != tRat.y)
          ){ halt[1] = true; }
        }
        break;

      // Push blocks if able to
      case types.YARN:
      case types.PUSH:
        if(e.x == tCat.x && e.y == tCat.y){
          var _m = e.move(tCat.mx, tCat.my);
          if(!_m.moved){ halt[0] = true; }
          if(_m.delete){ entities.splice(_i, 1); }
        }
        if(e.x == tRat.x && e.y == tRat.y){ halt[1] = true; }
        break;
      case types.TRAIL:
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
          if(score >= activeLevel.par){ rat.sleep(); }
        }
        if(e.x == tCat.x && e.y == tCat.y){ halt[0] = true; }
        break;
      case types.GOAL:
        if(e.x == tRat.x && e.y == tRat.y && score >= activeLevel.par)
          goal = true;
        break;
    }
  }

  if(
    /// Make sure they can run into each other...
    ((!halt[0] || !halt[1]) && (!kill[0] && !kill[1])) &&
    // Check if they're swapping positions...
    (tCat.x == rat.x && tCat.y == rat.y && tRat.x == cat.x && tRat.y == cat.y)
  ){
    goal = true;
  }

  // Move the cat and rat
  if(!halt[0]){ cat.x = tCat.x; cat.y = tCat.y; }
  if(!halt[1]){ rat.x = tRat.x; rat.y = tRat.y; }

  if(rat.x == cat.x && rat.y == cat.y){ goal = true; }

  if(goal && !kill[0] && !kill[1]){
    // LEVEL PASSED!!
    clearLevel();
    mode = modes.PASSED;
    makeButton(375, 325, "Continue", function(){
      if(fromEditor){
        fromEditor = false;
        clearButtons();
        clearLevel();
        loadLevel();
        mode = modes.EDITOR;
        return;
      }

      clearLevel();
      clearButtons();
      initLevelMenu();
      mode = modes.SELECT;
    });
    return;
  }

  // Add to the move counter
  if(!halt[0] || !halt[1]){ moveCounter++; }

  // Kill the cat and rat
  if(kill[0] || kill[1]){
    cat = undefined;
    rat = undefined;
    mode = modes.FAILED;

    makeButton(370, 255, "Try Again", function(){
      clearLevel();
      loadLevel(tmp_level.data);
      mode = modes.LEVEL;
      clearButtons();
    });

    if(fromEditor){
      makeButton(370, 310, "Edit Level", function(){
        fromEditor = false;
        clearButtons();
        clearLevel();
        loadLevel();
        mode = modes.EDITOR;
      });
    }
    else{
      makeButton(370, 310, "Exit", function(){
        clearLevel();
        loadLevel(tmp_level.data);
        clearButtons();
        mode = modes.TITLE;
        initTitle();
      });
    }


  }
}
