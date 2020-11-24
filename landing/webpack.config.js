var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

var DEBUG = process.env.NODE_ENV === 'development'

const cssConfig = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: DEBUG,
    },
  },
  { loader: 'css-loader', options: { importLoaders: 1 } },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [
        autoprefixer()
      ]
    }
  },
]

module.exports = {
  context: __dirname,
  entry: './static/index',
  mode: DEBUG ? 'development' : 'production',
  optimization: {
    minimize: !DEBUG,
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    path: path.resolve('./static/dist/'),
    filename: "[name].js",
    publicPath: '/static/dist/'
  },
  resolve: {
    alias: {
      static: path.resolve('./static/'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new Dotenv(),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.js$/,
        include: /node_modules/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.css$/,
        use: cssConfig
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssConfig.concat([
          'sass-loader',
        ]),
      },
      {
        test: /\.(png|woff|woff2|svg|eot|ttf|gif|jpe?g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              // ManifestStaticFilesStorage reuse.
              name: '[path][name].[md5:hash:hex:12].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: ".",
    port: 9000,
    compress: false,
    hot: true,
  }
}
