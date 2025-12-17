import { useState } from 'react';
import { createPortal } from 'react-dom';
import { colors, shadows, borderRadius, spacing, gradients } from '../theme/design-system';

// Example: Portals - Render children into a DOM node outside parent hierarchy
// Useful for modals, tooltips, dropdowns

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    // Portal renders this component outside the normal DOM hierarchy
    // It will be rendered into document.body instead of parent component
    return createPortal(
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{
                backgroundColor: colors.background.darkGray,
                padding: spacing.xl,
                borderRadius: borderRadius.xl,
                maxWidth: '600px',
                width: '90%',
                maxHeight: '85vh',
                overflow: 'auto',
                boxShadow: shadows['2xl']
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: spacing.lg,
                    borderBottom: `2px solid ${colors.neutral[200]}`,
                    paddingBottom: spacing.md
                }}>
                    <h2 style={{
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: '800',
                        color: colors.text.primary
                    }}>{title}</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: colors.neutral[100],
                            border: 'none',
                            fontSize: '28px',
                            cursor: 'pointer',
                            padding: '8px 14px',
                            borderRadius: borderRadius.md,
                            color: colors.text.secondary,
                            transition: 'all 0.2s ease',
                            fontWeight: '700',
                            lineHeight: '1'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = colors.error;
                            e.currentTarget.style.color = colors.text.white;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = colors.neutral[100];
                            e.currentTarget.style.color = colors.text.secondary;
                        }}
                    >
                        ×
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>,
        document.body // Portal target - renders outside parent component
    );
};

const PortalExample = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

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
                color: colors.secondary[700]
            }}>🚪 React Portals Example</h2>
            <p style={{
                color: colors.text.secondary,
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: spacing.lg
            }}>
                Portals provide a way to render children into a DOM node that exists
                outside the DOM hierarchy of the parent component.
            </p>

            <div style={{ display: 'flex', gap: spacing.sm, marginTop: spacing.lg, flexWrap: 'wrap' }}>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        padding: `${spacing.sm} ${spacing.lg}`,
                        background: gradients.primary,
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.lg,
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '700',
                        boxShadow: shadows.md,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    Open Modal (Portal)
                </button>

                <button
                    onClick={() => setIsSecondModalOpen(true)}
                    style={{
                        padding: `${spacing.sm} ${spacing.lg}`,
                        background: gradients.secondary,
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.lg,
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '700',
                        boxShadow: shadows.md,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    Open Second Modal
                </button>
            </div>

            <div style={{
                marginTop: spacing.lg,
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
                }}>Why Use Portals?</h4>
                <ul style={{
                    margin: '0',
                    paddingLeft: spacing.lg,
                    color: colors.text.primary,
                    lineHeight: '1.8'
                }}>
                    <li>Render modals at document.body level</li>
                    <li>Avoid z-index and overflow issues</li>
                    <li>Better for tooltips and dropdowns</li>
                    <li>Event bubbling still works through React tree</li>
                </ul>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="🎯 Portal Modal Example"
            >
                <p style={{
                    color: colors.text.secondary,
                    fontSize: '16px',
                    lineHeight: '1.6'
                }}>
                    This modal is rendered using <code style={{
                        background: colors.primary[50],
                        padding: '2px 6px',
                        borderRadius: borderRadius.sm,
                        color: colors.primary[700],
                        fontWeight: '600'
                    }}>createPortal()</code>!
                </p>
                <p style={{
                    color: colors.text.secondary,
                    fontSize: '16px',
                    lineHeight: '1.6'
                }}>
                    Even though the Modal component is defined inside PortalExample,
                    it's actually rendered directly into <code style={{
                        background: colors.primary[50],
                        padding: '2px 6px',
                        borderRadius: borderRadius.sm,
                        color: colors.primary[700],
                        fontWeight: '600'
                    }}>document.body</code>.
                </p>
                <div style={{
                    background: colors.primary[50],
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    marginTop: spacing.md,
                    border: `2px solid ${colors.primary[200]}`
                }}>
                    <strong style={{ color: colors.primary[700], fontSize: '16px' }}>Key Benefits:</strong>
                    <ul style={{ marginTop: spacing.xs, paddingLeft: spacing.lg, color: colors.text.primary }}>
                        <li>No CSS overflow conflicts</li>
                        <li>Proper z-index stacking</li>
                        <li>Accessibility improvements</li>
                        <li>Clean component hierarchy</li>
                    </ul>
                </div>
                <button
                    onClick={() => setIsModalOpen(false)}
                    style={{
                        marginTop: spacing.lg,
                        padding: `${spacing.sm} ${spacing.lg}`,
                        background: colors.success,
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.lg,
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '16px',
                        fontWeight: '700',
                        boxShadow: shadows.md
                    }}
                >
                    Close Modal
                </button>
            </Modal>

            <Modal
                isOpen={isSecondModalOpen}
                onClose={() => setIsSecondModalOpen(false)}
                title="🔥 Multiple Portals Work Too!"
            >
                <p style={{ color: colors.text.secondary, fontSize: '16px' }}>
                    You can have multiple portals active at the same time.
                </p>
                <p style={{ color: colors.text.secondary, fontSize: '16px' }}>
                    Each portal renders independently into document.body.
                </p>
                <div style={{
                    background: colors.accent.yellow + '20',
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    marginTop: spacing.md,
                    border: `2px solid ${colors.accent.yellow}60`
                }}>
                    <strong style={{ color: colors.accent.orange, fontSize: '16px' }}>💡 Pro Tip:</strong>
                    <p style={{ marginTop: spacing.xs, color: colors.text.primary }}>
                        Use portals for any UI element that needs to "break out"
                        of its parent container's styling constraints.
                    </p>
                </div>
                <button
                    onClick={() => setIsSecondModalOpen(false)}
                    style={{
                        marginTop: spacing.lg,
                        padding: `${spacing.sm} ${spacing.lg}`,
                        background: gradients.secondary,
                        color: colors.text.white,
                        border: 'none',
                        borderRadius: borderRadius.lg,
                        cursor: 'pointer',
                        width: '100%',
                        fontSize: '16px',
                        fontWeight: '700',
                        boxShadow: shadows.md
                    }}
                >
                    Close This Modal
                </button>
            </Modal>
        </div>
    );
};

export default PortalExample;
