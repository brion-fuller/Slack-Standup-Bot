const { resolve } = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const src = resolve(__dirname, './src');
const dist = resolve(__dirname, './dist');

module.exports = {
  entry: {
    main: [
      resolve(src, 'index'),
    ],
  },
  output: {
    filename: '[name].js',
    path: dist,
  },
  context: src,
  devtool: 'source-map',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[hash:base64:15]',
              sourceMap: true,
              minimize: true,
            },
          },
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin('styles.min.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Redux-React-Calculator',
      template: resolve(src, 'index.html'),
    }),
    new HtmlWebpackExternalsPlugin([
      { name: 'react', var: 'React', url: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react.min.js' },
      { name: 'react-dom', var: 'ReactDOM', url: 'https://cdnjs.cloudflare.com/ajax/libs/react/15.4.1/react-dom.min.js' },
      { name: 'redux', var: 'Redux', url: 'https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js' },
      { name: 'react-redux', var: 'ReactRedux', url: 'https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.1/react-redux.min.js' },
    ]),
  ],
};
