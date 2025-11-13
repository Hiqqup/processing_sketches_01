let start_time;
function setup() {
  createCanvas(100, 100);
  start_time = second();
  noiseSeed(3);
  angleMode(DEGREES);
  frameRate(30)
  pixelDensity(1);
  noSmooth();
  saveGif("noise_egg_remake", 8);
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
function rotateAroundZ(x, y, angleDeg, ox, oy) {
  // convert degrees to radians
  let a = radians(angleDeg);

  // translate point relative to origin
  let dx = x - ox;
  let dy = y - oy;

  // apply z-axis rotation (2D rotation)
  let rx = dx * cos(a) - dy * sin(a);
  let ry = dx * sin(a) + dy * cos(a);

  // translate back
  return {
    x: rx + ox,
    y: ry + oy
  };
}
function drawNoiseCircle(color_index, time_offset,rotation, use_darker = false){
  push();
  noStroke();
  //translate(width/2, height/2);
  //rotate(rotation)
  //translate(-width/2, -height/2);
  let circle_size = (frameCount/2 + time_offset) % MAX_CIRCLE_SIZE / 2;
    let circle_ratio =  circle_size / MAX_CIRCLE_SIZE * 2;
  for (let original_y = 0; original_y < height;original_y+= 1) {
    for (let original_x = 0; original_x < width; original_x += 1) {
      let rotated_vec = rotateAroundZ(original_x,original_y, rotation,width/2, height/2);
      let rotated_x = round(rotated_vec.x);
      let rotated_y = round(rotated_vec.y);

      let d = circle_dist(original_x,original_y);
      if (d> circle_size ){
        continue;
      }
      let noise_offset = color_index;
      if (use_darker){
        noise_offset*= 2;
        if (color_index == 0){
          noise_offset += NOISE_SCALE * MAX_CIRCLE_SIZE;
        }
      }
      let sampeled_noise = noise(rotated_x*NOISE_SCALE + noise_offset* NOISE_SCALE * 10 , rotated_y* NOISE_SCALE, 0);
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
      
      rect(original_x, original_y,1,1);
    }
  }
  pop();
}
function draw() {
  background(BACKGROUND_COLOR);
  const time_offset_factor =  MAX_CIRCLE_SIZE  / INNER_COLORS.length * 0.7;
  //drawNoiseCircle(1, 0,0);
  const step_range = INNER_COLORS.length;
  for(let i = step_range -1; i >= 0; i --){
    drawNoiseCircle(i, i * time_offset_factor, i*140, true);

  }
  for(let i = 0 ; i < step_range; i ++){

    drawNoiseCircle(i, i * time_offset_factor , i*140);
  }
}