import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";

export default [{
    input: 'src/index.ts',
    output: {
        sourcemap: true,
        file: 'dist/comp-sci-maths-lib.js',
        format: 'es',
    },
    plugins: [typescript()]
}, {
    input: 'src/index.ts',
    output: [{ file: 'dist/comp-sci-maths-lib.d.ts', format: 'es' }],
    plugins: [dts()],
}];