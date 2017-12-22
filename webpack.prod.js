const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new UglifyJSPlugin({ sourceMap: true }),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/react/umd/react.production.min.js',
        to: 'react.js',
      },
      {
        from: 'node_modules/react-dom/umd/react-dom.production.min.js',
        to: 'react-dom.js',
      },
    ]),
  ],
})
