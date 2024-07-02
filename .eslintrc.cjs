module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': [2, 'never'],
    'semi': [2, 'always'],
  }
}
