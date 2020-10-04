module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': ['off'],
    'react/prop-types': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_"
      }
    ]
  },
  settings: {
    react: {
      version: "16.13",
    },
  },
}