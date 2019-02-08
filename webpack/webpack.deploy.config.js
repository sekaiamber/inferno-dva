var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var TerserPlugin = require('terser-webpack-plugin');

var routers = require('./routers.deploy.json').routers;

var entry = {};
routers.forEach((r) => {
  entry[r.name] = r.entry;
});
var plugins = routers.map(r => new HtmlWebpackPlugin({
  template: r.template,
  filename: r.filename,
  chunks: [r.name],
  // favicon: './assets/images/favicon.ico',
  inject: 'body',
  // hash: true
}));

var config = {
  mode: 'production',
  context: path.join(__dirname, '..', '/src'),
  entry,
  output: {
    path: path.join(__dirname, '..', '/dist'),
    filename: '[name].[chunkhash:8].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: process.env.NODE_ENV !== 'production', // judge if dev environment.
      __ENV__: JSON.stringify('prod'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[chunkhash:8].css",
    }),
    new WebpackShellPlugin({
      onBuildExit: [
        'echo',
        'echo ==============',
        'echo      WORK',
        'echo ==============',
        'echo',
        'node webpack/deploy.js',
      ]
    })
  ].concat(plugins),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, 'style-loader', 'css-loader!postcss']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, 'style-loader', 'css-loader!postcss!sass']
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, 'style-loader', 'css-loader!postcss!less']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: 'url?limit=10000!img?progressive=true'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: 'url?limit=10000'
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
    ],
  },
  resolve: {
    // 設定後只需要寫 require('file') 而不用寫成 require('file.jsx')
    extensions: ['.js', '.json', '.jsx'],
  },
  externals: {
    inferno: "Inferno"
  },
  optimization: {
    minimizer: [new TerserPlugin({
      test: /\.jsx?$/i,
    })],
  },
};

module.exports = config;