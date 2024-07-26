module.exports = {
  extends: require.resolve('umi/eslint'),
  rules: {
    complexity: ['error', 10],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
