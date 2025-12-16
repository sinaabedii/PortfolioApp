const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');
const srcDirectory = path.resolve(appDirectory, 'src');

const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: [
    srcDirectory,
    path.resolve(appDirectory, 'App.tsx'),
    path.resolve(appDirectory, 'index.web.js'),
  ],
  exclude: /node_modules/,
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

const fontLoaderConfiguration = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  type: 'asset/resource',
};

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js', '.json'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-image-picker': false,
      '@store': path.resolve(srcDirectory, 'store'),
      '@services': path.resolve(srcDirectory, 'services'),
      '@navigation': path.resolve(srcDirectory, 'navigation'),
      '@context': path.resolve(srcDirectory, 'context'),
      '@hooks': path.resolve(srcDirectory, 'hooks'),
      '@screens': path.resolve(srcDirectory, 'screens'),
      '@components': path.resolve(srcDirectory, 'components'),
      '@utils': path.resolve(srcDirectory, 'utils'),
      '@theme': path.resolve(srcDirectory, 'theme'),
      '@types': path.resolve(srcDirectory, 'types'),
      '@constants': path.resolve(srcDirectory, 'constants'),
      '@i18n': path.resolve(srcDirectory, 'i18n'),
      '@assets': path.resolve(srcDirectory, 'assets'),
      '@': srcDirectory,
    },
  },
  module: {
    rules: [babelLoaderConfiguration, imageLoaderConfiguration, fontLoaderConfiguration],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
  devServer: {
    static: { directory: path.join(__dirname, 'public') },
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
};
