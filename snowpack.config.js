/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
    mount: {
        public: { url: "/", static: true },
        src: { url: "/dist" },
    },
    plugins: [
        "@snowpack/plugin-typescript",
        "@prefresh/snowpack", // COMMENT OUT THIS LINE FOR PRODUCTION
        [
            "@snowpack/plugin-babel",
            {
                input: [".js", ".mjs", ".jsx", ".ts", ".tsx"],
            },
        ],
    ],
    routes: [{ match: "routes", src: ".*", dest: "/index.html" }],
    optimize: {
        bundle: true,
        minify: true,
        target: "es2018",
        splitting: true,
        treeshake: true,
    },
    packageOptions: {
        /* ... */
    },
    devOptions: {
        /* ... */
    },
    buildOptions: {
        jsxFactory: "h",
        jsxFragment: "Fragment",
    },
};
