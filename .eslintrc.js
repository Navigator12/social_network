module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'semi': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'strict': 0,
    //max length of line is 140
    'max-len': ['error', { 'code': 140 }],
    // allow jsx in .js files
    'react/jsx-filename-extension': 0,
    // allow empty blocks
    'no-empty': 0,
    // allows use not only default export
    'import/prefer-default-export': 0,
    'react/forbid-prop-types': 0,
    // if you need variable, but it not used start it with _
    'no-unused-vars': ['error', { 'argsIgnorePattern': '_.' }],
    'react/jsx-props-no-spreading': 0,
    // don't need the button element instead of a in navigate
    'jsx-a11y/anchor-is-valid': 0,
    // don't need to declare children prop
    'react/prop-types': [2, { ignore: ['children'] }],
    // don't need <track> for captions in media
    'jsx-a11y/media-has-caption': 0,
    'no-unused-expressions': 0,
    'no-plusplus': 'off',
    'no-nested-ternary': "off",
    'no-param-reassign': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 1}]
  },
};
