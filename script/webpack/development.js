const appConfig = require('../app.config');

module.exports = env => {
  return {
    mode: env.mode,
    devtool: 'eval-source-map',
    module: {
      rules: [
        // { test: /\.css$/, loader: "typings-for-css-modules-loader?modules" },
        // { test: /\.scss$/, loader: "typings-for-css-modules-loader?modules&sass" },

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
                  includePaths: ['node_modules', appConfig.paths.src.style]
                }
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
      publicPath: '/',
      contentBase: appConfig.paths.public.base,
      port: appConfig.devServer.port
    },
    plugins: []
  };
};
