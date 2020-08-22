var title;
var canvas, context;
var tiles = [null, false];  // Tiles image, loaded flag

function loadTiles(){
  // Load the tiles image in and raise the tiles loaded flag
  tiles[0] = new Image();
  tiles[0].src = "img/tiles.png";
  tiles[0].onload = function(){ tiles[1] = true; draw(); }
}

// Initialize the game on document load.
$(function(){
  title = document.getElementById("title")
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");
  requestAnimationFrame(draw);

  // Set up the sprite wiggle
  setInterval(function(){
    for(var i = 0; i < entities.length; i++){ entities[i].bop = !entities[i].bop }
    draw();
  }, 750);

  loadTiles();
  loadLevel(tmp_level);
  main();
});

// Handle keyboard input
$(document).on("keypress", function(e){

  if(e.which == 101){ // E
    clearLevel();
  }

  // Reset the level
  if(e.which == 114){  // R
    clearLevel();
    loadLevel(tmp_level);
  }

  // WASD movement
  if(e.which == 119){ moveCatNRat(dir.UP); }    // W
  if(e.which ==  97){ moveCatNRat(dir.LEFT); }  // A
  if(e.which == 115){ moveCatNRat(dir.DOWN); }  // S
  if(e.which == 100){ moveCatNRat(dir.RIGHT); } // D

  draw();
});

function main(){

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

  drawLevel();
}
