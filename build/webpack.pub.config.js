var path = require('path');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: resolve("src/jumap/index.js"),
    output: {
        path: resolve(''),
        //filename: "app.[hash].js",
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            }
        ]
    }
}