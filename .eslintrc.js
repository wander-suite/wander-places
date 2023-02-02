module.exports = {
  root: true,
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['import', '@typescript-eslint', 'prettier'],
  parser: ['@typescript-eslint/parser', 'prettier/@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
