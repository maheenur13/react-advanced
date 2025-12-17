# 🎓 React Advanced Features

## PowerPoint-Style Presentation Guide

---

## 📑 Slide 1: Title Slide

# React Advanced Features

## Mastering Modern React Development

**Topics Covered:**

- React Compiler
- Performance Optimization
- Concurrent Features
- Advanced Patterns

**Date:** December 2025

---

## 📑 Slide 2: Course Overview

### What You'll Learn

| Module                 | Topics                           | Duration |
| ---------------------- | -------------------------------- | -------- |
| 1️⃣ React Compiler      | Auto-optimization, Installation  | 15 min   |
| 2️⃣ Performance Hooks   | useMemo, useCallback, React.memo | 20 min   |
| 3️⃣ Concurrent Features | useTransition, useDeferredValue  | 20 min   |
| 4️⃣ Context API         | Global state, Custom hooks       | 15 min   |
| 5️⃣ Error Boundaries    | Error handling, Fallback UI      | 10 min   |
| 6️⃣ Custom Hooks        | Building reusable logic          | 20 min   |
| 7️⃣ Best Practices      | Patterns, Optimization tips      | 15 min   |

**Total Time:** ~2 hours

---

## 📑 Slide 3: Prerequisites

### Before Starting

✅ **Required Knowledge:**

- React Basics (Components, Props, State)
- JavaScript ES6+ (Arrow functions, Destructuring)
- TypeScript Fundamentals
- React Hooks (useState, useEffect)

✅ **Tools Needed:**

- Node.js (v18+)
- npm/pnpm/yarn
- Code Editor (VS Code recommended)
- React DevTools Browser Extension

---

## 📑 Slide 4: Module 1 - React Compiler

### 🚀 The Future of React Optimization

**What is React Compiler?**

- Build-time optimization tool
- Automatically optimizes your React code
- Eliminates manual memoization
- Part of React 19+

**Key Benefits:**

```
Before (Manual):        After (Compiler):
━━━━━━━━━━━━━━━        ━━━━━━━━━━━━━━━
useMemo(() => ...)      const result = ...
useCallback(() => ...)  const handler = ...
React.memo(Component)   const Component = ...
```

---

## 📑 Slide 5: React Compiler Installation

### 📦 Setup Steps

**1. Install Package:**

```bash
npm install -D babel-plugin-react-compiler@latest
```

**2. Configure Vite:**

```javascript
// vite.config.ts
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

**3. Enable in tsconfig:**

```json
{
  "compilerOptions": {
    "target": "ES2020"
  }
}
```

---

## 📑 Slide 6: React Compiler in Action

### Before & After Comparison

**❌ Without Compiler (Old Way):**

```typescript
function ProductList({ products }) {
  // Manual memoization everywhere!
  const sorted = useMemo(
    () => products.sort((a, b) => a.price - b.price),
    [products]
  );

  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <div>...</div>;
}

export default React.memo(ProductList);
```

**✅ With Compiler (New Way):**

```typescript
function ProductList({ products }) {
  // Compiler optimizes automatically!
  const sorted = products.sort((a, b) => a.price - b.price);
  const handleClick = () => console.log("clicked");
  return <div>...</div>;
}

export default ProductList; // No memo needed!
```

---

## 📑 Slide 7: Module 2 - Performance Hooks

### 🎯 Optimization Toolkit

| Hook          | Purpose                   | When to Use                     |
| ------------- | ------------------------- | ------------------------------- |
| `useMemo`     | Cache calculated values   | Expensive computations          |
| `useCallback` | Cache function references | Callbacks to memoized children  |
| `React.memo`  | Cache component renders   | Pure components with same props |

**Performance Impact:**

```
Without optimization: 1000ms render time
With useMemo:         50ms render time
With React Compiler:  30ms render time + cleaner code!
```

---

## 📑 Slide 8: useMemo Deep Dive

### 💾 Memoize Expensive Calculations

**Syntax:**

```typescript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);
```

**Real Example:**

```typescript
const DemoComponent = ({ products, searchTerm }) => {
  // ❌ BAD: Filters on every render
  const filtered = products.filter((p) => p.name.includes(searchTerm));

  // ✅ GOOD: Only filters when dependencies change
  const filtered = useMemo(
    () => products.filter((p) => p.name.includes(searchTerm)),
    [products, searchTerm]
  );

  return <ProductList items={filtered} />;
};
```

---

## 📑 Slide 9: useCallback Deep Dive

### 🔄 Stabilize Function References

**Why it matters:**

```typescript
function Parent() {
  // ❌ New function on every render!
  const handleClick = () => console.log("click");

  // Child re-renders unnecessarily
  return <MemoizedChild onClick={handleClick} />;
}
```

**Solution:**

```typescript
function Parent() {
  // ✅ Same function reference across renders
  const handleClick = useCallback(() => {
    console.log("click");
  }, []);

  // Child only re-renders when needed
  return <MemoizedChild onClick={handleClick} />;
}
```

---

## 📑 Slide 10: React.memo

### 🛡️ Component-Level Optimization

**Basic Usage:**

```typescript
const ProductCard = memo(({ name, price }: Props) => {
  console.log("Rendering:", name);
  return (
    <div>
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
});
```

**Custom Comparison:**

```typescript
const ProductCard = memo(
  ({ product }: Props) => <div>...</div>,
  (prevProps, nextProps) => {
    // Return true if props are equal (skip render)
    return prevProps.product.id === nextProps.product.id;
  }
);
```

---

## 📑 Slide 11: Module 3 - Concurrent Features

### ⚡ Keep UI Responsive

**Two Main APIs:**

**1. useTransition** - Mark updates as non-urgent

```typescript
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchTerm(value); // Non-blocking!
});
```

**2. useDeferredValue** - Defer expensive updates

```typescript
const deferredQuery = useDeferredValue(searchQuery);
const results = searchProducts(deferredQuery);
```

---

## 📑 Slide 12: useTransition in Action

### 🚦 Non-Blocking State Updates

**Problem:** Search input lags during typing

```typescript
// ❌ Blocking: UI freezes during expensive search
const handleChange = (e) => {
  setSearchTerm(e.target.value); // Blocks UI!
  // Expensive filtering happens synchronously
};
```

**Solution:** Use transition

```typescript
// ✅ Non-blocking: UI stays responsive
const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  const value = e.target.value;
  setInputValue(value); // Updates immediately

  startTransition(() => {
    setSearchTerm(value); // Deferred, non-blocking
  });
};

// Show loading state
{
  isPending && <Spinner />;
}
```

---

## 📑 Slide 13: useDeferredValue

### ⏳ Defer Less Important Updates

**Use Case:** Search results that update while typing

```typescript
function SearchResults({ query }) {
  // Defer the expensive filtering
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => expensiveSearch(deferredQuery),
    [deferredQuery]
  );

  // Show stale indicator
  const isStale = query !== deferredQuery;

  return (
    <div className={isStale ? "opacity-50" : ""}>
      {results.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}
```

---

## 📑 Slide 14: Module 4 - Context API

### 🌐 Global State Management

**Architecture:**

```
ThemeContext
    ↓
ThemeProvider
    ↓
    ├── Component A (useTheme)
    ├── Component B (useTheme)
    └── Component C
            ↓
        Component D (useTheme)
```

**No Prop Drilling! 🎉**

---

## 📑 Slide 15: Context Implementation

### 📝 Step-by-Step

**1. Create Context:**

```typescript
const ThemeContext = createContext<ThemeType | undefined>(undefined);
```

**2. Create Provider:**

```typescript
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

**3. Create Custom Hook:**

```typescript
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Must use within ThemeProvider");
  return context;
};
```

---

## 📑 Slide 16: Context Best Practices

### ✅ Do's and ❌ Don'ts

**✅ DO:**

- Split contexts by concern (Auth, Theme, Settings)
- Create custom hooks for consuming context
- Use Context for global, infrequently changing data
- Memoize context values

**❌ DON'T:**

- Put frequently changing values in context
- Create one giant context for everything
- Forget to memoize expensive context values
- Use Context when props would work

---

## 📑 Slide 17: Module 5 - Error Boundaries

### 🛡️ Graceful Error Handling

**What They Catch:**

- ✅ Rendering errors
- ✅ Lifecycle method errors
- ✅ Constructor errors in child tree

**What They Don't Catch:**

- ❌ Event handlers (use try-catch)
- ❌ Async code (use try-catch)
- ❌ Server-side rendering errors
- ❌ Errors in the boundary itself

---

## 📑 Slide 18: Error Boundary Implementation

### 📝 Class Component Pattern

```typescript
class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to error reporting service
    logErrorToService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

**Usage:**

```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## 📑 Slide 19: Module 6 - Custom Hooks

### 🎣 Extract Reusable Logic

**Popular Custom Hooks:**

| Hook              | Purpose           | Use Case         |
| ----------------- | ----------------- | ---------------- |
| `useFetch`        | Data fetching     | API calls        |
| `useDebounce`     | Delay updates     | Search inputs    |
| `useLocalStorage` | Persist data      | User preferences |
| `useToggle`       | Boolean state     | Modals, menus    |
| `useWindowSize`   | Screen dimensions | Responsive UI    |

---

## 📑 Slide 20: Custom Hook Examples

### 1️⃣ useFetch

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

// Usage
const { data, loading, error } = useFetch<User>("/api/user");
```

---

## 📑 Slide 21: Custom Hook Examples

### 2️⃣ useDebounce

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

// Usage
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 500);

// Only searches 500ms after user stops typing!
useEffect(() => {
  searchAPI(debouncedSearch);
}, [debouncedSearch]);
```

---

## 📑 Slide 22: Custom Hook Rules

### 📏 Rules of Hooks

**✅ Must Follow:**

1. Only call at top level (no loops/conditions)
2. Only call from React functions
3. Start name with "use"
4. Can call other hooks

**✅ Best Practices:**

- Single responsibility
- Clear naming
- Type-safe with TypeScript
- Return stable references
- Document parameters

**❌ Common Mistakes:**

- Calling hooks conditionally
- Using in regular functions
- Not following naming convention

---

## 📑 Slide 23: Module 7 - Best Practices

### 🎯 Optimization Strategy

**1. Measure First**

```
Don't optimize prematurely!
↓
Use React DevTools Profiler
↓
Identify actual bottlenecks
↓
Apply targeted optimizations
```

**2. Choose Right Tool**

- Small app → Keep it simple
- Medium app → useMemo/useCallback strategically
- Large app → React Compiler + external state management

---

## 📑 Slide 24: Performance Checklist

### ✅ Optimization Checklist

**Code Level:**

- [ ] Use React.memo for pure components
- [ ] Apply useMemo to expensive calculations
- [ ] Use useCallback for callbacks to memoized children
- [ ] Implement code splitting (React.lazy)
- [ ] Use React Compiler when available

**Architecture Level:**

- [ ] Split large components
- [ ] Lazy load routes and components
- [ ] Optimize Context (avoid unnecessary re-renders)
- [ ] Use proper key props in lists
- [ ] Implement virtualization for long lists

---

## 📑 Slide 25: Common Pitfalls

### ⚠️ Mistakes to Avoid

**1. Over-Optimization**

```typescript
// ❌ Unnecessary for static data
const items = useMemo(() => [1, 2, 3], []);
```

**2. Wrong Dependencies**

```typescript
// ❌ Missing dependency
useMemo(() => data.filter((item) => item.active), []);
```

**3. Creating Objects in Dependencies**

```typescript
// ❌ New object every render
useEffect(() => {...}, [{ userId: 1 }]);
```

**4. Forgetting Keys**

```typescript
// ❌ Index as key is anti-pattern
{
  items.map((item, i) => <Item key={i} />);
}
```

---

## 📑 Slide 26: Real-World Example

### 🏪 E-commerce Product List

**Features Demonstrated:**

```typescript
function ProductList() {
  // State management
  const [products] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  // Performance optimization
  const debouncedSearch = useDebounce(search, 300);
  const deferredSearch = useDeferredValue(debouncedSearch);

  // Memoized operations
  const filtered = useMemo(() =>
    filterProducts(products, deferredSearch)
  , [products, deferredSearch]);

  const sorted = useMemo(() =>
    sortProducts(filtered, sort)
  , [filtered, sort]);

  // Concurrent features
  const [isPending, startTransition] = useTransition();

  return (/* UI */);
}
```

---

## 📑 Slide 27: Project Structure

### 📁 Recommended Organization

```
src/
├── components/
│   ├── ProductCard.tsx        (React.memo)
│   ├── ErrorBoundary.tsx      (Error handling)
│   └── DemoComponents.tsx     (Main demo)
├── context/
│   └── ThemeContext.tsx       (Context API)
├── hooks/
│   └── customHooks.ts         (Reusable hooks)
├── constants/
│   └── index.ts               (Helper functions)
└── App.tsx                    (Root with providers)
```

---

## 📑 Slide 28: Testing Strategies

### 🧪 Testing Advanced Features

**Custom Hooks:**

```typescript
import { renderHook } from "@testing-library/react";

test("useDebounce delays updates", () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 500),
    { initialProps: { value: "initial" } }
  );

  expect(result.current).toBe("initial");

  rerender({ value: "updated" });
  expect(result.current).toBe("initial"); // Still old

  await waitFor(
    () => {
      expect(result.current).toBe("updated");
    },
    { timeout: 600 }
  );
});
```

---

## 📑 Slide 29: Debugging Tips

### 🐛 Common Issues & Solutions

**Issue 1: Infinite Re-renders**

```typescript
// ❌ Problem
useEffect(() => {
  setData([...data, newItem]);
}, [data]); // Creates infinite loop!

// ✅ Solution
useEffect(() => {
  setData((prev) => [...prev, newItem]);
}, []); // Functional update
```

**Issue 2: Stale Closures**

```typescript
// ❌ Problem
const handleClick = useCallback(() => {
  console.log(count); // Stale value!
}, []); // Missing dependency

// ✅ Solution
const handleClick = useCallback(() => {
  console.log(count); // Fresh value!
}, [count]); // Include dependency
```

---

## 📑 Slide 30: Tools & Resources

### 🛠️ Essential Tools

**Development:**

- React DevTools (Browser extension)
- TypeScript
- ESLint with React plugins
- Vite or Next.js

**Performance:**

- React Profiler
- Chrome DevTools Performance tab
- Lighthouse
- Web Vitals

**Learning:**

- [react.dev](https://react.dev) - Official docs
- React Beta docs - Advanced patterns
- GitHub repositories - Real examples

---

## 📑 Slide 31: React Compiler Status

### 📅 Timeline & Availability

**Current Status (Dec 2024):**

- ✅ Beta release available
- ✅ Used in production at Meta
- ⚠️ Experimental for public use

**Future (2025):**

- 🎯 Stable release with React 19
- 🎯 Officially recommended
- 🎯 Automatic in Create React App

**Action Items:**

1. Learn manual optimization now
2. Prepare codebase for compiler
3. Test beta in non-production
4. Plan migration strategy

---

## 📑 Slide 32: Migration Path

### 🔄 From Old to New

**Phase 1: Foundation (Now)**

- Clean up unnecessary optimizations
- Fix ESLint warnings
- Update to React 18+
- Add TypeScript if needed

**Phase 2: Manual Optimization (Current)**

- Add useMemo/useCallback strategically
- Implement React.memo where beneficial
- Use concurrent features
- Create custom hooks

**Phase 3: Compiler (Future)**

- Install React Compiler
- Remove manual optimizations gradually
- Test performance
- Monitor bundle size

---

## 📑 Slide 33: Code Quality Metrics

### 📊 Measuring Success

**Performance Metrics:**

- Time to Interactive (TTI) < 3s
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1

**Code Quality:**

- Component re-render count
- Bundle size
- Code duplication
- Test coverage > 80%

**Use React DevTools Profiler to track!**

---

## 📑 Slide 34: Interview Questions

### 💼 Common Questions

**Q1:** When would you use useMemo vs useCallback?
**A:** useMemo for values, useCallback for functions

**Q2:** What's the difference between useTransition and useDeferredValue?
**A:** useTransition for your own updates, useDeferredValue for values from props

**Q3:** Why can't we use hooks in conditions?
**A:** React relies on call order to track hook state

**Q4:** What does React Compiler do?
**A:** Automatically adds optimization (memo/cache) at build time

**Q5:** When should you NOT use Context?
**A:** For frequently changing values (causes many re-renders)

---

## 📑 Slide 35: Hands-On Exercise

### 💻 Practice Project

**Build a Product Dashboard:**

**Requirements:**

1. Search functionality (use useDebounce)
2. Sort/filter products (use useMemo)
3. Theme toggle (use Context)
4. Smooth UI (use useTransition)
5. Error handling (Error Boundary)

**Bonus:**

- Add pagination
- Implement favorites (useLocalStorage)
- Responsive design (useWindowSize)
- Loading states

**Time:** 60 minutes

---

## 📑 Slide 36: Solution Walkthrough

### ✅ Key Implementation Points

```typescript
// 1. Context setup
<ThemeProvider>
  <ErrorBoundary>
    <ProductDashboard />
  </ErrorBoundary>
</ThemeProvider>;

// 2. Performance optimization
const filtered = useMemo(
  () => filterProducts(products, deferredSearch),
  [products, deferredSearch]
);

// 3. Smooth interactions
const [isPending, startTransition] = useTransition();
const handleSort = useCallback((sort) => {
  startTransition(() => setSortBy(sort));
}, []);

// 4. Custom hooks
const debouncedSearch = useDebounce(search, 300);
const { width } = useWindowSize();
```

---

## 📑 Slide 37: Advanced Patterns

### 🎨 Bonus Topics

**1. Compound Components**

```typescript
<Tabs>
  <TabList>
    <Tab>First</Tab>
    <Tab>Second</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

**2. Render Props**

```typescript
<DataProvider render={(data) => <Display data={data} />} />
```

**3. Higher-Order Components (HOC)**

```typescript
const EnhancedComponent = withAuth(Component);
```

---

## 📑 Slide 38: State Management Comparison

### 🔄 When to Use What?

| Solution       | Use When                  | Complexity |
| -------------- | ------------------------- | ---------- |
| useState       | Local component state     | ⭐         |
| Context        | Global infrequent updates | ⭐⭐       |
| Zustand        | Medium apps               | ⭐⭐⭐     |
| Redux          | Large apps, time travel   | ⭐⭐⭐⭐   |
| Jotai/Recoil   | Atomic state updates      | ⭐⭐⭐     |
| Tanstack Query | Server state              | ⭐⭐⭐     |

**Recommendation:** Start simple, scale as needed

---

## 📑 Slide 39: Summary

### 📝 Key Takeaways

**✅ Performance:**

- Use React Compiler for automatic optimization (when available)
- Apply useMemo/useCallback strategically
- Memoize components with React.memo

**✅ User Experience:**

- Use useTransition for smooth interactions
- Implement useDeferredValue for responsive UI
- Always handle errors with Error Boundaries

**✅ Code Quality:**

- Extract logic into custom hooks
- Use Context for global state
- Follow React patterns and conventions

**✅ Future-Ready:**

- Prepare for React Compiler
- Use concurrent features now
- Stay updated with React evolution

---

## 📑 Slide 40: Q&A

# Questions?

### Contact & Resources

**Documentation:**

- 📚 Full Guide: `REACT_ADVANCED_FEATURES.md`
- 💻 Code Examples: `src/components/`
- 🎣 Custom Hooks: `src/hooks/`

**Community:**

- React Discord
- Stack Overflow
- Reddit r/reactjs

**Practice:**

- Build real projects
- Contribute to open source
- Share your learnings

---

**Thank you! 🎉**

**Happy Coding with React! ⚛️**
