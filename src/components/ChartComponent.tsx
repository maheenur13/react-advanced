import { colors, shadows, borderRadius, spacing } from '../theme/design-system';

// Chart component that simulates a data visualization library
// This would be lazy-loaded to reduce initial bundle size

const ChartComponent = () => {
    const data = [
        { month: 'Jan', sales: 4000, expenses: 2400 },
        { month: 'Feb', sales: 3000, expenses: 1398 },
        { month: 'Mar', sales: 2000, expenses: 9800 },
        { month: 'Apr', sales: 2780, expenses: 3908 },
        { month: 'May', sales: 1890, expenses: 4800 },
        { month: 'Jun', sales: 2390, expenses: 3800 },
    ];

    const maxValue = Math.max(...data.map(d => Math.max(d.sales, d.expenses)));

    return (
        <div style={{
            padding: spacing.lg,
            background: colors.accent.yellow + '20',
            borderRadius: borderRadius.lg,
            margin: `${spacing.sm} 0`,
            border: `2px solid ${colors.accent.orange}60`,
            boxShadow: shadows.md
        }}>
            <h3 style={{
                margin: '0 0 12px 0',
                color: colors.accent.orange,
                fontSize: '20px',
                fontWeight: '800'
            }}>📊 Chart Component Loaded!</h3>
            <p style={{
                color: colors.text.secondary,
                margin: '0 0 16px 0',
                lineHeight: '1.6'
            }}>
                This chart component was lazy-loaded. In a real app, this could be a heavy library like Chart.js or D3.
            </p>

            <div style={{ marginTop: spacing.lg }}>
                {data.map((item, index) => (
                    <div key={index} style={{ marginBottom: spacing.md }}>
                        <div style={{
                            fontWeight: '700',
                            marginBottom: spacing.xs,
                            color: colors.text.primary,
                            fontSize: '16px'
                        }}>{item.month}</div>
                        <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'center' }}>
                            <div style={{
                                width: '80px',
                                fontSize: '14px',
                                color: colors.text.secondary,
                                fontWeight: '600'
                            }}>Sales:</div>
                            <div style={{
                                height: '24px',
                                background: colors.success,
                                width: `${(item.sales / maxValue) * 300}px`,
                                borderRadius: borderRadius.md,
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: spacing.xs,
                                color: colors.text.white,
                                fontSize: '13px',
                                fontWeight: '700',
                                boxShadow: shadows.sm
                            }}>
                                ${item.sales}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'center', marginTop: spacing.xs }}>
                            <div style={{
                                width: '80px',
                                fontSize: '14px',
                                color: colors.text.secondary,
                                fontWeight: '600'
                            }}>Expenses:</div>
                            <div style={{
                                height: '24px',
                                background: colors.error,
                                width: `${(item.expenses / maxValue) * 300}px`,
                                borderRadius: borderRadius.md,
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: spacing.xs,
                                color: colors.text.white,
                                fontSize: '13px',
                                fontWeight: '700',
                                boxShadow: shadows.sm
                            }}>
                                ${item.expenses}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartComponent;
