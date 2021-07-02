precision highp float;

// varying
varying vec2 vUV; // screen coordinates

// uniforms
uniform float time;

void main() {
    vec2 emitters[6] = vec2[6](
        vec2(0.5, 0.5),
        vec2(0.1, 0.3),
        vec2(0.9, 0.1),
        vec2(0.2, 0.4),
        vec2(0.7, 0.6),
        vec2(0.5, 0.9)
    );

    float value = 0.0;
    for(int i = 0; i < emitters.length(); i++) {
        float r = length(emitters[i] - vUV);
        value += sin(300.0*r - time) / (r * 10.0);
    }
    value /= float(emitters.length());


    vec3 finalColor = vec3(value);

    gl_FragColor = vec4(finalColor, 1.0); // displaying the final color
    
}