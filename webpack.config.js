const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const config = {
    entry: './src/index.jsx',
    output: {
      filename: 'bundle.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          use: ['babel-loader'],
        },
        {
          test: /.s?css$/,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
    devServer: {
      hot: true,
      historyApiFallback: true,
    },
    devtool: 'source-map',
  };

  if (isProd) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
      })
    );
  }

  return config;
};
