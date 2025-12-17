import { useState } from 'react';
import { colors, shadows, borderRadius, spacing } from '../theme/design-system';

// Example: Higher-Order Component (HOC)
// A function that takes a component and returns a new component with additional props/behavior

// HOC that adds loading state to any component
function withLoading<P extends object>(
    Component: React.ComponentType<P>,
    loadingMessage: string = 'Loading...'
) {
    return function WithLoadingComponent(props: P & { isLoading?: boolean }) {
        const { isLoading, ...rest } = props;

        if (isLoading) {
            return (
                <div style={{
                    padding: spacing.xl,
                    textAlign: 'center',
                    background: colors.neutral[100],
                    borderRadius: borderRadius.lg,
                    border: `2px dashed ${colors.neutral[400]}`,
                    boxShadow: shadows.md
                }}>
                    <div style={{ fontSize: '32px', marginBottom: spacing.sm }}>⏳</div>
                    <div style={{
                        color: colors.text.primary,
                        fontWeight: '600',
                        fontSize: '16px'
                    }}>{loadingMessage}</div>
                </div>
            );
        }

        return <Component {...(rest as P)} />;
    };
}

// HOC that adds error boundary to any component
function withErrorHandling<P extends object>(
    Component: React.ComponentType<P>
) {
    return function WithErrorHandlingComponent(props: P & { error?: string }) {
        const { error, ...rest } = props;

        if (error) {
            return (
                <div style={{
                    padding: spacing.lg,
                    background: colors.error + '15',
                    border: `2px solid ${colors.error}`,
                    borderRadius: borderRadius.lg,
                    color: colors.error,
                    boxShadow: shadows.md
                }}>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '800' }}>
                        ⚠️ Error Occurred
                    </h3>
                    <p style={{ margin: 0, fontSize: '16px' }}>{error}</p>
                </div>
            );
        }

        return <Component {...(rest as P)} />;
    };
}

// HOC that adds authentication check
function withAuth<P extends object>(
    Component: React.ComponentType<P>
) {
    return function WithAuthComponent(props: P & { isAuthenticated?: boolean }) {
        const { isAuthenticated, ...rest } = props;

        if (!isAuthenticated) {
            return (
                <div style={{
                    padding: spacing.xl,
                    textAlign: 'center',
                    background: colors.warning + '15',
                    border: `2px solid ${colors.warning}`,
                    borderRadius: borderRadius.lg,
                    boxShadow: shadows.md
                }}>
                    <div style={{ fontSize: '48px', marginBottom: spacing.sm }}>🔒</div>
                    <h3 style={{
                        margin: '0 0 12px 0',
                        fontSize: '20px',
                        fontWeight: '800',
                        color: colors.text.primary
                    }}>Authentication Required</h3>
                    <p style={{ margin: 0, color: colors.text.secondary, fontSize: '16px' }}>
                        Please log in to view this content.
                    </p>
                </div>
            );
        }

        return <Component {...(rest as P)} />;
    };
}

// Example component to enhance with HOCs
interface UserDataProps {
    name: string;
    email: string;
    role: string;
}

const UserData = ({ name, email, role }: UserDataProps) => (
    <div style={{
        padding: spacing.lg,
        background: colors.info + '15',
        borderRadius: borderRadius.lg,
        border: `2px solid ${colors.info}40`,
        boxShadow: shadows.sm
    }}>
        <h3 style={{
            margin: '0 0 16px 0',
            fontSize: '20px',
            fontWeight: '800',
            color: colors.info
        }}>👤 User Profile</h3>
        <p style={{ margin: '8px 0', color: colors.text.primary }}>
            <strong>Name:</strong> {name}
        </p>
        <p style={{ margin: '8px 0', color: colors.text.primary }}>
            <strong>Email:</strong> {email}
        </p>
        <p style={{ margin: '8px 0', color: colors.text.primary }}>
            <strong>Role:</strong> {role}
        </p>
    </div>
);

// Apply HOCs - can chain multiple HOCs
const UserDataWithLoading = withLoading(UserData, 'Loading user data...');
const UserDataWithError = withErrorHandling(UserDataWithLoading);
const UserDataWithAuth = withAuth(UserDataWithError);

// Demo component
const HOCExample = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [hasError, setHasError] = useState(false);

    const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Developer'
    };

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
                color: colors.accent.orange
            }}>🎭 Higher-Order Components (HOC) Example</h2>
            <p style={{
                color: colors.text.secondary,
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: spacing.lg
            }}>
                HOCs are functions that take a component and return a new enhanced component.
                They're used for cross-cutting concerns like loading, auth, error handling.
            </p>

            <div style={{ display: 'flex', gap: spacing.sm, margin: `${spacing.lg} 0`, flexWrap: 'wrap' }}>
                <button
                    onClick={() => setIsLoading(!isLoading)}
                    style={{
                        padding: `${spacing.sm} ${spacing.lg}`,
                        background: isLoading ? colors.error : colors.success,
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.lg,
                        cursor: 'pointer',
                        fontWeight: '700',
                        boxShadow: shadows.sm,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {isLoading ? 'Stop Loading' : 'Show Loading'}
                </button>

                <button
                    onClick={() => setIsAuthenticated(!isAuthenticated)}
                    style={{
                        padding: `${spacing.sm} ${spacing.lg}`,
                        background: isAuthenticated ? colors.error : colors.success,
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.lg,
                        cursor: 'pointer',
                        fontWeight: '700',
                        boxShadow: shadows.sm,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {isAuthenticated ? 'Logout' : 'Login'}
                </button>

                <button
                    onClick={() => setHasError(!hasError)}
                    style={{
                        padding: `${spacing.sm} ${spacing.lg}`,
                        background: hasError ? colors.success : colors.error,
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.lg,
                        cursor: 'pointer',
                        fontWeight: '700',
                        boxShadow: shadows.sm,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {hasError ? 'Clear Error' : 'Simulate Error'}
                </button>
            </div>

            <UserDataWithAuth
                {...userData}
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
                error={hasError ? 'Failed to load user data. Please try again.' : undefined}
            />

            <div style={{
                marginTop: spacing.lg,
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
                }}>🎯 HOC Benefits:</h4>
                <ul style={{
                    margin: '0',
                    paddingLeft: spacing.lg,
                    color: colors.text.primary,
                    lineHeight: '1.8'
                }}>
                    <li>Reuse component logic</li>
                    <li>Compose multiple behaviors</li>
                    <li>Separate concerns</li>
                    <li>Props manipulation</li>
                </ul>
            </div>

            <div style={{
                marginTop: spacing.md,
                padding: spacing.md,
                background: colors.secondary[50],
                borderRadius: borderRadius.lg,
                border: `2px solid ${colors.secondary[200]}`
            }}>
                <h4 style={{
                    margin: '0 0 12px 0',
                    color: colors.secondary[700],
                    fontSize: '18px',
                    fontWeight: '700'
                }}>💡 Modern Alternative:</h4>
                <p style={{ margin: 0, color: colors.text.secondary, lineHeight: '1.6' }}>
                    While HOCs are still valid, React Hooks (like custom hooks) are now
                    the preferred way to share logic between components in most cases.
                </p>
            </div>
        </div>
    );
};

export default HOCExample;
