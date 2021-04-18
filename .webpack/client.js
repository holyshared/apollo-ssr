const path = require('path');
const webpack = require('webpack');

module.exports = [
  {
    mode: process.env.NODE_ENV,
    entry: {
      app: path.resolve(__dirname, '../src/client/app.tsx')
    },
    output: {
      path: path.resolve(__dirname, '../static/assets')
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader"
          }
        },
      ],
    },
    plugins: [
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    stats: 'errors-only',
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "bundle",
            chunks: "initial"
          }
        }
      }
    }
  }
];
