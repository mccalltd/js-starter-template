const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/react/umd/react.development.js', to: 'react.js' },
      {
        from: 'node_modules/react-dom/umd/react-dom.development.js',
        to: 'react-dom.js',
      },
    ]),
  ],
})
