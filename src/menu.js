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
