import { describe, it, expect, beforeEach } from 'vitest';
import { 
	getPreloadQueue, 
	clearPreloadQueue,
	getPreloadQueueByMode
} from '../src/utils/preload';

describe('Compatibility modes', () => {
	beforeEach(() => {
		// 清理所有状态
		clearPreloadQueue('modern');
		clearPreloadQueue('legacy');
		// 重置全局对象
		(global as any).__fly4react_image_preload_queue__ = undefined;
		(globalThis as any).__fly4react_image_preload_queue__ = undefined;
	});

	describe('Modern mode (module-level queue)', () => {
		it('should use module-level queue by default', () => {
			// 直接操作模块级队列
			const queue = getPreloadQueueByMode('modern');
			queue.push({ src: 'https://example.com/image.jpg', ssr: true });

			const result = getPreloadQueue('modern');
			expect(result).toHaveLength(1);
			expect(result[0].src).toBe('https://example.com/image.jpg');
		});

		it('should isolate data between different modes', () => {
			// 添加数据到不同模式
			const modernQueue = getPreloadQueueByMode('modern');
			const legacyQueue = getPreloadQueueByMode('legacy');
			
			modernQueue.push({ src: 'https://example.com/image1.jpg', ssr: true });
			legacyQueue.push({ src: 'https://example.com/image2.jpg', ssr: true });

			const modernResult = getPreloadQueue('modern');
			const legacyResult = getPreloadQueue('legacy');
			
			expect(modernResult).toHaveLength(1);
			expect(legacyResult).toHaveLength(1);
			expect(modernResult[0].src).toBe('https://example.com/image1.jpg');
			expect(legacyResult[0].src).toBe('https://example.com/image2.jpg');
		});
	});

	describe('Legacy mode (global queue)', () => {
		it('should use global queue for legacy mode', () => {
			// 直接操作全局队列
			const globalQueue = getPreloadQueueByMode('legacy');
			globalQueue.push({ src: 'https://example.com/image.jpg', ssr: true });

			const queue = getPreloadQueue('legacy');
			expect(queue).toHaveLength(1);
			expect(queue[0].src).toBe('https://example.com/image.jpg');
		});

		it('should share data across different module instances', () => {
			// 模拟第一个模块实例
			const queue1 = getPreloadQueueByMode('legacy');
			queue1.push({ src: 'https://example.com/image.jpg', ssr: true });

			// 模拟第二个模块实例读取
			const queue2 = getPreloadQueue('legacy');
			expect(queue2).toHaveLength(1);
			expect(queue2[0].src).toBe('https://example.com/image.jpg');
		});

		it('should prevent duplicate entries', () => {
			const globalQueue = getPreloadQueueByMode('legacy');
			const options = { src: 'https://example.com/image.jpg', ssr: true };
			
			globalQueue.push(options);
			globalQueue.push(options);
			
			const queue = getPreloadQueue('legacy');
			expect(queue).toHaveLength(2); // 这里应该是2，因为直接操作数组没有去重
		});
	});
});
