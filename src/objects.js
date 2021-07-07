class Entity{

  constructor(_x, _y, _type){
    this.x = _x;
    this.y = _y;
    this.type = types[_type];
    this.sprite = sprites[_type];
    this.bop = (Math.random() >= 0.5);
  }

  tick(){ /* do nothing... */ }

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
          case types.TRAIL:
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

var _tids = 0;
class Trail extends Entity{
  constructor(_x, _y, _s, _lt){
    super(_x, _y, 'TRAIL');
    this.sprite = _s;
    this.last_trail = _lt;
    this.burn = false;
    this.lit = false;
    this.tid = _tids;
    _tids += 1;
  }

  tick(){
    if(this.type == types.KILL){
      for(var _i = 0; _i < entities.length; _i++){
        if(entities[_i].tid == this.tid){
          entities.splice(_i, 1);
        }
      }
    }

    if(this.lit){
      this.sprite = sprites.KILL;
      this.type = types.KILL;
      if(this.last_trail != -1){
        this.last_trail.burn = true;
        this.last_trail.lit = true;
      }
    }

    if(this.burn){ this.lit = true; }
  }

  draw(){
    context.drawImage(tiles[0],
      this.sprite[0]*TILE_SIZE + ((drawBop)?32:0), this.sprite[1]*TILE_SIZE,
      TILE_SIZE, TILE_SIZE,
      this.x * TILE_SIZE, this.y * TILE_SIZE,
      TILE_SIZE, TILE_SIZE
    );
  }
}

class Yarn extends Push{
  constructor(_x, _y, _t = 'YARN'){
    super(_x, _y, _t);

    this.dir = dir.DOWN;
    this.last_dir = dir.DOWN;
    this.moves = 3;
    this.last_trail = -1;
    this.drop = true;
  }

  move(_dx, _dy){
    var _r = super.move(_dx, _dy);

    if(_r.moved){
      this.last_dir = this.dir;
      if     (_dx > 0){ this.dir = dir.RIGHT; }
      else if(_dy > 0){ this.dir = dir.DOWN; }
      else if(_dx < 0){ this.dir = dir.LEFT; }
      else            { this.dir = dir.UP; }

      if(this.drop){
        var _s = sprites.TRAIL_V;
        var _x = this.x;
        var _y = this.y;
        switch(this.dir){
          case dir.DOWN:
            switch(this.last_dir){
              case dir.DOWN:
                _s = sprites.TRAIL_V;
                break;
              case dir.UP:
                _s = sprites.TRAIL_V;
                break;
              case dir.LEFT:
                _s = sprites.TRAIL_UR;
                break;
              case dir.RIGHT:
                _s = sprites.TRAIL_UL;
                break;
            }
            _y -= 1;
            break;
          case dir.UP:
            switch(this.last_dir){
              case dir.DOWN:
                _s = sprites.TRAIL_V;
                break;
              case dir.UP:
                _s = sprites.TRAIL_V;
                break;
              case dir.LEFT:
                _s = sprites.TRAIL_DR;
                break;
              case dir.RIGHT:
                _s = sprites.TRAIL_DL;
                break;
            }
            _y += 1;
            break;
          case dir.LEFT:
            switch(this.last_dir){
              case dir.DOWN:
                _s = sprites.TRAIL_DL;
                break;
              case dir.UP:
                _s = sprites.TRAIL_UL;
                break;
              case dir.LEFT:
                _s = sprites.TRAIL_H;
                break;
              case dir.RIGHT:
                _s = sprites.TRAIL_H;
                break;
            }
            _x += 1;
            break;
          case dir.RIGHT:
            switch(this.last_dir){
              case dir.DOWN:
                _s = sprites.TRAIL_DR;
                break;
              case dir.UP:
                _s = sprites.TRAIL_UR;
                break;
              case dir.LEFT:
                _s = sprites.TRAIL_H;
                break;
              case dir.RIGHT:
                _s = sprites.TRAIL_H;
                break;
            }
            _x -= 1;
            break;
        }

        this.last_trail = entities[entities.push(new Trail(_x, _y, _s, this.last_trail)) - 1 ];
        this.moves -= 1;

      }

      if(!this.drop){ this.drop = true; }

      for(var _i = 0; _i < entities.length; _i++){
        var _e = entities[_i];
        if(_e.x == this.x && _e.y == this.y && _e.type == types.TRAIL){
          this.moves += 1;

          // Break the reference chain to avoid invalid references.
          for(var _ti = 0; _ti < entities.length; _ti++){
            var _te = entities[_ti];
            if(_te.type == types.TRAIL && _te.last_trail == this){
              _te.last_trail = -1;
              break;
            }
          }

          entities.splice(_i, 1);
          this.drop = false;
          this.last_trail = -1;
          break;
        }
      }

    }

    if(_r.delete && this.last_trail != -1){ this.last_trail.burn = true; }

    if(this.moves < 0){ _r.delete = true; }
    return _r;
  }

  draw(){
    var _ts;
    var _tx = this.x * TILE_SIZE;
    var _ty = this.y * TILE_SIZE;
    var _tw = TILE_SIZE;
    var _th = TILE_SIZE;

    if(this.dir >= dir.LEFT){
      _ts = sprites.TRAIL_H;
      _th = TILE_SIZE/2;
    }
    else{
      _ts = sprites.TRAIL_V;
      _tw = TILE_SIZE/2;
    }

    var _tsx = _ts[0];
    var _tsy = _ts[1];

    if(this.dir == dir.LEFT){
      _tsx += 0.5;
      _tx += TILE_SIZE/2;
    }
    else if(this.dir == dir.UP){
      _tsy += 0.5;
      _ty += TILE_SIZE/2;
    }

    context.drawImage(tiles[0],
      _tsx*TILE_SIZE + ((this.bop)?TILE_SIZE:0), _tsy*TILE_SIZE,
      _th, _tw,
      _tx, _ty,
      _th, _tw
    );

    super.draw();
  }

  /*
   * The yarn ball can only move 3 times and lay down 3 paths before it
   * disappears. If a yarn ball is pushed onto a path, that path is destroyed
   * and the yarn ball gains another move. If the yarn ball is pushed into a
   * fire, the fire will spread backwards down the path destroying all the
   * remaining connected paths.
   */

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
