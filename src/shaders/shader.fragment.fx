precision highp float;

#define PI 3.14159265359

// varying
varying vec2 vUV; // screen coordinates

// uniforms
uniform vec4 source1, source2, source3, source4, source5, source6, source7, source8, source9, source10; 
uniform float time;

void main() {
    vec4 emitters[10] = vec4[10](
        source1,
        source2,
        source3,
        source4,
        source5,
        source6,
        source7,
        source8,
        source9,
        source10
    );

    float value = 0.0;
    float totalAmplitude = 0.0;
    for(int i = 0; i < emitters.length(); i++) {
        float r = length(emitters[i].xy - vUV);
        value += emitters[i].w * (1.0 + sin(2.0*PI*(10.0*r - time) / (0.25*emitters[i].z))) / (r * 20.0);
        totalAmplitude += emitters[i].w;
    }
    value /= totalAmplitude;


    vec3 finalColor = vec3(value);

    gl_FragColor = vec4(finalColor, 1.0); // displaying the final color
    
}