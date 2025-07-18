export const breakpoints = {
  // Mobile first breakpoints
  sm: 640,    // Small devices (landscape phones)
  md: 768,    // Medium devices (tablets)
  lg: 1024,   // Large devices (desktops)
  xl: 1280,   // Extra large devices (large desktops)
  '2xl': 1536 // 2X large devices (larger desktops)
} as const;

export const maxContainerWidths = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1200, // Max width for content
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type ContainerSize = keyof typeof maxContainerWidths;