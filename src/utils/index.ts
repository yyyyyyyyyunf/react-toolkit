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
 *   // 降级处理
 * }
 * ```
 */
export const isSupportIntersectionObserver = () => {
	if (typeof window === "undefined") return false;
	return "IntersectionObserver" in window;
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
		return entry.isIntersecting;
	}

	if (threshold === "any") {
		return entry.intersectionRatio > 0;
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
		} else if (deltaY < -threshold) {
			return "up"; // 元素向上移动，说明向下滚动
		}
	} else {
		// 水平滚动
		if (deltaX > threshold) {
			return "right"; // 元素向右移动，说明向左滚动
		} else if (deltaX < -threshold) {
			return "left"; // 元素向左移动，说明向右滚动
		}
	}

	return "none";
};
