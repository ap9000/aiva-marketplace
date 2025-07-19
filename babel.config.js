module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true,
        }
      ],
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './src',
            '~': './src'
          },
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json']
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};