/** @type {import('prettier').Config} */
const config = {
  // 基础格式化
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',

  // 括号和引号
  arrowParens: 'avoid',
  bracketSpacing: true,
  bracketSameLine: false,
  quoteProps: 'as-needed',

  // 其他选项
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,

  // 插件配置 (如果需要)
  plugins: [
    // 可以在这里添加 Prettier 插件
    // 'prettier-plugin-organize-imports',
    // 'prettier-plugin-tailwindcss',
  ],
};

module.exports = config;
