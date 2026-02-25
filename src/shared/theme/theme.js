export const COLORS = {
  primary: "#2E7D32",       // Deep Green
  primaryLight: "#E8F5E9",
  primaryDark: "#1B5E20",
  secondary: "#81C784",
  background: "#F9FAF9",
  surface: "#F4F8F5",       // Subtle alternating section bg
  white: "#FFFFFF",
  textPrimary: "#1B1B1B",
  textSecondary: "#666666",
  border: "#E0E0E0",
  error: "#D32F2F",
  success: "#4CAF50",
  warning: "#FF9800",
  accent: "#FFB300",        // Gold — for highlights, badges, CTAs
  info: "#2196F3",
};

export const STATUS_COLORS = {
  PENDING:   { bg: "#FFF3E0", text: "#E65100", icon: "clock" },
  SHIPPED:   { bg: "#E3F2FD", text: "#1565C0", icon: "truck" },
  DELIVERED: { bg: "#E8F5E9", text: "#2E7D32", icon: "check-circle" },
  CANCELLED: { bg: "#FFEBEE", text: "#C62828", icon: "x-circle" },
};

export const FONT_SIZES = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
  hero: 34,
};

export const FONT_WEIGHTS = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  heavy: "800",
};

export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const SHADOWS = {
  light: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  strong: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};
