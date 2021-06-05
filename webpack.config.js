const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "public/*.css",
});

function sassRules() {
  return [
    {
      test: /\.(sass|scss)$/,
      loader: extractSass.extract(["css-loader", "sass-loader"]),
    },
  ];
}

module.exports = {
  entry: ["./resources/assets/sass/*.scss"],
  output: {
    filename: "public/*.js",
  },
  module: {
    rules: sassRules(),
  },
  plugins: [extractSass],
};
