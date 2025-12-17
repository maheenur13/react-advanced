// Design System - Dark Mode Optimized Color Palette
export const colors = {
  // Primary Colors - Softer blues for dark mode
  primary: {
    50: "#1E3A5F",
    100: "#2C5282",
    200: "#3B6BA8",
    300: "#4A83C8",
    400: "#5B9BD5",
    500: "#6DB3E8",
    600: "#80C4F5",
    700: "#A3D5FF",
    800: "#C7E6FF",
    900: "#E6F4FF",
  },

  // Secondary Colors - Muted purples
  secondary: {
    50: "#2D1B3D",
    100: "#3D2952",
    200: "#4E3768",
    300: "#5F457E",
    400: "#7559A3",
    500: "#8B6DB8",
    600: "#A184C9",
    700: "#B79DDA",
    800: "#CDB6EB",
    900: "#E3CFFC",
  },

  // Accent Colors - Subtle but visible
  accent: {
    orange: "#FF8A65",
    coral: "#FF7B9C",
    teal: "#4DB6AC",
    purple: "#9575CD",
    pink: "#F06292",
    yellow: "#FFD54F",
  },

  // Neutral Colors - Standard dark mode grays
  neutral: {
    50: "#0D1117", // Darkest
    100: "#161B22", // Very dark
    200: "#21262D", // Dark
    300: "#30363D", // Medium dark
    400: "#484F58", // Medium
    500: "#6E7681", // Medium light
    600: "#8B949E", // Light
    700: "#B1BAC4", // Lighter
    800: "#C9D1D9", // Very light
    900: "#F0F6FC", // Lightest
  },

  // Semantic Colors
  success: "#6BCF7F",
  warning: "#FFB84D",
  error: "#F87171",
  info: "#60A5FA",

  // Background - Dark mode optimized
  background: {
    light: "#FFFFFF", // For light theme
    dark: "#0D1117", // Main dark background
    lightGray: "#F8FAFC", // For light theme
    darkGray: "#161B22", // Secondary dark background
    darker: "#010409", // Even darker for contrast
  },

  // Text - Optimized for dark backgrounds
  text: {
    primary: "#E6EDF3", // Main text (light)
    secondary: "#8B949E", // Secondary text (gray)
    light: "#6E7681", // Tertiary text (darker gray)
    white: "#FFFFFF", // Pure white
    dark: "#1E293B", // For light theme
  },
};

// Shadows - Adjusted for dark mode
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
};

// Border Radius
export const borderRadius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
};

// Spacing
export const spacing = {
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "3rem",
  "2xl": "4rem",
};

// Gradients - Subtle for dark mode
export const gradients = {
  primary: "linear-gradient(135deg, #3B6BA8 0%, #5B9BD5 100%)",
  secondary: "linear-gradient(135deg, #7559A3 0%, #8B6DB8 100%)",
  success: "linear-gradient(135deg, #4DB6AC 0%, #6BCF7F 100%)",
  sunset: "linear-gradient(135deg, #FF8A65 0%, #FFB84D 100%)",
  ocean: "linear-gradient(135deg, #4DB6AC 0%, #60A5FA 100%)",
  purple: "linear-gradient(135deg, #9575CD 0%, #7559A3 100%)",
  orange: "linear-gradient(135deg, #FF8A65 0%, #FF7B9C 100%)",
};
