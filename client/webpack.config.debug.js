/**
 * Development configuration - creates build artifact runnable in a browser environment
 */

const HtmlWebpackPlugin  = require('html-webpack-plugin');
const path               = require('path');
const webpack            = require('webpack')



const srcPath = path.join(__dirname, 'src')
const dstPath = path.join(__dirname, 'build/debug')

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true
  },
  devtool: '#eval-source-map',
  entry: {
    main: [
      'webpack/hot/dev-server',
      'babel-polyfill',
      'main'
    ]
  },
  output: {
    path: dstPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /(\.ts$)/,
        exclude: {
          test: path.resolve(__dirname, 'node_modules'),
          exclude: path.resolve(__dirname, 'node_modules/ui-library')
        },
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {'allowTsInNodeModules': true}
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              root: srcPath
            }
          },
          {
            loader: 'less-loader',
            options: {
              paths: [ srcPath ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              engine: 'postcss'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(eot|png|ttf|otf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.svg$/,
        issuer: /\.(css|less)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        issuer: /\.ts$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              dimensions: false
            }
          }
        ]
      },
    ]
  },
  resolve: {
    modules: [srcPath, 'node_modules'],
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: true,
      __RELEASE__: false,
      __VERSION__: JSON.stringify('dev'),
      __BRANCH__: JSON.stringify('n/a'),
      __TIME__:JSON.stringify('n/a'),
      __API_URL__: JSON.stringify("http://localhost:5000/"),
      __BASE_NAME__: JSON.stringify(''),
    }),
    // Force usage of a specialized index.html for debug and release builds.
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
