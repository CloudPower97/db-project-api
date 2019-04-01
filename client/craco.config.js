/* eslint-disable */
const path = require('path')
const { whenProd, POSTCSS_MODES, paths } = require('@craco/craco')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlCriticalPlugin = require('html-critical-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack')
const imageminGiflossy = require('imagemin-giflossy')
const imageminMozJpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const imageminSvgo = require('imagemin-svgo')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')

const { NODE_ENV } = process.env

module.exports = function() {
  return {
    style: {
      modules: {
        localIdentName: '[sha1:hash:hex:4]',
      },
      postcss: {
        mode: POSTCSS_MODES.file,
      },
    },
    babel: whenProd(() => ({
      comments: false,
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements',
        'babel-plugin-transform-react-remove-prop-types',
        [
          'babel-plugin-transform-imports',
          {
            'react-router-dom': {
              transform: 'react-router-dom/${member}',
              preventFullImport: true,
            },
          },
        ],
        'babel-plugin-transform-react-class-to-function',
      ],
    })),
    webpack: {
      plugins:
        NODE_ENV === 'development'
          ? []
          : [
              new ImageminPlugin({
                bail: false, // Ignore errors on corrupted images
                cache: false,
                imageminOptions: {
                  plugins: [
                    imageminGiflossy({
                      interlaced: true,
                      optimizationLevel: 3,
                    }),
                    imageminMozJpeg({
                      quality: 70,
                      progressive: true,
                    }),
                    imageminPngquant({
                      speed: 1,
                      quality: [0.85, 1], //lossy settings
                      optimizationLevel: 5,
                      strip: true,
                    }),
                    imageminSvgo({
                      removeViewBox: true,
                    }),
                  ],
                },
              }),
              new ImageminWebpWebpackPlugin({
                config: [
                  {
                    test: /\.webp/,
                    options: {
                      quality: 50,
                    },
                  },
                ],
              }),
              new HtmlCriticalPlugin({
                base: path.join(path.resolve(__dirname), 'build/'),
                src: 'index.html',
                dest: 'index.html',
                inline: true,
                minify: true,
                extract: true,
                penthouse: {
                  blockJSRequests: false,
                },
              }),
              new CompressionPlugin(),
            ],
      alias: {
        components: path.join(paths.appSrc, 'components'),
        containers: path.join(paths.appSrc, 'containers'),
        hoc: path.join(paths.appSrc, 'hoc'),
        style: path.join(paths.appSrc, 'style'),
        libs: path.join(paths.appSrc, 'libs'),
        assets: path.join(paths.appSrc, 'assets'),
        vendor: path.join(paths.appSrc, 'vendor'),
      },
    },
    jest: {
      configure: {
        snapshotSerializers: ['enzyme-to-json/serializer'],
        moduleNameMapper: {
          '^components(.*)$': '<rootDir>/src/components$1',
          '^containers(.*)$': '<rootDir>/src/containers$1',
          '^hoc(.*)$': '<rootDir>/src/hoc$1',
          '^style(.*)$': '<rootDir>/src/style$1',
          '^libs(.*)$': '<rootDir>/src/libs$1',
          '^assets(.*)$': '<rootDir>/src/assets$1',
          '^vendor(.*)$': '<rootDir>/src/vendor$1',
        },
        moduleDirectories: ['node_modules', 'src'],
        testPathIgnorePatterns: ['<rootDir>/cypress/', '<rootDir>/node_modules/'],
      },
    },
  }
}
