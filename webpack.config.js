const path = require("path");
const outputDir = path.resolve(__dirname, "public/js");

module.exports = {
  output: {
    path: outputDir,
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-runtime", { regenerator: true }],
            ],
          },
        },
      },
    ],
  },
};
