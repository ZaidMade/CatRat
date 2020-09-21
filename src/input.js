var buttons = [];

function makeButton(_x, _y, _text, _callback = function(){}){
  var b = buttons[buttons.push(new Button(_x, _y, _text, _callback)) - 1];
  b.myIndex = buttons.length - 1;
}

function clearButtons(){ buttons = []; }

var mousePos;

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mousePos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  // Check if button is active;
  for(var i = 0; i < buttons.length; i++){
    var b = buttons[i];
    if(
      mousePos.x >= b.left && mousePos.x <= b.right &&
      mousePos.y >= b.top && mousePos.y <= b.bottom
    )
      b.hover = true;
    else
      b.hover = false;
  }
  draw();
}

$(function(){
  document.addEventListener('mousemove', getMousePos);
});

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
    case modes.EDITOR:
      if(e.which == 119){ // W
        if(cursor >= type_list.length - 1){ cursor = 0; }
        else{ cursor++; }
      }
      if(e.which == 115){ // S
        if(cursor <= 0){ cursor = type_list.length - 1; }
        else{ cursor--; }
      }
      if(e.which == 112){ // P
        mode = modes.LEVEL;
      }
  }

  draw();
});

$(document).on("click", function(e){
  if(e.which == 1){                     // left click
    // Activate buttons if pressed
    for(var i = 0; i < buttons.length; i++){
      var b = buttons[i];
      if(b.hover){ b.callback(); }
    }

    editorHandleClick();
  }
  else                                  // right click
    editorHandleClick(false);

  draw();
});
