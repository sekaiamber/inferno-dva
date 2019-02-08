var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var routers = require('./routers.dev.json').routers;
var index = '/' + require('./routers.dev.json').index;

var entry = {};
routers.forEach((r) => {
  entry[r.name] = r.entry;
});
var plugins = routers.map(r => new HtmlWebpackPlugin({
  template: r.template,
  filename: r.filename,
  chunks: [r.name],
  inject: 'body'
}));
var rewrites = routers.map(r => ({
  from: new RegExp('\\/' + r.name),
  to: '/' + r.filename,
}));

var config = {
  mode: 'development',
  context: path.join(__dirname, '..', '/src'),
  entry,
  output: {
    path: path.join(__dirname, '..', '/build'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')), // judge if dev environment.
      __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')), // judge if secret environment.
      __ENV__: JSON.stringify('staging'),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
    }),
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
    extensions: ['.js', '.json', '.jsx'],
  },
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    // host: '192.168.0.132',
    // historyApiFallback: {
    //   index,
    //   rewrites,
    // },
    // proxy: {
    //   '/*.json': {
    //     target: 'https://',
    //     // secure: false,
    //     changeOrigin: true,
    //   },
    // }
  },
  externals: {
    jquery: "jQuery",
  },
};

module.exports = config;