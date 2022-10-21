const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackEnv, args) => {
  const mode = args.mode || "production";
  const isDevMode = mode === "development";
  const index = "./src/index";

  return {
    devtool: isDevMode ? "inline-source-map" : "source-map", // generate source maps for dev or Sentry
    entry: isDevMode ? index : ["whatwg-fetch", index], // whatwg-fetch to polyfill fetch
    mode,
    output: {
      chunkFilename: "[id].[contenthash].js",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
    },
    devServer: {
      hot: true,
      historyApiFallback: true,
      liveReload: false,
      port: 3000,
    },
    watchOptions: { ignored: /node_modules/ },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /(\.m?js|tsx?)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              // https://webpack.js.org/loaders/babel-loader/#options
              cacheDirectory: true,
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      isDevMode &&
        new ReactRefreshWebpackPlugin({
          exclude: [/node_modules/, /bootstrap\.js$/],
        }),
    ].filter(Boolean),
  };
};
