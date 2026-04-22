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
  lang,
  label,
  objectType,
}: DotPatternProps) {
  const color = QUADRA_COLORS[quadraIdx];
  const isChuryumov = modelType === 'CHURYUMOV';
  const isTIM = objectType === 'TIM';
  const isITR = objectType === 'ITR';
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

  if (isChuryumov) {
    return (
      <div
        className="grid grid-cols-6 grid-rows-6 gap-[2px] w-full aspect-square bg-black/90 p-[2px] relative border border-white/20 select-none cursor-crosshair"
        onMouseMove={handleMouseMoveGrid}
        onMouseLeave={() => {
          setHoveredTraitIdx(null);
          setHoveredIdx(null);
        }}
      >
        {Array.from({ length: 36 }).map((_, i) => {
          const r = Math.floor(i / 6);
          const c = i % 6;
          const bitIdx = CHURYUMOV_P16.findIndex((p) => p[0] === r && p[1] === c);
          const bit = bitIdx !== -1 ? bits[bitIdx] : null;
          const isCellHovered = hoveredTraitIdx === bitIdx && hoveredIdx === itemIdx;

          return (
            <div
              key={i}
              className={`transition-all duration-300 relative ${bitIdx === -1 ? 'opacity-0' : ''}`}
              style={{
                backgroundColor: bit === 1 ? color : bitIdx !== -1 ? 'rgba(40, 40, 40, 0.8)' : 'transparent',
                border: bitIdx !== -1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                borderColor: isCellHovered ? 'var(--ink)' : 'rgba(255,255,255,0.05)',
                transform: isCellHovered ? 'scale(1.1)' : 'scale(1)',
                zIndex: isCellHovered ? 10 : 1,
                boxShadow: bit === 1 && isCellHovered ? `0 0 15px ${color}` : 'none',
              }}
            />
          );
        })}
        {/* Internal Label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] pointer-events-none flex items-center justify-center overflow-hidden [container-type:size]">
          <div
            className="font-black text-center uppercase text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] w-full tracking-tight"
            style={{
              fontSize: isTIM
                ? 'clamp(14px, 18cqi, 32px)' // ТИМы - крупный шрифт
                : 'clamp(9px, 10cqi, 16px)', // Всё остальное - единый размер с переносом
              lineHeight: isTIM ? '1.05' : '1.15',
              wordBreak: isTIM ? 'normal' : 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {isRD && label.includes('/') ? (
              // Признаки Рейнина - разбиваем по /
              label.split('/').map((part, i) => (
                <div key={i} style={{ lineHeight: '1.15' }}>
                  {part.trim()}
                  {i === 0 ? '/' : ''}
                </div>
              ))
            ) : isITR && label.includes(' ') ? (
              // Отношения с пробелами - разбиваем на строки
              label.split(' ').map((word, i) => (
                <div key={i} style={{ lineHeight: '1.15' }}>
                  {word}
                </div>
              ))
            ) : (
              // ТИМы и короткие названия - одной строкой
              label
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-4 gap-[4px] w-full aspect-square bg-black/90 p-[4px] relative border border-white/20 select-none cursor-crosshair"
      onMouseMove={handleMouseMoveGrid}
      onMouseLeave={() => {
        setHoveredTraitIdx(null);
        setHoveredIdx(null);
      }}
    >
      {bits.map((bit, idx) => {
        const isCellHovered = hoveredTraitIdx === idx && hoveredIdx === itemIdx;
        return (
          <div
            key={idx}
            className="transition-all duration-300 border border-white/5"
            style={{
              backgroundColor: bit === 1 ? color : 'rgba(40, 40, 50, 0.95)',
              borderColor: isCellHovered ? 'var(--ink)' : 'rgba(255,255,255,0.3)',
              transform: isCellHovered ? 'scale(1.15)' : 'scale(1)',
              zIndex: isCellHovered ? 10 : 1,
              boxShadow: bit === 1 && isCellHovered ? `0 0 15px ${color}` : 'none',
            }}
          />
        );
      })}
    </div>
  );
});
