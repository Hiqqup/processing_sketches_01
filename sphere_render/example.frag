precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse; // optional

float intersectSphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);               // note: using b = dot(oc, rd) (half of usual 2b)
    float c = dot(oc, oc) - radius*radius;
    float disc = b*b - c;
    if (disc < 0.0) return -1.0;
    float sq = sqrt(disc);
    float t1 = -b - sq;
    float t2 = -b + sq;
    if (t1 > 0.0001) return t1;
    if (t2 > 0.0001) return t2;
    return -1.0;
}
vec3 phongLighting(vec3 p, vec3 n, vec3 viewDir, vec3 lightPos) {
    vec3 L = normalize(lightPos - p);
    float diff = max(dot(n, L), 0.0);

    // Blinn-Phong specular
    vec3 H = normalize(L + viewDir);
    float spec = pow(max(dot(n, H), 0.0), 64.0);

    // simple ambient
    float ambient = 0.08;
    return vec3(1.0) * ambient + vec3(0.9, 0.7, 0.4) * diff + vec3(1.0) * (spec * 0.6);
}


void main() {

 // pixel coordinates -> NDC
    vec2 uv = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y; // correct aspect

    //// camera setup
    vec3 camPos = vec3(0.0, 0.0, 4.0);
    float fov = 45.0; // degrees
    float fovRad = radians(fov);
    // compute ray direction in world space
    vec3 rd = normalize(vec3(uv * tan(fovRad * 0.5), -1.0)); // camera looks toward -Z

    // if you want to orbit camera with time:
    float ang = u_time * 0.5;
    mat2 rot = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
    camPos.xz = rot * camPos.xz;
    rd.xz = rot * rd.xz;

    //// sphere
    vec3 sphereCenter = vec3(0.0, 0.0, 0.0);
    float sphereRadius = 1.0;

    float t = intersectSphere(camPos, rd, sphereCenter, sphereRadius);
    if (t < 0.0) {
        // background
        vec3 sky = vec3(0.02, 0.04, 0.08) + 0.3 * vec3(0.3, 0.5, 0.9) * pow(1.0 - uv.y, 2.0);
        gl_FragColor = vec4(sky, 1.0);
        return;
    }

    // hit point & normal
    vec3 P = camPos + rd * t;
    vec3 N = normalize(P - sphereCenter);

    // lighting
    vec3 lightPos = vec3(3.0, 4.0, 2.0);
    vec3 viewDir = normalize(camPos - P);
    vec3 color = phongLighting(P, N, viewDir, lightPos);

    // simple rim (fake fresnel)
    float rim = pow(1.0 - max(dot(viewDir, N), 0.0), 3.0);
    color += vec3(0.5, 0.7, 1.0) * rim * 0.25;

    // gamma correction
    color = pow(color, vec3(1.0 / 2.2));



    gl_FragColor = vec4(color, 1.0);
}