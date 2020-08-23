function drawTitle(){
  if(!pics[1]){ return; }

  var pic = pictures.PASSED;

  // Select the alternate picture when 2nd image flag is raised
  var picX = pic[0];
  if(drawBop){ picX++; }

  // Draw the picture for the title
  context.drawImage(pics[0],
    picX*CANVAS_SIZE[0], pic[1]*CANVAS_SIZE[1], CANVAS_SIZE[0], CANVAS_SIZE[1],
    0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]
  );

  context.fillStyle = "white";
  context.textAlign = "center";
  var text = "Press any key...".split("").join(String.fromCharCode(8201));
  //context.fillText(text, 256, 365);

  context.textAlign = "left";
  context.fillText(("Moves: " + String(moveCounter) + "/" + String(tmp_level.par)).split("").join(String.fromCharCode(8201)), 325, 200);
  context.fillText("Grade:".split("").join(String.fromCharCode(8201)), 325, 250);
}
