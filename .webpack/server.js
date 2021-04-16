const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    mode: process.env.NODE_ENV,
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'source-map',
    entry: {
      app: path.resolve(__dirname, '../src/server/app.tsx'),
    },
    output: {
      path: path.resolve(__dirname, '../dist')
    },
    node: {
      __dirname: false,
      __filename: false
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, '../src/tsconfig.json')
            }
          }
        }
      ],
    },
    plugins: [],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    stats: 'errors-only',
    optimization: {
      minimize: false
    }
  }
];
