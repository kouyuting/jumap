const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: [
        resolve("src/main.js")
    ],
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
      new HtmlWebpackPlugin({
        title: 'jumap demo'
      }),
    ],
}