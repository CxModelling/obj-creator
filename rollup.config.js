const definition = require("./package.json");
const dependencies = Object.keys(definition.dependencies || {});

export default {
    input: 'index.js',
    external: dependencies,
    output: {
        file: 'build/js-creator.js',
        format: 'cjs'
    },
    plugins: [ ]
};