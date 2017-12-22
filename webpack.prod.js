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
        use: extractCss.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                camelCase: true,
                importLoaders: 1,
                minimize: true,
                modules: true,
              },
            },
            'postcss-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    extractCss,
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
