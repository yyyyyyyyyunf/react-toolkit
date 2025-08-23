import { describe, it, expect, beforeEach } from 'vitest'
import {
  registerDebugComponent,
  getDebugComponents,
  registerIgnoreProp,
  getIgnoreProps,
} from '../src/config'

describe('Config', () => {
  beforeEach(() => {
    // 清理状态，重置为初始状态
    // 注意：这里我们无法直接重置，因为配置是模块级别的
    // 在实际使用中，这通常不是问题，因为测试是隔离的
  })

  describe('registerDebugComponent', () => {
    it('should register debug component', () => {
      registerDebugComponent('TestComponent')
      const components = getDebugComponents()
      expect(components).toContain('TestComponent')
    })

    it('should not register duplicate debug component', () => {
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

  describe('registerIgnoreProp', () => {
    it('should register ignore prop', () => {
      registerIgnoreProp('testProp')
      const props = getIgnoreProps()
      expect(props).toContain('testProp')
    })

    it('should not register duplicate ignore prop', () => {
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
