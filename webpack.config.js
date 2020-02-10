const path = require("path");

module.exports = {
  mode: "development",
  watch: true,
  entry: {
    app: "./src/index.tsx"
  },
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      src: path.resolve(__dirname, "./src")
    }
  },
  devtool: "source-map"
};
