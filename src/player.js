// Function to move Cat & Rat
function moveCatNRat(_dir){
  // WASD movement (rat always does opposite of cat)
  if(_dir == dir.UP){ cat.y--; rat.y++; }     // Move cat up
  if(_dir == dir.LEFT){ cat.x--; rat.x++; }   // Move cat left
  if(_dir == dir.DOWN){ cat.y++; rat.y--; }   // Move cat down
  if(_dir == dir.RIGHT){ cat.x++; rat.x--; }  // Move cat right

  // Wrap the Cat & Rat around the screen
  var pe = cat;
  [1,2].forEach(function(){ // Repeat the following code twice
    if(pe.x < 0){ pe.x = MAP_SIZE[0] - 1; } // Wrap to bottom
    if(pe.y < 0){ pe.y = MAP_SIZE[1] - 1; } // Wrap to right
    if(pe.x >= MAP_SIZE[0]){ pe.x = 0; }    // Wrap to left
    if(pe.y >= MAP_SIZE[1]){ pe.y = 0; }    // Wrap to top
    pe = rat; // Switch to the rat
  });
}
