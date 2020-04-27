import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import appConfig from '../app.config';

import { ENV } from './types';

const config = (env: ENV) => {
  return {
    mode: env.mode,
    devtool: false,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [require('autoprefixer')],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CopyPlugin([
        {
          from: appConfig.paths.public.base,
          to: appConfig.paths.output,
          ignore: ['src', 'script'],
        },
      ]),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[chunkhash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      }),
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: false,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  };
};

export default config;
