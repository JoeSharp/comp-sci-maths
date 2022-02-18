import includePaths from 'rollup-plugin-includepaths';

let includePathOptions = {
    include: {},
    paths: ['dest'],
    external: [],
    extensions: ['.js', '.json', '.html']
};

export default {
    input: 'dist/index.js',
    output: {
        file: 'comp-sci-maths-lib.js',
        format: 'cjs'
    },
    plugins: [includePaths(includePathOptions)],
};