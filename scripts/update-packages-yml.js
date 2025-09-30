#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

// 读取包版本
const observerPackage = JSON.parse(fs.readFileSync('./packages/observer/package.json', 'utf8'));
const memoPackage = JSON.parse(fs.readFileSync('./packages/memo/package.json', 'utf8'));
const imagePackage = JSON.parse(fs.readFileSync('./packages/image/package.json', 'utf8'));
const featureDetectorPackage = JSON.parse(
  fs.readFileSync('./packages/feature-detector/package.json', 'utf8')
);

// 生成packages.yml内容
const packagesYml = `# GitHub Packages Configuration
# This file helps GitHub identify published packages

packages:
  - name: "@fly4react/observer"
    description: "一个基于 Intersection Observer API 的现代 React 工具库"
    repository: "https://github.com/yyyyyyyyyunf/react-toolkit"
    registry: "https://registry.npmjs.org/"
    latest_version: "${observerPackage.version}"
    
  - name: "@fly4react/memo"
    description: "一个高级的 React 记忆化组件工具"
    repository: "https://github.com/yyyyyyyyyunf/react-toolkit"
    registry: "https://registry.npmjs.org/"
    latest_version: "${memoPackage.version}"
    
  - name: "@fly4react/image"
    description: "React 图像优化和懒加载工具库"
    repository: "https://github.com/yyyyyyyyyunf/react-toolkit"
    registry: "https://registry.npmjs.org/"
    latest_version: "${imagePackage.version}"
    
  - name: "@fly4react/feature-detector"
    description: "一个纯 JavaScript 浏览器特性检测库"
    repository: "https://github.com/yyyyyyyyyunf/react-toolkit"
    registry: "https://registry.npmjs.org/"
    latest_version: "${featureDetectorPackage.version}"
`;

// 写入文件
fs.writeFileSync('./.github/packages.yml', packagesYml);

console.log('✅ packages.yml 已更新:');
console.log(`  @fly4react/observer: ${observerPackage.version}`);
console.log(`  @fly4react/memo: ${memoPackage.version}`);
console.log(`  @fly4react/image: ${imagePackage.version}`);
console.log(`  @fly4react/feature-detector: ${featureDetectorPackage.version}`);
