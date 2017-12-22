const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

const env = process.env.NODE_ENV
const extractScss = new ExtractTextPlugin({
  filename: '[name].css',
  disable: env !== 'production',
})

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
      {
        test: /\.scss$/,
        use: extractScss.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                camelCase: true,
                importLoaders: 2,
                minimize: true,
                modules: true,
                ...(env === 'production'
                  ? {}
                  : { localIdentName: '[path][name]_[local]-[hash:base64:5]' }),
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{ from: 'public' }]),
    extractScss,
    new Visualizer(),
  ],
}
