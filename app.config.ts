/**
 * Common paths and general configurations
 */
const { join } = require('path');

const paths = {
  root: join(__dirname, '..'),
  join: (...params: string[]) => {
    return join(join(__dirname, '..', ...params));
  },
};

const path = {
  paths: {
    root: paths.root,
    src: {
      base: join(paths.root, 'src'),
      entry: join(paths.root, 'src', 'index.tsx'),
    },
    output: join(paths.root, 'dist'),
    env: join(paths.root, '.env'),
    public: {
      base: join(paths.root, 'public'),
      entry: join(paths.root, 'public', 'index.html'),
    },
  },
  devServer: {
    port: 9000,
  },
};

export default path;
