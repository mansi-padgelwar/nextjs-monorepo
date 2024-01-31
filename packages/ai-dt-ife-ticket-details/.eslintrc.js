module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  ignorePatterns: [
    'node_modules/',
    '.next/',
    '.swc/',
    'pages/',
    'data/',
    'coverage/',
    'app',
    'jest.config.js',
    'jest.setup.js',
    'next-i18next.config.js',
    'next.config.js'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
      parserOptions: {
        sourceType: 'script',
        project: './tsconfig.json'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
}
