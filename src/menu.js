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
}

function _pad(n, s) {
    n = n.toString();
    while (n.length < s)
      n = "0" + n;
    return n;
}

const PAGE_SIZE = 16;
var page = 0;

function initLevelMenu(p = 0){
  // Make sure there is something on this page.
  if(levels.length <= p * PAGE_SIZE)
    return;
  if(p < 0)
    return;

  page = p;

  clearButtons();

  var _x = 64
      _y = 64;

  var _end = levels.length;
  if(_end > (page + 1) * PAGE_SIZE)
    _end = (page + 1) * PAGE_SIZE;

  for(var _i = page * PAGE_SIZE; _i < _end; _i++){

    var _b = makeButton(_x, _y, _pad(_i, 2), function(){
      clearButtons();
      clearLevel();
      loadLevel(levels[this.value]);
      mode = modes.LEVEL;
    });
    _b.value = _i;

    _x += 64;
    if(_x >=  320){ _x = 64; _y += 64; }
  }

  makeButton(64, 320, "<<", function(){ initLevelMenu(page - 1); });
  makeButton(256, 320, ">>", function(){ initLevelMenu(page + 1); });

  makeButton(384, 320, "Play Level", function(){return;});

}

function drawLevelMenu(){
  drawText(String(page + 1) + " / " + String(Math.floor(levels.length / PAGE_SIZE) + 1),
  160, 325, "center");
}
