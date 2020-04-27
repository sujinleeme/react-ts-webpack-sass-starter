import webpackMerge from 'webpack-merge';
import webpackCommon from './common';
import developmentConfig from './development';
import productionConfig from './production';

import { ENV, WebpackConfig } from './types';

const config = (env: ENV) => {
  const { mode } = env;

  const webpackConfig: WebpackConfig = {
    none: developmentConfig(env),
    development: developmentConfig(env),
    production: productionConfig(env),
  };

  return (
    mode && webpackMerge(webpackCommon(env), webpackConfig[mode as keyof typeof webpackConfig])
  );
};

export default config;
