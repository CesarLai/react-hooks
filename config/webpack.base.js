const path = require('path')
const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const CONTEXT_PATH = path.resolve(__dirname, '../')
const ENTRY_PATH = path.resolve(CONTEXT_PATH, 'src')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  context: CONTEXT_PATH,
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        include: ENTRY_PATH,
        exclude: path.resolve(CONTEXT_PATH, 'node_modules'),
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // polyfill for process in web app
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new TsconfigPathsPlugin({
      configFile: path.resolve(CONTEXT_PATH, 'tsconfig.json')
    })
  ],
  resolve: {
    alias: {
      '@': ENTRY_PATH
    },
    modules: [ENTRY_PATH, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/')
    }
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true
  }
}
