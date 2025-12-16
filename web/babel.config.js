const path = require('path');
const srcDirectory = path.resolve(__dirname, '../src');

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    'react-native-web',
    [
      'module-resolver',
      {
        root: [srcDirectory],
        extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
        alias: {
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
    ],
  ],
};
