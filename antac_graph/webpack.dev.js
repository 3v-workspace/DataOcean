const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  watchOptions: {
    poll: true,
  },
  // devtool: 'inline-source-map',
  devtool: 'source-map',
});
