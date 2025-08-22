/**
 * React Intersection Tool 示例集合
 * 
 * 这个文件汇总了所有的示例组件，展示了库的各种使用场景
 */

// IntersectionLoad 组件示例
export { BasicLazyLoadExample } from './intersection-load-basic';
export { ImageLazyLoadExample } from './intersection-load-images';
export { AdvancedLazyLoadExample } from './intersection-load-advanced';

// 基础 Hook 示例
export { UseIntersectionObserverExample } from './use-intersection-observer-basic';
export { UseOneOffVisibilityExample } from './use-one-off-visibility';

// 位置跟踪 Hook 示例
export { UseElementPositionExample } from './use-element-position';
export { UseBoundingRectAndRatioExample } from './use-bounding-rect-and-ratio';

// 滚动方向检测示例（已存在的文件）
export { ScrollDirectionExample } from './scroll-direction-example';
export { UseScrollDirectionExample } from './use-scroll-direction-example';

// 实际应用场景示例
export { InfiniteScrollExample } from './infinite-scroll';
export { AnimationTriggersExample } from './animation-triggers';
export { ParallaxScrollExample } from './parallax-scroll';

/**
 * 示例分类
 */
export const exampleCategories = {
  // 组件示例
  components: [
    {
      name: 'BasicLazyLoadExample',
      title: '基础懒加载',
      description: '展示 IntersectionLoad 组件的基本使用方法',
      component: 'BasicLazyLoadExample'
    },
    {
      name: 'ImageLazyLoadExample',
      title: '图片懒加载',
      description: '使用 IntersectionLoad 实现图片懒加载，包含加载状态追踪',
      component: 'ImageLazyLoadExample'
    },
    {
      name: 'AdvancedLazyLoadExample',
      title: '高级懒加载',
      description: '展示自定义容器、动态控制等高级功能',
      component: 'AdvancedLazyLoadExample'
    }
  ],

  // 基础 Hook 示例
  basicHooks: [
    {
      name: 'UseIntersectionObserverExample',
      title: 'useIntersectionObserver 基础用法',
      description: '最底层的 Intersection Observer Hook，展示完整的观察数据',
      component: 'UseIntersectionObserverExample'
    },
    {
      name: 'UseOneOffVisibilityExample',
      title: 'useOneOffVisibility 一次性检测',
      description: '一次性可见性检测，适用于动画触发等场景',
      component: 'UseOneOffVisibilityExample'
    }
  ],

  // 位置跟踪示例
  positionTracking: [
    {
      name: 'UseElementPositionExample',
      title: 'useElementPosition 位置跟踪',
      description: '实时跟踪元素位置变化，支持高频更新和自定义容器',
      component: 'UseElementPositionExample'
    },
    {
      name: 'UseBoundingRectAndRatioExample',
      title: '边界矩形 & 交叉比例',
      description: '专门的边界矩形和交叉比例检测 Hook',
      component: 'UseBoundingRectAndRatioExample'
    }
  ],

  // 滚动方向检测示例
  scrollDirection: [
    {
      name: 'ScrollDirectionExample',
      title: '滚动方向检测（基础）',
      description: '使用 useIntersectionObserver 检测滚动方向',
      component: 'ScrollDirectionExample'
    },
    {
      name: 'UseScrollDirectionExample',
      title: 'useScrollDirection Hook',
      description: '专门的滚动方向检测 Hook，提供滚动状态',
      component: 'UseScrollDirectionExample'
    }
  ],

  // 实际应用场景
  practicalExamples: [
    {
      name: 'InfiniteScrollExample',
      title: '无限滚动列表',
      description: '使用 useOneOffVisibility 实现无限滚动加载',
      component: 'InfiniteScrollExample'
    },
    {
      name: 'AnimationTriggersExample',
      title: '动画触发器',
      description: '基于可见性触发各种动画效果，包含进度条和计数动画',
      component: 'AnimationTriggersExample'
    },
    {
      name: 'ParallaxScrollExample',
      title: '视差滚动效果',
      description: '使用位置跟踪实现复杂的视差滚动动画',
      component: 'ParallaxScrollExample'
    }
  ]
};

/**
 * 获取所有示例组件
 */
export const getAllExamples = () => {
  return [
    ...exampleCategories.components,
    ...exampleCategories.basicHooks,
    ...exampleCategories.positionTracking,
    ...exampleCategories.scrollDirection,
    ...exampleCategories.practicalExamples
  ];
};

/**
 * 根据名称获取示例
 */
export const getExampleByName = (name: string) => {
  return getAllExamples().find(example => example.name === name);
};

/**
 * 示例使用说明
 */
export const exampleUsageInstructions = {
  setup: [
    '1. 确保已安装 @react-toolkit/observer 库',
    '2. 导入需要的组件或 Hook',
    '3. 在 React 组件中使用，注意提供正确的 ref',
    '4. 根据需要配置选项参数'
  ],
  
  tips: [
    '💡 使用 step 参数控制触发频率，值越小触发越频繁',
    '💡 throttle 参数控制更新频率，影响性能和流畅度',
    '💡 offset/rootMargin 控制提前触发距离',
    '💡 skipWhenOffscreen 可以提升性能，避免不必要的更新',
    '💡 自定义 root 可以基于特定容器进行检测'
  ],
  
  performance: [
    '⚡ 合理设置 throttle 值：16ms(60fps) / 33ms(30fps) / 100ms(10fps)',
    '⚡ 大列表场景建议使用较大的 step 值',
    '⚡ 启用 skipWhenOffscreen 减少离屏元素的计算',
    '⚡ 避免在 callback 中执行重型操作',
    '⚡ 使用 useCallback 和 useMemo 优化回调函数'
  ]
};
