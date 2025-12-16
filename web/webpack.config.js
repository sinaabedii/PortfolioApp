const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');

const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: [
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'App.tsx'),
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
    path.resolve(appDirectory, 'node_modules/react-native-reanimated'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      configFile: path.resolve(__dirname, 'babel.config.js'),
      cacheDirectory: true,
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: { loader: 'url-loader', options: { name: '[name].[ext]' } },
};

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      '@': path.resolve(appDirectory, 'src'),
      '@components': path.resolve(appDirectory, 'src/components'),
      '@screens': path.resolve(appDirectory, 'src/screens'),
      '@navigation': path.resolve(appDirectory, 'src/navigation'),
      '@store': path.resolve(appDirectory, 'src/store'),
      '@hooks': path.resolve(appDirectory, 'src/hooks'),
      '@services': path.resolve(appDirectory, 'src/services'),
      '@utils': path.resolve(appDirectory, 'src/utils'),
      '@theme': path.resolve(appDirectory, 'src/theme'),
      '@types': path.resolve(appDirectory, 'src/types'),
      '@constants': path.resolve(appDirectory, 'src/constants'),
      '@context': path.resolve(appDirectory, 'src/context'),
      '@i18n': path.resolve(appDirectory, 'src/i18n'),
    },
  },
  module: { rules: [babelLoaderConfiguration, imageLoaderConfiguration] },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
  ],
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
};
