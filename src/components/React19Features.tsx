import React, { use, useActionState, useOptimistic, useState, Suspense, startTransition } from 'react';
import { colors, spacing, borderRadius, shadows, gradients } from '../theme/design-system';

// Simulated API calls
const fetchMessage = async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "Hello from React 19! 🎉";
};

const updateNameAPI = async (name: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (name.length < 3) {
        return { success: false, error: "Name must be at least 3 characters" };
    }
    return { success: true };
};

const saveTodoAPI = async (todo: string): Promise<{ id: number; text: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { id: Date.now(), text: todo };
};

// Component using use() hook
const MessageDisplay = ({ messagePromise }: { messagePromise: Promise<string> }) => {
    const message = use(messagePromise);
    return (
        <div style={{
            padding: spacing.md,
            background: colors.accent.teal + '30',
            borderRadius: borderRadius.md,
            border: `2px solid ${colors.accent.teal}`,
            color: colors.text.primary,
            fontWeight: '600',
            fontSize: '16px'
        }}>
            {message}
        </div>
    );
};
type FormState = { error?: string; success?: string };
const React19Features = () => {
    // State for use() hook demo
    const [messagePromise, setMessagePromise] = useState<Promise<string> | null>(null);
    const [showMessage, setShowMessage] = useState(false);

    // useActionState for form handling

    const [formState, formAction, isPending] = useActionState(
        async (_previousState: FormState, formData: FormData): Promise<FormState> => {
            const name = formData.get('name') as string;
            const result = await updateNameAPI(name);

            if (!result.success) {
                return { error: result.error };
            }

            return { success: `Name updated to "${name}" successfully!` };
        },
        {} as FormState
    );

    // useOptimistic for optimistic updates
    const [todos, setTodos] = useState<{ id: number; text: string }[]>([
        { id: 1, text: "Learn React 19" },
        { id: 2, text: "Try useOptimistic" }
    ]);
    const [optimisticTodos, addOptimisticTodo] = useOptimistic(
        todos,
        (state, newTodo: string) => [...state, { id: state.length + 1, text: newTodo }]
    );
    const [newTodo, setNewTodo] = useState('');

    const handleFetchMessage = () => {
        const promise = fetchMessage();
        setMessagePromise(promise);
        setShowMessage(true);
    };

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        const todoText = newTodo;
        setNewTodo('');

        startTransition(async () => {
            addOptimisticTodo(todoText);
            const savedTodo = await saveTodoAPI(todoText + '- server');
            setTodos(prev => [...prev, savedTodo]);
        });
    };

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
                    🔮 React 19 Features
                </h1>
                <p style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    color: colors.text.secondary,
                    marginBottom: spacing.xl
                }}>
                    Explore the latest features in React 19 stable release
                </p>

                {/* use() Hook Example */}
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
                        1️⃣ use() Hook - Read Resources in Render
                    </h2>

                    <div style={{
                        background: colors.neutral[100],
                        padding: spacing.md,
                        borderRadius: borderRadius.md,
                        marginBottom: spacing.md
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: colors.text.primary }}>
                            📖 What is use()?
                        </h3>
                        <p style={{ margin: '0 0 12px 0', color: colors.text.primary, lineHeight: '1.6' }}>
                            The <code style={{ background: colors.neutral[300], padding: '2px 6px', borderRadius: '4px' }}>use()</code> hook
                            lets you read the value of a resource like a Promise or Context during render. Unlike other React Hooks,
                            <code style={{ background: colors.neutral[300], padding: '2px 6px', borderRadius: '4px' }}>use()</code> can
                            be called inside loops and conditional statements.
                        </p>
                        <pre style={{
                            background: colors.neutral[100],
                            color: colors.text.white,
                            padding: spacing.sm,
                            borderRadius: borderRadius.sm,
                            overflow: 'auto',
                            margin: 0,
                            fontSize: '13px',
                            fontFamily: 'monospace'
                        }}>
                            {`const value = use(resource);

// Can be used conditionally!
if (condition) {
  const data = use(promise);
}`}
                        </pre>
                    </div>

                    <button
                        onClick={handleFetchMessage}
                        disabled={showMessage}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            fontWeight: '700',
                            background: showMessage ? colors.neutral[400] : gradients.primary,
                            color: colors.text.white,
                            border: 'none',
                            borderRadius: borderRadius.lg,
                            cursor: showMessage ? 'not-allowed' : 'pointer',
                            marginBottom: spacing.md,
                            boxShadow: shadows.md
                        }}
                    >
                        {showMessage ? '✓ Message Loaded' : 'Fetch Message with use()'}
                    </button>

                    {showMessage && messagePromise && (
                        <Suspense fallback={
                            <div style={{
                                padding: spacing.md,
                                background: colors.warning + '30',
                                borderRadius: borderRadius.md,
                                color: colors.text.primary,
                                textAlign: 'center'
                            }}>
                                ⏳ Loading message...
                            </div>
                        }>
                            <MessageDisplay messagePromise={messagePromise} />
                        </Suspense>
                    )}
                </div>

                {/* useActionState Example */}
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
                        2️⃣ useActionState - Form State Management
                    </h2>

                    <div style={{
                        background: colors.neutral[100],
                        padding: spacing.md,
                        borderRadius: borderRadius.md,
                        marginBottom: spacing.md
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: colors.text.primary }}>
                            📖 What is useActionState()?
                        </h3>
                        <p style={{ margin: '0 0 12px 0', color: colors.text.primary, lineHeight: '1.6' }}>
                            <code style={{ background: colors.neutral[300], padding: '2px 6px', borderRadius: '4px' }}>useActionState</code> is
                            a Hook that allows you to update state based on the result of a form action. It provides pending state, error handling,
                            and automatic form management.
                        </p>
                        <pre style={{
                            background: colors.neutral[100],
                            color: colors.text.white,
                            padding: spacing.sm,
                            borderRadius: borderRadius.sm,
                            overflow: 'auto',
                            margin: 0,
                            fontSize: '13px',
                            fontFamily: 'monospace'
                        }}>
                            {`const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    // Handle form submission
    const result = await updateData(formData);
    return result;
  },
  initialState
);`}
                        </pre>
                    </div>

                    <form action={formAction} style={{ marginBottom: spacing.md }}>
                        <div style={{ marginBottom: spacing.sm }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name (min 3 chars)"
                                disabled={isPending}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    fontSize: '16px',
                                    borderRadius: borderRadius.md,
                                    border: `1px solid ${colors.neutral[300]}`,
                                    background: colors.background.darkGray,
                                    color: colors.text.white,
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            style={{
                                padding: '12px 24px',
                                fontSize: '16px',
                                fontWeight: '700',
                                background: isPending ? colors.neutral[400] : gradients.secondary,
                                color: colors.text.white,
                                border: 'none',
                                borderRadius: borderRadius.lg,
                                cursor: isPending ? 'not-allowed' : 'pointer',
                                boxShadow: shadows.md
                            }}
                        >
                            {isPending ? '⏳ Updating...' : 'Update Name'}
                        </button>
                    </form>

                    {formState.error && (
                        <div style={{
                            padding: spacing.md,
                            background: colors.error + '30',
                            borderRadius: borderRadius.md,
                            border: `2px solid ${colors.error}`,
                            color: colors.error,
                            fontWeight: '600'
                        }}>
                            ❌ {formState.error}
                        </div>
                    )}

                    {formState.success && (
                        <div style={{
                            padding: spacing.md,
                            background: colors.success + '30',
                            borderRadius: borderRadius.md,
                            border: `2px solid ${colors.success}`,
                            color: colors.success,
                            fontWeight: '600'
                        }}>
                            ✅ {formState.success}
                        </div>
                    )}
                </div>

                {/* useOptimistic Example */}
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
                        3️⃣ useOptimistic - Optimistic UI Updates
                    </h2>

                    <div style={{
                        background: colors.neutral[100],
                        padding: spacing.md,
                        borderRadius: borderRadius.md,
                        marginBottom: spacing.md
                    }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: colors.text.primary }}>
                            📖 What is useOptimistic()?
                        </h3>
                        <p style={{ margin: '0 0 12px 0', color: colors.text.primary, lineHeight: '1.6' }}>
                            <code style={{ background: colors.neutral[300], padding: '2px 6px', borderRadius: '4px' }}>useOptimistic</code> lets
                            you show a different state while an async action is underway. It immediately updates the UI optimistically, then reverts
                            to the actual state once the action completes.
                        </p>
                        <pre style={{
                            background: colors.neutral[100],
                            color: colors.text.white,
                            padding: spacing.sm,
                            borderRadius: borderRadius.sm,
                            overflow: 'auto',
                            margin: 0,
                            fontSize: '13px',
                            fontFamily: 'monospace'
                        }}>
                            {`const [optimisticState, addOptimistic] = useOptimistic(
  currentState,
  (state, newValue) => [...state, newValue]
);

// UI updates instantly!
addOptimistic(newItem);`}
                        </pre>
                    </div>

                    <form onSubmit={handleAddTodo} style={{ marginBottom: spacing.md }}>
                        <div style={{ display: 'flex', gap: spacing.sm }}>
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Add a new todo..."
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    fontSize: '16px',
                                    borderRadius: borderRadius.md,
                                    border: `1px solid ${colors.neutral[300]}`,
                                    background: colors.background.darkGray,
                                    color: colors.text.white,
                                    outline: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    background: gradients.success,
                                    color: colors.text.white,
                                    border: 'none',
                                    borderRadius: borderRadius.lg,
                                    cursor: 'pointer',
                                    boxShadow: shadows.md,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Add Todo
                            </button>
                        </div>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                        {optimisticTodos.map((todo, index) => (
                            <div
                                key={todo.id || `optimistic-${index}`}
                                style={{
                                    padding: spacing.md,
                                    background: todo.id === 0
                                        ? colors.warning + '30'
                                        : colors.success + '20',
                                    borderRadius: borderRadius.md,
                                    border: `2px solid ${todo.id === 0 ? colors.warning : colors.success}`,
                                    color: colors.text.primary,
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: spacing.sm
                                }}
                            >
                                {todo.id === 0 ? '⏳' : '✅'} {todo.text}
                                {todo.id === 0 && (
                                    <span style={{
                                        marginLeft: 'auto',
                                        fontSize: '12px',
                                        color: colors.warning,
                                        fontWeight: '700'
                                    }}>
                                        Saving...
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* React Compiler Note */}
                <div style={{
                    background: colors.accent.orange + '20',
                    padding: spacing.lg,
                    borderRadius: borderRadius.xl,
                    border: `2px solid ${colors.accent.orange}`,
                    boxShadow: shadows.lg
                }}>
                    <h2 style={{
                        margin: '0 0 16px 0',
                        fontSize: '28px',
                        fontWeight: '700',
                        color: colors.accent.orange
                    }}>
                        4️⃣ React Compiler - Auto-Optimization ✅
                    </h2>
                    <p style={{ margin: '0 0 12px 0', color: colors.text.primary, lineHeight: '1.8', fontSize: '16px' }}>
                        The React Compiler is <strong>enabled in this project</strong>! It automatically optimizes your components
                        by adding memoization where needed, eliminating the need for manual <code style={{
                            background: colors.neutral[300],
                            padding: '2px 6px',
                            borderRadius: '4px'
                        }}>useMemo</code>, <code style={{
                            background: colors.neutral[300],
                            padding: '2px 6px',
                            borderRadius: '4px'
                        }}>useCallback</code>, and <code style={{
                            background: colors.neutral[300],
                            padding: '2px 6px',
                            borderRadius: '4px'
                        }}>React.memo</code> in most cases.
                    </p>
                    <p style={{ margin: 0, color: colors.text.primary, lineHeight: '1.8', fontSize: '16px' }}>
                        ✨ All components in this demo are automatically optimized by the React Compiler at build time!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default React19Features;

