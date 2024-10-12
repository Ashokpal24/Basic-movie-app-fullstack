const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle filename
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js or .jsx files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: "babel-loader", // Use babel-loader to transpile files
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Allow imports without specifying .js or .jsx extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Points to your 'index.html'
    }),
  ],
  devServer: {
    static: "./dist",
    compress: true,
    port: 3001,
    open: true,
    hot: true, // Enable HMR
    // allowedHosts: "all",
  },
  mode: "development", // Set Webpack to development mode
};
