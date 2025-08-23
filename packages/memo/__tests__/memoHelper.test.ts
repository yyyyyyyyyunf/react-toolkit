import { describe, it, expect, vi } from 'vitest'
import { debugLog, shouldIgnoreProp } from '../src/utils/memoHelper'
import { registerDebugComponent, registerIgnoreProp } from '../src/config'

describe('memoHelper', () => {
  describe('debugLog', () => {
    it('should log debug information when component is registered', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      // 注册组件用于调试
      registerDebugComponent('TestComponent')
      
      debugLog('TestComponent', 'testProp', 'oldValue', 'newValue')
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '[TestComponent]',
        'testProp',
        'oldValue',
        'newValue'
      )
      
      consoleSpy.mockRestore()
    })

    it('should not log when component is not registered', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      debugLog('UnregisteredComponent', 'testProp', 'oldValue', 'newValue')
      
      expect(consoleSpy).not.toHaveBeenCalled()
      
      consoleSpy.mockRestore()
    })
  })

  describe('shouldIgnoreProp', () => {
    it('should return true for registered ignore props', () => {
      // 注册一个忽略的属性
      registerIgnoreProp('ignoredProp')
      
      expect(shouldIgnoreProp('ignoredProp')).toBe(true)
    })

    it('should return false for non-ignored props', () => {
      expect(shouldIgnoreProp('normalProp')).toBe(false)
    })

    it('should return false for common React props when not registered', () => {
      expect(shouldIgnoreProp('children')).toBe(false)
      expect(shouldIgnoreProp('key')).toBe(false)
      expect(shouldIgnoreProp('ref')).toBe(false)
    })
  })
})
