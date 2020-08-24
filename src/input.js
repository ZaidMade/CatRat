// Handle keyboard input
$(document).on("keypress", function(e){
  switch(mode){
    case modes.LEVEL:
      // Reset the level - R
      if(e.which == 114){ clearLevel(); loadLevel(tmp_level.data); }

      // WASD movement
      if(e.which == 119){ moveCatNRat(dir.UP); }    // W
      if(e.which ==  97){ moveCatNRat(dir.LEFT); }  // A
      if(e.which == 115){ moveCatNRat(dir.DOWN); }  // S
      if(e.which == 100){ moveCatNRat(dir.RIGHT); } // D
      break;
    case modes.LOGO:
      mode = modes.LEVEL;
      break;
    case modes.FAILED:
      // Reset the level - R
      if(e.which == 114){ clearLevel(); loadLevel(tmp_level.data); }
      break;
  }

  draw();
});
