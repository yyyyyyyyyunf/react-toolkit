import "intersection-observer";
import type {
	CheckIfShouldSyncPositionResult,
	ElementPosition,
	ObserverOptions,
	Options,
} from "../types";

/**
 * 检查浏览器是否支持 Intersection Observer API
 *
 * 在服务器端渲染环境中，window 对象不存在，需要特殊处理。
 *
 * @returns 是否支持 Intersection Observer API
 *
 * @example
 * ```tsx
 * if (isSupportIntersectionObserver()) {
 *   // 使用 Intersection Observer
 * } else {
 *   // 使用 polyfill
 * }
 * ```
 */
export const isSupportIntersectionObserver = () => {
	return (
		typeof window !== "undefined" &&
		"IntersectionObserver" in window &&
		"IntersectionObserverEntry" in window &&
		"intersectionRatio" in window.IntersectionObserverEntry.prototype
	);
};

/**
 * 生成唯一 ID
 *
 * 用于为观察的元素生成唯一标识符，避免冲突。
 *
 * @param prefix ID 前缀
 * @returns 唯一的 ID 字符串
 *
 * @example
 * ```tsx
 * const id = uniqueId("intersection_element"); // "intersection_element_abc123def"
 * ```
 */
export const uniqueId = (prefix: string) =>
	`${prefix}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * 根据步长生成阈值数组
 *
 * 根据指定的步长值，生成均匀分布的阈值数组。
 * 用于 Intersection Observer 的 threshold 配置。
 *
 * @param step 步长值（0-1之间）
 * @returns 阈值数组，包含 0 和 1
 * @throws 当 step 不在 0-1 范围内时抛出错误
 *
 * @example
 * ```tsx
 * generateThresholdArray(0.25); // [0, 0.25, 0.5, 0.75, 1]
 * generateThresholdArray(0.1);  // [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
 * ```
 */
export const generateThresholdArray = (step: number): number[] => {
	if (step <= 0 || step > 1) {
		throw new Error("Step must be between 0 and 1");
	}

	const thresholds: number[] = [];
	for (let i = 0; i <= 1; i += step) {
		thresholds.push(Number(i.toFixed(3))); // 保留3位小数，避免浮点数精度问题
	}

	// 确保包含 0 和 1
	if (thresholds[0] !== 0) {
		thresholds.unshift(0);
	}
	if (thresholds[thresholds.length - 1] !== 1) {
		thresholds.push(1);
	}

	return thresholds;
};

/**
 * 获取默认的阈值数组
 *
 * 返回一个密集的阈值数组，提供高精度的位置跟踪。
 * 适用于需要精确位置信息的场景。
 *
 * @returns 默认的阈值数组
 *
 * @example
 * ```tsx
 * const thresholds = getDefaultThresholdArray();
 * // [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
 * ```
 */
export const getDefaultThresholdArray = (): number[] => {
	return [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
};

/**
 * 计算最终的 threshold 数组
 *
 * 根据配置的 step 或 threshold 生成用于 Intersection Observer 的阈值数组。
 * 这是一个通用的工具函数，用于统一处理各个 Hook 中的 threshold 计算逻辑。
 *
 * 计算逻辑：
 * 1. 如果同时设置了 step 和 threshold，会发出警告并使用 threshold
 * 2. 如果明确指定了 threshold，优先使用
 * 3. 如果指定了 step，根据 step 生成 threshold 数组
 * 4. 否则使用默认的 threshold 数组
 *
 * @param options 包含 step 和 threshold 的选项对象
 * @param hookName Hook 名称，用于警告信息
 * @returns 最终的 threshold 数组
 *
 * @example
 * ```tsx
 * // 使用 step
 * const thresholds1 = calculateFinalThreshold({ step: 0.1 }, 'useElementPosition');
 * // [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
 *
 * // 使用单个数字 threshold
 * const thresholds2 = calculateFinalThreshold({ threshold: 0.5 }, 'useElementPosition');
 * // [0.5]
 *
 * // 使用数组 threshold
 * const thresholds3 = calculateFinalThreshold({ threshold: [0, 0.5, 1] }, 'useElementPosition');
 * // [0, 0.5, 1]
 *
 * // 使用默认值
 * const thresholds4 = calculateFinalThreshold({}, 'useElementPosition');
 * // [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
 * ```
 */
export const calculateFinalThreshold = (
	options: Options,
	hookName: string,
): number[] => {
	// 解构 step 和 threshold 以避免对象引用问题
	const step = "step" in options ? options.step : undefined;
	const threshold = "threshold" in options ? options.threshold : undefined;

	// 运行时检查：确保 step 和 threshold 不同时设置
	if (step !== undefined && threshold !== undefined) {
		console.warn(
			`${hookName}: step 和 threshold 不能同时设置，将使用 threshold`,
		);
	}

	// 如果明确指定了 threshold，优先使用
	if (threshold !== undefined) {
		// 如果是单个数字，转换为数组
		return Array.isArray(threshold) ? threshold : [threshold];
	}

	// 如果指定了 step，根据 step 生成 threshold 数组
	if (step !== undefined) {
		return generateThresholdArray(step);
	}

	// 否则使用默认的 threshold 数组
	return getDefaultThresholdArray();
};

/**
 * 检查元素是否满足可见性条件
 *
 * 根据指定的阈值和语义化值，判断元素是否满足可见性条件。
 * 支持数值阈值和语义化阈值（如 'any', 'top', 'bottom' 等）。
 *
 * @param entry Intersection Observer 的 entry 对象
 * @param threshold 阈值，可以是数字或语义化值
 * @returns 是否满足可见性条件
 *
 * @example
 * ```tsx
 * // 数值阈值
 * checkVisibility(entry, 0.5); // 50% 可见时返回 true
 *
 * // 语义化阈值
 * checkVisibility(entry, 'any'); // 任何部分可见时返回 true
 * checkVisibility(entry, 'top'); // 顶部可见时返回 true
 * ```
 */
export const checkVisibility = (
	entry: IntersectionObserverEntry,
	threshold: number | "any" | "top" | "right" | "bottom" | "left",
): boolean => {
	if (typeof threshold === "number") {
		// 对于数值阈值，检查交叉比例是否达到要求
		return entry.isIntersecting && entry.intersectionRatio >= threshold;
	}

	if (threshold === "any") {
		return entry.isIntersecting && entry.intersectionRatio > 0;
	}

	// 方向性检测
	const rect = entry.boundingClientRect;
	const viewport = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	switch (threshold) {
		case "top":
			return rect.top < viewport.height && rect.bottom > 0;
		case "right":
			return rect.right > 0 && rect.left < viewport.width;
		case "bottom":
			return rect.bottom > 0 && rect.top < viewport.height;
		case "left":
			return rect.left < viewport.width && rect.right > 0;
		default:
			return entry.isIntersecting;
	}
};

/**
 * 计算滚动方向
 *
 * 通过比较两个位置信息，计算元素的移动方向。
 * 用于判断用户的滚动方向（向上、向下、向左、向右）。
 *
 * @param currentRect 当前的位置信息
 * @param previousRect 前一次的位置信息
 * @returns 滚动方向
 *
 * @example
 * ```tsx
 * const direction = calculateScrollDirection(currentRect, previousRect);
 * // 返回 'up', 'down', 'left', 'right' 或 'none'
 * ```
 */
export const calculateScrollDirection = (
	currentRect: DOMRect,
	previousRect: DOMRect,
): "up" | "down" | "left" | "right" | "none" => {
	const deltaY = currentRect.top - previousRect.top;
	const deltaX = currentRect.left - previousRect.left;

	// 设置一个最小阈值，避免微小的抖动
	const threshold = 1;

	if (Math.abs(deltaY) > Math.abs(deltaX)) {
		// 垂直滚动
		if (deltaY > threshold) {
			return "down"; // 元素向下移动，说明向上滚动
		}
		if (deltaY < -threshold) {
			return "up"; // 元素向上移动，说明向下滚动
		}
	}

	// 水平滚动
	if (deltaX > threshold) {
		return "right"; // 元素向右移动，说明向左滚动
	}
	if (deltaX < -threshold) {
		return "left"; // 元素向左移动，说明向右滚动
	}

	return "none";
};

/**
 * 创建 IntersectionObserver 实例的工厂函数
 *
 * 根据浏览器支持情况自动选择原生 API 或 polyfill 实现。
 * 使用标准的 intersection-observer polyfill 支持所有浏览器。
 *
 * @param callback IntersectionObserver 回调函数
 * @param options 配置选项，支持标准的 IntersectionObserverInit
 * @returns IntersectionObserver 实例
 *
 * @example
 * ```tsx
 * const observer = createIntersectionObserver((entries) => {
 *   entries.forEach(entry => {
 *     console.log('Element visibility changed:', entry.isIntersecting);
 *   });
 * }, {
 *   threshold: [0, 0.5, 1]
 * });
 *
 * observer.observe(element);
 * ```
 */
export const createIntersectionObserver = (
	callback: IntersectionObserverCallback,
	options?: ObserverOptions,
): IntersectionObserver => {
	return new IntersectionObserver(callback, options);
};

/**
 * 检查是否需要同步位置
 * 根据元素的位置信息和配置选项，判断是否需要同步位置。
 * 支持强制校准和滚动计算。
 *
 * @param position 位置信息
 * @param forceCalibrate 是否强制校准
 * @param lastCalibrateTime 上次校准时间
 * @param calibrateInterval 校准间隔
 * @returns 是否需要同步位置
 */
export const checkIfShouldSyncPosition = (
	position: ElementPosition,
	forceCalibrate: boolean,
	lastCalibrateTime: number,
	calibrateInterval: number,
): CheckIfShouldSyncPositionResult => {
	const { intersectionRatio, isIntersecting } = position;

	/** 如果元素正在部分可见，则不需要同步位置，IntersectionObserver会自动触发回调 */
	if (isIntersecting && intersectionRatio !== 1) {
		return { shouldCalibrate: false, shouldCalculateOnScroll: false };
	}

	/** 如果不需要强制校准，则需要计算位置 */
	if (!forceCalibrate) {
		return { shouldCalibrate: false, shouldCalculateOnScroll: true };
	}

	/** 如果元素完全不可见，则需要计算位置 */
	if (!isIntersecting) {
		return { shouldCalibrate: false, shouldCalculateOnScroll: true };
	}

	/** 如果距离上次校准时间小于校准间隔，则需要计算位置 */
	const now = Date.now();
	if (now - lastCalibrateTime < calibrateInterval) {
		return { shouldCalibrate: false, shouldCalculateOnScroll: true };
	}

	/** 如果距离上次校准时间大于校准间隔，则需要校准位置 */
	return { shouldCalibrate: true, shouldCalculateOnScroll: false };
};

/**
 * 计算基于滚动的位置信息
 *
 * 通过比较当前滚动位置与上次记录的位置，计算元素的新位置信息。
 * 这个函数是智能位置同步策略的核心，用于在元素完全可见或完全不可见时
 * 进行精确的位置计算，避免依赖 Intersection Observer 的延迟更新。
 *
 * 计算逻辑：
 * 1. 计算滚动差值 (deltaX, deltaY)
 * 2. 估算新的元素矩形位置
 * 3. 计算新的交叉状态和比例
 * 4. 返回完整的位置信息对象
 *
 * 性能优化：
 * - 只在元素完全可见/不可见时使用
 * - 避免在元素部分可见时进行复杂计算
 * - 与 Intersection Observer 形成互补策略
 *
 * @param currentPosition 当前位置信息，包含上次的滚动位置和矩形信息
 * @param currentScrollX 当前滚动 X 位置
 * @param currentScrollY 当前滚动 Y 位置
 * @param now 当前时间戳
 * @returns 计算后的新位置信息，包含估算的矩形、交叉状态和比例
 *
 * @example
 * ```tsx
 * const newPosition = calculateScrollBasedPosition(
 *   currentPosition,
 *   window.scrollX,
 *   window.scrollY,
 *   Date.now()
 * );
 *
 * // 使用新位置信息
 * console.log('估算位置:', newPosition.boundingClientRect);
 * console.log('交叉比例:', newPosition.intersectionRatio);
 * ```
 */
export const calculateScrollBasedPosition = (
	currentPosition: ElementPosition,
	currentScrollX: number,
	currentScrollY: number,
	now: number,
): ElementPosition => {
	const { scrollX = 0, scrollY = 0 } = currentPosition;
	const {
		top = 0,
		left = 0,
		width = 0,
		height = 0,
		right = 0,
		bottom = 0,
	} = currentPosition.boundingClientRect || {};

	const deltaX = currentScrollX - scrollX;
	const deltaY = currentScrollY - scrollY;

	const estimatedRect: DOMRect = {
		top: top - deltaY,
		left: left - deltaX,
		width,
		height,
		right: right - deltaX,
		bottom: bottom - deltaY,
		x: left - deltaX,
		y: top - deltaY,
		toJSON: () => {},
	};

	const isIntersecting =
		(estimatedRect.top >= 0 && estimatedRect.top <= window.innerHeight) ||
		(estimatedRect.bottom >= 0 && estimatedRect.bottom <= window.innerHeight);

	let intersectionRatio = 0;
	if (isIntersecting) {
		const intersectingTop = Math.max(0, estimatedRect.top);
		const intersectingBottom = Math.min(
			window.innerHeight,
			estimatedRect.bottom,
		);
		const intersectingLeft = Math.max(0, estimatedRect.left);
		const intersectingRight = Math.min(window.innerWidth, estimatedRect.right);
		const intersectingArea =
			(intersectingBottom - intersectingTop) *
			(intersectingRight - intersectingLeft);
		const boundingArea = width * height;
		intersectionRatio = intersectingArea / boundingArea;
	}

	return {
		boundingClientRect: estimatedRect,
		intersectionRatio: intersectionRatio,
		isIntersecting: isIntersecting,
		time: now,
		relativeRect: undefined,
		scrollX: currentScrollX,
		scrollY: currentScrollY,
	};
};
