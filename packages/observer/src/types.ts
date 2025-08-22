/**
 * 滚动方向枚举
 * 表示元素相对于视口的移动方向
 */
export type ScrollDirection = "up" | "down" | "left" | "right" | "none";

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
 * Intersection Observer 配置选项
 * 扩展了原生的 IntersectionObserverInit 接口
 */
export type ObserverOptions = IntersectionObserverInit & {
	/** 是否只触发一次，触发后自动取消观察 */
	once?: boolean;
};

/**
 * 基础元素位置选项
 * 所有位置相关 Hook 的通用配置
 */
interface BaseElementPositionOptions {
	/** 偏移量（像素），统一使用 offset */
	offset?: number;
	/** 节流时间（毫秒），控制更新频率 */
	throttle?: number;
	/** 元素完全不可见时跳过更新，提升性能 */
	skipWhenOffscreen?: boolean;
}

/**
 * 使用 step 的选项
 * 通过步长自动生成 threshold 数组
 */
interface StepOptions extends BaseElementPositionOptions {
	/** 步长值（0-1之间），用于自动生成 threshold 数组 */
	step: number;
	/** 不能同时使用 threshold */
	threshold?: never;
}

/**
 * 使用 threshold 的选项
 * 手动指定 threshold 数组
 */
interface ThresholdOptions extends BaseElementPositionOptions {
	/** 手动指定的 threshold 数组 */
	threshold: number[];
	/** 不能同时使用 step */
	step?: never;
}

/**
 * 使用默认值的选项
 * 既不使用 step 也不使用 threshold
 */
interface DefaultOptions extends BaseElementPositionOptions {
	/** 不能使用 step */
	step?: never;
	/** 不能使用 threshold */
	threshold?: never;
}

/**
 * 基于 viewport 的选项
 * 使用浏览器视口作为根元素
 */
type ViewportElementPositionOptions =
	| StepOptions
	| ThresholdOptions
	| DefaultOptions;

/**
 * 基于自定义 root 的选项
 * 使用自定义元素作为根元素
 */
interface CustomRootElementPositionOptions extends BaseElementPositionOptions {
	/** 自定义根元素 */
	root: Element;
	/** 是否提供相对于 root 的位置信息，默认为 true */
	relativeToRoot?: boolean;
	/** 步长值，用于自动生成 threshold 数组 */
	step?: number;
	/** 手动指定的 threshold 数组 */
	threshold?: number[];
}

/**
 * 元素位置选项类型
 * 支持基于 viewport 和自定义 root 两种模式
 */
export type ElementPositionOptions =
	| ViewportElementPositionOptions
	| CustomRootElementPositionOptions;

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
	/** 手动指定的 threshold 数组 */
	threshold?: number[];
}

/**
 * 滚动方向选项类型
 * 支持基于 viewport 和自定义 root 两种模式
 */
export type UseScrollDirectionOptions =
	| ViewportScrollDirectionOptions
	| CustomRootScrollDirectionOptions;

	export interface IntersectionLoadProps {
		children: React.ReactNode;
		placeholder?: React.ReactNode;
		threshold?: number | "any" | "top" | "right" | "bottom" | "left";
		offset?: number;
		height: number;
		lazy?: boolean;
		style?: React.CSSProperties;
		active?: boolean;
		onChange?: (isVisible: boolean) => void;
		root?: Element | null; // 根元素，默认为 viewport
	}
