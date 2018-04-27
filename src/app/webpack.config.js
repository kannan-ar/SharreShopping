var path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './main',
        vendor: './vendor',
        styles: './shared/styles/styles.css'
    },
    context: __dirname,
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        publicPath: '/js/',
        path: path.join(__dirname, '../server/wwwroot/js/'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new CopyWebpackPlugin([{ from: './assets/images/*', to: '../images/[name].[ext]', toType: 'template' },
            { from: './assets/fonts/*', to: '../fonts/[name].[ext]', toType: 'template' }])]
}