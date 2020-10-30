const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const pkg = require('./package.json')

module.exports = {
  // disable css outputs
  // stats: {
  //   children: false,
  //   maxModules: 3,
  // },
  optimization: {
    minimizer: [
      new TerserPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'static/dist/'),
    filename: `pep-graph-${pkg.version}.min.js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname),
        resolve: {
          extensions: ['.js'],
        },
        use: [
          'babel-loader',
          // 'eslint-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: path.resolve(__dirname),
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(svg|html)$/,
        loader: 'raw-loader',
      },
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `pep-graph-${pkg.version}.min.css`,
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    contentBase: ".",
    writeToDisk: true,
    port: 8006,
    compress: false,
    hot: true,
  }
};
