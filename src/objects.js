class Entity{

  constructor(_x, _y, _type){
    this.x = _x;
    this.y = _y;
    this.type = eval('types.' + _type);
    this.sprite = eval('sprites.' + _type);
  }

}
