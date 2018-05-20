const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const appDir = path.resolve(__dirname, 'app/');
const buildDir = path.resolve(__dirname, 'wwwroot/dist/');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app/index.html'),
    hash: true,
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: {
        main: path.resolve(appDir, 'index.jsx')
    },
  output: {
    filename: 'bundle.js',
      path: buildDir,
    publicPath: '/dist/',
    },
    plugins: [HtmlWebpackPluginConfig],
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: buildDir,
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          query: {
            configFile: './.eslintrc',
          },
        }],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100384,
            },
          },
        ],
      },
    ],
  },
  externals: {
    'Config':  JSON.stringify(require('./config.json')),
  },
};
