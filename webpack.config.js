module.exports = {
  context: __dirname,
  entry: "./demo.js",
  output: {
    filename: "./lib/bundle.js"
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", "*"]
  }
};
