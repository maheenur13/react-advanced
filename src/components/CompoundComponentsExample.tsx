import React, { useState } from 'react';
import { colors, shadows, borderRadius, spacing } from '../theme/design-system';

// Example: Compound Components Pattern
// Components that work together to form a complete UI

interface TabsContextValue {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

// Parent Tabs component
const Tabs = ({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div style={{
                border: `2px solid ${colors.accent.teal}`,
                borderRadius: borderRadius.lg,
                overflow: 'hidden',
                background: colors.background.darkGray,
                boxShadow: shadows.md
            }}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

// Tab List component
const TabList = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{
            display: 'flex',
            background: colors.accent.teal + '20',
            borderBottom: `2px solid ${colors.accent.teal}`
        }}>
            {children}
        </div>
    );
};

// Individual Tab component
const Tab = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error('Tab must be used within Tabs');

    const { activeTab, setActiveTab } = context;
    const isActive = activeTab === id;

    return (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                padding: `${spacing.md} ${spacing.xl}`,
                border: 'none',
                background: isActive ? colors.accent.teal : 'transparent',
                color: isActive ? colors.text.white : colors.text.primary,
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: isActive ? '800' : '600',
                transition: 'all 0.3s ease',
                flex: 1
            }}
            onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = colors.accent.teal + '30';
            }}
            onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
            }}
        >
            {children}
        </button>
    );
};

// Tab Panels container
const TabPanels = ({ children }: { children: React.ReactNode }) => {
    return <div style={{ padding: spacing.lg, background: colors.background.darkGray }}>{children}</div>;
};

// Individual Tab Panel
const TabPanel = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error('TabPanel must be used within Tabs');

    const { activeTab } = context;
    if (activeTab !== id) return null;

    return <div style={{ color: colors.text.primary }}>{children}</div>;
};

// Attach compound components to Tabs
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

// Example usage component
const CompoundComponentsExample = () => {
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
                color: colors.accent.teal
            }}>🧩 Compound Components Pattern</h2>
            <p style={{
                color: colors.text.secondary,
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: spacing.lg
            }}>
                Compound components are a set of components that work together to form a complete UI.
                They share implicit state and work as a single unit.
            </p>

            <div style={{ marginTop: spacing.lg }}>
                <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: colors.text.primary
                }}>Example: Tab Component</h3>

                <Tabs defaultTab="overview">
                    <Tabs.TabList>
                        <Tabs.Tab id="overview">Overview</Tabs.Tab>
                        <Tabs.Tab id="features">Features</Tabs.Tab>
                        <Tabs.Tab id="pricing">Pricing</Tabs.Tab>
                    </Tabs.TabList>

                    <Tabs.TabPanels>
                        <Tabs.TabPanel id="overview">
                            <h3 style={{
                                margin: '0 0 12px 0',
                                fontSize: '20px',
                                fontWeight: '700',
                                color: colors.text.primary
                            }}>📋 Overview</h3>
                            <p style={{ color: colors.text.secondary, lineHeight: '1.6' }}>
                                This is a tab panel built using the compound components pattern.
                                The Tab and TabPanel components communicate through React Context
                                without prop drilling.
                            </p>
                            <div style={{
                                background: colors.accent.teal + '20',
                                padding: spacing.md,
                                borderRadius: borderRadius.lg,
                                marginTop: spacing.md,
                                border: `2px solid ${colors.accent.teal}60`
                            }}>
                                <strong style={{
                                    color: colors.accent.teal,
                                    fontSize: '16px'
                                }}>Key Benefits:</strong>
                                <ul style={{
                                    marginTop: spacing.xs,
                                    paddingLeft: spacing.lg,
                                    color: colors.text.primary,
                                    lineHeight: '1.8'
                                }}>
                                    <li>Clean, declarative API</li>
                                    <li>Flexible component composition</li>
                                    <li>Implicit state sharing</li>
                                    <li>Intuitive to use</li>
                                </ul>
                            </div>
                        </Tabs.TabPanel>

                        <Tabs.TabPanel id="features">
                            <h3 style={{
                                margin: '0 0 16px 0',
                                fontSize: '20px',
                                fontWeight: '700',
                                color: colors.text.primary
                            }}>✨ Features</h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: spacing.md,
                                marginTop: spacing.md
                            }}>
                                {['State Management', 'Context API', 'Component Composition', 'Type Safety'].map((feature, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            padding: spacing.md,
                                            background: colors.accent.teal + '30',
                                            borderRadius: borderRadius.lg,
                                            textAlign: 'center',
                                            border: `2px solid ${colors.accent.teal}`,
                                            color: colors.text.primary,
                                            fontWeight: '700',
                                            boxShadow: shadows.sm
                                        }}
                                    >
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </Tabs.TabPanel>

                        <Tabs.TabPanel id="pricing">
                            <h3 style={{
                                margin: '0 0 16px 0',
                                fontSize: '20px',
                                fontWeight: '700',
                                color: colors.text.primary
                            }}>💰 Pricing</h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: spacing.md,
                                marginTop: spacing.md
                            }}>
                                <div style={{
                                    padding: spacing.lg,
                                    background: colors.accent.teal + '20',
                                    borderRadius: borderRadius.lg,
                                    textAlign: 'center',
                                    border: `2px solid ${colors.accent.teal}60`,
                                    boxShadow: shadows.sm
                                }}>
                                    <h4 style={{
                                        margin: '0 0 12px 0',
                                        color: colors.text.primary,
                                        fontSize: '18px'
                                    }}>Free</h4>
                                    <div style={{
                                        fontSize: '40px',
                                        margin: `${spacing.sm} 0`,
                                        fontWeight: '800',
                                        color: colors.accent.teal
                                    }}>$0</div>
                                    <p style={{ margin: 0, color: colors.text.secondary }}>
                                        Perfect for learning
                                    </p>
                                </div>
                                <div style={{
                                    padding: spacing.lg,
                                    background: colors.accent.teal,
                                    color: colors.text.white,
                                    borderRadius: borderRadius.lg,
                                    textAlign: 'center',
                                    border: `2px solid ${colors.accent.teal}`,
                                    boxShadow: shadows.md
                                }}>
                                    <h4 style={{
                                        margin: '0 0 12px 0',
                                        fontSize: '18px'
                                    }}>Pro</h4>
                                    <div style={{
                                        fontSize: '40px',
                                        margin: `${spacing.sm} 0`,
                                        fontWeight: '800'
                                    }}>$29</div>
                                    <p style={{ margin: 0, opacity: 0.95 }}>
                                        For professionals
                                    </p>
                                </div>
                            </div>
                        </Tabs.TabPanel>
                    </Tabs.TabPanels>
                </Tabs>
            </div>

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
                }}>🎯 When to Use Compound Components:</h4>
                <ul style={{
                    margin: '0',
                    paddingLeft: spacing.lg,
                    color: colors.text.primary,
                    lineHeight: '1.8'
                }}>
                    <li>Building UI libraries (tabs, accordions, menus)</li>
                    <li>Components with complex internal state</li>
                    <li>When you want intuitive, declarative APIs</li>
                    <li>Components that need flexible layouts</li>
                </ul>
            </div>
        </div>
    );
};

export default CompoundComponentsExample;
