varying vec2 vUv;
varying float vElevation;
uniform float uColorChange;

void main() {
    vec4 color1 = vec4(0.57, 0.8, 1.0, 0.1);
    vec4 color2 = vec4(0.1, 0.42, 1.0, 1.0);
    vec4 color3 = vec4(0.27, 0.16, 1.0, 1.0);
    vec4 color4 = vec4(0.47, 0.95, 1.0, 1.);

    vec4 color5 = mix(color1, color2, vUv.x);
    vec4 color6 = mix(color3, color4, vUv.y);

    vec4 gradientColor = mix(color5, color6, vUv.x);

    vec4 colorAnimate = vec4(0.63, 0.81, 1.0, 1.0);
    // vec4 glassTint = vec4(0.7, 0.85, 1.0, 1.0);
    
    vec4 mixColor = mix(gradientColor, colorAnimate, uColorChange);
    mixColor.rgb += 0.21 * vElevation;
    // vec4 finalColor = mix(mixColor, glassTint, vElevation);
    
    gl_FragColor = mixColor;
}

  