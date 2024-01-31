// config-overrides.js

module.exports = function override(config, env) {
  // Add the fallback for the stream module
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
  };

  return config;
};
