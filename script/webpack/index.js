const merge = require("webpack-merge");
const webpackCommon = require("./common");

module.exports = env => {
  let webpackConfig = {};

  switch (env.mode) {
    case "development":
      webpackConfig = require("./development")(env);
      break;
    case "production":
    case "default":
      webpackConfig = require("./production")(env);
      break;
  }

  return merge(webpackCommon(env), webpackConfig);
};
