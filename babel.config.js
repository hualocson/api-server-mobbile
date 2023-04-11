const plugins = [
  ['@babel/plugin-transform-runtime'],
  [
    'module-resolver',
    {
      root: ['./src/'],
      alias: {
        '~': './src',
        '~api': './src/api',
        '~configs': './src/configs',
        '~loaders': './src/loaders',
        '~helpers': './src/helpers',
        '~middlewares': './src/middlewares',
        '~utils': './src/utils',
      },
    },
  ],
]

const presets = ['@babel/preset-env']

module.exports = { plugins, presets }
