const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  entry: { app: path.resolve(__dirname, 'src/index.js') },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{ from: 'public' }]),
    new Visualizer(),
  ],
}
