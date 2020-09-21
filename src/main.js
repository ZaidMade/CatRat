var title, io;
var canvas, context;

var mode = modes.EDITOR;

var tiles = [null, false];  // Tiles image, loaded flag
var pics = [null, false];   // Full size images, loaded flag
var drawBop = false;

function loadGraphics(){
  // Load the tiles image in and raise the tiles loaded flag
  tiles[0] = new Image();
  tiles[0].src = "img/tiles.png";
  tiles[0].onload = function(){ tiles[1] = true; draw(); }

  pics[0] = new Image();
  pics[0].src = "img/pics.png";
  pics[0].onload = function(){ pics[1] = true; draw(); }
}

function init(){
  loadGraphics();
  loadLevel(tmp_level.data);

  if(mode == modes.LOGO)
    makeButton(256, 345, "Click to Start", function(){
      mode = modes.LEVEL;
      this.destroy();
    });
}

// Initialize the game on document load.
$(function(){
  title = document.getElementById("title");
  io = document.getElementById("game-io");
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");
  context.font = "bold 14px sans-serif";
  requestAnimationFrame(draw);

  canvas.oncontextmenu = function(e){
    e.preventDefault();
    e.stopPropagation();
    handleClick(false);
  }

  // Do the sprite bop
  setInterval(function(){
    drawBop = !drawBop;
    if(mode == modes.LEVEL || mode == modes.EDITOR){
      for(var i = 0; i < entities.length; i++){
        entities[i].bop = !entities[i].bop
      }
    }
    draw();
  }, 500);

  init();
});

function drawText(_text, _x, _y, _align = "left", _color = "white"){
  _text = _text.split("").join(String.fromCharCode(8201));
  context.font = "bold 16px sans-serif";
  context.fillStyle = _color;
  context.textAlign = _align;
  context.fillText(_text, _x, _y);
}

function draw(){
   // Validate the canvas context
  if(context == null){ return; }

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the black background
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.fill();

  switch(mode){
    case modes.LEVEL:
      drawLevel();
      break;
    case modes.LOGO:
      drawLogo();
      break;
    case modes.PASSED:
      drawPassed();
      break;
    case modes.FAILED:
      drawFailed();
      break;
    case modes.EDITOR:
      drawEditor();
      break;
  }

  for(var i = 0; i < buttons.length; i++){
    buttons[i].draw();
  }
}
