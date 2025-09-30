// 导出核心功能
import { createMemoComponent } from './core/createMemoComponent';

// 导出类型定义
export type { MemoOptions, MemoizedComponent } from './types';

// 导出配置管理函数
export {
  getDebugComponents,
  getIgnoreProps,
  getComponentIgnoreProps,
  registerDebugComponent,
  registerIgnoreProp,
  registerComponentIgnoreProp,
} from './config';

// 默认导出
export { createMemoComponent };

export default createMemoComponent;
