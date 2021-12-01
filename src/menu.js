function drawLogo(){
  if(!pics[1]){ return; }
  var pic = pictures.ZAID;

  // Draw the my personal logo
  context.drawImage(pics[0],
    pic[0]*CANVAS_SIZE[0], pic[1]*CANVAS_SIZE[1], CANVAS_SIZE[0], CANVAS_SIZE[1],
    0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]
  );
}

function drawTitle(){
  if(!pics[1]){ return; }
  var pic = pictures.LOGO;

  // Draw the game title
  context.drawImage(pics[0],
    (pic[0] + Number(drawBop))*CANVAS_SIZE[0], pic[1]*CANVAS_SIZE[1], CANVAS_SIZE[0], CANVAS_SIZE[1],
    0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]
  );

  if(!paused)
    drawText(version, 5, 380, "left", "white", "8px");
}

function _pad(n, s) {
    n = n.toString();
    while (n.length < s)
      n = "0" + n;
    return n;
}

var levelAccess = [];

function initLevelAccess(){
  if(!levelAccess.length){
    for(var _i = 0; _i < levels.length; _i++){
      var _access = true;
      if(_i > 5)
        _access = false;
      levelAccess.push(_access);
    }
  }
}

const PAGE_SIZE = 16;
var page = 0;

var playButton;
var selected = -1;

function initLevelMenu(p = 0){
  // Make sure there is something on this page.
  if(levels.length <= p * PAGE_SIZE)
    return;
  if(p < 0)
    return;

  page = p;
  selected = -1;

  clearButtons();
  initLevelAccess();

  // Create the page back button
  var _bb = makeButton(64, 320, "<<", function(){
    // Go back to the menu if on the first page...
    if(!page){
      clearButtons();
      selected = -1;
      initTitle();
      mode = modes.TITLE;
      return;
    }
    // ...otherwise go back one page.
    initLevelMenu(page - 1);
  });
  // Change the back button text to indicate a return to menu
  if(!page)
    _bb.text = "[]";

  // Create the page forward button
  var _fb = makeButton(256, 320, ">>", function(){ initLevelMenu(page + 1); });
  // Deactive the forward button if on the last page
  if(page == Math.floor(levels.length / PAGE_SIZE))
    _fb.active = false;

  // Create the play level button
  playButton = makeButton(384, 320, "Play Level", function(active){
    if(
      active && levelAccess[selected] &&
      selected != -1 && levels[selected] != undefined
    ){
      // Start the level
      clearButtons();
      clearLevel();
      loadLevel(levels[selected]);
      mode = modes.LEVEL;
    }
  });
  // Deactivate the play button until a level is selected
  playButton.active = false;

  // Starting position for level buttons
  var _x = 64
      _y = 64;

  // Determine the ending level for this page
  var _end = levels.length;
  if(_end > (page + 1) * PAGE_SIZE)
    _end = (page + 1) * PAGE_SIZE;

  // Iterate over each level on this page
  for(var _i = page * PAGE_SIZE; _i < _end; _i++){

    // Lay out level buttons for this page
    var _b = makeButton(_x, _y, _pad(_i, 2), function(active){
      // Start the level if double clicked...
      if(active && selected == this.value){
        clearButtons();
        clearLevel();
        loadLevel(levels[this.value]);
        mode = modes.LEVEL;
        return;
      }

      // ... otherwise change the selected level to this one.
      selected = this.value;
      for(var _bi = 0; _bi < buttons.length; _bi++)
        buttons[_bi].color = "white";
      this.color = "#6495ed";

      // Make sure the play level button is active
      playButton.active = active;
    });
    // Charge the button with the level it corresponds to
    _b.value = _i;

    // Deactivate the button if the level is locked
    if(!levelAccess[_i])
      _b.active = false;

    _x += 64;                             // Move to next position
    if(_x >=  320){ _x = 64; _y += 64; }  // Move down a row
  }
}

function drawLevelMenu(){
  drawText(String(page + 1) + " / " + String(Math.floor(levels.length / PAGE_SIZE) + 1),
  160, 325, "center");

  if(selected != -1){
    var _lvl = JSON.parse(levels[selected]);

    var _title = _lvl.title;
    var _color = "white";

    // Set the title to Locked if no access to level
    if(!levelAccess[selected]){
      _title = "[Locked]";
      _color = "#444";
    }
    // Set the title to unnamed if no title exists
    else if(_title == ""){
      _title = "Unnamed";
      _color = "#777";
    }

    // Draw the title
    drawText(_title, 305, 64, "left", _color, "20px");
  }

}
