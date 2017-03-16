const { resolve } = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = resolve(__dirname, './src');
const dist = resolve(__dirname, './dist');

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server',
      resolve(src, 'hot'),
    ],
  },
  output: {
    filename: '[name].js',
    path: dist,
    publicPath: '/',
  },
  context: src,
  devtool: 'sourcemap',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        include: [src],
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        include: [src],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[path][name]---[local]---[hash:base64:5]',
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: dist,
    publicPath: '/',
    historyApiFallback: true,
    inline: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Redux-React-Calculator',
      template: resolve(src, 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
