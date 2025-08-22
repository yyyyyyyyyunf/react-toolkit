# 开发环境设置

## 当前状态

由于 `@fly4react/observer` 库还没有发布到 npm，示例文件目前使用包名导入：

```tsx
import { IntersectionLoad } from '@fly4react/observer';
```

## 开发阶段运行示例

### 方法1：使用 npm link（推荐）

1. **在库根目录执行**：
```bash
npm link
```

2. **在示例目录执行**：
```bash
npm link @fly4react/observer
```

3. **运行示例**：
```bash
npm run dev
```

### 方法2：使用相对路径（临时方案）

如果 npm link 不工作，可以临时修改导入路径：

```tsx
// 将
import { IntersectionLoad } from '@fly4react/observer';

// 改为
import { IntersectionLoad } from '../src';
```

### 方法3：发布到 npm

1. **构建库**：
```bash
npm run build
```

2. **发布到 npm**：
```bash
npm publish
```

3. **安装并使用**：
```bash
npm install @fly4react/observer
```

## 示例运行环境

确保你的开发环境支持：

- React 18+
- TypeScript 4.5+
- 现代浏览器（支持 Intersection Observer API）

## 故障排除

### 导入错误
如果遇到模块找不到的错误，检查：
- 包是否正确安装
- 导入路径是否正确
- TypeScript 配置是否正确

### 类型错误
如果遇到类型错误，检查：
- 库是否正确构建
- 类型定义文件是否存在
- TypeScript 版本是否兼容

## 发布后的使用

一旦库发布到 npm，示例文件就可以正常使用包名导入了：

```tsx
import { IntersectionLoad } from '@fly4react/observer';
import { useElementPosition } from '@fly4react/observer';
import { useOneOffVisibility } from '@fly4react/observer';
```
