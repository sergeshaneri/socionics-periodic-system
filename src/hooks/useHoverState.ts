import { useCallback, useEffect, useState } from 'react';

export interface MousePos {
  x: number;
  y: number;
}

export interface HoverState {
  hoveredIdx: number | null;
  hoveredTraitIdx: number | null;
  mousePos: MousePos;
  setHoveredIdx: (idx: number | null) => void;
  setHoveredTraitIdx: (idx: number | null) => void;
  setMousePos: (pos: MousePos) => void;
  reset: () => void;
}

/**
 * Manages hover state for the pattern grid: which object is hovered,
 * which trait (bit) is hovered, and the current mouse position for tooltip.
 *
 * Pass `resetDeps` to automatically clear hover when any of them change
 * (e.g. view/model/lang switches).
 */
export function useHoverState(resetDeps: ReadonlyArray<unknown> = []): HoverState {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoveredTraitIdx, setHoveredTraitIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });

  const reset = useCallback(() => {
    setHoveredIdx(null);
    setHoveredTraitIdx(null);
  }, []);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetDeps);

  return {
    hoveredIdx,
    hoveredTraitIdx,
    mousePos,
    setHoveredIdx,
    setHoveredTraitIdx,
    setMousePos,
    reset,
  };
}
