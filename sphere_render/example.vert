precision highp float;

attribute vec3 aPosition;

void main() {
  gl_Position = vec4(aPosition * 2.0 - vec3(1),1.0);
}