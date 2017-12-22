const path = require('path')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'node_modules/react/umd/react.development.js', to: 'react.js' },
      {
        from: 'node_modules/react-dom/umd/react-dom.development.js',
        to: 'react-dom.js',
      },
    ]),
  ],
})
