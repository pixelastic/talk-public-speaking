module.exports = {
  extends: 'algolia',
  rules: {
    'import/no-commonjs': 'off',
  },
  globals: {
    Reveal: true,
    Prism: true,
    $: true,
    _: true,
  },
};
