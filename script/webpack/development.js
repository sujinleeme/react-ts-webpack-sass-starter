const appConfig = require("../app.config");

module.exports = env => {
  return {
    mode: env.mode,
    devtool: "eval-source-map",
    module: {
      rules: [
        { test: /\.s[ac]ss$/i, use: ["style-loader", "css-loader", "sass-loader"] },
        {
          test: /\.css$/,
          use: [
            {
              loader: "typings-for-css-modules-loader",
              options: {
                sourceMap: true,
                import: false,
                url: false,
                importLoaders: 1,
                modules: true,
                camelCase: true,
                namedExport: true,
                localIdentName: "[name]__[local]--[hash:base64:5]"
              }
            }
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: {
        disableDotRule: true
      },
      publicPath: "/",
      contentBase: appConfig.paths.public.base,
      port: appConfig.devServer.port
    },
    plugins: []
  };
};
