const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [
        new BundleAnalyzerPlugin()]
});