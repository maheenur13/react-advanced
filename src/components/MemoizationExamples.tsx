import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { colors, spacing, borderRadius, shadows, gradients } from '../theme/design-system';

// ==========================================
// EXAMPLE 1: useMemo - Expensive Calculations
// ==========================================

// Simulated expensive work to show the concept clearly
const simulateExpensiveWork = (num: number): number => {
    let number = 0;
    for (let index = 0; index < 1000000000; index++) {
        number = number + index;

    }
    return number + num
};

// ❌ WITHOUT useMemo - recalculates on every render
const WithoutUseMemo = () => {
    const [count, setCount] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    const [actionCount, setActionCount] = useState(0);

    // 🔴 Problem: Runs on EVERY render, even when count doesn't change!
    const calculatedValue = simulateExpensiveWork(count);

    const handleCountClick = () => {
        setCount(c => c + 1);
        setActionCount(a => a + 1);
    };

    const handleThemeClick = () => {
        setDarkMode(d => !d);
        setActionCount(a => a + 1);
    };

    return (
        <div style={{
            padding: spacing.md,
            background: darkMode ? colors.neutral[100] : colors.neutral[200],
            borderRadius: borderRadius.lg,
            border: `2px solid ${colors.error}`,
            transition: 'background 0.3s'
        }}>
            <h4 style={{ margin: '0 0 12px 0', color: colors.error }}>
                ❌ Without useMemo
            </h4>
            <p style={{ margin: '0 0 8px 0', color: colors.text.primary, fontSize: '14px' }}>
                Actions taken: <strong>{actionCount}</strong>
            </p>
            <CalculatedValue calculatedValue={calculatedValue} />

            <p style={{ margin: '0 0 12px 0', color: colors.error, fontSize: '14px', fontWeight: '600' }}>
                ⏱️ Calc time: <strong>~200ms</strong> (runs every render!)
            </p>
            <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap' }}>
                <button
                    onClick={handleCountClick}
                    style={{
                        padding: '8px 16px',
                        background: colors.primary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer'
                    }}
                >
                    Count: {count}
                </button>
                <button
                    onClick={handleThemeClick}
                    style={{
                        padding: '8px 16px',
                        background: colors.secondary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer'
                    }}
                >
                    Toggle Theme
                </button>
            </div>
            <p style={{
                margin: '12px 0 0 0',
                color: colors.error,
                fontSize: '12px',
                fontWeight: '600'
            }}>
                ⚠️ Both buttons cause ~200ms delay!
            </p>
        </div>
    );
};

const CalculatedValue = ({ calculatedValue }: { calculatedValue: number }) => {
    // console.log({ calculatedValue });

    return <p style={{ margin: '0 0 8px 0', color: colors.text.primary, fontSize: '14px' }}>
        Calculated value: <strong>{calculatedValue}</strong>
    </p>
}
// ✅ WITH useMemo - only recalculates when dependency changes
const WithUseMemo = () => {
    const [count, setCount] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    const [actionCount, setActionCount] = useState(0);
    const [calcStatus, setCalcStatus] = useState<string>('cached');

    // ✅ Solution: Only runs when `count` changes!
    const calculatedValue = useMemo(() => {
        console.log('🟢 Running memoized calculation...');
        return simulateExpensiveWork(count);
    }, [count]);

    const handleCountClick = () => {
        setCount(c => c + 1);
        setActionCount(a => a + 1);
        setCalcStatus('~200ms (recalculated)');
    };

    // Reset to cached when theme changes (count stays same)
    const handleThemeToggle = () => {
        setDarkMode(d => !d);
        setActionCount(a => a + 1);
        setCalcStatus('0ms (cached!)');
    };

    return (
        <div style={{
            padding: spacing.md,
            background: darkMode ? colors.neutral[100] : colors.neutral[200],
            borderRadius: borderRadius.lg,
            border: `2px solid ${colors.success}`,
            transition: 'background 0.3s'
        }}>
            <h4 style={{ margin: '0 0 12px 0', color: colors.success }}>
                ✅ With useMemo
            </h4>
            <p style={{ margin: '0 0 8px 0', color: colors.text.primary, fontSize: '14px' }}>
                Actions taken: <strong>{actionCount}</strong>
            </p>
            <CalculatedValue calculatedValue={calculatedValue} />
            <p style={{ margin: '0 0 12px 0', color: colors.success, fontSize: '14px', fontWeight: '600' }}>
                ⏱️ Calc time: <strong>{calcStatus}</strong>
            </p>
            <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap' }}>
                <button
                    onClick={handleCountClick}
                    style={{
                        padding: '8px 16px',
                        background: colors.primary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer'
                    }}
                >
                    Count: {count} (recalculates)
                </button>
                <button
                    onClick={handleThemeToggle}
                    style={{
                        padding: '8px 16px',
                        background: colors.secondary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer'
                    }}
                >
                    Toggle Theme (instant!)
                </button>
            </div>
            <p style={{
                margin: '12px 0 0 0',
                color: colors.success,
                fontSize: '12px',
                fontWeight: '600'
            }}>
                ✅ Toggle Theme is instant - uses cached value!
            </p>
        </div>
    );
};

// ==========================================
// EXAMPLE 2: useCallback - Function Stability
// ==========================================

// Child component that tracks re-renders
const ChildButton = ({ onClick, label, renderCount }: {
    onClick: () => void;
    label: string;
    renderCount: number;
}) => {

    console.log("I am child");

    return (
        <button
            onClick={onClick}
            style={{
                padding: '10px 20px',
                background: colors.accent.teal,
                color: colors.text.white,
                border: 'none',
                borderRadius: borderRadius.md,
                cursor: 'pointer',
                fontSize: '14px'
            }}
        >
            {label} (Renders: {renderCount})
        </button>
    );
};

// ❌ WITHOUT useCallback
const WithoutUseCallback = () => {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState(0);
    const [childRenders, setChildRenders] = useState(1);

    // 🔴 Problem: New function created on EVERY render!
    // ChildButton re-renders even though nothing changed for it
    const handleClick = () => {
        setChildRenders(1)
        console.log('❌ Button clicked');
    };

    const handleParentUpdate = () => {
        setCount(c => c + 1);
        // setChildRenders(r => r + 1); // Child will re-render
    };

    const handleOtherUpdate = () => {
        setOtherState(s => s + 1);
        // setChildRenders(r => r + 1); // Child will re-render
    };

    return (
        <div style={{
            padding: spacing.md,
            background: colors.neutral[200],
            borderRadius: borderRadius.lg,
            border: `2px solid ${colors.error}`
        }}>
            <h4 style={{ margin: '0 0 12px 0', color: colors.error }}>
                ❌ Without useCallback
            </h4>
            <p style={{ margin: '0 0 12px 0', color: colors.text.primary, fontSize: '14px' }}>
                Parent state: <strong>{count}</strong> | Other: <strong>{otherState}</strong>
            </p>
            <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.sm }}>
                <button
                    onClick={handleParentUpdate}
                    style={{
                        padding: '8px 16px',
                        background: colors.primary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer'
                    }}
                >
                    Update Parent Count
                </button>
                <button
                    onClick={handleOtherUpdate}
                    style={{
                        padding: '8px 16px',
                        background: colors.secondary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer'
                    }}
                >
                    Update Other State
                </button>
            </div>
            <ChildButton onClick={handleClick} label="Child Button" renderCount={childRenders} />
            <p style={{
                margin: '12px 0 0 0',
                color: colors.error,
                fontSize: '12px',
                fontWeight: '600'
            }}>
                ⚠️ Child re-renders on ANY parent state change!
            </p>
        </div>
    );
};

// ✅ WITH useCallback
const WithUseCallback = () => {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState(0);
    const [childRenders] = useState(1); // Child only renders once!

    // ✅ Solution: Function reference stays stable!
    const handleClick = useCallback(() => {
        console.log('✅ Button clicked');
    }, []); // Empty deps = never recreated

    return (
        <div style={{
            padding: spacing.md,
            background: colors.neutral[200],
            borderRadius: borderRadius.lg,
            border: `2px solid ${colors.success}`
        }}>
            <h4 style={{ margin: '0 0 12px 0', color: colors.success }}>
                ✅ With useCallback
            </h4>
            <p style={{ margin: '0 0 12px 0', color: colors.text.primary, fontSize: '14px' }}>
                Parent state: <strong>{count}</strong> | Other: <strong>{otherState}</strong>
            </p>
            <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.sm }}>
                <button
                    onClick={() => setCount(c => c + 1)}
                    style={{
                        padding: '8px 16px',
                        background: colors.primary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer'
                    }}
                >
                    Update Parent Count
                </button>
                <button
                    onClick={() => setOtherState(s => s + 1)}
                    style={{
                        padding: '8px 16px',
                        background: colors.secondary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer'
                    }}
                >
                    Update Other State
                </button>
            </div>
            <ChildButton onClick={handleClick} label="Child Button" renderCount={childRenders} />
            <p style={{
                margin: '12px 0 0 0',
                color: colors.success,
                fontSize: '12px',
                fontWeight: '600'
            }}>
                ✅ Child only renders once - callback is memoized!
            </p>
        </div>
    );
};

// ==========================================
// EXAMPLE 3: React.memo - Component Memoization
// ==========================================

interface UserCardProps {
    name: string;
    email: string;
    renderCount: number;
}

// ❌ WITHOUT React.memo
const UserCardWithoutMemo = ({ name, email, renderCount }: UserCardProps) => {
    useEffect(() => {
        console.log('❌ UserCardWithoutMemo rendered');
    });

    return (
        <div style={{
            padding: spacing.md,
            background: colors.neutral[100],
            borderRadius: borderRadius.md,
            border: `1px solid ${colors.error}`,
            marginBottom: spacing.sm
        }}>
            <p style={{ margin: 0, color: colors.text.primary }}>
                <strong>{name}</strong> - {email}
            </p>
            <p style={{ margin: '4px 0 0 0', color: colors.error, fontSize: '12px' }}>
                Renders: {renderCount}
            </p>
        </div>
    );
};

// ✅ WITH React.memo
const UserCardWithMemo = React.memo(({ name, email, renderCount }: UserCardProps) => {
    useEffect(() => {
        console.log('✅ UserCardWithMemo rendered');
    });

    return (
        <div style={{
            padding: spacing.md,
            background: colors.neutral[100],
            borderRadius: borderRadius.md,
            border: `1px solid ${colors.success}`,
            marginBottom: spacing.sm
        }}>
            <p style={{ margin: 0, color: colors.text.primary }}>
                <strong>{name}</strong> - {email}
            </p>
            <p style={{ margin: '4px 0 0 0', color: colors.success, fontSize: '12px' }}>
                Renders: {renderCount}
            </p>
        </div>
    );
});

// Parent component for memo demo
const MemoDemo = () => {
    const [counter, setCounter] = useState(0);
    const [withoutMemoRenders, setWithoutMemoRenders] = useState(1);
    const [withMemoRenders] = useState(1); // With memo, stays at 1
    const [user] = useState({ name: 'John Doe', email: 'john@example.com' });

    const handleCounterClick = () => {
        setCounter(c => c + 1);
        setWithoutMemoRenders(r => r + 1); // Without memo re-renders
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: spacing.md
        }}>
            <div style={{
                padding: spacing.md,
                background: colors.neutral[200],
                borderRadius: borderRadius.lg,
                border: `2px solid ${colors.error}`
            }}>
                <h4 style={{ margin: '0 0 12px 0', color: colors.error }}>
                    ❌ Without React.memo
                </h4>
                <UserCardWithoutMemo
                    name={user.name}
                    email={user.email}
                    renderCount={withoutMemoRenders}
                />
                <button
                    onClick={handleCounterClick}
                    style={{
                        padding: '8px 16px',
                        background: colors.primary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    Parent Counter: {counter}
                </button>
                <p style={{
                    margin: '12px 0 0 0',
                    color: colors.error,
                    fontSize: '12px',
                    fontWeight: '600'
                }}>
                    ⚠️ Card re-renders on parent update!
                </p>
            </div>

            <div style={{
                padding: spacing.md,
                background: colors.neutral[200],
                borderRadius: borderRadius.lg,
                border: `2px solid ${colors.success}`
            }}>
                <h4 style={{ margin: '0 0 12px 0', color: colors.success }}>
                    ✅ With React.memo
                </h4>
                <UserCardWithMemo
                    name={user.name}
                    email={user.email}
                    renderCount={withMemoRenders}
                />
                <button
                    onClick={handleCounterClick}
                    style={{
                        padding: '8px 16px',
                        background: colors.primary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.md,
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    Parent Counter: {counter}
                </button>
                <p style={{
                    margin: '12px 0 0 0',
                    color: colors.success,
                    fontSize: '12px',
                    fontWeight: '600'
                }}>
                    ✅ Card only renders once - props unchanged!
                </p>
            </div>
        </div>
    );
};

// ==========================================
// EXAMPLE 4: Combined Real-World Scenario
// ==========================================

interface Item {
    id: number;
    name: string;
    price: number;
}

const ItemRow = React.memo(({
    item,
    onSelect,
    renderCount
}: {
    item: Item;
    onSelect: (id: number) => void;
    renderCount: number;
}) => {
    return (
        <tr style={{ background: colors.neutral[100] }}>
            <td style={{ padding: spacing.sm, color: colors.text.primary }}>{item.name}</td>
            <td style={{ padding: spacing.sm, color: colors.text.primary }}>${item.price}</td>
            <td style={{ padding: spacing.sm }}>
                <button
                    onClick={() => onSelect(item.id)}
                    style={{
                        padding: '4px 12px',
                        background: colors.primary[600],
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.sm,
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    Select
                </button>
            </td>
            <td style={{ padding: spacing.sm, color: colors.text.secondary, fontSize: '12px' }}>
                Renders: {renderCount}
            </td>
        </tr>
    );
});

const RealWorldExample = () => {
    const [items] = useState<Item[]>([
        { id: 1, name: 'Laptop', price: 999 },
        { id: 2, name: 'Phone', price: 699 },
        { id: 3, name: 'Tablet', price: 449 },
        { id: 4, name: 'Watch', price: 299 },
    ]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [filter, setFilter] = useState('');
    const [itemRenderCount] = useState(1); // Items render once due to optimizations

    // ✅ Memoized callback - won't cause children to re-render
    const handleSelect = useCallback((id: number) => {
        setSelectedId(id);
    }, []);

    // ✅ Memoized filtered list - only recalculates when items or filter changes
    const filteredItems = useMemo(() => {
        console.log('🔄 Filtering items...');
        return items.filter(item =>
            item.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [items, filter]);

    // ✅ Memoized total - only recalculates when filtered items change
    const totalPrice = useMemo(() => {
        console.log('🔄 Calculating total...');
        return filteredItems.reduce((sum, item) => sum + item.price, 0);
    }, [filteredItems]);

    return (
        <div style={{
            padding: spacing.md,
            background: colors.neutral[200],
            borderRadius: borderRadius.lg,
            border: `2px solid ${colors.accent.teal}`
        }}>
            <h4 style={{ margin: '0 0 12px 0', color: colors.accent.teal }}>
                🎯 Real-World: Product List with All Optimizations
            </h4>

            <div style={{ marginBottom: spacing.md }}>
                <input
                    type="text"
                    placeholder="Filter products..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 16px',
                        fontSize: '14px',
                        borderRadius: borderRadius.md,
                        border: `1px solid ${colors.neutral[300]}`,
                        background: colors.background.darkGray,
                        color: colors.text.white
                    }}
                />
            </div>

            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: spacing.md
            }}>
                <thead>
                    <tr style={{ background: colors.neutral[300] }}>
                        <th style={{ padding: spacing.sm, textAlign: 'left', color: colors.text.primary }}>Name</th>
                        <th style={{ padding: spacing.sm, textAlign: 'left', color: colors.text.primary }}>Price</th>
                        <th style={{ padding: spacing.sm, textAlign: 'left', color: colors.text.primary }}>Action</th>
                        <th style={{ padding: spacing.sm, textAlign: 'left', color: colors.text.primary }}>Renders</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <ItemRow
                            key={item.id}
                            item={item}
                            onSelect={handleSelect}
                            renderCount={itemRenderCount}
                        />
                    ))}
                </tbody>
            </table>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: spacing.sm,
                background: colors.neutral[100],
                borderRadius: borderRadius.md
            }}>
                <span style={{ color: colors.text.primary }}>
                    Selected: <strong>{selectedId ? items.find(i => i.id === selectedId)?.name : 'None'}</strong>
                </span>
                <span style={{ color: colors.text.primary }}>
                    Total: <strong style={{ color: colors.success }}>${totalPrice}</strong>
                </span>
            </div>

            <div style={{
                marginTop: spacing.md,
                padding: spacing.sm,
                background: colors.neutral[100],
                borderRadius: borderRadius.md
            }}>
                <p style={{ margin: 0, color: colors.text.secondary, fontSize: '12px' }}>
                    <strong>Optimizations applied:</strong><br />
                    • <code>React.memo</code> on ItemRow - prevents re-render when selecting other items<br />
                    • <code>useCallback</code> on handleSelect - stable function reference<br />
                    • <code>useMemo</code> on filteredItems - only filters when needed<br />
                    • <code>useMemo</code> on totalPrice - only calculates when list changes
                </p>
            </div>
        </div>
    );
};

// ==========================================
// Main Export Component
// ==========================================

const MemoizationExamples = () => {
    return (
        <div style={{
            padding: spacing.xl,
            background: colors.background.dark,
            minHeight: '100vh'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '42px',
                    fontWeight: '800',
                    marginBottom: spacing.sm,
                    background: gradients.primary,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    ⚡ Memoization Deep Dive
                </h1>
                <p style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    color: colors.text.secondary,
                    marginBottom: spacing.xl
                }}>
                    useMemo, useCallback & React.memo - When and Why to Use Them
                </p>

                {/* useMemo Example */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.lg,
                    borderRadius: borderRadius.xl,
                    marginBottom: spacing.xl,
                    border: `1px solid ${colors.neutral[300]}`,
                    boxShadow: shadows.lg
                }}>
                    <h2 style={{
                        margin: '0 0 16px 0',
                        fontSize: '28px',
                        fontWeight: '700',
                        color: colors.primary[600]
                    }}>
                        1️⃣ useMemo - Memoize Expensive Calculations
                    </h2>

                    <div style={{
                        background: colors.neutral[100],
                        padding: spacing.md,
                        borderRadius: borderRadius.md,
                        marginBottom: spacing.md
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: colors.text.primary }}>
                            📖 Problem & Solution
                        </h3>
                        <p style={{ margin: '0 0 12px 0', color: colors.text.primary, lineHeight: '1.6' }}>
                            Without <code style={{ background: colors.neutral[300], padding: '2px 6px', borderRadius: '4px' }}>useMemo</code>,
                            expensive calculations run on <strong>every render</strong>, even when their dependencies haven't changed.
                            This causes unnecessary lag and poor UX.
                        </p>
                        <pre style={{
                            background: colors.neutral[100],
                            color: colors.accent.teal,
                            padding: spacing.sm,
                            borderRadius: borderRadius.sm,
                            overflow: 'auto',
                            margin: 0,
                            fontSize: '13px',
                            fontFamily: 'monospace'
                        }}>
                            {`// ❌ Bad: Runs on every render
const value = expensiveCalculation(count);

// ✅ Good: Only runs when count changes
const value = useMemo(() => expensiveCalculation(count), [count]);`}
                        </pre>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: spacing.md
                    }}>
                        <WithoutUseMemo />
                        <WithUseMemo />
                    </div>
                </div>

                {/* useCallback Example */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.lg,
                    borderRadius: borderRadius.xl,
                    marginBottom: spacing.xl,
                    border: `1px solid ${colors.neutral[300]}`,
                    boxShadow: shadows.lg
                }}>
                    <h2 style={{
                        margin: '0 0 16px 0',
                        fontSize: '28px',
                        fontWeight: '700',
                        color: colors.secondary[600]
                    }}>
                        2️⃣ useCallback - Memoize Functions
                    </h2>

                    <div style={{
                        background: colors.neutral[100],
                        padding: spacing.md,
                        borderRadius: borderRadius.md,
                        marginBottom: spacing.md
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: colors.text.primary }}>
                            📖 Problem & Solution
                        </h3>
                        <p style={{ margin: '0 0 12px 0', color: colors.text.primary, lineHeight: '1.6' }}>
                            Functions are recreated on every render. When passed to child components (even memoized ones),
                            the new function reference causes unnecessary re-renders.
                            <code style={{ background: colors.neutral[300], padding: '2px 6px', borderRadius: '4px' }}>useCallback</code> keeps
                            the function reference stable.
                        </p>
                        <pre style={{
                            background: colors.neutral[100],
                            color: colors.accent.teal,
                            padding: spacing.sm,
                            borderRadius: borderRadius.sm,
                            overflow: 'auto',
                            margin: 0,
                            fontSize: '13px',
                            fontFamily: 'monospace'
                        }}>
                            {`// ❌ Bad: New function every render
const handleClick = () => { doSomething(); };

// ✅ Good: Same function reference
const handleClick = useCallback(() => {
    doSomething();
}, []); // Empty deps = never changes`}
                        </pre>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: spacing.md
                    }}>
                        <WithoutUseCallback />
                        <WithUseCallback />
                    </div>
                </div>

                {/* React.memo Example */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.lg,
                    borderRadius: borderRadius.xl,
                    marginBottom: spacing.xl,
                    border: `1px solid ${colors.neutral[300]}`,
                    boxShadow: shadows.lg
                }}>
                    <h2 style={{
                        margin: '0 0 16px 0',
                        fontSize: '28px',
                        fontWeight: '700',
                        color: colors.accent.orange
                    }}>
                        3️⃣ React.memo - Memoize Components
                    </h2>

                    <div style={{
                        background: colors.neutral[100],
                        padding: spacing.md,
                        borderRadius: borderRadius.md,
                        marginBottom: spacing.md
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: colors.text.primary }}>
                            📖 Problem & Solution
                        </h3>
                        <p style={{ margin: '0 0 12px 0', color: colors.text.primary, lineHeight: '1.6' }}>
                            By default, components re-render whenever their parent re-renders, even if props haven't changed.
                            <code style={{ background: colors.neutral[300], padding: '2px 6px', borderRadius: '4px' }}>React.memo</code> wraps
                            a component to skip re-rendering when props are the same (shallow comparison).
                        </p>
                        <pre style={{
                            background: colors.neutral[100],
                            color: colors.accent.teal,
                            padding: spacing.sm,
                            borderRadius: borderRadius.sm,
                            overflow: 'auto',
                            margin: 0,
                            fontSize: '13px',
                            fontFamily: 'monospace'
                        }}>
                            {`// ❌ Bad: Re-renders when parent re-renders
const UserCard = ({ user }) => <div>{user.name}</div>;

// ✅ Good: Only re-renders when props change
const UserCard = React.memo(({ user }) => (
    <div>{user.name}</div>
));`}
                        </pre>
                    </div>

                    <MemoDemo />
                </div>

                {/* Real World Example */}
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.lg,
                    borderRadius: borderRadius.xl,
                    marginBottom: spacing.xl,
                    border: `1px solid ${colors.neutral[300]}`,
                    boxShadow: shadows.lg
                }}>
                    <h2 style={{
                        margin: '0 0 16px 0',
                        fontSize: '28px',
                        fontWeight: '700',
                        color: colors.accent.teal
                    }}>
                        4️⃣ Real-World: All Three Combined
                    </h2>

                    <div style={{
                        background: colors.neutral[100],
                        padding: spacing.md,
                        borderRadius: borderRadius.md,
                        marginBottom: spacing.md
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: colors.text.primary }}>
                            📖 When to Use Each
                        </h3>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: colors.text.primary, lineHeight: '1.8' }}>
                            <li><strong>useMemo</strong>: Expensive calculations, derived data, complex filtering/sorting</li>
                            <li><strong>useCallback</strong>: Event handlers passed to child components, callbacks in dependency arrays</li>
                            <li><strong>React.memo</strong>: Components that render often with same props, list items, pure presentational components</li>
                        </ul>
                    </div>

                    <RealWorldExample />
                </div>

                {/* Summary */}
                <div style={{
                    background: colors.accent.purple + '20',
                    padding: spacing.lg,
                    borderRadius: borderRadius.xl,
                    border: `2px solid ${colors.accent.purple}`,
                    boxShadow: shadows.lg
                }}>
                    <h2 style={{
                        margin: '0 0 16px 0',
                        fontSize: '28px',
                        fontWeight: '700',
                        color: colors.accent.purple
                    }}>
                        📋 Summary: When NOT to Use
                    </h2>
                    <div style={{ color: colors.text.primary, lineHeight: '1.8' }}>
                        <p style={{ margin: '0 0 12px 0' }}>
                            <strong>⚠️ Don't over-optimize!</strong> These hooks have their own costs (memory, comparison overhead).
                        </p>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            <li><strong>Skip useMemo</strong>: For simple calculations, primitive values, rarely changing data</li>
                            <li><strong>Skip useCallback</strong>: When not passing to memoized children, for inline handlers in simple components</li>
                            <li><strong>Skip React.memo</strong>: For components that always receive new props, small/fast components</li>
                        </ul>
                        <p style={{ margin: '16px 0 0 0', padding: spacing.sm, background: colors.success + '30', borderRadius: borderRadius.md }}>
                            💡 <strong>React 19 Tip:</strong> With React Compiler enabled, many of these optimizations are applied automatically!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemoizationExamples;
