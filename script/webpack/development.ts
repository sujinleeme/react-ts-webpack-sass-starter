import webpack from 'webpack';
import appConfig from '../app.config';

import { ENV } from './types';

const config = (env: ENV) => {
  return {
    mode: env.mode,
    devtool: 'eval-source-map' as const,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  sourceMap: true,
                  includePaths: ['node_modules', appConfig.paths.src.style],
                },
              },
            },
          ],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      publicPath: '/',
      contentBase: appConfig.paths.public.base,
      port: appConfig.devServer.port,
    },
  };
};

export default config;
