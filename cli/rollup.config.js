import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';


export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle/wsinwol.js',
    format: 'cjs',
    sourcemap: 'inline',
  },
  plugins: [
    alias({
      entries: [
        {
          find: 'ws-client',
          replacement: './node_modules/ws/lib/websocket.js',
        },
      ],
    }),
    resolve({
      extensions: [
        '.js',
        '.ts',
      ],
      preferBuiltins: true,
    }),
    commonjs({
      ignore: [
        'bufferutil',       // ws/lib/buffer-util.js
        'utf-8-validate',   // ws/lib/validation.js
      ],
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: [
        '.js',
        '.ts',
      ],
    }),
  ],
};
