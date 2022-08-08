process.env.NODE_ENV = process.env.NODE_ENV || "development";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  context: path.join(__dirname, "/src"),
  entry: "index.tsx",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    modules: ["./", "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules/",
      },
      // {
      //   test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
      //   type: "asset/resource",
      // },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
          { loader: "postcss-loader" },
        ],
        exclude: "/node_modules/",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};

if (process.env.NODE_ENV === "development") {
  config.devtool = "inline-source-map";
  config.devServer = {
    static: path.resolve(__dirname, "./src"),
    compress: true,
    port: 3000,
    open: false,
    historyApiFallback: true,
  };
}

module.exports = config;
