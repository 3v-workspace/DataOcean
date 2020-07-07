const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "bundle.js": "./scripts/landing.js",
    "vanta.min.js": "./scripts/vendor/vanta.min.js",
    "style.css": "./styles/main.scss",
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
        }),
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "./dist/images",
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      hash: true,
      filename: "index.html",
      template: "./index.html",
    }),
  ],
  devServer: {
    contentBase: "./dist",
    port: 9000,
    compress: true,
    hot: true,
  },
};
