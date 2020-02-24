const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const appConfig = require("../app.config");

module.exports = env => {
  return {
    mode: env.mode,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("autoprefixer")]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CopyPlugin([
        {
          from: appConfig.paths.public.base,
          to: appConfig.paths.output,
          ignore: ["index.html"]
        }
      ]),
      new MiniCssExtractPlugin({
        filename: "css/[name].[chunkhash].css",
        chunkFilename: "css/[name].[chunkhash].css"
      }),
      new UglifyJSPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: false,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false
        }
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin()
    ]
  };
};
