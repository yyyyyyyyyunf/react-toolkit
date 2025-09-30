import { lazy } from 'react';

// 懒加载页面组件
const AnimationTriggers = lazy(() =>
  import('../pages/animation-triggers').then(module => ({
    default: module.AnimationTriggersExample,
  }))
);
const InfiniteScroll = lazy(() =>
  import('../pages/infinite-scroll').then(module => ({
    default: module.InfiniteScrollExample,
  }))
);
const ParallaxScroll = lazy(() =>
  import('../pages/parallax-scroll').then(module => ({
    default: module.ParallaxScrollExample,
  }))
);
const ScrollDirectionExample = lazy(() =>
  import('../pages/scroll-direction-example').then(module => ({
    default: module.ScrollDirectionExample,
  }))
);
const ImageLoadingExample = lazy(() =>
  import('../pages/image-loading').then(module => ({
    default: module.default,
  }))
);

// 添加组件示例
const BasicLazyLoad = lazy(() =>
  import('../components/intersection-load-basic').then(module => ({
    default: module.BasicLazyLoadExample,
  }))
);
const AdvancedLazyLoad = lazy(() =>
  import('../components/intersection-load-advanced').then(module => ({
    default: module.AdvancedLazyLoadExample,
  }))
);
const ImageLazyLoad = lazy(() =>
  import('../components/intersection-load-images').then(module => ({
    default: module.ImageLazyLoadExample,
  }))
);

// 添加 hooks 示例
const UseIntersectionObserver = lazy(() =>
  import('../hooks/use-intersection-observer-basic').then(module => ({
    default: module.UseIntersectionObserverExample,
  }))
);
const UseInViewport = lazy(() =>
  import('../hooks/use-in-viewport-example').then(module => ({
    default: module.UseInViewportExample,
  }))
);
const UseOneOffVisibility = lazy(() =>
  import('../hooks/use-one-off-visibility').then(module => ({
    default: module.UseOneOffVisibilityExample,
  }))
);
const UseOneOffVisibilityEffect = lazy(() =>
  import('../pages/use-one-off-visibility-effect').then(module => ({
    default: module.default,
  }))
);
const UseBoundingRectAndRatio = lazy(() =>
  import('../hooks/use-bounding-rect-and-ratio').then(module => ({
    default: module.UseBoundingRectAndRatioExample,
  }))
);
const UseElementPosition = lazy(() =>
  import('../hooks/use-element-position').then(module => ({
    default: module.UseElementPositionExample,
  }))
);
const UseElementPositionRef = lazy(() =>
  import('../hooks/use-element-position-ref-example').then(module => ({
    default: module.UseElementPositionRefExample,
  }))
);
const UseLazyElementPositionRef = lazy(() =>
  import('../hooks/use-lazy-element-position-ref-example').then(module => ({
    default: module.UseLazyElementPositionRefExample,
  }))
);

const UseElementDetector = lazy(() =>
  import('../hooks/use-element-detector-example').then(module => ({
    default: module.UseElementDetectorExample,
  }))
);
const InitialViewportTest = lazy(() =>
  import('../hooks/initial-viewport-test').then(module => ({
    default: module.default,
  }))
);
const MemoConfigDemo = lazy(() =>
  import('../components/memo-config-demo').then(module => ({
    default: module.default,
  }))
);
const ComponentSpecificIgnoreDemo = lazy(() =>
  import('../components/component-specific-ignore-demo').then(module => ({
    default: module.default,
  }))
);
const MultiHookExample = lazy(() =>
  import('../hooks/multi-hook-example').then(module => ({
    default: module.MultiHookExample,
  }))
);
const FeatureDetection = lazy(() =>
  import('../pages/feature-detection').then(module => ({
    default: module.default,
  }))
);

// 路由配置
export const routes = [
  {
    path: '/multi-hook-example',
    name: '多 Hook 示例',
    component: MultiHookExample,
    description: '演示多个 hook 同时观察同一元素的功能',
  },
  {
    path: '/memo-config-demo',
    name: 'Memo 配置管理',
    component: MemoConfigDemo,
    description: '动态配置 memo 组件的调试和忽略属性',
  },
  {
    path: '/component-specific-ignore',
    name: '组件特定忽略属性',
    component: ComponentSpecificIgnoreDemo,
    description: '演示如何为特定组件忽略特定属性',
  },
  {
    path: '/initial-viewport-test',
    name: 'Initial Viewport Test',
    component: InitialViewportTest,
    description: '测试初始视口状态',
  },
  {
    path: '/animation-triggers',
    name: '动画触发器',
    component: AnimationTriggers,
    description: '使用 Intersection Observer 触发动画效果',
  },
  {
    path: '/infinite-scroll',
    name: '无限滚动',
    component: InfiniteScroll,
    description: '实现无限滚动列表',
  },
  {
    path: '/parallax-scroll',
    name: '视差滚动',
    component: ParallaxScroll,
    description: '视差滚动效果演示',
  },
  {
    path: '/scroll-direction',
    name: '滚动方向检测',
    component: ScrollDirectionExample,
    description: '检测页面滚动方向',
  },
  {
    path: '/image-loading',
    name: '图片加载',
    component: ImageLoadingExample,
    description: 'ImageLoader 组件功能演示 - 懒加载、预加载、URL 转换等',
  },
  // 添加组件示例路由
  {
    path: '/basic-lazy-load',
    name: '基础懒加载',
    component: BasicLazyLoad,
    description: 'IntersectionLoad 基础使用示例',
  },
  {
    path: '/advanced-lazy-load',
    name: '高级懒加载',
    component: AdvancedLazyLoad,
    description: 'IntersectionLoad 高级功能演示',
  },
  {
    path: '/image-lazy-load',
    name: '图片懒加载',
    component: ImageLazyLoad,
    description: '图片懒加载示例',
  },
  // 添加 hooks 示例路由
  {
    path: '/use-intersection-observer',
    name: 'useIntersectionObserver',
    component: UseIntersectionObserver,
    description: '基础 Intersection Observer Hook',
  },
  {
    path: '/use-in-viewport',
    name: 'useInViewport',
    component: UseInViewport,
    description: '元素是否在视口中',
  },
  {
    path: '/use-one-off-visibility',
    name: 'useOneOffVisibility',
    component: UseOneOffVisibility,
    description: '一次性可见性检测',
  },
  {
    path: '/use-one-off-visibility-effect',
    name: 'useOneOffVisibilityEffect',
    component: UseOneOffVisibilityEffect,
    description: '一次性可见性检测 Effect - 执行用户指定的回调',
  },
  {
    path: '/use-bounding-rect-and-ratio',
    name: 'useBoundingRectAndRatio',
    component: UseBoundingRectAndRatio,
    description: '元素位置和可见比例',
  },
  {
    path: '/use-element-position',
    name: 'useElementPosition',
    component: UseElementPosition,
    description: '元素位置跟踪',
  },
  {
    path: '/use-element-position-ref',
    name: 'useElementPositionRef',
    component: UseElementPositionRef,
    description: '元素位置跟踪 (Ref 版本，不触发重新渲染)',
  },
  {
    path: '/use-lazy-element-position-ref',
    name: 'useLazyElementPositionRef',
    component: UseLazyElementPositionRef,
    description: '延迟计算元素位置 (Lazy 版本，按需计算)',
  },

  {
    path: '/use-element-detector',
    name: 'useElementDetector',
    component: UseElementDetector,
    description: '元素条件检测器 - 通用检测 Hook',
  },
  {
    path: '/feature-detection',
    name: '特性检测',
    component: FeatureDetection,
    description: '浏览器特性检测示例 - 使用 @fly4react/feature-detector',
  },
];

export const defaultRoute = routes[0];
