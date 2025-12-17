import { useState, useTransition, useDeferredValue, useMemo, Suspense, lazy } from 'react';
import { colors, spacing, borderRadius, shadows, gradients } from '../theme/design-system';

// Lazy loaded components for Suspense demo
const LazyChart = lazy(() =>
    new Promise<{ default: React.ComponentType }>(resolve =>
        setTimeout(() => resolve({
            default: () => (
                <div style={{
                    padding: spacing.lg,
                    background: gradients.success,
                    borderRadius: borderRadius.lg,
                    color: colors.text.white,
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>📊 Chart Component Loaded!</h3>
                    <p style={{ margin: 0, opacity: 0.9 }}>This was loaded lazily after 1.5 seconds</p>
                </div>
            )
        }), 1500)
    )
);

const LazyTable = lazy(() =>
    new Promise<{ default: React.ComponentType }>(resolve =>
        setTimeout(() => resolve({
            default: () => (
                <div style={{
                    padding: spacing.lg,
                    background: gradients.secondary,
                    borderRadius: borderRadius.lg,
                    color: colors.text.white,
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>📋 Table Component Loaded!</h3>
                    <p style={{ margin: 0, opacity: 0.9 }}>This was loaded lazily after 2 seconds</p>
                </div>
            )
        }), 2000)
    )
);

// Generate large list for demos
const generateItems = (count: number, filter: string) => {
    const items = [];
    for (let i = 0; i < count; i++) {
        const name = `Item ${i + 1} - ${['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'][i % 5]}`;
        if (!filter || name.toLowerCase().includes(filter.toLowerCase())) {
            items.push({ id: i, name, value: Math.floor(Math.random() * 1000) });
        }
    }
    return items;
};

// Slow component to show difference
const SlowList = ({ items }: { items: { id: number; name: string; value: number }[] }) => {
    // Artificial slowdown using heavy computation (pure function)
    let sum = 0;
    for (let i = 0; i < 100000; i++) {
        sum += Math.sqrt(i) * Math.sin(i);
    }
    // Use sum to prevent optimization removal (but don't display it)
    const _unused = sum;
    void _unused;

    return (
        <div style={{
            maxHeight: '300px',
            overflow: 'auto',
            background: colors.neutral[100],
            borderRadius: borderRadius.md,
            border: `1px solid ${colors.neutral[300]}`
        }}>
            {items.slice(0, 100).map(item => (
                <div
                    key={item.id}
                    style={{
                        padding: spacing.sm,
                        borderBottom: `1px solid ${colors.neutral[200]}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: colors.text.primary
                    }}
                >
                    <span>{item.name}</span>
                    <span style={{ color: colors.primary[600], fontWeight: '600' }}>${item.value}</span>
                </div>
            ))}
            {items.length > 100 && (
                <div style={{ padding: spacing.sm, textAlign: 'center', color: colors.text.secondary }}>
                    ... and {items.length - 100} more items
                </div>
            )}
        </div>
    );
};

// ============================================================
// DEMO 1: useTransition - Non-blocking tab switching
// ============================================================
const UseTransitionDemo = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'expensive' | 'filtered'>('all');
    const [isPending, startTransition] = useTransition();

    // Generate different data based on tab
    const tabData = useMemo(() => {
        switch (activeTab) {
            case 'all':
                return generateItems(5000, '');
            case 'expensive':
                return generateItems(5000, '').filter(i => i.value > 500);
            case 'filtered':
                return generateItems(5000, 'Apple');
            default:
                return [];
        }
    }, [activeTab]);

    const handleTabClick = (tab: 'all' | 'expensive' | 'filtered') => {
        // Wrap state update in startTransition - UI stays responsive!
        startTransition(() => {
            setActiveTab(tab);
        });
    };

    const tabs = [
        { id: 'all' as const, label: '📋 All Items (5000)', color: colors.primary[500] },
        { id: 'expensive' as const, label: '💎 Expensive (>$500)', color: colors.secondary[500] },
        { id: 'filtered' as const, label: '🍎 Only Apples', color: colors.success },
    ];

    return (
        <div style={{
            background: colors.neutral[200],
            padding: spacing.lg,
            borderRadius: borderRadius.xl,
            marginBottom: spacing.xl,
            border: `1px solid ${colors.warning}`,
            boxShadow: shadows.lg
        }}>
            <h2 style={{
                margin: '0 0 8px 0',
                fontSize: '24px',
                fontWeight: '700',
                color: colors.warning
            }}>
                ⚡ useTransition Demo - Non-Blocking Updates
            </h2>
            <p style={{ color: colors.text.secondary, margin: '0 0 16px 0' }}>
                Click tabs rapidly - notice the UI stays responsive! The pending state shows while processing.
            </p>

            {/* Code Example */}
            <pre style={{
                background: colors.neutral[100],
                padding: spacing.md,
                borderRadius: borderRadius.md,
                overflow: 'auto',
                marginBottom: spacing.md,
                fontSize: '13px',
                color: colors.text.white
            }}>
                {`const [isPending, startTransition] = useTransition();

const handleTabClick = (tab) => {
  startTransition(() => {
    setActiveTab(tab); // This update is non-blocking!
  });
};

// isPending is true while transitioning`}
            </pre>

            {/* Tab Buttons */}
            <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.md, flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        style={{
                            padding: '12px 20px',
                            borderRadius: borderRadius.lg,
                            border: 'none',
                            background: activeTab === tab.id ? tab.color : colors.neutral[300],
                            color: activeTab === tab.id ? colors.text.white : colors.text.primary,
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.2s',
                            opacity: isPending && activeTab !== tab.id ? 0.7 : 1
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Pending Indicator */}
            {isPending && (
                <div style={{
                    padding: spacing.md,
                    background: colors.warning + '30',
                    borderRadius: borderRadius.md,
                    marginBottom: spacing.md,
                    color: colors.warning,
                    fontWeight: '600',
                    textAlign: 'center',
                    border: `2px dashed ${colors.warning}`
                }}>
                    ⏳ isPending = true (UI stays responsive while processing...)
                </div>
            )}

            {/* Results */}
            <div style={{
                opacity: isPending ? 0.6 : 1,
                transition: 'opacity 0.2s'
            }}>
                <div style={{ marginBottom: spacing.sm, color: colors.text.primary, fontWeight: '600' }}>
                    Showing {tabData.length} items:
                </div>
                <SlowList items={tabData} />
            </div>
        </div>
    );
};

// Simpler approach for useDeferredValue demo
// Shows 100 items with moderate computation
const HeavySearchResults = ({ searchTerm }: { searchTerm: string }) => {
    // Generate filtered items with moderate computation
    const items: { id: number; name: string; value: number }[] = [];

    // Moderate computation - enough to show defer but not block input
    for (let i = 0; i < 500; i++) {
        const name = `Item ${i + 1} - ${['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'][i % 5]}`;
        if (!searchTerm || name.toLowerCase().includes(searchTerm.toLowerCase())) {
            // Light computation per item
            let hash = 0;
            for (let j = 0; j < 500; j++) {
                hash += Math.sqrt(j + i);
            }
            items.push({ id: i, name, value: (i * 7919 + Math.floor(hash)) % 1000 });
        }
    }

    return (
        <div style={{
            maxHeight: '250px',
            overflow: 'auto',
            background: colors.neutral[100],
            borderRadius: borderRadius.md,
            border: `1px solid ${colors.neutral[300]}`
        }}>
            {items.slice(0, 50).map(item => (
                <div
                    key={item.id}
                    style={{
                        padding: spacing.sm,
                        borderBottom: `1px solid ${colors.neutral[200]}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: colors.text.primary
                    }}
                >
                    <span>{item.name}</span>
                    <span style={{ color: colors.primary[600], fontWeight: '600' }}>${item.value}</span>
                </div>
            ))}
            {items.length > 50 && (
                <div style={{ padding: spacing.sm, textAlign: 'center', color: colors.text.secondary }}>
                    ... and {items.length - 50} more items
                </div>
            )}
            {items.length === 0 && (
                <div style={{ padding: spacing.lg, textAlign: 'center', color: colors.text.secondary }}>
                    No items found for "{searchTerm}"
                </div>
            )}
        </div>
    );
};

// ============================================================
// DEMO 2: useDeferredValue - Deferred search results
// ============================================================
const UseDeferredValueDemo = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const deferredSearchTerm = useDeferredValue(searchTerm);

    const isStale = searchTerm !== deferredSearchTerm;

    return (
        <div style={{
            background: colors.neutral[200],
            padding: spacing.lg,
            borderRadius: borderRadius.xl,
            marginBottom: spacing.xl,
            border: `1px solid ${colors.info}`,
            boxShadow: shadows.lg
        }}>
            <h2 style={{
                margin: '0 0 8px 0',
                fontSize: '24px',
                fontWeight: '700',
                color: colors.info
            }}>
                ⏳ useDeferredValue Demo - Deferred Search
            </h2>
            <p style={{ color: colors.text.secondary, margin: '0 0 16px 0' }}>
                Type quickly in the search box - input stays responsive while results update in background!
            </p>

            {/* Code Example */}
            <pre style={{
                background: colors.neutral[100],
                padding: spacing.md,
                borderRadius: borderRadius.md,
                overflow: 'auto',
                marginBottom: spacing.md,
                fontSize: '13px',
                color: colors.text.white
            }}>
                {`const [searchTerm, setSearchTerm] = useState('');
const deferredSearchTerm = useDeferredValue(searchTerm);

// Results use deferred value - updates after typing stops
const results = useMemo(() => {
  return filterItems(items, deferredSearchTerm);
}, [deferredSearchTerm]);

// Check if results are stale (still processing)
const isStale = searchTerm !== deferredSearchTerm;`}
            </pre>

            {/* Search Input */}
            <div style={{ marginBottom: spacing.md }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="🔍 Type to search (try: apple, banana, cherry...)"
                    style={{
                        width: '100%',
                        padding: '14px 20px',
                        fontSize: '16px',
                        borderRadius: borderRadius.lg,
                        border: `2px solid ${isStale ? colors.warning : colors.info}`,
                        background: colors.background.darkGray,
                        color: colors.text.white,
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                />
            </div>

            {/* Value Comparison */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: spacing.md,
                marginBottom: spacing.md
            }}>
                <div style={{
                    padding: spacing.md,
                    background: colors.primary[100],
                    borderRadius: borderRadius.md,
                    border: `2px solid ${colors.primary[500]}`
                }}>
                    <div style={{ fontSize: '12px', color: colors.text.secondary, marginBottom: '4px' }}>
                        searchTerm (immediate):
                    </div>
                    <div style={{ fontWeight: '700', color: colors.primary[700], fontSize: '16px' }}>
                        "{searchTerm || '(empty)'}"
                    </div>
                </div>
                <div style={{
                    padding: spacing.md,
                    background: isStale ? colors.warning + '30' : colors.success + '30',
                    borderRadius: borderRadius.md,
                    border: `2px solid ${isStale ? colors.warning : colors.success}`
                }}>
                    <div style={{ fontSize: '12px', color: colors.text.secondary, marginBottom: '4px' }}>
                        deferredSearchTerm {isStale && '(updating...)'}:
                    </div>
                    <div style={{
                        fontWeight: '700',
                        color: isStale ? colors.warning : colors.success,
                        fontSize: '16px'
                    }}>
                        "{deferredSearchTerm || '(empty)'}"
                    </div>
                </div>
            </div>

            {/* Stale Indicator */}
            {isStale && (
                <div style={{
                    padding: spacing.md,
                    background: colors.warning + '30',
                    borderRadius: borderRadius.md,
                    marginBottom: spacing.md,
                    color: colors.warning,
                    fontWeight: '600',
                    textAlign: 'center',
                    border: `2px dashed ${colors.warning}`
                }}>
                    🔄 Results are stale - deferred value is catching up...
                </div>
            )}

            {/* Results - Uses deferredSearchTerm so it renders slower */}
            <div style={{
                opacity: isStale ? 0.6 : 1,
                transition: 'opacity 0.2s'
            }}>
                <div style={{ marginBottom: spacing.sm, color: colors.text.primary, fontWeight: '600' }}>
                    Search results (using deferredSearchTerm):
                </div>
                <HeavySearchResults searchTerm={deferredSearchTerm} />
            </div>
        </div>
    );
};

// ============================================================
// DEMO 3: Suspense - Lazy Loading Components
// ============================================================
const SuspenseDemo = () => {
    const [showChart, setShowChart] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [key, setKey] = useState(0); // For re-triggering lazy load

    const handleReset = () => {
        setShowChart(false);
        setShowTable(false);
        setKey(prev => prev + 1);
    };

    return (
        <div style={{
            background: colors.neutral[200],
            padding: spacing.lg,
            borderRadius: borderRadius.xl,
            marginBottom: spacing.xl,
            border: `1px solid ${colors.accent.teal}`,
            boxShadow: shadows.lg
        }}>
            <h2 style={{
                margin: '0 0 8px 0',
                fontSize: '24px',
                fontWeight: '700',
                color: colors.accent.teal
            }}>
                🎭 Suspense Demo - Lazy Loading Components
            </h2>
            <p style={{ color: colors.text.secondary, margin: '0 0 16px 0' }}>
                Click buttons to load components lazily. Suspense shows fallback while loading!
            </p>

            {/* Code Example */}
            <pre style={{
                background: colors.neutral[100],
                padding: spacing.md,
                borderRadius: borderRadius.md,
                overflow: 'auto',
                marginBottom: spacing.md,
                fontSize: '13px',
                color: colors.text.white
            }}>
                {`// Lazy load component (only loaded when needed)
const LazyChart = lazy(() => import('./ChartComponent'));

// Wrap in Suspense with fallback UI
<Suspense fallback={<LoadingSpinner />}>
  {showChart && <LazyChart />}
</Suspense>

// Benefits:
// - Smaller initial bundle size
// - Faster initial page load
// - Load components on demand`}
            </pre>

            {/* Control Buttons */}
            <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.lg, flexWrap: 'wrap' }}>
                <button
                    onClick={() => setShowChart(true)}
                    disabled={showChart}
                    style={{
                        padding: '12px 24px',
                        borderRadius: borderRadius.lg,
                        border: 'none',
                        background: showChart ? colors.neutral[400] : gradients.success,
                        color: colors.text.white,
                        cursor: showChart ? 'not-allowed' : 'pointer',
                        fontWeight: '700',
                        fontSize: '14px'
                    }}
                >
                    {showChart ? '✓ Chart Loaded' : '📊 Load Chart (1.5s)'}
                </button>
                <button
                    onClick={() => setShowTable(true)}
                    disabled={showTable}
                    style={{
                        padding: '12px 24px',
                        borderRadius: borderRadius.lg,
                        border: 'none',
                        background: showTable ? colors.neutral[400] : gradients.secondary,
                        color: colors.text.white,
                        cursor: showTable ? 'not-allowed' : 'pointer',
                        fontWeight: '700',
                        fontSize: '14px'
                    }}
                >
                    {showTable ? '✓ Table Loaded' : '📋 Load Table (2s)'}
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        padding: '12px 24px',
                        borderRadius: borderRadius.lg,
                        border: `2px solid ${colors.error}`,
                        background: 'transparent',
                        color: colors.error,
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '14px'
                    }}
                >
                    🔄 Reset Demo
                </button>
            </div>

            {/* Lazy Loaded Components */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }} key={key}>
                {/* Chart with Suspense */}
                {showChart && (
                    <Suspense fallback={
                        <div style={{
                            padding: spacing.lg,
                            background: colors.success + '20',
                            borderRadius: borderRadius.lg,
                            border: `2px dashed ${colors.success}`,
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontSize: '32px',
                                marginBottom: spacing.sm,
                                animation: 'pulse 1s infinite'
                            }}>
                                ⏳
                            </div>
                            <div style={{ color: colors.success, fontWeight: '700' }}>
                                Loading Chart Component...
                            </div>
                            <div style={{ color: colors.text.secondary, fontSize: '14px', marginTop: '4px' }}>
                                (Suspense fallback is showing)
                            </div>
                        </div>
                    }>
                        <LazyChart />
                    </Suspense>
                )}

                {/* Table with Suspense */}
                {showTable && (
                    <Suspense fallback={
                        <div style={{
                            padding: spacing.lg,
                            background: colors.secondary[500] + '20',
                            borderRadius: borderRadius.lg,
                            border: `2px dashed ${colors.secondary[500]}`,
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontSize: '32px',
                                marginBottom: spacing.sm,
                                animation: 'pulse 1s infinite'
                            }}>
                                ⏳
                            </div>
                            <div style={{ color: colors.secondary[500], fontWeight: '700' }}>
                                Loading Table Component...
                            </div>
                            <div style={{ color: colors.text.secondary, fontSize: '14px', marginTop: '4px' }}>
                                (Suspense fallback is showing)
                            </div>
                        </div>
                    }>
                        <LazyTable />
                    </Suspense>
                )}

                {/* Placeholder when nothing is loaded */}
                {!showChart && !showTable && (
                    <div style={{
                        padding: spacing.xl,
                        background: colors.neutral[100],
                        borderRadius: borderRadius.lg,
                        border: `2px dashed ${colors.neutral[400]}`,
                        textAlign: 'center',
                        color: colors.text.secondary
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: spacing.sm }}>📦</div>
                        <div style={{ fontWeight: '600' }}>Click buttons above to lazy load components</div>
                        <div style={{ fontSize: '14px', marginTop: '8px' }}>
                            Components are not in memory until you request them!
                        </div>
                    </div>
                )}
            </div>

            {/* Bundle Size Info */}
            <div style={{
                marginTop: spacing.lg,
                padding: spacing.md,
                background: colors.accent.teal + '20',
                borderRadius: borderRadius.md,
                border: `1px solid ${colors.accent.teal}`
            }}>
                <h4 style={{ margin: '0 0 8px 0', color: colors.accent.teal }}>
                    💡 Why use Suspense + lazy()?
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: colors.text.primary, lineHeight: '1.8' }}>
                    <li><strong>Smaller initial bundle</strong> - Components load only when needed</li>
                    <li><strong>Faster page load</strong> - Users see content faster</li>
                    <li><strong>Better UX</strong> - Show loading states while fetching</li>
                    <li><strong>Code splitting</strong> - Vite/Webpack automatically creates separate chunks</li>
                </ul>
            </div>
        </div>
    );
};

// ============================================================
// Main Component
// ============================================================
const ConcurrentFeatures = () => {
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
                    marginBottom: spacing.md,
                    background: gradients.primary,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    🚀 React Concurrent Features
                </h1>
                <p style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    color: colors.text.secondary,
                    marginBottom: spacing.xl
                }}>
                    Interactive demos showing React's concurrent rendering features
                </p>

                {/* Feature Overview */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: spacing.md,
                    marginBottom: spacing.xl
                }}>
                    <div style={{
                        padding: spacing.md,
                        background: colors.warning + '20',
                        borderRadius: borderRadius.lg,
                        border: `2px solid ${colors.warning}`,
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: spacing.xs }}>⚡</div>
                        <h3 style={{ margin: '0 0 4px 0', color: colors.warning }}>useTransition</h3>
                        <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                            Non-blocking state updates
                        </p>
                    </div>
                    <div style={{
                        padding: spacing.md,
                        background: colors.info + '20',
                        borderRadius: borderRadius.lg,
                        border: `2px solid ${colors.info}`,
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: spacing.xs }}>⏳</div>
                        <h3 style={{ margin: '0 0 4px 0', color: colors.info }}>useDeferredValue</h3>
                        <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                            Defer expensive updates
                        </p>
                    </div>
                    <div style={{
                        padding: spacing.md,
                        background: colors.accent.teal + '20',
                        borderRadius: borderRadius.lg,
                        border: `2px solid ${colors.accent.teal}`,
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: spacing.xs }}>🎭</div>
                        <h3 style={{ margin: '0 0 4px 0', color: colors.accent.teal }}>Suspense</h3>
                        <p style={{ margin: 0, fontSize: '14px', color: colors.text.secondary }}>
                            Lazy loading with fallbacks
                        </p>
                    </div>
                </div>

                {/* Demo Components */}
                <UseTransitionDemo />
                <UseDeferredValueDemo />
                <SuspenseDemo />
            </div>
        </div>
    );
};

export default ConcurrentFeatures;
