import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import appConfig from '../app.config';

import { ENV } from './types';

const config = (env: ENV) => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.mode),
    }),
    new Dotenv({
      path: appConfig.paths.env,
      systemvars: true,
      silent: false,
    }),
    new HtmlWebpackPlugin({
      template: appConfig.paths.public.entry,
      inject: 'body',
    }),
  ];

  if (env.WEBPACK_STATS) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    /** RESOLVE */
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx', '.json', '.scss'],
      modules: ['node_modules'],
      alias: {
        node_modules: path.resolve(__dirname, '../../node_modules'),
        src: path.resolve(__dirname, '../../src'),
        styles: path.resolve(__dirname, '../../src/styles'),
      },
    },

    /** ENTRY */
    entry: {
      app: appConfig.paths.src.entry,
    },

    output: {
      filename: 'js/[name].[hash].js',
      path: appConfig.paths.output,
      publicPath: '/',
    },

    optimization: {
      noEmitOnErrors: true,
      concatenateModules: true,
      splitChunks: {
        cacheGroups: {
          // custom cache group to force all components files
          // in /components/common into their own chunk
          common: {
            name: 'common-components',
            test: /[\\/]components[\\/]common[\\/]/,
            enforce: true,
          },
          // default defined by webpack
          vendors: {
            test: /[\\/]node_modules[\\/].*\.js$/,
            name: 'vendors',
            chunks: 'all' as const,
          },
        },
      },
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },

    /** MODULE */
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(jpe?g|svg|png|gif|eot)$/i,
          loaders: ['file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]'],
        },
        {
          // Match woff2 in addition to patterns like .woff?v=1.1.1.
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'url-loader',
            options: {
              // Limit at 50k. Above that it emits separate files
              // limit: 50000,

              // url-loader sets mimetype if it's passed.
              // Without this it derives it from the file extension
              mimetype: 'application/font-woff',

              // Output below fonts directory
              name: './fonts/[name].[ext]',
            },
          },
        },
      ],
    },

    /** PLUGINS */
    plugins,
  };
};

export default config;
