import { lazy } from 'react'

// 懒加载页面组件
const AnimationTriggers = lazy(() => import('../pages/animation-triggers'))
const InfiniteScroll = lazy(() => import('../pages/infinite-scroll'))
const ParallaxScroll = lazy(() => import('../pages/parallax-scroll'))
const ScrollDirectionExample = lazy(() => import('../pages/scroll-direction-example'))

// 路由配置
export const routes = [
  {
    path: '/animation-triggers',
    name: '动画触发器',
    component: AnimationTriggers,
    description: '使用 Intersection Observer 触发动画效果'
  },
  {
    path: '/infinite-scroll',
    name: '无限滚动',
    component: InfiniteScroll,
    description: '实现无限滚动列表'
  },
  {
    path: '/parallax-scroll',
    name: '视差滚动',
    component: ParallaxScroll,
    description: '视差滚动效果演示'
  },
  {
    path: '/scroll-direction',
    name: '滚动方向检测',
    component: ScrollDirectionExample,
    description: '检测页面滚动方向'
  }
]

export const defaultRoute = routes[0]
