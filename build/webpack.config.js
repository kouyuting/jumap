var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: resolve("/src/main.js"),
    output: {
        path: resolve('dist'),
        //filename: "app.[hash].js",
        filename: "app.js",
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        filename: resolve("index.html"),
    })]
}