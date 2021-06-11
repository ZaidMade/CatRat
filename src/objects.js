class Entity{

  constructor(_x, _y, _type){
    this.x = _x;
    this.y = _y;
    this.type = types[_type];
    this.sprite = sprites[_type];
    this.bop = (Math.random() >= 0.5);
  }

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
