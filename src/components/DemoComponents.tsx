import { useState, useMemo, useCallback, useTransition, useDeferredValue } from "react";
import ProductCard from "./ProductCard";
import { expensiveFunction, filterProducts, sortProducts } from "../constants";
import { useTheme } from "../hooks/useTheme";
import { useDebounce } from "../hooks/customHooks";
import type { Product } from "../types";
import { colors, shadows, borderRadius, gradients, spacing } from "../theme/design-system";

const dummyProducts: Product[] = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        description: "High-quality wireless headphones with noise cancellation",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        category: "Electronics",
        rating: 4.5
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        description: "Feature-rich smartwatch with fitness tracking",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        category: "Electronics",
        rating: 4.7
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 89.99,
        description: "Comfortable running shoes for all terrains",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        category: "Sports",
        rating: 4.3
    },
    {
        id: 4,
        name: "Coffee Maker",
        price: 129.99,
        description: "Programmable coffee maker with thermal carafe",
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
        category: "Home",
        rating: 4.6
    },
    {
        id: 5,
        name: "Backpack",
        price: 49.99,
        description: "Durable backpack with laptop compartment",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
        category: "Accessories",
        rating: 4.4
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 59.99,
        description: "Portable waterproof Bluetooth speaker",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
        category: "Electronics",
        rating: 4.8
    }
];

const DemoComponents = () => {
    const [products] = useState<Product[]>(dummyProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [isPending, startTransition] = useTransition();
    const { theme, toggleTheme } = useTheme();

    // Example 1: useMemo - Expensive calculation cached until dependencies change
    // Without React Compiler: Need useMemo to prevent recalculation on every render
    // With React Compiler: Automatic optimization, no need for useMemo!
    const expensiveResult = useMemo(() => {
        return expensiveFunction();
    }, []);

    // Example 2: useDebounce - Custom hook for debouncing search
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Example 3: useDeferredValue - Keeps UI responsive during expensive operations
    const deferredSearchTerm = useDeferredValue(searchTerm);

    // Example 4: useMemo - Filter products based on search term
    // Only recalculates when products or deferredSearchTerm changes
    const filteredProducts = useMemo(() => {
        if (!deferredSearchTerm) return products;
        return filterProducts(products, deferredSearchTerm);
    }, [products, deferredSearchTerm]);

    // Example 5: useMemo - Sort products based on selected option
    const sortedProducts = useMemo(() => {
        return sortProducts(filteredProducts, sortBy);
    }, [filteredProducts, sortBy]);

    // Example 6: useCallback - Memoized callback function
    // Prevents child re-renders when passed as prop
    // Without React Compiler: Need useCallback
    // With React Compiler: Automatic optimization!
    const handleSortChange = useCallback((newSortBy: string) => {
        // useTransition: Makes state updates non-blocking
        // UI stays responsive during expensive operations
        startTransition(() => {
            setSortBy(newSortBy);
        });
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setSearchTerm(e.target.value);
        });
    }, []);

    // Theme-based styling
    const containerStyle = {
        padding: spacing.lg,
        backgroundColor: colors.background.dark,
        minHeight: '100vh',
        color: colors.text.white,
        transition: 'all 0.3s ease'
    };

    return (
        <div style={containerStyle}>
            {/* Header with theme toggle */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.lg,
                flexWrap: 'wrap',
                gap: spacing.sm
            }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: '800',
                    margin: 0,
                    background: gradients.primary,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Our Products - {expensiveResult.toLocaleString()}
                </h1>
                <button
                    onClick={toggleTheme}
                    style={{
                        padding: '12px 24px',
                        borderRadius: borderRadius.full,
                        border: 'none',
                        background: gradients.success,
                        color: colors.text.white,
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '700',
                        boxShadow: shadows.md,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'} Mode
                </button>
            </div>

            {/* Feature Explanation Banner */}
            <div style={{
                background: colors.background.darkGray,
                padding: spacing.lg,
                borderRadius: borderRadius.xl,
                marginBottom: spacing.lg,
                border: `1px solid ${colors.primary[700]}`,
                boxShadow: shadows.lg
            }}>
                <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: theme === 'dark' ? colors.text.white : colors.primary[700]
                }}>
                    🚀 React Advanced Features Demo
                </h3>

                {/* useMemo */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    marginBottom: spacing.md,
                    border: `1px solid ${colors.primary[400]}`
                }}>
                    <h4 style={{
                        margin: '0 0 8px 0',
                        color: colors.primary[600],
                        fontSize: '18px',
                        fontWeight: '700'
                    }}>
                        💾 useMemo - Expensive Calculation Caching
                    </h4>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>What:</strong> Memoizes (caches) the result of expensive calculations
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>Why:</strong> Prevents recalculation on every render, only recomputes when dependencies change
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>In this demo:</strong> Used for filtering & sorting products (see console logs!)
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '8px 0 0 0',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                    }}>
                        {`const filtered = useMemo(() => 
  filterProducts(products, search)
, [products, search]); // Only recalculates when these change`}
                    </pre>
                </div>

                {/* useCallback */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    marginBottom: spacing.md,
                    border: `1px solid ${colors.secondary[500]}`
                }}>
                    <h4 style={{
                        margin: '0 0 8px 0',
                        color: colors.secondary[600],
                        fontSize: '18px',
                        fontWeight: '700'
                    }}>
                        🔄 useCallback - Function Reference Stability
                    </h4>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>What:</strong> Returns a memoized version of a callback function
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>Why:</strong> Prevents child components from re-rendering unnecessarily
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>In this demo:</strong> Event handlers (search, sort) maintain same reference
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '8px 0 0 0',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                    }}>
                        {`const handleSort = useCallback((sort) => {
  setSortBy(sort);
}, []); // Function reference stays stable`}
                    </pre>
                </div>

                {/* React.memo */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    marginBottom: spacing.md,
                    border: `1px solid ${colors.accent.teal}`
                }}>
                    <h4 style={{
                        margin: '0 0 8px 0',
                        color: colors.accent.teal,
                        fontSize: '18px',
                        fontWeight: '700'
                    }}>
                        🛡️ React.memo - Component Memoization
                    </h4>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>What:</strong> Higher-order component that memoizes component rendering
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>Why:</strong> Component only re-renders when props actually change
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>In this demo:</strong> ProductCard wrapped with memo() - check console logs!
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '8px 0 0 0',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                    }}>
                        {`const ProductCard = memo(({ name, price }) => {
  console.log('Rendering:', name);
  return <div>...</div>;
});`}
                    </pre>
                </div>

                {/* useTransition */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    marginBottom: spacing.md,
                    border: `1px solid ${colors.warning}`
                }}>
                    <h4 style={{
                        margin: '0 0 8px 0',
                        color: colors.warning,
                        fontSize: '18px',
                        fontWeight: '700'
                    }}>
                        ⚡ useTransition - Non-Blocking Updates
                    </h4>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>What:</strong> Marks state updates as non-urgent (transitions)
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>Why:</strong> Keeps UI responsive during expensive operations
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>In this demo:</strong> Search/sort updates don't block typing - try it!
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '8px 0 0 0',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                    }}>
                        {`const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearch(value); // Non-blocking!
}); // UI stays responsive`}
                    </pre>
                </div>

                {/* useDeferredValue */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    marginBottom: spacing.md,
                    border: `1px solid ${colors.info}`
                }}>
                    <h4 style={{
                        margin: '0 0 8px 0',
                        color: colors.info,
                        fontSize: '18px',
                        fontWeight: '700'
                    }}>
                        ⏳ useDeferredValue - Deferred Updates
                    </h4>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>What:</strong> Returns a deferred version of a value
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>Why:</strong> Allows UI to update immediately while deferring expensive operations
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>In this demo:</strong> Search results update after input stops changing
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '8px 0 0 0',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                    }}>
                        {`const deferredSearch = useDeferredValue(search);

const results = useMemo(() => 
  filter(products, deferredSearch)
, [products, deferredSearch]);`}
                    </pre>
                </div>

                {/* Context API */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    marginBottom: spacing.md,
                    border: `1px solid ${colors.accent.purple}`
                }}>
                    <h4 style={{
                        margin: '0 0 8px 0',
                        color: colors.accent.purple,
                        fontSize: '18px',
                        fontWeight: '700'
                    }}>
                        🌐 Context API - Global State
                    </h4>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>What:</strong> Share data across component tree without prop drilling
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>Why:</strong> Avoid passing props through many intermediate components
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>In this demo:</strong> Theme (dark/light) shared globally - click toggle above!
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '8px 0 0 0',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                    }}>
                        {`const { theme, toggleTheme } = useTheme();

// Accessible from any component!
<button onClick={toggleTheme}>Toggle</button>`}
                    </pre>
                </div>

                {/* Custom Hooks */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    marginBottom: spacing.md,
                    border: `1px solid ${colors.success}`
                }}>
                    <h4 style={{
                        margin: '0 0 8px 0',
                        color: colors.success,
                        fontSize: '18px',
                        fontWeight: '700'
                    }}>
                        🎣 Custom Hooks - Reusable Logic
                    </h4>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>What:</strong> Extract component logic into reusable functions
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>Why:</strong> Share logic between components without render props or HOCs
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>In this demo:</strong> useDebounce delays search updates (300ms delay)
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '8px 0 0 0',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                    }}>
                        {`const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => 
      setDebounced(value), delay
    );
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};`}
                    </pre>
                </div>

                {/* React Compiler */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    border: `1px solid ${colors.accent.orange}`
                }}>
                    <h4 style={{
                        margin: '0 0 8px 0',
                        color: colors.accent.orange,
                        fontSize: '18px',
                        fontWeight: '700'
                    }}>
                        🔮 React Compiler - Auto-Optimization (React 19 ✓)
                    </h4>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>What:</strong> Build-time tool that automatically optimizes React code
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>Why:</strong> No more manual useMemo/useCallback - compiler does it!
                    </p>
                    <p style={{
                        color: colors.text.primary,
                        margin: '0 0 8px 0',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        <strong>Status:</strong> ✅ Enabled in this project! React 19 stable (Dec 2024)
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '8px 0 0 0',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                    }}>
                        {`// React 19 Compiler (ENABLED ✓):
const filtered = filter(data); // ✨ Auto-optimized!

// Before (manual optimization):
const filtered = useMemo(() => 
  filter(data), [data]
);`}
                    </pre>
                </div>
            </div>

            {/* Controls */}
            <div style={{
                display: 'flex',
                gap: spacing.md,
                marginBottom: spacing.xl,
                flexWrap: 'wrap'
            }}>
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{
                        flex: 1,
                        minWidth: '250px',
                        padding: '14px 20px',
                        fontSize: '16px',
                        borderRadius: borderRadius.lg,
                        border: `1px solid ${colors.primary[700]}`,
                        backgroundColor: colors.background.darkGray,
                        color: colors.text.white,
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: shadows.sm
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = colors.primary[500];
                        e.currentTarget.style.boxShadow = shadows.md;
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = colors.primary[700];
                        e.currentTarget.style.boxShadow = shadows.sm;
                    }}
                />

                {/* Sort Dropdown */}
                <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    style={{
                        padding: '14px 20px',
                        fontSize: '16px',
                        borderRadius: borderRadius.lg,
                        border: `1px solid ${colors.secondary[700]}`,
                        backgroundColor: colors.background.darkGray,
                        color: colors.text.white,
                        cursor: 'pointer',
                        outline: 'none',
                        fontWeight: '600',
                        boxShadow: shadows.sm,
                        minWidth: '200px'
                    }}
                >
                    <option value="default">📋 Sort by: Default</option>
                    <option value="price-asc">💰 Price: Low to High</option>
                    <option value="price-desc">💎 Price: High to Low</option>
                    <option value="rating">⭐ Rating: High to Low</option>
                </select>
            </div>

            {/* Loading indicator for transition */}
            {isPending && (
                <div style={{
                    padding: '16px 24px',
                    background: colors.warning + '30',
                    color: colors.accent.yellow,
                    borderRadius: borderRadius.lg,
                    marginBottom: spacing.lg,
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '16px',
                    border: `1px solid ${colors.warning}50`,
                    boxShadow: shadows.md
                }}>
                    ⏳ Updating (useTransition keeps UI responsive)...
                </div>
            )}

            {/* Results Count */}
            <div style={{
                marginBottom: spacing.lg,
                fontSize: '20px',
                fontWeight: '700',
                color: colors.text.white,
                background: colors.background.darkGray,
                padding: spacing.md,
                borderRadius: borderRadius.lg,
                boxShadow: shadows.sm,
                border: `1px solid ${theme === 'dark' ? colors.neutral[700] : colors.neutral[200]}`
            }}>
                Found <span style={{
                    color: theme === 'dark' ? colors.primary[400] : colors.primary[600],
                    fontSize: '24px'
                }}>{sortedProducts.length}</span> products
                {debouncedSearchTerm && <span style={{
                    color: theme === 'dark' ? colors.text.light : colors.text.secondary
                }}> for "{debouncedSearchTerm}"</span>}
            </div>

            {/* Products Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: spacing.lg,
                marginBottom: spacing.xl
            }}>
                {sortedProducts.map((product: Product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        image={product.image}
                        category={product.category}
                        rating={product.rating}
                    />
                ))}
            </div>

            {/* No results message */}
            {sortedProducts.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: spacing.xl,
                    fontSize: '18px',
                    color: colors.text.light,
                    background: colors.background.darkGray,
                    borderRadius: borderRadius.xl,
                    border: `1px dashed ${colors.neutral[700]}`,
                    marginTop: spacing.lg
                }}>
                    <div style={{ fontSize: '48px', marginBottom: spacing.sm }}>🔍</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: spacing.xs }}>
                        No products found
                    </div>
                    <div>Try a different search term.</div>
                </div>
            )}
        </div>
    );
};

export default DemoComponents;
