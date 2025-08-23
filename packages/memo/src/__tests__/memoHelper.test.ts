import { describe, it, expect, vi, beforeEach } from 'vitest'
import { debugLog, shouldIgnoreProp } from '../utils/memoHelper'
import { registerDebugComponent, registerIgnoreProp } from '../config'

// Mock console.log
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('Memo Helper Functions', () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  })

  describe('debugLog', () => {
    it('should log when component is registered for debugging', () => {
      registerDebugComponent('TestComponent')
      debugLog('TestComponent', 'test message')
      
      expect(consoleSpy).toHaveBeenCalledWith('[TestComponent]', 'test message')
    })

    it('should not log when component is not registered for debugging', () => {
      debugLog('UnregisteredComponent', 'test message')
      
      expect(consoleSpy).not.toHaveBeenCalled()
    })

    it('should log when component name contains registered debug component', () => {
      registerDebugComponent('Test')
      debugLog('TestComponent', 'test message')
      
      expect(consoleSpy).toHaveBeenCalledWith('[TestComponent]', 'test message')
    })

    it('should handle multiple arguments', () => {
      registerDebugComponent('TestComponent')
      debugLog('TestComponent', 'message', { data: 'test' }, 123)
      
      expect(consoleSpy).toHaveBeenCalledWith('[TestComponent]', 'message', { data: 'test' }, 123)
    })
  })

  describe('shouldIgnoreProp', () => {
    it('should return true for registered ignore props', () => {
      registerIgnoreProp('testProp')
      
      expect(shouldIgnoreProp('testProp')).toBe(true)
    })

    it('should return false for non-registered props', () => {
      expect(shouldIgnoreProp('normalProp')).toBe(false)
    })

    it('should be case sensitive', () => {
      registerIgnoreProp('testProp')
      
      expect(shouldIgnoreProp('TestProp')).toBe(false)
      expect(shouldIgnoreProp('testprop')).toBe(false)
    })
  })
})
