/**
 * 16-dot perimeter grid mapping for Churyumov model.
 * 6x6 grid, excluding corners. Each entry is [row, col].
 */
export const CHURYUMOV_P16: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [0, 2], [0, 3], [0, 4], // Top side (Alpha)
  [1, 5], [2, 5], [3, 5], [4, 5], // Right side (Beta)
  [5, 4], [5, 3], [5, 2], [5, 1], // Bottom side (Gamma)
  [4, 0], [3, 0], [2, 0], [1, 0], // Left side (Delta)
] as const;
