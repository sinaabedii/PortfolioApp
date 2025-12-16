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
        root: ['../src'],
        extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
        alias: {
          '@': '../src',
          '@components': '../src/components',
          '@screens': '../src/screens',
          '@navigation': '../src/navigation',
          '@store': '../src/store',
          '@hooks': '../src/hooks',
          '@services': '../src/services',
          '@utils': '../src/utils',
          '@theme': '../src/theme',
          '@types': '../src/types',
          '@constants': '../src/constants',
          '@context': '../src/context',
          '@i18n': '../src/i18n',
        },
      },
    ],
  ],
};
