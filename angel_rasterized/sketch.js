function setup() {
  createCanvas(700, 1000);
  frameRate(60)
  img = loadImage("angel.jpg")

    //saveGif('mySketch', 5);
}

function draw() {
  background(250);

  img.resize(width, height)
  //image(img, 0,0);
  fill(0);
  noStroke();
  const grid_amount_x = (sin(millis() / 5000) + 1) *100;
  //const grid_amount_x = mouseX;
  const grid_amount_y = height/width * grid_amount_x;
  let circle_width = width / grid_amount_x;
  for(let y= 0 ; y < grid_amount_y; y ++){
    for(let x= 0 ; x < grid_amount_y; x ++){
      let pixle_color = img.get(x * circle_width,y*circle_width);
      
      //fill(pixle_color);
        circle(x * circle_width + circle_width/2 , y*circle_width + circle_width/2,  (1 - blue(pixle_color)/ 255) * circle_width  );
    }
  }
}
