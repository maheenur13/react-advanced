import { useState } from 'react';
import { colors, shadows, borderRadius, spacing, gradients } from '../theme/design-system';

// Example: Render Props Pattern
// A component with a function as a child that receives data/logic

interface MousePosition {
    x: number;
    y: number;
}

interface MouseTrackerProps {
    render: (position: MousePosition) => React.ReactNode;
}

// Component that tracks mouse position and shares it via render prop
const MouseTracker = ({ render }: MouseTrackerProps) => {
    const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            style={{
                height: '300px',
                background: gradients.primary,
                borderRadius: borderRadius.lg,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'crosshair',
                boxShadow: shadows.lg
            }}
        >
            {render(position)}
        </div>
    );
};

// Example: Data fetcher with render props
interface DataFetcherProps<T> {
    data: T[];
    render: (data: T[], isLoading: boolean) => React.ReactNode;
}

function DataFetcher<T>({ data, render }: DataFetcherProps<T>) {
    const [isLoading] = useState(false);
    return <>{render(data, isLoading)}</>;
}

const RenderPropsExample = () => {
    const sampleData = [
        { id: 1, name: 'React', category: 'Frontend' },
        { id: 2, name: 'Node.js', category: 'Backend' },
        { id: 3, name: 'TypeScript', category: 'Language' },
    ];

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
                color: colors.accent.pink
            }}>🎨 Render Props Pattern</h2>

            {/* Detailed Explanation Section */}
            <div style={{
                background: colors.accent.pink + '20',
                padding: spacing.lg,
                borderRadius: borderRadius.lg,
                marginBottom: spacing.lg,
                border: `2px solid ${colors.accent.pink}60`
            }}>
                <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.accent.pink
                }}>
                    📚 What is Render Props?
                </h3>
                <p style={{
                    color: colors.text.primary,
                    fontSize: '15px',
                    lineHeight: '1.7',
                    margin: '0 0 16px 0'
                }}>
                    <strong>Render Props</strong> is a technique for sharing code between React components using a prop
                    whose value is a function. A component with a render prop takes a function that returns a React element
                    and calls it instead of implementing its own render logic.
                </p>

                <h3 style={{
                    margin: '16px 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.accent.pink
                }}>
                    🎯 How It Works
                </h3>
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.md,
                    marginBottom: spacing.md,
                    border: `1px solid ${colors.accent.pink}40`
                }}>
                    <p style={{
                        color: colors.text.primary,
                        fontSize: '15px',
                        lineHeight: '1.7',
                        margin: '0 0 12px 0'
                    }}>
                        <strong>Step 1: Parent Component Manages State/Logic</strong>
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '0',
                        fontSize: '13px',
                        fontFamily: 'monospace'
                    }}>
                        {`const MouseTracker = ({ render }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div onMouseMove={handleMove}>
      {render(position)} {/* Pass data to function */}
    </div>
  );
};`}
                    </pre>
                </div>

                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.md,
                    marginBottom: spacing.md,
                    border: `1px solid ${colors.accent.pink}40`
                }}>
                    <p style={{
                        color: colors.text.primary,
                        fontSize: '15px',
                        lineHeight: '1.7',
                        margin: '0 0 12px 0'
                    }}>
                        <strong>Step 2: Child Defines Rendering Logic</strong>
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '0',
                        fontSize: '13px',
                        fontFamily: 'monospace'
                    }}>
                        {`<MouseTracker 
  render={({ x, y }) => (
    <div>
      Mouse at: {x}, {y}
    </div>
  )}
/>`}
                    </pre>
                </div>

                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.md,
                    marginBottom: spacing.md,
                    border: `1px solid ${colors.accent.pink}40`
                }}>
                    <p style={{
                        color: colors.text.primary,
                        fontSize: '15px',
                        lineHeight: '1.7',
                        margin: '0 0 12px 0'
                    }}>
                        <strong>Step 3: Different Renders with Same Logic</strong>
                    </p>
                    <pre style={{
                        background: colors.neutral[100],
                        color: colors.text.white,
                        padding: spacing.sm,
                        borderRadius: borderRadius.sm,
                        overflow: 'auto',
                        margin: '0',
                        fontSize: '13px',
                        fontFamily: 'monospace'
                    }}>
                        {`// Same tracker, different UI!
<MouseTracker render={({ x, y }) => (
  <h1>Position: ({x}, {y})</h1>
)} />

<MouseTracker render={({ x, y }) => (
  <Circle x={x} y={y} />
)} />

<MouseTracker render={({ x, y }) => (
  <img src="cat.jpg" style={{ left: x, top: y }} />
)} />`}
                    </pre>
                </div>

                <h3 style={{
                    margin: '16px 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.accent.pink
                }}>
                    ✨ Key Benefits
                </h3>
                <ul style={{
                    color: colors.text.primary,
                    fontSize: '15px',
                    lineHeight: '1.8',
                    margin: '0 0 12px 0',
                    paddingLeft: spacing.lg
                }}>
                    <li><strong>Separation of Concerns:</strong> Logic in parent, UI in child</li>
                    <li><strong>Flexibility:</strong> Same logic, unlimited UI variations</li>
                    <li><strong>Explicit Data Flow:</strong> Clear what data is shared</li>
                    <li><strong>Composable:</strong> Can nest multiple render props</li>
                    <li><strong>Type-Safe:</strong> TypeScript can infer render prop types</li>
                </ul>

                <h3 style={{
                    margin: '16px 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.accent.pink
                }}>
                    🔄 Complete Flow
                </h3>
                <div style={{
                    background: colors.accent.coral + '20',
                    padding: spacing.md,
                    borderRadius: borderRadius.md,
                    border: `2px solid ${colors.accent.coral}60`
                }}>
                    <ol style={{
                        color: colors.text.primary,
                        fontSize: '15px',
                        lineHeight: '1.8',
                        margin: '0',
                        paddingLeft: spacing.lg
                    }}>
                        <li><strong>Component receives render prop</strong> (function as prop)</li>
                        <li><strong>Component manages internal state</strong> (e.g., mouse position)</li>
                        <li><strong>Component calls render prop</strong> with current state</li>
                        <li><strong>Render prop returns JSX</strong> using provided data</li>
                        <li><strong>Component renders the result</strong></li>
                        <li><strong>On state change, repeat</strong> steps 3-5</li>
                    </ol>
                </div>

                <h3 style={{
                    margin: '16px 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.accent.pink
                }}>
                    🆚 Render Props vs Other Patterns
                </h3>
                <div style={{
                    background: colors.neutral[200],
                    padding: spacing.md,
                    borderRadius: borderRadius.md,
                    border: `1px solid ${colors.neutral[300]}`
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '14px'
                    }}>
                        <thead>
                            <tr style={{ background: colors.accent.pink + '30' }}>
                                <th style={{
                                    padding: spacing.sm,
                                    textAlign: 'left',
                                    color: colors.text.primary,
                                    fontWeight: '700',
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>Pattern</th>
                                <th style={{
                                    padding: spacing.sm,
                                    textAlign: 'left',
                                    color: colors.text.primary,
                                    fontWeight: '700',
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>Pros</th>
                                <th style={{
                                    padding: spacing.sm,
                                    textAlign: 'left',
                                    color: colors.text.primary,
                                    fontWeight: '700',
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>Cons</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{
                                    padding: spacing.sm,
                                    color: colors.text.primary,
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>
                                    <strong>Render Props</strong>
                                </td>
                                <td style={{
                                    padding: spacing.sm,
                                    color: colors.text.primary,
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>
                                    Explicit, Flexible
                                </td>
                                <td style={{
                                    padding: spacing.sm,
                                    color: colors.text.primary,
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>
                                    Callback hell, Verbose
                                </td>
                            </tr>
                            <tr style={{ background: colors.neutral[50] }}>
                                <td style={{
                                    padding: spacing.sm,
                                    color: colors.text.primary,
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>
                                    <strong>HOC</strong>
                                </td>
                                <td style={{
                                    padding: spacing.sm,
                                    color: colors.text.primary,
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>
                                    Composable, Reusable
                                </td>
                                <td style={{
                                    padding: spacing.sm,
                                    color: colors.text.primary,
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>
                                    Wrapper hell, Props collision
                                </td>
                            </tr>
                            <tr>
                                <td style={{
                                    padding: spacing.sm,
                                    color: colors.text.primary,
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>
                                    <strong>Custom Hooks</strong>
                                </td>
                                <td style={{
                                    padding: spacing.sm,
                                    color: colors.text.primary,
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>
                                    Simple, Clean, Modern ⭐
                                </td>
                                <td style={{
                                    padding: spacing.sm,
                                    color: colors.text.primary,
                                    border: `1px solid ${colors.neutral[300]}`
                                }}>
                                    Can't share UI, Only hooks
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <p style={{
                color: colors.text.secondary,
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: spacing.lg,
                fontWeight: '600'
            }}>
                🎮 Interactive examples below demonstrate the pattern in action:
            </p>

            <div style={{ marginTop: spacing.lg }}>
                <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.text.primary
                }}>Example 1: Mouse Tracker</h3>
                <p style={{ color: colors.text.secondary, marginBottom: spacing.sm }}>
                    Move your mouse over the colored area:
                </p>

                <MouseTracker
                    render={({ x, y }) => (
                        <>
                            <div style={{
                                position: 'absolute',
                                top: `${y}px`,
                                left: `${x}px`,
                                width: '20px',
                                height: '20px',
                                background: colors.text.white,
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                                boxShadow: shadows.lg
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: spacing.lg,
                                left: spacing.lg,
                                color: colors.text.white,
                                background: 'rgba(0,0,0,0.6)',
                                padding: `${spacing.sm} ${spacing.md}`,
                                borderRadius: borderRadius.md,
                                fontFamily: 'monospace',
                                fontWeight: '700',
                                backdropFilter: 'blur(4px)'
                            }}>
                                Mouse Position: ({Math.round(x)}, {Math.round(y)})
                            </div>
                        </>
                    )}
                />
            </div>

            <div style={{ marginTop: spacing.xl }}>
                <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.text.primary
                }}>Example 2: Data Renderer</h3>
                <DataFetcher
                    data={sampleData}
                    render={(data, isLoading) => (
                        <div>
                            {isLoading ? (
                                <p style={{ color: colors.text.secondary }}>Loading...</p>
                            ) : (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: spacing.md,
                                    marginTop: spacing.md
                                }}>
                                    {data.map((item) => (
                                        <div
                                            key={item.id}
                                            style={{
                                                padding: spacing.md,
                                                background: colors.accent.coral + '30',
                                                borderRadius: borderRadius.lg,
                                                border: `2px solid ${colors.accent.coral}`,
                                                boxShadow: shadows.sm
                                            }}
                                        >
                                            <h4 style={{
                                                margin: '0 0 10px 0',
                                                color: colors.text.primary,
                                                fontSize: '18px',
                                                fontWeight: '700'
                                            }}>{item.name}</h4>
                                            <span style={{
                                                background: colors.accent.coral,
                                                color: colors.text.white,
                                                padding: '6px 12px',
                                                borderRadius: borderRadius.md,
                                                fontSize: '14px',
                                                fontWeight: '600'
                                            }}>
                                                {item.category}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                />
            </div>

            <div style={{
                marginTop: spacing.lg,
                padding: spacing.md,
                background: colors.accent.pink + '20',
                borderRadius: borderRadius.lg,
                border: `2px solid ${colors.accent.pink}60`
            }}>
                <h4 style={{
                    margin: '0 0 12px 0',
                    color: colors.accent.pink,
                    fontSize: '18px',
                    fontWeight: '700'
                }}>🎯 Render Props Benefits:</h4>
                <ul style={{
                    margin: '0',
                    paddingLeft: spacing.lg,
                    color: colors.text.primary,
                    lineHeight: '1.8'
                }}>
                    <li>Share complex logic between components</li>
                    <li>More flexible than HOCs</li>
                    <li>Explicit data flow</li>
                    <li>Dynamic rendering based on state</li>
                </ul>
            </div>

            <div style={{
                marginTop: spacing.md,
                padding: spacing.md,
                background: colors.accent.yellow + '20',
                borderRadius: borderRadius.lg,
                border: `2px solid ${colors.accent.yellow}60`
            }}>
                <h4 style={{
                    margin: '0 0 12px 0',
                    color: colors.accent.orange,
                    fontSize: '18px',
                    fontWeight: '700'
                }}>💡 Modern Alternative:</h4>
                <p style={{ margin: 0, color: colors.text.primary, lineHeight: '1.6' }}>
                    Custom hooks are now preferred over render props for most use cases,
                    as they're simpler and more composable. However, render props are still
                    useful for components that need to render different UI based on shared logic.
                </p>
            </div>
        </div>
    );
};

export default RenderPropsExample;
