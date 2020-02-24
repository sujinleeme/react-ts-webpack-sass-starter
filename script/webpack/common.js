const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var TSLintPlugin = require("tslint-webpack-plugin");

const path = require("path");
const appConfig = require("../app.config");

module.exports = env => {
  const plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env.mode)
    }),
    new Dotenv({
      path: appConfig.paths.env,
      systemvars: true,
      silent: false
    }),
    new HtmlWebpackPlugin({
      template: appConfig.paths.public.entry,
      inject: "body"
    }),
    new TSLintPlugin({
      files: [`${appConfig.paths.src.base}/**/*.tsx`]
    })
  ];

  if (env.WEBPACK_STATS) {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    /** RESOLVE */
    resolve: {
      extensions: [".ts", ".js", ".json", ".scss", ".tsx"],
      modules: ["node_modules"],
      alias: {
        node_modules: path.resolve(__dirname, "../../node_modules"),
        src: path.resolve(__dirname, "../../src"),
        styles: path.resolve(__dirname, "../../src/styles")
      }
    },

    /** ENTRY */
    entry: {
      app: appConfig.paths.src.entry
    },

    output: {
      filename: "js/[name].[hash].js",
      path: appConfig.paths.output,
      publicPath: "/"
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/].*\.js$/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    },

    /** MODULE */
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ["babel-loader", "ts-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.(jpe?g|svg|png|gif|eot)$/i,
          loaders: ["file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]"]
        },
        {
          // Match woff2 in addition to patterns like .woff?v=1.1.1.
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: "url-loader",
            options: {
              // Limit at 50k. Above that it emits separate files
              limit: 50000,

              // url-loader sets mimetype if it's passed.
              // Without this it derives it from the file extension
              mimetype: "application/font-woff",

              // Output below fonts directory
              name: "./fonts/[name].[ext]"
            }
          }
        }
      ]
    },

    /** PLUGINS */
    plugins
  };
};
