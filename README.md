# ustwo-tech-weekly-glsl

## Project setup

This project is a simple Preact app bundled with Snowpack/esbuild. The WebGL renderer is adapted form another project of mine. Feel free to take a look at it to see how things work under the hood, but for the purposes of our session we only really care about the `src/Scene.tsx` file.

## ⚠️ Flashing lights and motion

This demo involves manipulating pixels on the canvas, resulting in lots of changing colours and movement. If you are sensitive to either of these then _please_ let me know beforehand, and I can see if we can adapt the demo to tone things down.

## Getting Started

To get started on your device, fork this repo and run:

```bash
yarn && yarn start
```

Let me know if you run into any problems and I'll help out.

#### Fast refresh dev server workaround

There is [an issue with fast refresh that causes production builds to error](https://github.com/snowpackjs/snowpack/discussions/1458). I've kept fast refresh (via `prefresh`) enabled to keep the feedback loop fast, since we'll only be using the dev server in our session. If you want to create a production build I reccommend you comment out the lines that I've marked in `snowpack.config.js` and `.babelrc`.

## Resources

Some of my fave resources if anyone is interested in learning more about shaders:

- [The Book of Shaders](https://thebookofshaders.com/)
- [WebGL Fundamentals](https://webgl2fundamentals.org/)
- [Inigo Quilez's website](https://www.iquilezles.org/www/index.htm)
- [Yuri Artyukh's Ray Marching video tutorial](https://youtu.be/q2WcGi3Cr9w)

## License

This repo is [GNU Licensed](https://github.com/neefrehman/manyworlds/blob/main/LICENSE).
