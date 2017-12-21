const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')

const extractCss = new ExtractTextPlugin('[name].css')

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCss.extract('css-loader'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new UglifyJSPlugin({ sourceMap: true }),
    extractCss,
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
