export const colors = {
  trust: "#0F6E56",
  warning: "#854F0B",
  danger: "#A32D2D",
  neutral: "#5F5E5A",
  white: "#FFFFFF",
  background: "#FAFAF9",
  border: "#E7E5E4",
} as const;

export const spacing = {
  formGap: "1.5rem",
  sectionGap: "2rem",
} as const;

export const typography = {
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
  },
} as const;

export const borderRadius = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
} as const;
