const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    polyfill: './node_modules/babel-polyfill/lib/index.js', 
    bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    hot: true,
    port: 40000,
    historyApiFallback: true
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude:/node_modules/},
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, './src')],
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-redux': path.resolve(__dirname, './node_modules/react-redux/lib/index.js')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new es3ifyPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}