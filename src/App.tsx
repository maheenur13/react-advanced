import { useState } from 'react'
import './App.css'
import DemoComponents from './components/DemoComponents'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './context/ThemeProvider'
// import LazyLoadExample from './components/LazyLoadExample'
import PortalExample from './components/PortalExample'
import HOCExample from './components/HOCExample'
import RenderPropsExample from './components/RenderPropsExample'
import CompoundComponentsExample from './components/CompoundComponentsExample'
import React19Features from './components/React19Features'
import MemoizationExamples from './components/MemoizationExamples'
import ConcurrentFeatures from './components/ConcurrentFeatures'
import { colors, shadows, borderRadius, gradients, spacing } from './theme/design-system'
import LazyLoadExample from './components/LazyLoadExample'
import { CompilerTest } from './components/CompilerTest'
// import HeavyComponent from './components/HeavyComponent'
// import ChartComponent from './components/ChartComponent'

function App() {
  const [showLazy, setShowLazy] = useState(false);
  const [showHeavy, setShowHeavy] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showConcurrent, setShowConcurrent] = useState(false);

  const buttonStyle = (isActive: boolean, gradient: string) => ({
    width: '100%',
    padding: spacing.md,
    fontSize: '18px',
    background: isActive ? gradient : colors.background.darkGray,
    color: isActive ? colors.text.white : colors.text.primary,
    border: `1px solid ${colors.neutral[300]}`,
    borderRadius: borderRadius.lg,
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    boxShadow: shadows.md
  });

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div style={{
          background: colors.background.dark,
          minHeight: '100vh',
          padding: spacing.lg
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
              textAlign: 'center',
              padding: `${spacing.xl} ${spacing.lg}`,
              background: gradients.primary,
              color: colors.text.white,
              marginBottom: spacing.xl,
              borderRadius: borderRadius['2xl'],
              boxShadow: shadows['2xl']
            }}>
              <h1 style={{
                fontSize: '48px',
                margin: '0 0 16px 0',
                fontWeight: '900',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}>
                ⚛️ React Advanced Features
              </h1>
              <p style={{
                fontSize: '20px',
                margin: 0,
                opacity: 0.95,
                fontWeight: '500'
              }}>
                Comprehensive showcase of React 19 advanced patterns and features with React Compiler
              </p>
            </div>

            {/* Covered Topics Index */}
            <div style={{
              background: colors.background.darkGray,
              padding: spacing.xl,
              borderRadius: borderRadius.xl,
              marginBottom: spacing.xl,
              boxShadow: shadows.lg,
              border: `1px solid ${colors.neutral[300]}`
            }}>
              <h2 style={{
                margin: '0 0 24px 0',
                fontSize: '32px',
                fontWeight: '800',
                color: colors.primary[700],
                textAlign: 'center'
              }}>
                📚 Covered Topics
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: spacing.md
              }}>
                {/* Performance Optimization */}
                <div style={{
                  background: colors.neutral[200],
                  padding: spacing.md,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.neutral[300]}`,
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = shadows.lg;
                    e.currentTarget.style.borderColor = colors.primary[500];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = colors.neutral[300];
                  }}>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.primary[600]
                  }}>
                    ⚡ Performance Optimization
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: colors.text.primary,
                    lineHeight: '1.8',
                    fontSize: '14px',
                    listStylePosition: 'outside'
                  }}>
                    <li style={{ marginBottom: '6px' }}><strong>useMemo</strong> - Memoize calculations</li>
                    <li style={{ marginBottom: '6px' }}><strong>useCallback</strong> - Memoize functions</li>
                    <li style={{ marginBottom: '0' }}><strong>React.memo</strong> - Memoize components</li>
                  </ul>
                </div>

                {/* Concurrent Features */}
                <div style={{
                  background: colors.neutral[200],
                  padding: spacing.md,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.neutral[300]}`,
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = shadows.lg;
                    e.currentTarget.style.borderColor = colors.secondary[500];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = colors.neutral[300];
                  }}>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.secondary[600]
                  }}>
                    🚀 Concurrent Features
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: colors.text.primary,
                    lineHeight: '1.8',
                    fontSize: '14px',
                    listStylePosition: 'outside'
                  }}>
                    <li style={{ marginBottom: '6px' }}><strong>useTransition</strong> - Non-blocking updates</li>
                    <li style={{ marginBottom: '6px' }}><strong>useDeferredValue</strong> - Defer updates</li>
                    <li style={{ marginBottom: '0' }}><strong>Suspense</strong> - Lazy loading</li>
                  </ul>
                </div>

                {/* State Management */}
                <div style={{
                  background: colors.neutral[200],
                  padding: spacing.md,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.neutral[300]}`,
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = shadows.lg;
                    e.currentTarget.style.borderColor = colors.accent.teal;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = colors.neutral[300];
                  }}>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.accent.teal
                  }}>
                    🌐 State Management
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: colors.text.primary,
                    lineHeight: '1.8',
                    fontSize: '14px',
                    listStylePosition: 'outside'
                  }}>
                    <li style={{ marginBottom: '6px' }}><strong>Context API</strong> - Global state</li>
                    <li style={{ marginBottom: '6px' }}><strong>Custom Hooks</strong> - Reusable logic</li>
                    <li style={{ marginBottom: '0' }}><strong>useDebounce</strong> - Optimized input</li>
                  </ul>
                </div>

                {/* Code Splitting */}
                <div style={{
                  background: colors.neutral[200],
                  padding: spacing.md,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.neutral[300]}`,
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = shadows.lg;
                    e.currentTarget.style.borderColor = colors.success;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = colors.neutral[300];
                  }}>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.success
                  }}>
                    📦 Code Splitting
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: colors.text.primary,
                    lineHeight: '1.8',
                    fontSize: '14px',
                    listStylePosition: 'outside'
                  }}>
                    <li style={{ marginBottom: '6px' }}><strong>React.lazy</strong> - Dynamic imports</li>
                    <li style={{ marginBottom: '6px' }}><strong>Suspense</strong> - Loading states</li>
                    <li style={{ marginBottom: '0' }}><strong>Bundle optimization</strong> - Smaller chunks</li>
                  </ul>
                </div>

                {/* Advanced Patterns */}
                <div style={{
                  background: colors.neutral[200],
                  padding: spacing.md,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.neutral[300]}`,
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = shadows.lg;
                    e.currentTarget.style.borderColor = colors.accent.pink;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = colors.neutral[300];
                  }}>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.accent.pink
                  }}>
                    🎨 Advanced Patterns
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: colors.text.primary,
                    lineHeight: '1.8',
                    fontSize: '14px',
                    listStylePosition: 'outside'
                  }}>
                    <li style={{ marginBottom: '6px' }}><strong>Portals</strong> - Render outside hierarchy</li>
                    <li style={{ marginBottom: '6px' }}><strong>HOC</strong> - Higher-Order Components</li>
                    <li style={{ marginBottom: '6px' }}><strong>Render Props</strong> - Share code via props</li>
                    <li style={{ marginBottom: '0' }}><strong>Compound Components</strong> - Component APIs</li>
                  </ul>
                </div>

                {/* React 19 New Features */}
                <div style={{
                  background: colors.neutral[200],
                  padding: spacing.md,
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.neutral[300]}`,
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = shadows.lg;
                    e.currentTarget.style.borderColor = colors.accent.orange;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = colors.neutral[300];
                  }}>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.accent.orange
                  }}>
                    🔮 React 19 Features
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: colors.text.primary,
                    lineHeight: '1.8',
                    fontSize: '14px',
                    listStylePosition: 'outside'
                  }}>
                    <li style={{ marginBottom: '6px' }}><strong>React Compiler</strong> - Auto-optimization (Enabled)</li>
                    <li style={{ marginBottom: '6px' }}><strong>use() Hook</strong> - Read resources in render</li>
                    <li style={{ marginBottom: '6px' }}><strong>useActionState</strong> - Form state management</li>
                    <li style={{ marginBottom: '0' }}><strong>useOptimistic</strong> - Optimistic UI updates</li>
                  </ul>
                </div>
              </div>

              {/* Summary Stats */}
              <div style={{
                marginTop: spacing.xl,
                padding: spacing.lg,
                background: gradients.primary,
                borderRadius: borderRadius.lg,
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: spacing.md,
                boxShadow: shadows.md
              }}>
                <div style={{ textAlign: 'center', color: colors.text.white }}>
                  <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: spacing.xs }}>React 19</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>Stable Release</div>
                </div>
                <div style={{ textAlign: 'center', color: colors.text.white }}>
                  <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: spacing.xs }}>18+</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>Features Covered</div>
                </div>
                <div style={{ textAlign: 'center', color: colors.text.white }}>
                  <div style={{ fontSize: '36px', fontWeight: '800', marginBottom: spacing.xs }}>✓</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>Compiler Enabled</div>
                </div>
              </div>
            </div>

            <MemoizationExamples />

            {/* Main Product Demo */}
            <DemoComponents />

            {/* Memoization Deep Dive */}


            {/* React 19 Features */}
            <React19Features />

            {/* Concurrent Features Section */}
            <div style={{ marginTop: spacing['2xl'] }}>
              <button
                onClick={() => setShowConcurrent(!showConcurrent)}
                style={{
                  width: '100%',
                  padding: spacing.lg,
                  fontSize: '20px',
                  background: showConcurrent ? gradients.secondary : colors.background.darkGray,
                  color: showConcurrent ? colors.text.white : colors.text.primary,
                  border: `2px solid ${colors.secondary[500]}`,
                  borderRadius: borderRadius.xl,
                  cursor: 'pointer',
                  fontWeight: '800',
                  transition: 'all 0.3s ease',
                  boxShadow: shadows.lg
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = shadows.xl;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = shadows.lg;
                }}
              >
                {showConcurrent ? '🔼 Hide' : '🔽 Show'} 🚀 Concurrent Features (useTransition, useDeferredValue, Suspense)
              </button>

              {showConcurrent && (
                <div style={{ marginTop: spacing.lg }}>
                  <ConcurrentFeatures />
                </div>
              )}
            </div>

            {/* Additional Feature Examples */}
            <div style={{ marginTop: spacing['2xl'] }}>
              <h2 style={{
                textAlign: 'center',
                fontSize: '36px',
                marginBottom: spacing.xl,
                fontWeight: '800',
                background: gradients.secondary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                🎯 Additional Advanced Patterns
              </h2>

              {/* Lazy Loading Section */}
              <div style={{ marginBottom: spacing.lg }}>
                <button
                  onClick={() => setShowLazy(!showLazy)}
                  style={buttonStyle(showLazy, gradients.primary)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = shadows.xl;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = shadows.md;
                  }}
                >
                  {showLazy ? '🔼 Hide' : '🔽 Show'} Code Splitting & Lazy Loading
                </button>

                {showLazy && (
                  <>
                    {/* <HeavyComponent />
                    <ChartComponent /> */}
                    <LazyLoadExample showHeavy={showHeavy} showChart={showChart} />
                    <div style={{ display: 'flex', gap: spacing.sm, marginTop: spacing.sm }}>
                      <button
                        onClick={() => setShowHeavy(!showHeavy)}
                        style={{
                          flex: 1,
                          padding: spacing.sm,
                          background: showHeavy ? gradients.success : colors.background.darkGray,
                          color: showHeavy ? colors.text.white : colors.text.primary,
                          border: `1px solid ${colors.primary[300]}`,
                          borderRadius: borderRadius.lg,
                          cursor: 'pointer',
                          fontWeight: '700',
                          boxShadow: shadows.sm,
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        {showHeavy ? '✅ Hide' : '📦 Load'} Heavy Component
                      </button>
                      <button
                        onClick={() => setShowChart(!showChart)}
                        style={{
                          flex: 1,
                          padding: spacing.sm,
                          background: showChart ? gradients.orange : colors.background.darkGray,
                          color: showChart ? colors.text.white : colors.text.primary,
                          border: `1px solid ${colors.accent.orange}40`,
                          borderRadius: borderRadius.lg,
                          cursor: 'pointer',
                          fontWeight: '700',
                          boxShadow: shadows.sm,
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        {showChart ? '✅ Hide' : '📊 Load'} Chart Component
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Portals */}
              <PortalExample />

              {/* HOC */}
              <HOCExample />

              {/* Render Props */}
              <RenderPropsExample />

              {/* Compound Components */}
              <CompoundComponentsExample />

              <CompilerTest />
            </div>

            {/* Footer */}
            <div style={{
              textAlign: 'center',
              padding: spacing.xl,
              marginTop: spacing['2xl'],
              background: colors.background.darkGray,
              borderRadius: borderRadius.xl,
              boxShadow: shadows.lg,
              border: `1px solid ${colors.neutral[300]}`
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '800',
                margin: '0 0 16px 0',
                color: colors.text.primary
              }}>
                📚 Documentation Available
              </h3>
              <p style={{
                color: colors.text.secondary,
                fontSize: '16px',
                marginBottom: spacing.md
              }}>
                Check out the following files for detailed documentation:
              </p>
              <div style={{
                display: 'flex',
                gap: spacing.md,
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: spacing.lg
              }}>
                <div style={{
                  padding: spacing.md,
                  background: colors.neutral[200],
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.primary[400]}`,
                  flex: '1 1 300px',
                  maxWidth: '400px'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: spacing.xs }}>📄</div>
                  <code style={{
                    fontWeight: '700',
                    color: colors.primary[600],
                    fontSize: '14px'
                  }}>
                    REACT_ADVANCED_FEATURES.md
                  </code>
                  <p style={{
                    margin: '8px 0 0 0',
                    color: colors.text.secondary,
                    fontSize: '14px'
                  }}>
                    Complete guide with examples
                  </p>
                </div>
                <div style={{
                  padding: spacing.md,
                  background: colors.neutral[200],
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${colors.secondary[500]}`,
                  flex: '1 1 300px',
                  maxWidth: '400px'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: spacing.xs }}>📊</div>
                  <code style={{
                    fontWeight: '700',
                    color: colors.secondary[600],
                    fontSize: '14px'
                  }}>
                    PRESENTATION_SLIDES.md
                  </code>
                  <p style={{
                    margin: '8px 0 0 0',
                    color: colors.text.secondary,
                    fontSize: '14px'
                  }}>
                    40-slide presentation guide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
