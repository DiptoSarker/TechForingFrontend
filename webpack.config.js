// webpack.config.js

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
  // Other webpack configurations...
};