const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add CSS file extensions if needed in the future
config.resolver.sourceExts.push('css');

module.exports = config;