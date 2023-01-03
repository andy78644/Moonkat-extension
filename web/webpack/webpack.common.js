const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WextManifestWebpackPlugin = require("wext-manifest-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');

const srcDir = path.join(__dirname, '..', 'src');
const targetBrowser = process.env.TARGET_BROWSER;

const htmlPlugin = new HtmlWebPackPlugin({
  template: './index.html',
  filename: './index.html',
});

module.exports = {
  entry: {
    manifest: path.join(srcDir, 'manifest.json'),
    background: path.join(srcDir, 'background.ts'),
    main: path.join(srcDir, 'index.tsx'),
    // 'pages/popup': path.join(srcDir, 'pages', 'popup.tsx'),
    // 'pages/menu': path.join(srcDir, 'pages', 'menu.tsx'),
    // 'pages/transfer': path.join(srcDir, 'pages', 'transfer.tsx'),
    // 'pages/moreinfo': path.join(srcDir, 'pages', 'moreInfo.tsx'),
    'content-scripts/inject-scripts': path.join(srcDir, 'content-scripts', 'inject-scripts.tsx'),
    'content-scripts/window-ethereum-messages': path.join(srcDir, 'content-scripts', 'window-ethereum-messages.tsx'),
    'injected/proxy-window-ethereum': path.join(srcDir, 'injected', 'proxy-window-ethereum.tsx'),
  },

  resolve: {
    alias: {
      components: path.resolve(srcDir, 'components'),
    }
  },

  output: {
    path: path.join(__dirname, '..', 'dist', targetBrowser),
    filename: 'js/[name].js',
  },

  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks(chunk) {
        return chunk.name !== 'background';
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(srcDir),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
          type: 'javascript/auto', // prevent webpack handling json with its own loaders,
          test: /manifest\.json$/,
          use: {
            loader: 'wext-manifest-loader',
            options: {
              usePackageJSONVersion: true,
            },
          },
          exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      worker_threads: false,
      stream: require.resolve('stream-browserify'),
    },
  },

  plugins: [
    htmlPlugin,
    new WextManifestWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: '.', to: '.', context: 'public' }],
      options: {},
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
