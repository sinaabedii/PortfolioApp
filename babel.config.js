module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@theme': './src/theme',
          '@types': './src/types',
          '@constants': './src/constants',
          '@context': './src/context',
        },
      },
    ],
  ],
};
