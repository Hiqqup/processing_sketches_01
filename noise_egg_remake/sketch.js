let start_time;
function setup() {
  createCanvas(100, 100);
  start_time = second();
  noiseSeed(3);
  angleMode(DEGREES);
  frameRate(30)
  noSmooth();
  //saveGif("noise_egg_remake", 4);
}


const NOISE_SCALE = 0.012;
const MAX_CIRCLE_SIZE = 120;
const BACKGROUND_COLOR = "#e8e1d6";
const OUTLINE_COLOR = "#000000";
const INNER_COLORS = 
["#f3c1aa","#b2e1d2","#bdbdf7","#e8e1d6" ];
const INNER_COLORS_DARKER = [
"#c29a88","#8eb4a8","#9797c6", "#bab4ab" ];

function circle_dist(x,y){
  const circle_center_x = width/2;
  const circle_center_y = height/2;
  return dist(circle_center_x, circle_center_y, x, y);
}
function rotatePoint(x, y, rotation, ox, oy) {
  let rad = radians(rotation);
  let dx = x - oy;
  let dy = y - oy;
  let rx = dx * cos(rad) - dy * sin(rad);
  let ry = dx * sin(rad) + dy * cos(rad);
  return {
    x: rx + ox,
    y: ry + oy
  };
}
function drawNoiseCircle(color_index, time_offset,rotation, use_darker = false){
  push();
  noStroke();
  translate(width/2, height/2);
  rotate(rotation)
  translate(-width/2, -height/2);
  let circle_size = (frameCount/2 + time_offset) % MAX_CIRCLE_SIZE / 2;
    let circle_ratio =  circle_size / MAX_CIRCLE_SIZE * 2;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let d = circle_dist(x,y);
      if (d> circle_size ){
        continue;
      }
      let noise_offset = color_index;
      if (use_darker){
        noise_offset*=2;
      }
      let sampeled_noise = noise(x*NOISE_SCALE + noise_offset* NOISE_SCALE * 10 , y* NOISE_SCALE, 0);
      let c = (
        sampeled_noise* 0.8   + 0.1 + 
         circle_ratio * 0.3  );
      if ( circle_size - d  < 1.5 && c<0.5 ){
        fill( OUTLINE_COLOR  );
      }
      else if (c < 0.5){
        fill( INNER_COLORS[color_index] );
        if (use_darker){
          fill(INNER_COLORS_DARKER[color_index]);
        }
      }
      else if( c <0.505
    )  {
        fill( OUTLINE_COLOR  );
      }
      else{
        continue;
      }
      
      rect(x, y,1.2,1.2);
    }
  }
  pop();
}
function draw() {
  background(BACKGROUND_COLOR);
  const time_offset_factor =  MAX_CIRCLE_SIZE  / INNER_COLORS.length * 0.7;
  for(let i = 0 ; i < INNER_COLORS.length; i ++){
    drawNoiseCircle(i, i * time_offset_factor, i*140, true);

  }
  for(let i = 0 ; i < INNER_COLORS.length; i ++){

    drawNoiseCircle(i, i * time_offset_factor , i*140);
  }
}