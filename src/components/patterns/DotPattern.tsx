import React from 'react';
import type { Lang, ModelType, ObjectType } from '../../types';
import { QUADRA_COLORS } from '../../data';
import { CHURYUMOV_P16 } from '../../constants/churyumov';

export interface DotPatternProps {
  bits: number[];
  quadraIdx: number;
  itemIdx: number;
  modelType: ModelType;
  hoveredIdx: number | null;
  hoveredTraitIdx: number | null;
  setHoveredTraitIdx: (idx: number | null) => void;
  setHoveredIdx: (idx: number | null) => void;
  setMousePos: (pos: { x: number; y: number }) => void;
  lang: Lang;
  label: string;
  objectType?: ObjectType;
}

export const DotPattern = React.memo(function DotPattern({
  bits,
  quadraIdx,
  itemIdx,
  modelType,
  hoveredIdx,
  hoveredTraitIdx,
  setHoveredTraitIdx,
  setHoveredIdx,
  setMousePos,
  label,
  objectType,
}: DotPatternProps) {
  const color = QUADRA_COLORS[quadraIdx];
  const isChuryumov = modelType === 'CHURYUMOV';
  const isTIM = objectType === 'TIM';
  const isRD = objectType === 'RD';

  const handleMouseMoveGrid = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = isChuryumov ? 6 : 4;

    const col = Math.floor((x / rect.width) * size);
    const row = Math.floor((y / rect.height) * size);

    if (col >= 0 && col < size && row >= 0 && row < size) {
      if (isChuryumov) {
        const bitIdx = CHURYUMOV_P16.findIndex((p) => p[0] === row && p[1] === col);
        if (bitIdx !== -1) {
          setHoveredTraitIdx(bitIdx);
          setHoveredIdx(itemIdx);
          setMousePos({ x: e.clientX, y: e.clientY });
        } else {
          setHoveredTraitIdx(null);
        }
      } else {
        const bitIdx = row * 4 + col;
        if (bitIdx < bits.length) {
          setHoveredTraitIdx(bitIdx);
          setHoveredIdx(itemIdx);
          setMousePos({ x: e.clientX, y: e.clientY });
        }
      }
    }
  };

  const cellNumber = String(itemIdx + 1).padStart(2, '0');

  // Churyumov-only label content
  const labelContent =
    isRD && label.includes('/')
      ? label.split('/').map((part, i) => (
          <div key={i}>
            {part.trim()}
            {i === 0 ? ' /' : ''}
          </div>
        ))
      : label;

  const labelFontSize = isTIM
    ? 'clamp(11px, 22cqi, 26px)'
    : 'clamp(6.5px, 10cqi, 12px)';

  if (isChuryumov) {
    return (
      <div
        className="relative w-full h-full select-none cursor-crosshair"
        onMouseMove={handleMouseMoveGrid}
        onMouseLeave={() => {
          setHoveredTraitIdx(null);
          setHoveredIdx(null);
        }}
        style={{ containerType: 'size' } as React.CSSProperties}
      >
        <div
          className="grid grid-cols-6 grid-rows-6 absolute inset-0"
          style={{ gap: 1, padding: 3 }}
        >
          {Array.from({ length: 36 }).map((_, i) => {
            const r = Math.floor(i / 6);
            const c = i % 6;
            const bitIdx = CHURYUMOV_P16.findIndex((p) => p[0] === r && p[1] === c);
            const bit = bitIdx !== -1 ? bits[bitIdx] : null;
            const isCellHovered = hoveredTraitIdx === bitIdx && hoveredIdx === itemIdx;
            const filled = bit === 1;
            const empty = bitIdx === -1;

            return (
              <div
                key={i}
                style={{
                  backgroundColor: empty
                    ? 'transparent'
                    : filled
                      ? color
                      : 'var(--dot-empty)',
                  border: empty ? 'none' : '1px solid var(--dot-border)',
                  borderColor: isCellHovered ? 'var(--dot-border-hi)' : empty ? 'transparent' : 'var(--dot-border)',
                  transform: isCellHovered ? 'scale(1.06)' : 'scale(1)',
                  zIndex: isCellHovered ? 10 : 1,
                  borderRadius: 2,
                  transition: 'transform 180ms cubic-bezier(0.23, 1, 0.32, 1), border-color 180ms cubic-bezier(0.23, 1, 0.32, 1)',
                  opacity: empty ? 0 : 1,
                }}
              />
            );
          })}
        </div>

        {/* Corner index (top-left) */}
        <span
          className="mono absolute pointer-events-none"
          style={{
            top: 'clamp(3px, 3cqi, 6px)',
            left: 'clamp(4px, 4cqi, 7px)',
            fontSize: 'clamp(6.5px, 7cqi, 9px)',
            letterSpacing: '0.1em',
            color: 'var(--corner-color)',
            fontWeight: 600,
            textShadow: 'var(--corner-shadow)',
          }}
        >
          {cellNumber}
        </span>

        {/* Label overlay (centered in empty middle of mini-perimeter) */}
        <div
          className="absolute pointer-events-none flex items-center justify-center text-center"
          style={{ top: '22%', left: '22%', right: '22%', bottom: '22%' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: isTIM ? 800 : 700,
              letterSpacing: isTIM ? '0.03em' : '0.01em',
              textTransform: 'uppercase',
              color: 'var(--label-color)',
              fontSize: labelFontSize,
              lineHeight: isTIM ? '1' : '1.1',
              wordBreak: isTIM ? 'normal' : 'break-word',
              overflowWrap: 'anywhere',
              width: '100%',
              textShadow: 'var(--label-shadow)',
            }}
          >
            {labelContent}
          </div>
        </div>
      </div>
    );
  }

  // Projective 4x4 — just pattern + corner index + quadra dot. Label is rendered externally below the cell.
  return (
    <div
      className="relative w-full h-full select-none cursor-crosshair"
      onMouseMove={handleMouseMoveGrid}
      onMouseLeave={() => {
        setHoveredTraitIdx(null);
        setHoveredIdx(null);
      }}
      style={{ containerType: 'size' } as React.CSSProperties}
    >
      <div
        className="grid grid-cols-4 grid-rows-4 absolute inset-0"
        style={{ gap: 3, padding: 5 }}
      >
        {bits.map((bit, idx) => {
          const isCellHovered = hoveredTraitIdx === idx && hoveredIdx === itemIdx;
          const filled = bit === 1;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: filled ? color : 'var(--dot-empty)',
                border: '1px solid var(--dot-border)',
                borderColor: isCellHovered ? 'var(--dot-border-hi)' : 'var(--dot-border)',
                transform: isCellHovered ? 'scale(1.08)' : 'scale(1)',
                zIndex: isCellHovered ? 10 : 1,
                borderRadius: 3,
                transition: 'transform 180ms cubic-bezier(0.23, 1, 0.32, 1), border-color 180ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            />
          );
        })}
      </div>

      {/* Corner index */}
      <span
        className="mono absolute pointer-events-none"
        style={{
          top: 'clamp(4px, 3.5cqi, 8px)',
          left: 'clamp(5px, 4cqi, 9px)',
          fontSize: 'clamp(7px, 6.5cqi, 10px)',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 600,
          textShadow: '0 1px 2px rgba(0,0,0,0.6)',
        }}
      >
        {cellNumber}
      </span>
    </div>
  );
});
