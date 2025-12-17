# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development
```bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server (Vite with HMR)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Lint code
pnpm run lint
```

### Package Manager
This project uses **pnpm** as the package manager. Do not use npm or yarn.

## Architecture Overview

### Purpose
This is a comprehensive **React 19 learning project** that demonstrates advanced React features, patterns, and optimization techniques. It's designed as an educational showcase, not a production application.

### Tech Stack
- **React 19.2.0** with TypeScript
- **Vite** (using rolldown-vite@7.2.5) for fast builds
- **React Compiler** support (currently commented out in vite.config.ts)
- **ESLint** with React Hooks and TypeScript rules
- No external UI libraries - all styled with inline styles using a custom design system

### Key Architectural Patterns

#### 1. Component Organization by Feature Type
Components are organized by the React feature they demonstrate:
- **Performance**: `DemoComponents.tsx`, `MemoizationExamples.tsx`, `ProductCard.tsx`
- **Concurrent Features**: `ConcurrentFeatures.tsx`
- **Code Splitting**: `LazyLoadExample.tsx`, `HeavyComponent.tsx`, `ChartComponent.tsx`
- **Advanced Patterns**: `HOCExample.tsx`, `RenderPropsExample.tsx`, `CompoundComponentsExample.tsx`, `PortalExample.tsx`
- **React 19**: `React19Features.tsx`
- **Error Handling**: `ErrorBoundary.tsx`

#### 2. Context-Based Theme Management
The app uses Context API for theme management:
- `context/theme-context.ts` - Theme context definition
- `context/ThemeProvider.tsx` - Provider component
- `hooks/useTheme.ts` - Custom hook for consuming theme
- No prop drilling for theme state

#### 3. Custom Design System
`theme/design-system.ts` exports:
- Color palettes (primary, secondary, neutral, accent colors)
- Spacing scales
- Border radius values
- Box shadows
- Gradients

All components use this centralized design system instead of scattered style definitions.

#### 4. Custom Hooks Library
`hooks/customHooks.ts` contains reusable hooks:
- `useFetch<T>` - Data fetching with loading/error states
- `useDebounce<T>` - Debounce values for performance
- `useLocalStorage<T>` - Persist state to localStorage
- `useToggle` - Boolean state management
- `useWindowSize` - Responsive window dimensions

#### 5. Demo-Driven Structure
The main App (`App.tsx`) is a showcase that:
- Toggles different feature demonstrations on/off
- Uses conditional rendering to lazy load expensive examples
- Displays a comprehensive feature index at the top
- Shows statistics and covered topics

### Code Organization Principles

#### Performance Optimization Approach
The codebase demonstrates manual optimization techniques that will become automatic when React Compiler is enabled:
- `useMemo` for expensive calculations (filtering, sorting)
- `useCallback` for event handlers passed to memoized children
- `React.memo` for pure components (ProductCard)
- `useTransition` for non-blocking UI updates
- `useDeferredValue` for deferred rendering

#### TypeScript Usage
- `types/index.ts` contains shared type definitions
- Components use explicit prop types
- Custom hooks use generics for type safety
- Error boundaries use class components (required by React)

#### Lazy Loading Strategy
Heavy components are dynamically imported:
```typescript
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));
const ChartComponent = lazy(() => import('./components/ChartComponent'));
```
Wrapped in Suspense boundaries with loading fallbacks.

## Important Development Notes

### React Compiler
The React Compiler plugin is **installed but commented out** in `vite.config.ts`. To enable:
```typescript
react({
  babel: {
    plugins: [["babel-plugin-react-compiler"]],
  },
})
```
When enabled, it will auto-optimize useMemo/useCallback usage.

### Error Boundary Requirement
All features are wrapped in `<ErrorBoundary>` at the app level. Error boundaries must be class components in React.

### No Testing Framework
This project has no test runner configured. It's a learning/demonstration project, not production code.

### Design System Convention
When adding new components:
- Import design tokens from `theme/design-system.ts`
- Use inline styles with design system values
- Follow the established color, spacing, and shadow patterns
- Add hover effects using `onMouseEnter`/`onMouseLeave` handlers

### State Management Philosophy
- **Local state** (`useState`) for component-specific data
- **Context API** for theme and truly global state
- **Custom hooks** for reusable stateful logic
- No external state management libraries (Redux, Zustand, etc.)

## File Structure Patterns

### Component Files
Components typically include:
- Type definitions at the top
- Main component function with hooks
- Inline styles using design system
- JSX with detailed demonstrations
- Console logging for educational purposes (showing when renders/calculations occur)

### Context Pattern
```
context/
  theme-context.ts      # Context creation
  ThemeProvider.tsx     # Provider component
```

### Hook Pattern
```
hooks/
  customHooks.ts        # Collection of reusable hooks
  useTheme.ts          # Theme-specific hook
```

## Documentation Files

Three comprehensive markdown files explain the features:
- `REACT_ADVANCED_FEATURES.md` - Complete technical guide (500+ lines)
- `PRESENTATION_SLIDES.md` - 40-slide presentation format
- `PROJECT_SUMMARY.md` - Quick reference and overview

These files are reference material for understanding what each feature demonstrates.

## Common Patterns in This Codebase

### 1. Memoization Pattern (DemoComponents.tsx)
Demonstrates the holy trinity of React optimization:
```typescript
// Memoize expensive calculations
const sortedProducts = useMemo(() => sortFunction(data), [data]);

// Memoize callbacks
const handleClick = useCallback(() => doSomething(), []);

// Memoize components
const ProductCard = memo(({ name, price }) => <div>...</div>);
```

### 2. Transition Pattern (for smooth UI)
```typescript
const [isPending, startTransition] = useTransition();
const handleChange = (value: string) => {
  startTransition(() => {
    setExpensiveState(value);
  });
};
```

### 3. Deferred Value Pattern (for search/filter)
```typescript
const deferredQuery = useDeferredValue(searchQuery);
const results = useMemo(() => search(data, deferredQuery), [data, deferredQuery]);
```

### 4. Custom Hook Pattern
All custom hooks:
- Start with "use" prefix
- Return either a value, tuple, or object
- Handle their own side effects with useEffect
- Include proper cleanup functions

### 5. Higher-Order Component Pattern (Legacy)
HOCs in this codebase follow the pattern:
```typescript
const withFeature = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    // Add logic
    return <Component {...props} />;
  };
};
```

## Working with This Codebase

### To Add a New Feature Demo
1. Create component in `src/components/`
2. Import design system tokens
3. Add feature explanation with console logs
4. Import into `App.tsx`
5. Add to the feature index section
6. Consider adding toggle button if feature is expensive

### To Modify Styling
- Edit `theme/design-system.ts` for global changes
- Component styles are inline, not CSS files
- Follow existing color/spacing patterns

### To Add a New Hook
- Add to `hooks/customHooks.ts`
- Follow TypeScript generic patterns for reusability
- Include JSDoc comments explaining usage
- Demonstrate usage in a component

## Build Output
Expected production build structure:
```
dist/
  index.html                    # Entry HTML
  assets/
    index.css                   # Main styles (~1.5 KB)
    index.js                    # Main bundle (~230 KB)
    HeavyComponent.js           # Lazy chunk (~1.5 KB)
    ChartComponent.js           # Lazy chunk (~1.9 KB)
```

Code splitting successfully separates lazy-loaded components into their own bundles.
