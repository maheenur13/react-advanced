import { useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './theme-context';

// Theme Provider Component - Default to DARK mode
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Changed to dark

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

