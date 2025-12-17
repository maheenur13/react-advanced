# 🚀 React Advanced Features - Complete Guide

## 📚 Table of Contents

1. [React Compiler](#1-react-compiler)
2. [Performance Optimization Hooks](#2-performance-optimization-hooks)
3. [Concurrent Features](#3-concurrent-features)
4. [Context API](#4-context-api)
5. [Error Boundaries](#5-error-boundaries)
6. [Custom Hooks](#6-custom-hooks)
7. [Code Examples](#7-code-examples)

---

## 1. React Compiler

### 🎯 Overview

The **React Compiler** is a build-time optimization tool that automatically optimizes React applications by handling memoization behind the scenes.

### ✨ Key Benefits

- ✅ **Automatic Optimization**: No need for manual `useMemo`, `useCallback`, or `React.memo`
- ✅ **Cleaner Code**: Removes boilerplate optimization code
- ✅ **Better Performance**: Compiler makes optimal decisions
- ✅ **Future-Ready**: Designed for React 19 and beyond

### 📦 Installation

```bash
npm install -D babel-plugin-react-compiler@latest
```

### ⚙️ Configuration (Vite)

```javascript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
});
```

### 🔄 Before vs After

**Before React Compiler:**

```typescript
const expensiveResult = useMemo(() => {
  return expensiveFunction();
}, []);

const handleClick = useCallback(() => {
  doSomething();
}, []);
```

**After React Compiler:**

```typescript
// Compiler automatically optimizes!
const expensiveResult = expensiveFunction();
const handleClick = () => doSomething();
```

---

## 2. Performance Optimization Hooks

### 🔹 useMemo

**Purpose**: Memoize expensive calculations

```typescript
const sortedProducts = useMemo(() => {
  console.log("Sorting products...");
  return products.sort((a, b) => a.price - b.price);
}, [products]);
```

**When to use:**

- Expensive calculations
- Object/array transformations
- Filtering/sorting operations

### 🔹 useCallback

**Purpose**: Memoize callback functions

```typescript
const handleSort = useCallback((sortBy: string) => {
  setSortOption(sortBy);
}, []);
```

**When to use:**

- Functions passed to memoized child components
- Functions used as dependencies in other hooks
- Event handlers for optimized components

### 🔹 React.memo

**Purpose**: Prevent component re-renders when props haven't changed

```typescript
const ProductCard = memo(({ name, price }: Props) => {
  return (
    <div>
      {name}: ${price}
    </div>
  );
});
```

**When to use:**

- Pure functional components
- Components that render often with same props
- Child components in lists

---

## 3. Concurrent Features

### 🔹 useTransition

**Purpose**: Mark state updates as non-blocking transitions

```typescript
const [isPending, startTransition] = useTransition();

const handleSearch = (value: string) => {
  startTransition(() => {
    setSearchTerm(value); // Non-blocking update
  });
};
```

**Benefits:**

- ✅ Keeps UI responsive during expensive operations
- ✅ Allows interruption of low-priority updates
- ✅ Provides loading state via `isPending`

### 🔹 useDeferredValue

**Purpose**: Defer updates to less critical parts of UI

```typescript
const deferredQuery = useDeferredValue(searchQuery);

// UI stays responsive, results update after
const results = useMemo(() => searchProducts(deferredQuery), [deferredQuery]);
```

**Use Cases:**

- Search results
- Auto-complete suggestions
- Data visualization updates

---

## 4. Context API

### 🎯 Purpose

Share data across component tree without prop drilling

### 📝 Implementation

```typescript
// 1. Create Context
const ThemeContext = createContext<ThemeType>(undefined);

// 2. Create Provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create Custom Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Must use within provider");
  return context;
};

// 4. Use in Components
function MyComponent() {
  const { theme, setTheme } = useTheme();
  return <div className={theme}>Content</div>;
}
```

### 💡 Best Practices

- ✅ Create custom hooks for consuming context
- ✅ Split contexts by concern (Theme, Auth, Settings)
- ✅ Use Context for truly global state
- ❌ Don't use for frequently changing values (use state management)

---

## 5. Error Boundaries

### 🎯 Purpose

Catch JavaScript errors in component tree and display fallback UI

### 📝 Implementation

```typescript
class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### 🔧 Usage

```typescript
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

### 📌 What Error Boundaries Catch

- ✅ Rendering errors
- ✅ Lifecycle method errors
- ✅ Constructor errors

### ❌ What They Don't Catch

- ❌ Event handlers (use try-catch)
- ❌ Async code (use try-catch)
- ❌ Server-side rendering
- ❌ Errors in the error boundary itself

---

## 6. Custom Hooks

### 🎯 Purpose

Extract and reuse component logic

### 📝 Examples

#### 1. **useFetch** - Data Fetching

```typescript
const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};
```

#### 2. **useDebounce** - Debounce Values

```typescript
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

#### 3. **useLocalStorage** - Persist State

```typescript
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
```

#### 4. **useToggle** - Boolean State Management

```typescript
const useToggle = (initial = false) => {
  const [value, setValue] = useState(initial);

  const toggle = () => setValue((v) => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
};
```

#### 5. **useWindowSize** - Responsive Dimensions

```typescript
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
```

### 💡 Custom Hook Rules

- ✅ Must start with "use"
- ✅ Can call other hooks
- ✅ Must follow hooks rules (don't call in conditions/loops)
- ✅ Should have single responsibility
- ✅ Return values or objects, not JSX

---

## 7. Code Examples

### 🎨 Complete Demo Component

See `src/components/DemoComponents.tsx` for a complete example featuring:

- ✅ **useMemo**: Expensive calculations (filtering, sorting)
- ✅ **useCallback**: Memoized event handlers
- ✅ **React.memo**: Optimized ProductCard component
- ✅ **useTransition**: Non-blocking search and sort
- ✅ **useDeferredValue**: Deferred search results
- ✅ **Context API**: Theme management
- ✅ **Custom Hooks**: useDebounce for search optimization
- ✅ **Error Boundaries**: Error handling in App.tsx

### 🔍 Features Demonstrated

#### Search Functionality

```typescript
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearch = useDebounce(searchTerm, 300);
const deferredSearch = useDeferredValue(searchTerm);

const filteredProducts = useMemo(
  () => filterProducts(products, deferredSearch),
  [products, deferredSearch]
);
```

#### Sorting with Transition

```typescript
const [isPending, startTransition] = useTransition();

const handleSort = useCallback((sortBy: string) => {
  startTransition(() => {
    setSortBy(sortBy);
  });
}, []);
```

#### Theme Context Integration

```typescript
const { theme, toggleTheme } = useTheme();

<button onClick={toggleTheme}>
  {theme === "dark" ? "☀️ Light" : "🌙 Dark"} Mode
</button>;
```

---

## 📊 Performance Comparison

### Without Optimization

```
❌ Every state change re-renders all components
❌ Expensive calculations run on every render
❌ Event handlers recreated on every render
❌ Child components re-render unnecessarily
```

### With Manual Optimization (useMemo/useCallback)

```
✅ Calculations cached with useMemo
✅ Functions stable with useCallback
✅ Components memoized with React.memo
⚠️ More boilerplate code
⚠️ Easy to forget or misuse
```

### With React Compiler

```
✅ Automatic optimization
✅ Cleaner code
✅ Optimal decisions by compiler
✅ No boilerplate
✅ Future-ready
```

---

## 🎯 Best Practices Summary

### 1. **Performance Optimization**

- Use profiler to identify bottlenecks first
- Don't optimize prematurely
- React Compiler will handle most cases automatically

### 2. **Concurrent Features**

- Use `useTransition` for non-urgent updates
- Use `useDeferredValue` for derived values
- Keep UI responsive during expensive operations

### 3. **State Management**

- Context API for global, infrequently changing data
- Local state for component-specific data
- External libraries (Zustand, Redux) for complex state

### 4. **Error Handling**

- Always wrap app in Error Boundary
- Use multiple boundaries for different sections
- Log errors to monitoring service

### 5. **Custom Hooks**

- Extract reusable logic
- Test custom hooks separately
- Document parameters and return values

---

## 🚀 Next Steps

1. **Install React Compiler** (when stable)
2. **Profile Your App** with React DevTools
3. **Identify Bottlenecks** before optimizing
4. **Write Custom Hooks** for repeated logic
5. **Use Concurrent Features** for better UX
6. **Implement Error Boundaries** for resilience

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Compiler](https://react.dev/learn/react-compiler)
- [React Hooks](https://react.dev/reference/react)
- [Concurrent React](https://react.dev/reference/react/useTransition)
- [Performance Optimization](https://react.dev/learn/render-and-commit)

---

## 🎓 Learning Path

### Beginner

1. Understand basic hooks (useState, useEffect)
2. Learn component composition
3. Practice with small projects

### Intermediate

4. Master useMemo and useCallback
5. Implement Context API
6. Create custom hooks
7. Add Error Boundaries

### Advanced

8. Use concurrent features (useTransition, useDeferredValue)
9. Implement React Compiler
10. Optimize large applications
11. Advanced patterns (compound components, render props)

---

**Built with ❤️ using React 18+ Advanced Features**
