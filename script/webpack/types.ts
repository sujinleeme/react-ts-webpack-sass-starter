import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

type Mode = Configuration['mode'];

interface ENV {
  mode: Mode;
  WEBPACK_STATS: true;
}

type Chunks = webpack.Options.CacheGroupsOptions['chunks'];

type WebpackConfig = Record<Mode, Configuration>;

export { ENV, Mode, WebpackConfig, Chunks };
