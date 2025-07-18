// Utility functions for the application

// Helper to merge styles (similar to cn but for style objects)
export function mergeStyles(...styles: any[]) {
  return styles.filter(Boolean).reduce((acc, style) => {
    if (Array.isArray(style)) {
      return [...acc, ...style];
    }
    return [...acc, style];
  }, []);
}