const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: ['./frontend/index.js', './frontend/styles/main.scss'],
  output: {
    path: path.join(__dirname, './frontend/dist'),
    filename: 'index-bundle.js',
    publicPath: '/'
  },
  devServer: { contentBase: './frontend/dist', port: 8081, historyApiFallback: true },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/transform-runtime']
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader', // or MiniCssExtractPlugin.loader
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: false, sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              modules: true,
              config: { path: './postcss.config.js' }
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader?name=./assets/fonts/webfonts/[name].[ext]'
          },
          {
            loader: 'file-loader?name=./assets/fonts/Roboto/[name].[ext]'
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        use: 'ts-loader',
        test: /\.ts$/,
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'tslint-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './frontend/dist/[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './frontend/index.html'
    })
    // new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
        // ,sourceMap: true
      })
    ]
  }
};
