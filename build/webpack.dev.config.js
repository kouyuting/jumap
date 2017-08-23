const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: [
        //"babel-polyfill",
        resolve("src/main.js")
    ],
    output: {
        //path: resolve('dist'),
        filename: "app.[hash].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
      //new CleanWebpackPlugin([resolve('dist')]),
      new HtmlWebpackPlugin({
        title: 'jumap demo'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
}