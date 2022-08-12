const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.base')

const CONTEXT_PATH = path.resolve(__dirname, '../')
const OUTPUT_PATH = path.resolve(CONTEXT_PATH, 'dist')
const CONFIG_ENV = 'development'

module.exports = merge(baseConfig, {
  mode: CONFIG_ENV,
  entry: './src/index.ts',
  output: {
    path: OUTPUT_PATH,
    filename: '[name].bundle.js'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'inline-source-map',
  optimization: {
    moduleIds: 'named'
  }
})
