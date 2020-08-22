class Entity{

  constructor(_x, _y, _type){
    this.x = _x;
    this.y = _y;
    this.type = eval('types.' + _type);
    this.sprite = eval('sprites.' + _type);
    this.bop = ((Math.random() >= 0.5) ? true : false);
  }

}
