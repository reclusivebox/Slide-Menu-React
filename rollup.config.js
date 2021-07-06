import typescript from 'rollup-plugin-typescript2';
import postCSS from 'rollup-plugin-postcss';
import externals from 'rollup-plugin-node-externals';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/SlideMenu.js',
    format: 'es',
    name: 'SlideMenu',
  },
  plugins: [
    typescript({
      tsconfigOverride: { compilerOptions: { module: 'ESNext' } },
    }),
    postCSS({
      modules: true,
      use: ['sass'],
    }),
    externals({ deps: true }),
  ],
  external: ['react', 'react-dom'],
};
