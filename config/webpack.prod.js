const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.base')

const CONTEXT_PATH = path.resolve(__dirname, '../')
const OUTPUT_PATH = path.resolve(CONTEXT_PATH, 'dist')
const CONFIG_ENV = 'production'

module.exports = merge(baseConfig, {
  mode: CONFIG_ENV,
  entry: './src/index.ts',
  output: {
    publicPath: '/',
    path: OUTPUT_PATH,
    filename: '[name].bundle.js'
  },
  plugins: [new CleanWebpackPlugin()],
  devtool: 'source-map'
})
