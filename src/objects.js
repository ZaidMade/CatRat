class Entity{

  constructor(_x, _y, _type){
    this.x = _x;
    this.y = _y;
    this.type = types[_type];
    this.sprite = sprites[_type];
    this.bop = (Math.random() >= 0.5);
  }

  draw(){
    context.drawImage(tiles[0],
      this.sprite[0]*TILE_SIZE + ((this.bop)?32:0), this.sprite[1]*TILE_SIZE,
      TILE_SIZE, TILE_SIZE,
      this.x * TILE_SIZE, this.y * TILE_SIZE,
      TILE_SIZE, TILE_SIZE
    );
  }

}

class Cat extends Entity{
  constructor(_x, _y){ super(_x, _y, 'CAT'); }

  draw(){
    context.drawImage(tiles[0],
      this.sprite[0]*TILE_SIZE, this.sprite[1]*TILE_SIZE,
      TILE_SIZE, TILE_SIZE,
      this.x * TILE_SIZE, this.y * TILE_SIZE,
      TILE_SIZE, TILE_SIZE
    );
  }
}

class Rat extends Entity{
  constructor(_x, _y){
    super(_x, _y, 'RAT');
    this.asleep = false;
  }

  sleep(){
    rat.sprite = sprites.RAT_SLEEP;
    this.asleep = true;
  }

  draw(){
    context.drawImage(tiles[0],
      this.sprite[0]*TILE_SIZE, this.sprite[1]*TILE_SIZE,
      TILE_SIZE, TILE_SIZE,
      this.x * TILE_SIZE, this.y * TILE_SIZE,
      TILE_SIZE, TILE_SIZE
    );

    if(this.asleep){
      context.drawImage(tiles[0],
        sprites.ZZZ[0]*TILE_SIZE + ((this.bop)?32:0), sprites.ZZZ[1]*TILE_SIZE,
        TILE_SIZE, TILE_SIZE,
        this.x * TILE_SIZE, this.y * TILE_SIZE,
        TILE_SIZE, TILE_SIZE
      );
    }
  }

}

class Push extends Entity{
  constructor(_x, _y, _type){ super(_x, _y, _type); }

  move(_dx, _dy){
    var _push = { x: this.x + _dx, y: this.y + _dy };
    var _delete = false;

    for(var _i = 0; _i < entities.length; _i++){
      var _e = entities[_i];

      if(_e.x == _push.x && _e.y == _push.y){
        switch(_e.type){
          case types.KILL:
            _delete = true;
            break;
          default:
            return { delete: _delete, moved: false };
        }
      }
    }

    this.x = _push.x;
    this.y = _push.y;
    return { delete: _delete, moved: true };
  }

}

class Yarn extends Push{
  constructor(_x, _y){ super(_x, _y, 'YARN'); }
}

class Button{

  constructor(_x, _y, _text, _callback){
    this.x = _x;
    this.y = _y;
    this.text = _text;
    this.callback = _callback;

    this.myIndex = undefined;
    this.hover = false;
    this.halfWidth = context.measureText(_text).width;
    this.halfHeight = 16;

    this.width = this.halfWidth*2;
    this.height = this.halfHeight*2;

    this.left = this.x - this.halfWidth;
    this.top = this.y - this.halfHeight;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  destroy(){
    if(this.myIndex == undefined)
      return;

    // Delete this button and recollected the indexes for each other button.
    buttons.splice(this.myIndex, 1);
    for(var i = 0; i < buttons.length; i++){ buttons[i].myIndex = i; }
  }

  draw(){
    context.strokeStyle = "white";
    context.fillStyle = (this.hover)?"white":"black";
    context.lineWidth = 4;

    context.beginPath();
    context.fillRect(this.left, this.top, this.width, this.height);
    context.rect(this.left, this.top, this.width, this.height);
    context.stroke();

    drawText(this.text, this.x, this.y + (this.height/8), "center", (this.hover)?"black":"white");
  }

}
