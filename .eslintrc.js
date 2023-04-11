module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },

  overrides: [],
  plugins: ['prettier', '@babel'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    babelOptions: {
      cwd: __dirname,
      configFile: './babel.config.js',
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'warn',
    'func-names': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      {
        js: 'ignorePackages',
      },
    ],
  },
}
