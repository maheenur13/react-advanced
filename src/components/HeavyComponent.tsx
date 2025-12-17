import { colors, shadows, borderRadius, spacing } from '../theme/design-system';

// ============================================================
// HEAVY COMPONENT - Simulates a large feature module
// Contains: Large datasets, complex calculations, utility functions
// ============================================================

// Large lookup tables (simulating i18n, constants, mappings)
const COUNTRY_DATA: Record<string, { name: string; code: string; currency: string; region: string }> = {
    AF: { name: 'Afghanistan', code: '+93', currency: 'AFN', region: 'Asia' },
    AL: { name: 'Albania', code: '+355', currency: 'ALL', region: 'Europe' },
    DZ: { name: 'Algeria', code: '+213', currency: 'DZD', region: 'Africa' },
    AD: { name: 'Andorra', code: '+376', currency: 'EUR', region: 'Europe' },
    AO: { name: 'Angola', code: '+244', currency: 'AOA', region: 'Africa' },
    AR: { name: 'Argentina', code: '+54', currency: 'ARS', region: 'South America' },
    AM: { name: 'Armenia', code: '+374', currency: 'AMD', region: 'Asia' },
    AU: { name: 'Australia', code: '+61', currency: 'AUD', region: 'Oceania' },
    AT: { name: 'Austria', code: '+43', currency: 'EUR', region: 'Europe' },
    AZ: { name: 'Azerbaijan', code: '+994', currency: 'AZN', region: 'Asia' },
    BS: { name: 'Bahamas', code: '+1-242', currency: 'BSD', region: 'North America' },
    BH: { name: 'Bahrain', code: '+973', currency: 'BHD', region: 'Asia' },
    BD: { name: 'Bangladesh', code: '+880', currency: 'BDT', region: 'Asia' },
    BB: { name: 'Barbados', code: '+1-246', currency: 'BBD', region: 'North America' },
    BY: { name: 'Belarus', code: '+375', currency: 'BYN', region: 'Europe' },
    BE: { name: 'Belgium', code: '+32', currency: 'EUR', region: 'Europe' },
    BZ: { name: 'Belize', code: '+501', currency: 'BZD', region: 'North America' },
    BJ: { name: 'Benin', code: '+229', currency: 'XOF', region: 'Africa' },
    BT: { name: 'Bhutan', code: '+975', currency: 'BTN', region: 'Asia' },
    BO: { name: 'Bolivia', code: '+591', currency: 'BOB', region: 'South America' },
    BA: { name: 'Bosnia and Herzegovina', code: '+387', currency: 'BAM', region: 'Europe' },
    BW: { name: 'Botswana', code: '+267', currency: 'BWP', region: 'Africa' },
    BR: { name: 'Brazil', code: '+55', currency: 'BRL', region: 'South America' },
    BN: { name: 'Brunei', code: '+673', currency: 'BND', region: 'Asia' },
    BG: { name: 'Bulgaria', code: '+359', currency: 'BGN', region: 'Europe' },
    BF: { name: 'Burkina Faso', code: '+226', currency: 'XOF', region: 'Africa' },
    BI: { name: 'Burundi', code: '+257', currency: 'BIF', region: 'Africa' },
    KH: { name: 'Cambodia', code: '+855', currency: 'KHR', region: 'Asia' },
    CM: { name: 'Cameroon', code: '+237', currency: 'XAF', region: 'Africa' },
    CA: { name: 'Canada', code: '+1', currency: 'CAD', region: 'North America' },
    CV: { name: 'Cape Verde', code: '+238', currency: 'CVE', region: 'Africa' },
    CF: { name: 'Central African Republic', code: '+236', currency: 'XAF', region: 'Africa' },
    TD: { name: 'Chad', code: '+235', currency: 'XAF', region: 'Africa' },
    CL: { name: 'Chile', code: '+56', currency: 'CLP', region: 'South America' },
    CN: { name: 'China', code: '+86', currency: 'CNY', region: 'Asia' },
    CO: { name: 'Colombia', code: '+57', currency: 'COP', region: 'South America' },
    KM: { name: 'Comoros', code: '+269', currency: 'KMF', region: 'Africa' },
    CG: { name: 'Congo', code: '+242', currency: 'XAF', region: 'Africa' },
    CR: { name: 'Costa Rica', code: '+506', currency: 'CRC', region: 'North America' },
    HR: { name: 'Croatia', code: '+385', currency: 'EUR', region: 'Europe' },
    CU: { name: 'Cuba', code: '+53', currency: 'CUP', region: 'North America' },
    CY: { name: 'Cyprus', code: '+357', currency: 'EUR', region: 'Europe' },
    CZ: { name: 'Czech Republic', code: '+420', currency: 'CZK', region: 'Europe' },
    DK: { name: 'Denmark', code: '+45', currency: 'DKK', region: 'Europe' },
    DJ: { name: 'Djibouti', code: '+253', currency: 'DJF', region: 'Africa' },
    DM: { name: 'Dominica', code: '+1-767', currency: 'XCD', region: 'North America' },
    DO: { name: 'Dominican Republic', code: '+1-809', currency: 'DOP', region: 'North America' },
    EC: { name: 'Ecuador', code: '+593', currency: 'USD', region: 'South America' },
    EG: { name: 'Egypt', code: '+20', currency: 'EGP', region: 'Africa' },
    SV: { name: 'El Salvador', code: '+503', currency: 'USD', region: 'North America' },
    GQ: { name: 'Equatorial Guinea', code: '+240', currency: 'XAF', region: 'Africa' },
    ER: { name: 'Eritrea', code: '+291', currency: 'ERN', region: 'Africa' },
    EE: { name: 'Estonia', code: '+372', currency: 'EUR', region: 'Europe' },
    ET: { name: 'Ethiopia', code: '+251', currency: 'ETB', region: 'Africa' },
    FJ: { name: 'Fiji', code: '+679', currency: 'FJD', region: 'Oceania' },
    FI: { name: 'Finland', code: '+358', currency: 'EUR', region: 'Europe' },
    FR: { name: 'France', code: '+33', currency: 'EUR', region: 'Europe' },
    GA: { name: 'Gabon', code: '+241', currency: 'XAF', region: 'Africa' },
    GM: { name: 'Gambia', code: '+220', currency: 'GMD', region: 'Africa' },
    GE: { name: 'Georgia', code: '+995', currency: 'GEL', region: 'Asia' },
    DE: { name: 'Germany', code: '+49', currency: 'EUR', region: 'Europe' },
    GH: { name: 'Ghana', code: '+233', currency: 'GHS', region: 'Africa' },
    GR: { name: 'Greece', code: '+30', currency: 'EUR', region: 'Europe' },
    GD: { name: 'Grenada', code: '+1-473', currency: 'XCD', region: 'North America' },
    GT: { name: 'Guatemala', code: '+502', currency: 'GTQ', region: 'North America' },
    GN: { name: 'Guinea', code: '+224', currency: 'GNF', region: 'Africa' },
    GW: { name: 'Guinea-Bissau', code: '+245', currency: 'XOF', region: 'Africa' },
    GY: { name: 'Guyana', code: '+592', currency: 'GYD', region: 'South America' },
    HT: { name: 'Haiti', code: '+509', currency: 'HTG', region: 'North America' },
    HN: { name: 'Honduras', code: '+504', currency: 'HNL', region: 'North America' },
    HU: { name: 'Hungary', code: '+36', currency: 'HUF', region: 'Europe' },
    IS: { name: 'Iceland', code: '+354', currency: 'ISK', region: 'Europe' },
    IN: { name: 'India', code: '+91', currency: 'INR', region: 'Asia' },
    ID: { name: 'Indonesia', code: '+62', currency: 'IDR', region: 'Asia' },
    IR: { name: 'Iran', code: '+98', currency: 'IRR', region: 'Asia' },
    IQ: { name: 'Iraq', code: '+964', currency: 'IQD', region: 'Asia' },
    IE: { name: 'Ireland', code: '+353', currency: 'EUR', region: 'Europe' },
    IL: { name: 'Israel', code: '+972', currency: 'ILS', region: 'Asia' },
    IT: { name: 'Italy', code: '+39', currency: 'EUR', region: 'Europe' },
    JM: { name: 'Jamaica', code: '+1-876', currency: 'JMD', region: 'North America' },
    JP: { name: 'Japan', code: '+81', currency: 'JPY', region: 'Asia' },
    JO: { name: 'Jordan', code: '+962', currency: 'JOD', region: 'Asia' },
    KZ: { name: 'Kazakhstan', code: '+7', currency: 'KZT', region: 'Asia' },
    KE: { name: 'Kenya', code: '+254', currency: 'KES', region: 'Africa' },
    KI: { name: 'Kiribati', code: '+686', currency: 'AUD', region: 'Oceania' },
    KW: { name: 'Kuwait', code: '+965', currency: 'KWD', region: 'Asia' },
    KG: { name: 'Kyrgyzstan', code: '+996', currency: 'KGS', region: 'Asia' },
    LA: { name: 'Laos', code: '+856', currency: 'LAK', region: 'Asia' },
    LV: { name: 'Latvia', code: '+371', currency: 'EUR', region: 'Europe' },
    LB: { name: 'Lebanon', code: '+961', currency: 'LBP', region: 'Asia' },
    LS: { name: 'Lesotho', code: '+266', currency: 'LSL', region: 'Africa' },
    LR: { name: 'Liberia', code: '+231', currency: 'LRD', region: 'Africa' },
    LY: { name: 'Libya', code: '+218', currency: 'LYD', region: 'Africa' },
    LI: { name: 'Liechtenstein', code: '+423', currency: 'CHF', region: 'Europe' },
    LT: { name: 'Lithuania', code: '+370', currency: 'EUR', region: 'Europe' },
    LU: { name: 'Luxembourg', code: '+352', currency: 'EUR', region: 'Europe' },
    MK: { name: 'Macedonia', code: '+389', currency: 'MKD', region: 'Europe' },
    MG: { name: 'Madagascar', code: '+261', currency: 'MGA', region: 'Africa' },
    MW: { name: 'Malawi', code: '+265', currency: 'MWK', region: 'Africa' },
    MY: { name: 'Malaysia', code: '+60', currency: 'MYR', region: 'Asia' },
    MV: { name: 'Maldives', code: '+960', currency: 'MVR', region: 'Asia' },
    ML: { name: 'Mali', code: '+223', currency: 'XOF', region: 'Africa' },
    MT: { name: 'Malta', code: '+356', currency: 'EUR', region: 'Europe' },
    MH: { name: 'Marshall Islands', code: '+692', currency: 'USD', region: 'Oceania' },
    MR: { name: 'Mauritania', code: '+222', currency: 'MRU', region: 'Africa' },
    MU: { name: 'Mauritius', code: '+230', currency: 'MUR', region: 'Africa' },
    MX: { name: 'Mexico', code: '+52', currency: 'MXN', region: 'North America' },
    FM: { name: 'Micronesia', code: '+691', currency: 'USD', region: 'Oceania' },
    MD: { name: 'Moldova', code: '+373', currency: 'MDL', region: 'Europe' },
    MC: { name: 'Monaco', code: '+377', currency: 'EUR', region: 'Europe' },
    MN: { name: 'Mongolia', code: '+976', currency: 'MNT', region: 'Asia' },
    ME: { name: 'Montenegro', code: '+382', currency: 'EUR', region: 'Europe' },
    MA: { name: 'Morocco', code: '+212', currency: 'MAD', region: 'Africa' },
    MZ: { name: 'Mozambique', code: '+258', currency: 'MZN', region: 'Africa' },
    MM: { name: 'Myanmar', code: '+95', currency: 'MMK', region: 'Asia' },
    NA: { name: 'Namibia', code: '+264', currency: 'NAD', region: 'Africa' },
    NR: { name: 'Nauru', code: '+674', currency: 'AUD', region: 'Oceania' },
    NP: { name: 'Nepal', code: '+977', currency: 'NPR', region: 'Asia' },
    NL: { name: 'Netherlands', code: '+31', currency: 'EUR', region: 'Europe' },
    NZ: { name: 'New Zealand', code: '+64', currency: 'NZD', region: 'Oceania' },
    NI: { name: 'Nicaragua', code: '+505', currency: 'NIO', region: 'North America' },
    NE: { name: 'Niger', code: '+227', currency: 'XOF', region: 'Africa' },
    NG: { name: 'Nigeria', code: '+234', currency: 'NGN', region: 'Africa' },
    KP: { name: 'North Korea', code: '+850', currency: 'KPW', region: 'Asia' },
    NO: { name: 'Norway', code: '+47', currency: 'NOK', region: 'Europe' },
    OM: { name: 'Oman', code: '+968', currency: 'OMR', region: 'Asia' },
    PK: { name: 'Pakistan', code: '+92', currency: 'PKR', region: 'Asia' },
    PW: { name: 'Palau', code: '+680', currency: 'USD', region: 'Oceania' },
    PA: { name: 'Panama', code: '+507', currency: 'PAB', region: 'North America' },
    PG: { name: 'Papua New Guinea', code: '+675', currency: 'PGK', region: 'Oceania' },
    PY: { name: 'Paraguay', code: '+595', currency: 'PYG', region: 'South America' },
    PE: { name: 'Peru', code: '+51', currency: 'PEN', region: 'South America' },
    PH: { name: 'Philippines', code: '+63', currency: 'PHP', region: 'Asia' },
    PL: { name: 'Poland', code: '+48', currency: 'PLN', region: 'Europe' },
    PT: { name: 'Portugal', code: '+351', currency: 'EUR', region: 'Europe' },
    QA: { name: 'Qatar', code: '+974', currency: 'QAR', region: 'Asia' },
    RO: { name: 'Romania', code: '+40', currency: 'RON', region: 'Europe' },
    RU: { name: 'Russia', code: '+7', currency: 'RUB', region: 'Europe' },
    RW: { name: 'Rwanda', code: '+250', currency: 'RWF', region: 'Africa' },
    KN: { name: 'Saint Kitts and Nevis', code: '+1-869', currency: 'XCD', region: 'North America' },
    LC: { name: 'Saint Lucia', code: '+1-758', currency: 'XCD', region: 'North America' },
    VC: { name: 'Saint Vincent', code: '+1-784', currency: 'XCD', region: 'North America' },
    WS: { name: 'Samoa', code: '+685', currency: 'WST', region: 'Oceania' },
    SM: { name: 'San Marino', code: '+378', currency: 'EUR', region: 'Europe' },
    ST: { name: 'Sao Tome and Principe', code: '+239', currency: 'STN', region: 'Africa' },
    SA: { name: 'Saudi Arabia', code: '+966', currency: 'SAR', region: 'Asia' },
    SN: { name: 'Senegal', code: '+221', currency: 'XOF', region: 'Africa' },
    RS: { name: 'Serbia', code: '+381', currency: 'RSD', region: 'Europe' },
    SC: { name: 'Seychelles', code: '+248', currency: 'SCR', region: 'Africa' },
    SL: { name: 'Sierra Leone', code: '+232', currency: 'SLL', region: 'Africa' },
    SG: { name: 'Singapore', code: '+65', currency: 'SGD', region: 'Asia' },
    SK: { name: 'Slovakia', code: '+421', currency: 'EUR', region: 'Europe' },
    SI: { name: 'Slovenia', code: '+386', currency: 'EUR', region: 'Europe' },
    SB: { name: 'Solomon Islands', code: '+677', currency: 'SBD', region: 'Oceania' },
    SO: { name: 'Somalia', code: '+252', currency: 'SOS', region: 'Africa' },
    ZA: { name: 'South Africa', code: '+27', currency: 'ZAR', region: 'Africa' },
    KR: { name: 'South Korea', code: '+82', currency: 'KRW', region: 'Asia' },
    SS: { name: 'South Sudan', code: '+211', currency: 'SSP', region: 'Africa' },
    ES: { name: 'Spain', code: '+34', currency: 'EUR', region: 'Europe' },
    LK: { name: 'Sri Lanka', code: '+94', currency: 'LKR', region: 'Asia' },
    SD: { name: 'Sudan', code: '+249', currency: 'SDG', region: 'Africa' },
    SR: { name: 'Suriname', code: '+597', currency: 'SRD', region: 'South America' },
    SZ: { name: 'Swaziland', code: '+268', currency: 'SZL', region: 'Africa' },
    SE: { name: 'Sweden', code: '+46', currency: 'SEK', region: 'Europe' },
    CH: { name: 'Switzerland', code: '+41', currency: 'CHF', region: 'Europe' },
    SY: { name: 'Syria', code: '+963', currency: 'SYP', region: 'Asia' },
    TW: { name: 'Taiwan', code: '+886', currency: 'TWD', region: 'Asia' },
    TJ: { name: 'Tajikistan', code: '+992', currency: 'TJS', region: 'Asia' },
    TZ: { name: 'Tanzania', code: '+255', currency: 'TZS', region: 'Africa' },
    TH: { name: 'Thailand', code: '+66', currency: 'THB', region: 'Asia' },
    TL: { name: 'Timor-Leste', code: '+670', currency: 'USD', region: 'Asia' },
    TG: { name: 'Togo', code: '+228', currency: 'XOF', region: 'Africa' },
    TO: { name: 'Tonga', code: '+676', currency: 'TOP', region: 'Oceania' },
    TT: { name: 'Trinidad and Tobago', code: '+1-868', currency: 'TTD', region: 'North America' },
    TN: { name: 'Tunisia', code: '+216', currency: 'TND', region: 'Africa' },
    TR: { name: 'Turkey', code: '+90', currency: 'TRY', region: 'Asia' },
    TM: { name: 'Turkmenistan', code: '+993', currency: 'TMT', region: 'Asia' },
    TV: { name: 'Tuvalu', code: '+688', currency: 'AUD', region: 'Oceania' },
    UG: { name: 'Uganda', code: '+256', currency: 'UGX', region: 'Africa' },
    UA: { name: 'Ukraine', code: '+380', currency: 'UAH', region: 'Europe' },
    AE: { name: 'United Arab Emirates', code: '+971', currency: 'AED', region: 'Asia' },
    GB: { name: 'United Kingdom', code: '+44', currency: 'GBP', region: 'Europe' },
    US: { name: 'United States', code: '+1', currency: 'USD', region: 'North America' },
    UY: { name: 'Uruguay', code: '+598', currency: 'UYU', region: 'South America' },
    UZ: { name: 'Uzbekistan', code: '+998', currency: 'UZS', region: 'Asia' },
    VU: { name: 'Vanuatu', code: '+678', currency: 'VUV', region: 'Oceania' },
    VA: { name: 'Vatican City', code: '+379', currency: 'EUR', region: 'Europe' },
    VE: { name: 'Venezuela', code: '+58', currency: 'VES', region: 'South America' },
    VN: { name: 'Vietnam', code: '+84', currency: 'VND', region: 'Asia' },
    YE: { name: 'Yemen', code: '+967', currency: 'YER', region: 'Asia' },
    ZM: { name: 'Zambia', code: '+260', currency: 'ZMW', region: 'Africa' },
    ZW: { name: 'Zimbabwe', code: '+263', currency: 'ZWL', region: 'Africa' },
};

// Utility functions (without generics to avoid JSX parsing issues)
const formatCurrency = (amount: number, currency: string, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
};

const groupByRegion = (data: typeof dataset): Record<string, typeof dataset> => {
    return data.reduce((result, item) => {
        const group = item.region;
        if (!result[group]) result[group] = [];
        result[group].push(item);
        return result;
    }, {} as Record<string, typeof dataset>);
};

// Statistical calculations
const mean = (numbers: number[]) => numbers.reduce((a, b) => a + b, 0) / numbers.length;

const median = (numbers: number[]) => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const standardDeviation = (numbers: number[]) => {
    const avg = mean(numbers);
    const variance = mean(numbers.map(n => Math.pow(n - avg, 2)));
    return Math.sqrt(variance);
};

const percentile = (numbers: number[], p: number) => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) return sorted[lower];
    return sorted[lower] * (upper - index) + sorted[upper] * (index - lower);
};

// Generate large dataset
const dataset = (() => {
    const countries = Object.entries(COUNTRY_DATA);
    const result: {
        id: number;
        countryCode: string;
        countryName: string;
        region: string;
        currency: string;
        revenue: number;
        expenses: number;
        profit: number;
        customers: number;
        orders: number;
        avgOrderValue: number;
        growth: string;
        status: string;
        lastUpdated: string;
    }[] = [];

    for (let i = 0; i < 500; i++) {
        const countryIndex = i % countries.length;
        const [code, country] = countries[countryIndex];
        const baseValue = (i * 7919 % 104729) / 104729;

        result.push({
            id: i + 1,
            countryCode: code,
            countryName: country.name,
            region: country.region,
            currency: country.currency,
            revenue: Math.round(baseValue * 1000000),
            expenses: Math.round(baseValue * 750000),
            profit: Math.round(baseValue * 250000),
            customers: Math.round(baseValue * 10000),
            orders: Math.round(baseValue * 50000),
            avgOrderValue: Math.round(baseValue * 200),
            growth: (baseValue * 100 - 50).toFixed(2) + '%',
            status: baseValue > 0.5 ? 'Active' : 'Inactive',
            lastUpdated: new Date(Date.now() - i * 86400000).toISOString(),
        });
    }

    return result;
})();

const HeavyComponent = () => {
    // Calculate statistics
    const revenues = dataset.map(d => d.revenue);
    const stats = {
        totalRevenue: revenues.reduce((a, b) => a + b, 0),
        avgRevenue: mean(revenues),
        medianRevenue: median(revenues),
        stdDev: standardDeviation(revenues),
        p90: percentile(revenues, 90),
    };

    // Group by region
    const byRegion = groupByRegion(dataset);
    const regionStats = Object.entries(byRegion).map(([region, items]) => ({
        region,
        count: items.length,
        totalRevenue: items.reduce((sum, item) => sum + item.revenue, 0),
    }));

    return (
        <div style={{
            padding: spacing.lg,
            background: colors.primary[50],
            borderRadius: borderRadius.lg,
            margin: `${spacing.sm} 0`,
            border: `2px solid ${colors.primary[300]}`,
            boxShadow: shadows.md
        }}>
            <h3 style={{
                margin: '0 0 12px 0',
                color: colors.primary[700],
                fontSize: '20px',
                fontWeight: '800'
            }}>🎯 Heavy Component Loaded!</h3>

            <p style={{
                color: colors.text.secondary,
                margin: '0 0 16px 0',
                lineHeight: '1.6'
            }}>
                This component includes: {Object.keys(COUNTRY_DATA).length} countries,
                {dataset.length} records, and statistical calculations.
            </p>

            {/* Statistics Summary */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: spacing.sm,
                marginBottom: spacing.md
            }}>
                <div style={{ padding: spacing.sm, background: colors.primary[100], borderRadius: borderRadius.md }}>
                    <div style={{ fontSize: '12px', color: colors.text.secondary }}>Total Revenue</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary[700] }}>
                        {formatCurrency(stats.totalRevenue, 'USD')}
                    </div>
                </div>
                <div style={{ padding: spacing.sm, background: colors.primary[100], borderRadius: borderRadius.md }}>
                    <div style={{ fontSize: '12px', color: colors.text.secondary }}>Average</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary[700] }}>
                        {formatCurrency(stats.avgRevenue, 'USD')}
                    </div>
                </div>
                <div style={{ padding: spacing.sm, background: colors.primary[100], borderRadius: borderRadius.md }}>
                    <div style={{ fontSize: '12px', color: colors.text.secondary }}>Median</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary[700] }}>
                        {formatCurrency(stats.medianRevenue, 'USD')}
                    </div>
                </div>
                <div style={{ padding: spacing.sm, background: colors.primary[100], borderRadius: borderRadius.md }}>
                    <div style={{ fontSize: '12px', color: colors.text.secondary }}>90th Percentile</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary[700] }}>
                        {formatCurrency(stats.p90, 'USD')}
                    </div>
                </div>
            </div>

            {/* Region Breakdown */}
            <div style={{ marginBottom: spacing.md }}>
                <h4 style={{ margin: '0 0 8px 0', color: colors.text.primary }}>Revenue by Region</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.xs }}>
                    {regionStats.slice(0, 6).map(r => (
                        <span key={r.region} style={{
                            padding: '4px 8px',
                            background: colors.primary[200],
                            borderRadius: borderRadius.sm,
                            fontSize: '12px',
                            color: colors.primary[800]
                        }}>
                            {r.region}: {formatCurrency(r.totalRevenue, 'USD')}
                        </span>
                    ))}
                </div>
            </div>

            {/* Data Table */}
            <div style={{
                maxHeight: '200px',
                overflow: 'auto',
                background: colors.neutral[100],
                borderRadius: borderRadius.md,
                border: `1px solid ${colors.neutral[300]}`
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                        <tr style={{
                            background: colors.primary[600],
                            color: colors.text.white,
                            position: 'sticky',
                            top: 0
                        }}>
                            <th style={{ padding: spacing.sm, textAlign: 'left' }}>Country</th>
                            <th style={{ padding: spacing.sm, textAlign: 'left' }}>Region</th>
                            <th style={{ padding: spacing.sm, textAlign: 'right' }}>Revenue</th>
                            <th style={{ padding: spacing.sm, textAlign: 'right' }}>Growth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataset.slice(0, 20).map((item, index) => (
                            <tr key={item.id} style={{
                                background: index % 2 === 0 ? colors.neutral[100] : colors.neutral[50]
                            }}>
                                <td style={{ padding: spacing.sm, color: colors.text.primary }}>{item.countryName}</td>
                                <td style={{ padding: spacing.sm, color: colors.text.secondary }}>{item.region}</td>
                                <td style={{ padding: spacing.sm, textAlign: 'right', color: colors.text.primary }}>
                                    {formatCurrency(item.revenue, item.currency)}
                                </td>
                                <td style={{
                                    padding: spacing.sm,
                                    textAlign: 'right',
                                    color: parseFloat(item.growth) > 0 ? colors.success : colors.error
                                }}>
                                    {item.growth}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p style={{
                marginTop: spacing.sm,
                fontSize: '14px',
                color: colors.text.secondary,
                fontWeight: '600'
            }}>
                Showing 20 of {dataset.length} records
            </p>
        </div>
    );
};

export default HeavyComponent;
