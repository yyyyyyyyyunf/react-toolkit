import type React from 'react';

/**
 * 滚动方向枚举
 * 表示元素相对于视口的移动方向
 */
export type ScrollDirection = 'up' | 'down' | 'left' | 'right' | 'none';

/**
 * 扩展的 IntersectionObserverEntry，包含滚动方向信息
 * 在原生 IntersectionObserverEntry 基础上增加了滚动方向检测功能
 */
export interface ObserverCallbackParamType extends IntersectionObserverEntry {
  /** 滚动方向，基于元素位置变化计算得出 */
  scrollDirection?: ScrollDirection;
  /** 前一次的位置信息，用于计算滚动方向 */
  previousRect?: DOMRect;
}

/**
 * Intersection Observer 回调函数类型
 * 接收扩展的 entry 对象，包含滚动方向信息
 */
export type ObserverCallbackType = (entry: ObserverCallbackParamType) => void;

/**
 * 取消订阅函数类型
 */
export type UnSubscribeType = () => void;

/**
 * Intersection Observer 配置选项
 * 扩展了原生的 IntersectionObserverInit 接口
 */
export type ObserverOptions = IntersectionObserverInit & {
  /** 是否只触发一次，触发后自动取消观察 */
  once?: boolean;
};

/**
 * 可序列化的观察器选项
 * 用于生成观察器的唯一键值，排除循环引用的属性
 * 基于 ObserverOptions，但用 rootId 替代 root 属性
 */
export type SerializableObserverOptions = Omit<ObserverOptions, 'root'> & {
  /** 根元素的唯一标识符，用于替代不可序列化的 root 属性 */
  rootId?: string;
};

/**
 * 基础选项
 * 所有位置相关 Hook 的通用配置
 */
interface BaseOptions {
  /** 偏移量（像素），统一使用 offset */
  offset?: number;
  /** 节流时间（毫秒），控制更新频率 */
  throttle?: number;
}

/**
 * 智能位置同步选项
 * 包含智能位置同步策略的配置选项
 */
interface SmartSyncOptions {
  /** 是否强制校准，每次更新都强制校准，默认 true */
  forceCalibrate?: boolean;
  /** 校准间隔（毫秒），默认 2500 */
  calibrateInterval?: number;
}

/**
 * 使用 step 的选项
 * 通过步长自动生成 threshold 数组
 */
interface StepOptions extends BaseOptions {
  /** 步长值（0-1之间），用于自动生成 threshold 数组 */
  step: number;
  /** 不能同时使用 threshold */
  threshold?: never;
}

/**
 * 使用 threshold 的选项
 * 手动指定 threshold 数组
 */
interface ThresholdOptions extends BaseOptions {
  /** 手动指定的 threshold 值，可以是单个数字或数字数组 */
  threshold: number | number[];
  /** 不能同时使用 step */
  step?: never;
}

/**
 * 使用默认值的选项
 * 既不使用 step 也不使用 threshold
 */
interface DefaultOptions extends BaseOptions {
  /** 不能使用 step */
  step?: never;
  /** 不能使用 threshold */
  threshold?: never;
}

/**
 * 智能位置同步的 step 选项
 * 包含智能位置同步策略的 step 配置
 */
interface SmartSyncStepOptions extends BaseOptions, SmartSyncOptions {
  /** 步长值（0-1之间），用于自动生成 threshold 数组 */
  step: number;
  /** 不能同时使用 threshold */
  threshold?: never;
}

/**
 * 智能位置同步的 threshold 选项
 * 包含智能位置同步策略的 threshold 配置
 */
interface SmartSyncThresholdOptions extends BaseOptions, SmartSyncOptions {
  /** 手动指定的 threshold 值，可以是单个数字或数字数组 */
  threshold: number | number[];
  /** 不能同时使用 step */
  step?: never;
}

/**
 * 智能位置同步的默认选项
 * 包含智能位置同步策略的默认配置
 */
interface SmartSyncDefaultOptions extends BaseOptions, SmartSyncOptions {
  /** 不能使用 step */
  step?: never;
  /** 不能使用 threshold */
  threshold?: never;
}

/**
 * 基于 viewport 的选项（智能位置同步）
 * 使用浏览器视口作为根元素，包含智能位置同步策略
 */
export type ViewportOptions =
  | SmartSyncStepOptions
  | SmartSyncThresholdOptions
  | SmartSyncDefaultOptions;

/**
 * 基于 viewport 的选项（普通版本）
 * 使用浏览器视口作为根元素，不包含智能位置同步策略
 */
export type ViewportOptionsBasic = StepOptions | ThresholdOptions | DefaultOptions;

/**
 * 基于自定义 root 的选项（智能位置同步）
 * 使用自定义元素作为根元素，包含智能位置同步策略
 */
interface CustomRootOptions extends BaseOptions, SmartSyncOptions {
  /** 自定义根元素 */
  root: Element;
  /** 是否提供相对于 root 的位置信息，默认为 true */
  relativeToRoot?: boolean;
  /** 步长值，用于自动生成 threshold 数组 */
  step?: number;
  /** 手动指定的 threshold 值，可以是单个数字或数字数组 */
  threshold?: number | number[];
}

/**
 * 基于自定义 root 的选项（普通版本）
 * 使用自定义元素作为根元素，不包含智能位置同步策略
 */
interface CustomRootOptionsBasic extends BaseOptions {
  /** 自定义根元素 */
  root: Element;
  /** 是否提供相对于 root 的位置信息，默认为 true */
  relativeToRoot?: boolean;
  /** 步长值，用于自动生成 threshold 数组 */
  step?: number;
  /** 手动指定的 threshold 值，可以是单个数字或数字数组 */
  threshold?: number | number[];
}

/**
 * 通用选项类型（智能位置同步）
 * 支持基于 viewport 和自定义 root 两种模式，包含智能位置同步策略
 */
export type Options = ViewportOptions | CustomRootOptions;

/**
 * 通用选项类型（普通版本）
 * 支持基于 viewport 和自定义 root 两种模式，不包含智能位置同步策略
 */
export type OptionsBasic = ViewportOptionsBasic | CustomRootOptionsBasic;

/**
 * 元素位置信息
 * 包含元素的位置、可见性和时间戳信息
 */
export interface ElementPosition {
  /** 元素相对于视口的边界矩形 */
  boundingClientRect: DOMRect;
  /** 元素与根元素的交叉比例（0-1） */
  intersectionRatio: number;
  /** 元素是否与根元素相交 */
  isIntersecting: boolean;
  /** 时间戳，表示位置信息的时间 */
  time: number;
  /** 相对于 root 的位置信息，仅在设置了自定义 root 时提供 */
  relativeRect?: DOMRect;
  /** 滚动 X 轴位置 */
  scrollX: number;
  /** 滚动 Y 轴位置 */
  scrollY: number;
}

/**
 * 基础滚动方向选项
 * 滚动方向相关 Hook 的通用配置
 */
interface BaseScrollDirectionOptions {
  /** 偏移量（像素） */
  offset?: number;
  /** 节流时间（毫秒） */
  throttle?: number;
}

/**
 * 使用 step 的滚动方向选项
 * 通过步长自动生成 threshold 数组
 */
interface ScrollDirectionStepOptions extends BaseScrollDirectionOptions {
  /** 步长值（0-1之间） */
  step: number;
  /** 不能同时使用 threshold */
  threshold?: never;
}

/**
 * 使用 threshold 的滚动方向选项
 * 手动指定 threshold 数组
 */
interface ScrollDirectionThresholdOptions extends BaseScrollDirectionOptions {
  /** 手动指定的 threshold 数组 */
  threshold: number[];
  /** 不能同时使用 step */
  step?: never;
}

/**
 * 使用默认值的滚动方向选项
 * 既不使用 step 也不使用 threshold
 */
interface ScrollDirectionDefaultOptions extends BaseScrollDirectionOptions {
  /** 不能使用 step */
  step?: never;
  /** 不能使用 threshold */
  threshold?: never;
}

/**
 * 基于 viewport 的滚动方向选项
 * 使用浏览器视口作为根元素
 */
type ViewportScrollDirectionOptions =
  | ScrollDirectionStepOptions
  | ScrollDirectionThresholdOptions
  | ScrollDirectionDefaultOptions;

/**
 * 基于自定义 root 的滚动方向选项
 * 使用自定义元素作为根元素
 */
interface CustomRootScrollDirectionOptions extends BaseScrollDirectionOptions {
  /** 自定义根元素 */
  root: Element;
  /** 步长值，用于自动生成 threshold 数组 */
  step?: number;
  /** 手动指定的 threshold 值，可以是单个数字或数字数组 */
  threshold?: number | number[];
}

/**
 * 滚动方向选项类型
 * 支持基于 viewport 和自定义 root 两种模式
 */
export type UseScrollDirectionOptions =
  | ViewportScrollDirectionOptions
  | CustomRootScrollDirectionOptions;

/**
 * 基础 IntersectionLoad 属性
 */
interface BaseIntersectionLoadProps {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  threshold?: number | 'any' | 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
  style?: React.CSSProperties;
  onChange?: (isVisible: boolean) => void;
  root?: Element | null; // 根元素，默认为 viewport
}

/**
 * 使用 once 控制的 IntersectionLoad 属性
 */
interface IntersectionLoadOnceProps extends BaseIntersectionLoadProps {
  /** 是否只触发一次，触发后自动停止监听 */
  once: boolean;
  /** 不能同时使用 active */
  active?: never;
}

/**
 * 使用 active 控制的 IntersectionLoad 属性
 */
interface IntersectionLoadActiveProps extends BaseIntersectionLoadProps {
  /** 是否启用监听 */
  active: boolean;
  /** 不能同时使用 once */
  once?: never;
}

/**
 * 使用默认配置的 IntersectionLoad 属性
 */
interface IntersectionLoadDefaultProps extends BaseIntersectionLoadProps {
  /** 不能使用 once */
  once?: never;
  /** 不能使用 active */
  active?: never;
}

/**
 * IntersectionLoad 组件属性类型
 * 支持三种控制模式：
 * 1. 使用 once 控制是否只触发一次
 * 2. 使用 active 手动控制是否监听
 * 3. 使用默认配置（once: false, active: true）
 */
export type IntersectionLoadProps =
  | IntersectionLoadOnceProps
  | IntersectionLoadActiveProps
  | IntersectionLoadDefaultProps;

/**
 * useElementDetector Hook 选项类型
 * 扩展了基础的 Options 类型，增加了 compute 函数选项
 */
export type UseElementDetectorOptions = Options & {
  /** 自定义计算函数，接受 boundingClientRect 参数，返回 boolean */
  compute?: (boundingClientRect: DOMRect) => boolean;
};

/**
 * useInViewport Hook 选项类型
 * 使用普通版本的选项，不包含智能位置同步策略
 */
export type UseInViewportOptions = OptionsBasic;

/**
 * useBoundingClientRect Hook 选项类型
 * 基于 useElementPosition 实现，支持智能位置同步策略
 */
export type UseBoundingClientRectOptions = Options;

/**
 * useIntersectionRatio Hook 选项类型
 * 直接使用 Intersection Observer，不需要智能位置同步策略
 */
export type UseIntersectionRatioOptions = OptionsBasic;

/**
 * useOneOffVisibility Hook 选项类型
 * 使用普通版本的选项，不包含智能位置同步策略
 */
export type OneOffVisibilityOptions = OptionsBasic & {
  enable?: boolean;
};

/**
 * useLazyElementPositionEffect Hook 选项类型
 * 扩展了基础的 Options 类型，增加了定时检测相关选项
 */
export type UseLazyElementPositionEffectOptions = Options & {
  /** 时间间隔（毫秒），默认 0（立即调用） */
  interval?: number;
  /** 执行次数，默认 1 */
  count?: number;
  /** 回调函数，当位置变化时调用，接收 ElementPosition */
  callback: (position: ElementPosition) => void;
};

export type CheckIfShouldSyncPositionResult = {
  shouldCalibrate: boolean;
  shouldCalculateOnScroll: boolean;
};
