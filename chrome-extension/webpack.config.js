const path = require("path");

module.exports = {
  entry: {
    background: "./src/background.ts",
    popup: "./src/popup.ts",
    script: "./src/script.ts"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "lib")
  },
  externals: {
    "yamljs": "YAML"
  }
};
