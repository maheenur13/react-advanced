import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { colors, shadows, borderRadius, spacing } from '../theme/design-system';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

// Example: Error Boundary for catching errors in component tree
class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div style={{
                    padding: spacing.xl,
                    margin: spacing.lg,
                    border: `2px solid ${colors.error}`,
                    borderRadius: borderRadius.xl,
                    backgroundColor: colors.neutral[200],
                    color: colors.error,
                    boxShadow: shadows.lg
                }}>
                    <h2 style={{
                        margin: '0 0 16px 0',
                        fontSize: '28px',
                        fontWeight: '800'
                    }}>⚠️ Something went wrong!</h2>
                    <details style={{
                        whiteSpace: 'pre-wrap',
                        marginTop: spacing.md,
                        color: colors.text.primary
                    }}>
                        <summary style={{
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '16px',
                            marginBottom: spacing.sm
                        }}>Error Details</summary>
                        <p style={{
                            background: colors.neutral[100],
                            padding: spacing.md,
                            borderRadius: borderRadius.md,
                            border: `1px solid ${colors.neutral[300]}`,
                            color: colors.text.secondary
                        }}>
                            {this.state.error?.toString()}
                        </p>
                    </details>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        style={{
                            marginTop: spacing.lg,
                            padding: `${spacing.sm} ${spacing.lg}`,
                            backgroundColor: colors.error,
                            color: colors.text.white,
                            border: 'none',
                            borderRadius: borderRadius.lg,
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '16px',
                            boxShadow: shadows.md
                        }}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

