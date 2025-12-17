import { lazy, Suspense } from 'react';
import { colors, shadows, borderRadius, spacing } from '../theme/design-system';

// Example: Code Splitting with React.lazy
// This component is loaded only when needed, reducing initial bundle size
const HeavyComponent = lazy(() => import('./HeavyComponent'));
const ChartComponent = lazy(() => import('./ChartComponent'));

interface LazyLoadExampleProps {
    showHeavy: boolean;
    showChart: boolean;
}

const LazyLoadExample = ({ showHeavy, showChart }: LazyLoadExampleProps) => {
    return (
        <div style={{
            padding: spacing.lg,
            background: colors.background.darkGray,
            border: `1px solid ${colors.neutral[300]}`,
            borderRadius: borderRadius.xl,
            margin: `${spacing.lg} 0`,
            boxShadow: shadows.lg
        }}>
            <h2 style={{
                margin: '0 0 16px 0',
                fontSize: '24px',
                fontWeight: '800',
                color: colors.primary[700]
            }}>
                🚀 Code Splitting & Lazy Loading Example
            </h2>

            {/* Explanation Section */}
            <div style={{
                background: colors.primary[50],
                padding: spacing.lg,
                borderRadius: borderRadius.lg,
                marginBottom: spacing.lg,
                border: `2px solid ${colors.primary[200]}`
            }}>
                <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: colors.primary[700]
                }}>
                    📦 What is Code Splitting?
                </h3>
                <p style={{
                    color: colors.text.primary,
                    fontSize: '15px',
                    lineHeight: '1.7',
                    margin: '0 0 12px 0'
                }}>
                    Code splitting is a technique to split your application into smaller chunks (bundles) that can be loaded on-demand.
                    Instead of loading all JavaScript at once, you load only what's needed initially, improving performance.
                </p>

                <h3 style={{
                    margin: '16px 0 12px 0',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: colors.primary[700]
                }}>
                    🎯 Why Not in Initial Bundle?
                </h3>
                <ul style={{
                    color: colors.text.primary,
                    fontSize: '15px',
                    lineHeight: '1.8',
                    margin: '0 0 12px 0',
                    paddingLeft: spacing.lg
                }}>
                    <li><strong>Faster Initial Load:</strong> Smaller bundle = faster page load</li>
                    <li><strong>Better Performance:</strong> Users don't download code they might never use</li>
                    <li><strong>Optimized Caching:</strong> Changed components don't invalidate entire bundle</li>
                    <li><strong>Improved UX:</strong> App becomes interactive sooner</li>
                </ul>

                <h3 style={{
                    margin: '16px 0 12px 0',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: colors.primary[700]
                }}>
                    🛠️ How to Achieve Code Splitting
                </h3>

                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.md,
                    marginBottom: spacing.sm,
                    border: `1px solid ${colors.primary[300]}`
                }}>
                    <strong style={{ color: colors.primary[700], fontSize: '16px' }}>
                        Step 1: Import with React.lazy()
                    </strong>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: `${spacing.xs} 0 0 0`,
                        fontSize: '13px',
                        fontFamily: 'monospace'
                    }}>
                        {`import { lazy } from 'react';

// ❌ Regular import - included in main bundle
import HeavyComponent from './HeavyComponent';

// ✅ Lazy import - separate bundle, loaded on-demand
const HeavyComponent = lazy(() => 
  import('./HeavyComponent')
);`}
                    </pre>
                </div>

                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.md,
                    marginBottom: spacing.sm,
                    border: `1px solid ${colors.primary[300]}`
                }}>
                    <strong style={{ color: colors.primary[700], fontSize: '16px' }}>
                        Step 2: Wrap with Suspense
                    </strong>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: `${spacing.xs} 0 0 0`,
                        fontSize: '13px',
                        fontFamily: 'monospace'
                    }}>
                        {`import { Suspense } from 'react';

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>`}
                    </pre>
                </div>

                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.md,
                    marginBottom: spacing.sm,
                    border: `1px solid ${colors.primary[300]}`
                }}>
                    <strong style={{ color: colors.primary[700], fontSize: '16px' }}>
                        Step 3: Conditional Rendering (Optional)
                    </strong>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: `${spacing.xs} 0 0 0`,
                        fontSize: '13px',
                        fontFamily: 'monospace'
                    }}>
                        {`// Only load when needed
{showComponent && (
  <Suspense fallback={<Loading />}>
    <HeavyComponent />
  </Suspense>
)}`}
                    </pre>
                </div>

                <div style={{
                    background: colors.success + '20',
                    padding: spacing.md,
                    borderRadius: borderRadius.md,
                    border: `2px solid ${colors.success}60`,
                    marginTop: spacing.md
                }}>
                    <strong style={{ color: colors.success, fontSize: '16px' }}>
                        📊 Build Output:
                    </strong>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: `${spacing.xs} 0 0 0`,
                        fontSize: '13px',
                        fontFamily: 'monospace'
                    }}>
                        {`dist/assets/index.js              230.09 kB (main bundle)
dist/assets/HeavyComponent.js       1.50 kB (lazy loaded)
dist/assets/ChartComponent.js       1.91 kB (lazy loaded)`}
                    </pre>
                    <p style={{
                        margin: `${spacing.xs} 0 0 0`,
                        color: colors.text.primary,
                        fontSize: '14px'
                    }}>
                        ✅ Users only download 230 KB initially, not 233.5 KB!
                    </p>
                </div>
            </div>

            <p style={{
                margin: '0 0 20px 0',
                color: colors.text.secondary,
                fontSize: '16px',
                lineHeight: '1.6',
                fontWeight: '600'
            }}>
                🎮 Try it yourself: Click the buttons below to load components on-demand!
            </p>

            {showHeavy && (
                <Suspense fallback={
                    <div style={{
                        padding: spacing.xl,
                        textAlign: 'center',
                        background: colors.neutral[100],
                        borderRadius: borderRadius.lg,
                        margin: `${spacing.sm} 0`,
                        border: `2px dashed ${colors.primary[300]}`
                    }}>
                        <div style={{
                            fontSize: '32px',
                            marginBottom: spacing.xs
                        }}>⏳</div>
                        <div style={{
                            fontWeight: '600',
                            color: colors.primary[600]
                        }}>
                            Loading Heavy Component...
                        </div>
                    </div>
                }>
                    <HeavyComponent />
                </Suspense>
            )}

            {showChart && (
                <Suspense fallback={
                    <div style={{
                        padding: spacing.xl,
                        textAlign: 'center',
                        background: colors.neutral[100],
                        borderRadius: borderRadius.lg,
                        margin: `${spacing.sm} 0`,
                        border: `2px dashed ${colors.accent.orange}60`
                    }}>
                        <div style={{
                            fontSize: '32px',
                            marginBottom: spacing.xs
                        }}>📊</div>
                        <div style={{
                            fontWeight: '600',
                            color: colors.accent.orange
                        }}>
                            Loading Chart Component...
                        </div>
                    </div>
                }>
                    <ChartComponent />
                </Suspense>
            )}
        </div>
    );
};

export default LazyLoadExample;
