import { describe, it, expect, beforeEach } from 'vitest'
import {
  registerDebugComponent,
  registerIgnoreProp,
  getDebugComponents,
  getIgnoreProps,
} from '../config'

describe('Config Management', () => {
  beforeEach(() => {
    // 重置配置状态
    // 注意：这里我们需要访问内部状态来重置，实际实现中可能需要添加清理函数
  })

  describe('Debug Components', () => {
    it('should register debug components', () => {
      registerDebugComponent('TestComponent')
      const components = getDebugComponents()
      expect(components).toContain('TestComponent')
    })

    it('should not register duplicate debug components', () => {
      registerDebugComponent('TestComponent')
      registerDebugComponent('TestComponent')
      const components = getDebugComponents()
      const count = components.filter(c => c === 'TestComponent').length
      expect(count).toBe(1)
    })

    it('should return readonly array of debug components', () => {
      registerDebugComponent('TestComponent')
      const components = getDebugComponents()
      expect(Array.isArray(components)).toBe(true)
      // 测试返回的是新数组（不是原始数组的引用）
      const originalLength = components.length
      components.push('AnotherComponent')
      const newComponents = getDebugComponents()
      expect(newComponents.length).toBe(originalLength) // 原始数据未被修改
    })
  })

  describe('Ignore Props', () => {
    it('should register ignore props', () => {
      registerIgnoreProp('testProp')
      const props = getIgnoreProps()
      expect(props).toContain('testProp')
    })

    it('should not register duplicate ignore props', () => {
      registerIgnoreProp('testProp')
      registerIgnoreProp('testProp')
      const props = getIgnoreProps()
      const count = props.filter(p => p === 'testProp').length
      expect(count).toBe(1)
    })

    it('should return readonly array of ignore props', () => {
      registerIgnoreProp('testProp')
      const props = getIgnoreProps()
      expect(Array.isArray(props)).toBe(true)
      // 测试返回的是新数组（不是原始数组的引用）
      const originalLength = props.length
      props.push('anotherProp')
      const newProps = getIgnoreProps()
      expect(newProps.length).toBe(originalLength) // 原始数据未被修改
    })
  })
})
