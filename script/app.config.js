/**
 * Common paths and general configurations
 */
const { join } = require("path");

const paths = {
  root: join(__dirname, ".."),
  join: (...params) => {
    return join(join(__dirname, "..", ...params));
  }
};

module.exports = {
  paths: {
    root: paths.root,
    src: {
      base: join(paths.root, "src"),
      entry: join(paths.root, "src", "index.tsx"),
      style: join(paths.root, "src", "styles")
    },
    output: join(paths.root, "dist"),
    env: join(paths.root, ".env"),
    public: {
      base: join(paths.root, "public"),
      entry: join(paths.root, "public", "index.html")
    }
  },
  devServer: {
    port: 9000
  }
};
