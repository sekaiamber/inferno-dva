var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var config = require('./webpack.deploy.config');

config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;
