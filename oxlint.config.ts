import type { LinterOptions } from 'oxlint';

const config: LinterOptions = {
  rules: {
    // 基础规则
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'prefer-const': 'error',
    'no-var': 'error',

    // 导入相关
    'no-duplicate-imports': 'error',
    'no-unused-imports': 'warn',

    // 代码质量
    'no-unreachable': 'error',
    'no-unused-expressions': 'error',
    'no-constant-condition': 'error',
    'no-dupe-keys': 'error',
    'no-dupe-args': 'error',
    'no-redeclare': 'error',
    'no-func-assign': 'error',
    'no-import-assign': 'error',
    'no-const-assign': 'error',
    'no-class-assign': 'error',
    'no-this-before-super': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-case': 'error',

    // 代码风格
    'no-empty': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-extra-semi': 'warn',
    'no-fallthrough': 'error',
    'no-irregular-whitespace': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multiple-empty-lines': 'warn',
    'no-trailing-spaces': 'warn',
    'no-unexpected-multiline': 'error',
    'no-unreachable-loop': 'error',

    // 类型检查
    'use-isnan': 'error',
    'valid-typeof': 'error',

    // React 相关 (如果使用 React)
    'react/jsx-uses-react': 'off', // React 17+ 不需要导入 React
    'react/jsx-uses-vars': 'error',
    'react/no-unused-prop-types': 'warn',
    'react/no-unused-state': 'warn',

    // TypeScript 相关
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/no-var-requires': 'error',
  },
  ignore: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '*.min.js', '*.d.ts'],
};

export default config;
