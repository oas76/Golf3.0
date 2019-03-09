var path = require('path')

module.exports = {
  entry: path.resolve(__dirname,'src/components/app.js'),
  output: {
    path: __dirname + '/src/server/static',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
    ],
  },
};
