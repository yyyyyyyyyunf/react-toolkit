# @fly4react/observer

[![npm version](https://img.shields.io/npm/v/@fly4react/observer.svg)](https://www.npmjs.com/package/@fly4react/observer)
[![npm downloads](https://img.shields.io/npm/dm/@fly4react/observer.svg)](https://www.npmjs.com/package/@fly4react/observer)
[![bundle size](https://img.shields.io/bundlephobia/min/@fly4react/observer.svg)](https://bundlephobia.com/result?p=@fly4react/observer)

> 📖 **中文文档**: [查看中文版本](README.zh.md)

## Features

- 🎯 **Precise Position Tracking**: Real-time monitoring of element position changes in viewport
- ⚡ **Performance Optimization**: Built-in throttling mechanism to avoid frequent updates
- 🧠 **Smart Position Sync**: Intelligent strategy combining Intersection Observer and scroll events
- 🔄 **Scroll Direction Detection**: Smart recognition of scroll direction changes
- 🎨 **Animation Triggers**: Support for position-based animation triggers
- 📱 **Responsive Support**: Adapt to various screen sizes and devices
- 🚀 **Lazy Loading Optimization**: Efficient image and content lazy loading
- 🎭 **Viewport Detection**: Precise element visibility detection
- 🏗️ **Sticky Detection**: Detect when elements reach specified positions
- 🌐 **Browser Compatibility**: Automatic fallback support for older browsers

## Browser Compatibility

- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 16+
- ✅ iOS Safari 12.2+
- ✅ Android Chrome 51+

## Installation

```bash
npm install @fly4react/observer
# or
yarn add @fly4react/observer
# or
pnpm add @fly4react/observer
```

## Quick Start

```tsx
import { useIntersectionObserver } from '@fly4react/observer';
import { useRef, useState } from 'react';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useIntersectionObserver(
    ref,
    (entry) => {
      setIsVisible(entry.isIntersecting);
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  );

  return (
    <div ref={ref}>
      {isVisible ? 'Element is visible!' : 'Element is not visible'}
    </div>
  );
}
```

## API Reference

### useIntersectionObserver

A hook for observing element intersection with viewport.

```tsx
useIntersectionObserver(
  ref: RefObject<HTMLElement | null>,
  callback: (entry: ObserverCallbackParamType) => void,
  options: ObserverOptions
): void
```

**Parameters:**
- `ref`: Ref to the target element
- `callback`: Callback function that receives the intersection entry
- `options`: IntersectionObserver options

**Returns:**
- `void` - This hook doesn't return anything, it calls the callback when intersection changes

### useInViewport

A hook for detecting if element is in viewport.

```tsx
const ref = useRef<HTMLDivElement>(null);
const isInViewport = useInViewport(ref);
```

### useElementPosition

A hook for tracking element position.

```tsx
const ref = useRef<HTMLDivElement>(null);
const position = useElementPosition(ref, options);
```

### useElementPositionRef

A hook for tracking element position without triggering re-renders.

```tsx
const ref = useRef<HTMLDivElement>(null);
const positionRef = useElementPositionRef(ref, options);

// Access position data
const handleClick = () => {
  if (positionRef.current) {
    console.log('Position:', positionRef.current.boundingClientRect);
  }
};
```

### useLazyElementPositionRef

A lazy version of `useElementPositionRef` that only calculates position when explicitly requested.

```tsx
const ref = useRef<HTMLDivElement>(null);
const getPosition = useLazyElementPositionRef(ref, options);

// Get position on demand
const handleClick = () => {
  const position = getPosition();
  if (position) {
    console.log('Position:', position.boundingClientRect);
  }
};
```

### useScrollDirection

A hook for detecting scroll direction.

```tsx
const ref = useRef<HTMLDivElement>(null);
const { scrollDirection, isScrolling } = useScrollDirection(ref, options);
```

## Examples

### Basic Intersection Observer

```tsx
import { useIntersectionObserver } from '@fly4react/observer';
import { useRef, useState } from 'react';

function LazyImage({ src, alt }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useIntersectionObserver(
    ref,
    (entry) => {
      setInView(entry.isIntersecting);
    },
    {
      threshold: 0.1,
      once: true
    }
  );

  return (
    <div ref={ref}>
      {inView ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="placeholder">Loading...</div>
      )}
    </div>
  );
}
```

### Position Tracking

```tsx
import { useElementPosition } from '@fly4react/observer';
import { useRef } from 'react';

function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);
  const position = useElementPosition(ref);

  return (
    <div>
      <div ref={ref}>Content</div>
      {position && (
        <div>Position: {position.intersectionRatio}</div>
      )}
    </div>
  );
}
```

### Lazy Position Tracking

```tsx
import { useLazyElementPositionRef } from '@fly4react/observer';

function LazyScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);
  const getPosition = useLazyElementPositionRef(ref);

  const handleClick = () => {
    const position = getPosition();
    if (position) {
      console.log('Current position:', position.boundingClientRect);
      console.log('Intersection ratio:', position.intersectionRatio);
    }
  };

  return (
    <div>
      <div ref={ref}>Content</div>
      <button onClick={handleClick}>Get Position</button>
    </div>
  );
}
```

### Animation Triggers

```tsx
import { useIntersectionObserver } from '@fly4react/observer';
import { useRef, useState } from 'react';

function AnimatedElement() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useIntersectionObserver(
    ref,
    (entry) => {
      setInView(entry.isIntersecting);
    },
    {
      threshold: 0.5
    }
  );

  return (
    <div 
      ref={ref}
      className={`fade-in ${inView ? 'visible' : ''}`}
    >
      Animated content
    </div>
  );
}
```

## License

MIT
