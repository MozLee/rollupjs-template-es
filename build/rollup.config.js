const path = require('path');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const {eslint} = require('rollup-plugin-eslint')
const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

module.exports = [
  {
    input: resolveFile('src/index.js'),
    output: {
      file: resolveFile('dist/index.js'),
      format: 'umd',
      name: 'Demo',
    },
    plugins: [
      resolve(),
      commonjs(),
      eslint({
        include: ['src/**'],
        exclude: ['node_modules/**']
      }),
      babel({
        babelrc: false,
        presets: [
          ['@babel/preset-env', { modules: false }]
        ],
        plugins: [
          ["@babel/plugin-transform-classes", {
            "loose": true
          }]
        ]
      }),
    ],
  },
]