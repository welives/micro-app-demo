module.exports = {
  extends: require.resolve('umi/stylelint'),
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply'],
      },
    ],
  },
};
