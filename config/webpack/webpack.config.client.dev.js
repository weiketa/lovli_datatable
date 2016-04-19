const webpack = require('webpack');
const defaultConfig = require('./webpack.config.client');
const _ = require('lodash');
const devProps = require('./devProps');
const path = require('path');

const basePath = path.join(__dirname, '../../');

const config = module.exports = _.assign(_.clone(defaultConfig), {
  devtool: 'eval',
  entry: _.assign(_.clone(defaultConfig.entry), {
    app: _.union(
      [
        `webpack-dev-server/client?${devProps.baseUrl}`,
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch'
      ],
      defaultConfig.entry.app
    )
  }),
  output: _.assign(_.cloneDeep(defaultConfig.output), {
    publicPath: 'http://127.0.0.1:9090/static/',
    pathinfo: true,
    crossOriginLoading: 'anonymous'
  }),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: /source\//
      },
      {
        test : /\.json$/,
        loader : 'json'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader',
        include: /source\//
      }
    ]
  },
  plugins: (defaultConfig.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]),
  devServer: {
    publicPath: `${devProps.baseUrl}/static`,
    host: devProps.host,
    hot: true,
    historyApiFallback: true,
    contentBase: devProps.contentBase,
    port: devProps.webpackPort,
    stats: {
      colors: true,
      chunkModules: false,
      modules: false
    }
  }
});