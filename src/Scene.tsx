import { h } from "preact";
import glsl from "glslify";

import { WebGLRenderer } from "./WebGLRenderer";
import type { WebGLSetupFn } from "./WebGLRenderer";

import { inRange } from "./utils/random";

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

            varying vec2 vUv; // pixel co-ordinates — recieved by the renderer via the vertext shader

            // Our defined uniforms
            uniform float time;
            uniform float aspect;
            uniform vec2 resolution;
            uniform vec2 mousePosition;

            void main()	{
                vec2 uv = vUv * vec2(aspect, 1.0) + vec2((1.0 - aspect) / 2.0, 0.0);
            
                vec2 pos = uv - vec2(0.5);

                gl_FragColor = vec4(vec3(1.0, 0.0, 0.0), 1.0);
            }
        `,
        onFrame: (props) => {
            
        },
    };
};

export const Scene = () => {
    return <WebGLRenderer sketch={sketch} />;
};
