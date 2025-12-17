import { memo } from 'react';
import { colors, shadows, borderRadius } from '../theme/design-system';

// Example 1: React.memo - Prevents re-renders when props haven't changed
interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
}

const ProductCard = ({ name, price, description, image, category, rating }: ProductCardProps) => {
    console.log(`🎨 Rendering ProductCard: ${name}`);

    return (
        <div style={{
            background: colors.background.darkGray,
            border: `1px solid ${colors.neutral[300]}`,
            borderRadius: borderRadius.lg,
            padding: '20px',
            maxWidth: '320px',
            boxShadow: shadows.md,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            overflow: 'hidden'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = shadows.xl;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = shadows.md;
            }}
        >
            <div style={{
                width: '100%',
                height: '200px',
                borderRadius: borderRadius.md,
                overflow: 'hidden',
                marginBottom: '16px',
                position: 'relative'
            }}>
                <img
                    src={image}
                    alt={name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div style={{ marginBottom: '12px' }}>
                <span style={{
                    background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
                    color: colors.text.white,
                    padding: '6px 12px',
                    borderRadius: borderRadius.full,
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {category}
                </span>
            </div>
            <h3 style={{
                margin: '0 0 10px 0',
                fontSize: '20px',
                fontWeight: '700',
                color: colors.text.primary,
                lineHeight: '1.3'
            }}>{name}</h3>
            <p style={{
                color: colors.text.secondary,
                fontSize: '14px',
                margin: '0 0 16px 0',
                lineHeight: '1.5'
            }}>{description}</p>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: `1px solid ${colors.neutral[200]}`
            }}>
                <span style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: colors.success,
                    background: `${colors.success}15`,
                    padding: '4px 12px',
                    borderRadius: borderRadius.md
                }}>
                    ${price.toFixed(2)}
                </span>
                <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: colors.accent.yellow,
                    background: `${colors.accent.yellow}20`,
                    padding: '6px 10px',
                    borderRadius: borderRadius.md,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    ⭐ {rating.toFixed(1)}
                </span>
            </div>
        </div>
    );
};

// Export memoized version - Only re-renders when props change
// With React Compiler, this manual memoization becomes unnecessary!
export default memo(ProductCard);
