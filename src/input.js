var buttons = [];

function makeButton(_x, _y, _text, _callback = function(){}){
  var b = buttons[buttons.push(new Button(_x, _y, _text, _callback)) - 1];
  b.myIndex = buttons.length - 1;
  return b;
}

function clearButtons(){ buttons = []; }

var mousePos;
var acceptInput = true;

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

function initInput(){
  document.addEventListener('mousemove', getMousePos);

  var _gameio = document.getElementById("game-io");
  _gameio.addEventListener('click', function(e){
    e.preventDefault();
    _gameio.getElementsByTagName('textarea')[0].value = "";
    _gameio.style.display = 'none';
    acceptInput = true;
  });
}

// Handle keyboard input
document.addEventListener("keydown", function(e){
  if(!acceptInput)
    return;

  switch(mode){
    case modes.LEVEL:

      switch(e.key){
        case 'r': case 'R':
          clearLevel();
          loadLevel(tmp_level.data);
          break;
        case 'p': case 'P':
          if(fromEditor){
            fromEditor = false;
            clearLevel();
            loadLevel();
            mode = modes.EDITOR;
          }
          break;
      }

      // WASD movement
      var _move = false;

      if(!paused){
        switch(e.key){
          case 'w': case 'W': case "Up": case "ArrowUp":
            moveCatNRat(dir.UP);
            _move = true;
            break;
          case 'a': case 'A': case "Left": case "ArrowLeft":
            moveCatNRat(dir.LEFT);
            _move = true;
            break;
          case 's': case 'S': case "Down": case "ArrowDown":
            moveCatNRat(dir.DOWN);
            _move = true;
            break;
          case 'd': case 'D': case "Right": case "ArrowRight":
            moveCatNRat(dir.RIGHT);
            _move = true;
            break;
        }
      }

      if(e.key == "Escape"){
        paused = !paused;

        if(paused){
          makeButton(250, 225, "Continue", function(){
            paused = false;
            clearButtons();
          });

          makeButton(250, 280, "Reset", function(){
            clearLevel();
            loadLevel(tmp_level.data);
            mode = modes.LEVEL;
            clearButtons();
          });

          if(fromEditor){
            makeButton(250, 335, "Edit Level", function(){
              fromEditor = false;
              clearButtons();
              clearLevel();
              loadLevel();
              mode = modes.EDITOR;
            });
          }
          else{
            makeButton(250, 335, "Exit", function(){
              clearLevel();
              loadLevel(tmp_level.data);
              clearButtons();
              initLevelMenu();
              mode = modes.SELECT;
            });
          }
        }
        else{ clearButtons(); }
      }

      if(_move){
        for(var _i = 0; _i < entities.length; _i++){ entities[_i].tick(); }
        if(rat !== undefined){ rat.tick(); }
        if(cat !== undefined){ cat.tick(); }
      }
      break;
    case modes.EDITOR:
      switch(e.key){
        case 'w': case 'W': case "Up": case "ArrowUp":
          if(cursor >= type_list.length - 1){ cursor = 0; }
          else{ cursor++; }
          break;
        case 's': case 'S': case "Down": case "ArrowDown":
          if(cursor <= 0){ cursor = type_list.length - 1; }
          else{ cursor--; }
          break;
        case 'o': case 'O':
          exportLevel();
          break;
      }

      if(e.key == "Escape"){
        paused = !paused;

        if(paused){
          makeButton(250, 225, "Play Level", function(){
            var _par = 0;
            for(var _i = 0; _i < entities.length; _i++){
              if(entities[_i].type == types.CHEESE)
                _par++;
            }

            activeLevel = {
              title: "",
              par: _par,
              data: levelWriteOut()
            };

            fromEditor = true;
            mode = modes.LEVEL;
            paused = false;
            clearButtons();
          });

          makeButton(250, 280, "Continue", function(){
            paused = false;
            clearButtons();
          });

          makeButton(250, 335, "Exit", function(){
            clearLevel();
            loadLevel(tmp_level.data);
            clearButtons();
            mode = modes.TITLE;
            initTitle();
          });
        }
        else{ clearButtons(); }
      }

      break;
    case modes.SELECT:
      clearButtons();
      mode = modes.TITLE;
      initTitle();
      break;

  }

  draw();
});

document.addEventListener("click", function(e){
  if(!acceptInput)
    return;

  if(e.which == 1){                     // left click
    // Activate buttons if pressed
    for(var _i = 0; _i < buttons.length; _i++){
      var _b = buttons[_i];
      if(_b.hover){ _b.callback(_b.active); }
    }

    editorHandleClick();
  }
  else                                  // right click
    editorHandleClick(false);

  draw();
});
