const webpack = require('webpack');
const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin');
const srcDir = path.join(__dirname, '..', 'src');
const targetBrowser = process.env.TARGET_BROWSER;

const mainHtmlPlugin = new HtmlWebPackPlugin({
  template: './index.html',
  filename: './index.html',
  chunks: ['main']
});

const reportHtmlPlugin = new HtmlWebPackPlugin({
  template: './report.html',
  filename: './report.html',
  chunks: ['report']
});

const popupHtmlPlugin = new HtmlWebPackPlugin({
  template: './popup.html',
  filename: './popup.html',
  chunks: ['popup']
});

module.exports = {
  entry: {
    manifest: path.join(srcDir, 'manifest.json'),
    background: path.join(srcDir, 'background.ts'),
    main: path.join(srcDir, 'index.tsx'),
    report: path.join(srcDir, 'components/Report/Report.tsx'),
    popup: path.join(srcDir, 'components/Popup/Popup.tsx'),
    'content-scripts/inject-scripts': path.join(srcDir, 'content-scripts', 'inject-scripts.tsx'),
    'content-scripts/window-ethereum-messages': path.join(srcDir, 'content-scripts', 'window-ethereum-messages.tsx'),
    'injected/proxy-window-ethereum': path.join(srcDir, 'injected', 'proxy-window-ethereum.tsx'),
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
      { 
        test: /\.(png|jp(e*)g|svg|gif)$/, 
        use: ['file-loader'], 
      }
    ],
  },

  resolve: {
    alias: {
      components: path.resolve(srcDir, 'components'),
    },
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      worker_threads: false,
      stream: require.resolve('stream-browserify'),
    },
  },

  plugins: [
    mainHtmlPlugin,
    reportHtmlPlugin,
    popupHtmlPlugin, 
    new WextManifestWebpackPlugin(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.WORK_ENV': JSON.stringify(process.env.WORK_ENV || 'dev')
    }),
    new WebpackObfuscator({
      rotateStringArray: true
    })
  ],
};
