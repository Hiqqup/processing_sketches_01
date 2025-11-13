let shaderProgram;

function preload(){
  shaderProgram = loadShader("example.vert", "example.frag");
}
function setup() {
  createCanvas(1000, 1000, WEBGL);

  // Create a p5.Shader object.

  // Apply the p5.Shader object.
  shader(shaderProgram);

  shaderProgram.setUniform('u_resolution', [width, height]);
  shaderProgram.setUniform('u_time', millis() / 1000.0);

  
  // Style the drawing surface.
  noStroke();


}
function draw(){
  clear();
  rect(0,0, width,height);

}