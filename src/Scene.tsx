import { h } from "preact";
import glsl from "glslify";

import { WebGLRenderer, WebGLSetupFn } from "./WebGLRenderer";

import { inRange } from "./utils/random";
import { lerpVector } from "./utils/math";

const sketch: WebGLSetupFn = ({ width, height, aspect }) => {
    return {
        uniforms: {
            aspect: { value: aspect, type: "1f" },
            time: { value: inRange(0, 999), type: "1f" },
            resolution: { value: [width, height], type: "2f" },
            mousePosition: {
                value: [width / 2, height / 2],
                type: "2f",
            },
        },
        frag: glsl`
            precision highp float;

            // Our defined uniforms
            uniform float time;
            uniform float aspect;
            uniform vec2 resolution;
            uniform vec2 mousePosition;

            #pragma glslify: noise = require("glsl-noise/simplex/3d");
            #pragma glslify: filmGrain = require("./utils/glsl/grain.glsl");

            vec3 getColorFromDistanceToMouse(vec2 p) {
                float distanceToMouse = length(vec2(p.x - mousePosition.x, 1.0 - p.y - mousePosition.y));
                // Try fiddling with some of the values found below
                float circleFrequency = 4.0;
                vec3 colourFrom = vec3(0.1, 0.2, 0.5);
                vec3 colourTo = vec3(0.1, 1.0, 0.5);
                float intensity = clamp((1.0 - distanceToMouse) / 2.0, 0.0, 1.0);
                vec3 color = 0.3 + 0.8 * cos(circleFrequency * (colourFrom + intensity * colourTo));
                return color * intensity;
            }

            vec3 getColorFromNoiseField(vec2 p) {
                float noiseFrequency = 1.0;
                float noiseValue = noise(vec3(p, time) * noiseFrequency);
                return vec3(noiseValue * 0.2, noiseValue * -0.15, noiseValue * 0.1);
            }

            void main()	{
                vec2 uv = gl_FragCoord.xy / resolution;

                
                // We start with a base colour, which is a vec3 containing rgb "coordinates"
                vec3 color = vec3(0.8, 0.8, 0.8);

                // we can use our uniforms to set the colour as well. the vecN() functions
                // will expand any inputs until the desired number of arguments is reached.
                // color = vec3(abs(sin(time)));
                // color = vec3(mousePosition.x);
                // color = vec3(mousePosition.x, mousePosition.y, abs(sin(time)));

                // But obviously we'd like to manipulate each pixel to be a different value
                // this is where the uv coordinates come in
                // color = vec3(vec2(uv.xy), 1.0);


                // glsl has some useful inbuilt math and geom functions
                // color = vec3(step(0.5, uv.x));
                // color = mix(vec3(0.9, 0.3, 0.0), vec3(0.1, 1.0, 0.5), uv.x);


                // Now lets combine this with time for some fun
                // color = 0.5 + 0.5 * sin(time + uv.xyx + vec3(0.0, 2.0, 4.0)); // 0.5 + [-0.5..+0.5] => [0..1]

                // color += getColorFromDistanceToMouse(uv);
                // color -= getColorFromNoiseField(uv);
                // color += filmGrain(uv * time) * 0.05;

                // here we finally set the colour output for the current pixel
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        onFrame: ({ uniforms, ...props }) => {
            uniforms.time.value = props.elapsedTime;
            uniforms.mousePosition.value = lerpVector(
                uniforms.mousePosition.value,
                props.normalisedMousePosition,
                0.1
            );
        },
    };
};

export const Scene = () => <WebGLRenderer sketch={sketch} />;
