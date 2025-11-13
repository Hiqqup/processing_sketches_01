function setup() {
  createCanvas(700, 1000, WEBGL);
  frameRate(60)
  img = loadImage("angel.jpg")
}

function draw() {
  background(250);
  img.resize(width, height)

  fill(0);
  noStroke();
  rotateY(frameCount/20);
  //const grid_amount_x = floor((sin(millis() / 5000) + 1.4) *20);
  translate(-width/2, - height/2)
  const grid_amount_x = floor( 20);
  const grid_amount_y = height/width * grid_amount_x;
  let circle_width = width / grid_amount_x;
  for(let y= 0 ; y < grid_amount_y; y ++){
    for(let x= 0 ; x < grid_amount_x; x ++){
      let pixle_color = img.get(x * circle_width,y*circle_width);
      
      const b  =blue(pixle_color);
      if (b > 230){
        continue;
      }
      const size = (1 - b/ 255) * circle_width;
      push()
        translate(x * circle_width + circle_width/2 , y*circle_width + circle_width/2, b - 50  );
        sphere(size/2);
      pop()
    }
  }
}
function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }
}
