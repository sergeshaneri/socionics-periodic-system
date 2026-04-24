import React from 'react';
import { motion } from 'motion/react';
import type { Lang, ObjectType, TraitExplanation } from '../../types';
import type { MousePos } from '../../hooks/useHoverState';

export interface TraitTooltipProps {
  activeTrait: TraitExplanation;
  objectType: ObjectType;
  lang: Lang;
  mousePos: MousePos;
  hoveredTraitIdx: number | null;
  color: string;
}

export const TraitTooltip = React.memo(function TraitTooltip({
  activeTrait,
  objectType,
  lang,
  mousePos,
  hoveredTraitIdx,
  color,
}: TraitTooltipProps) {
  const kind =
    objectType === 'TIM'
      ? lang === 'RU' ? 'ТИМ' : 'TIM'
      : objectType === 'ITR'
        ? lang === 'RU' ? 'ИТО' : 'ITR'
        : lang === 'RU' ? 'Признак' : 'Trait';

  // Position tooltip relative to cursor, flipping if near edges
  const flipX = mousePos.x > window.innerWidth * 0.6;
  const flipY = mousePos.y > window.innerHeight * 0.55;
  const offsetX = flipX ? '-108%' : '20px';
  const offsetY = flipY ? '-108%' : '18px';

  return (
    <motion.div
      initial={{ opacity: 0, y: 4, scale: 0.97 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        x: offsetX,
        translateY: offsetY,
      }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      className="infocard"
      style={{
        left: mousePos.x,
        top: mousePos.y,
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: '0.22em',
            color: 'var(--ink-faint)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {kind}
        </span>
        <span
          className="mono"
          style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--ink-faint)' }}
        >
          {hoveredTraitIdx !== null ? String(hoveredTraitIdx + 1).padStart(2, '0') : '—'}
          <span style={{ opacity: 0.4, margin: '0 6px' }}>/</span>
          16
        </span>
      </div>

      {/* Subject */}
      <div
        className="serif-italic"
        style={{ fontSize: 22, lineHeight: 1.12, letterSpacing: '-0.015em', color: 'var(--ink)' }}
      >
        {activeTrait.subjectName}
      </div>
      <div
        className="serif-italic"
        style={{ fontSize: 14, lineHeight: 1.2, color: 'var(--ink-dim)', marginTop: 2 }}
      >
        — {activeTrait.poleName}
      </div>

      {/* Bit row */}
      <div
        className="flex items-center gap-3"
        style={{
          margin: '14px 0',
          padding: '11px 0',
          borderTop: '1px solid var(--hair)',
          borderBottom: '1px solid var(--hair)',
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: activeTrait.bit === 1 ? 2 : 999,
            background: activeTrait.bit === 1 ? color : 'var(--ink-ghost)',
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 12.5, color: 'var(--ink-dim)' }}>
          {activeTrait.bit === 0 && (
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>
              {lang === 'RU' ? 'не ' : 'not '}
            </span>
          )}
          {lang === 'RU' ? 'эквивалентно' : 'equivalent to'}{' '}
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>
            {activeTrait.equivalenceBase}
          </span>
        </span>
      </div>

      {/* Description */}
      <div style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-dim)' }}>
        {activeTrait.description}
      </div>

      {/* Footer meta */}
      <div
        className="mono"
        style={{
          marginTop: 14,
          paddingTop: 10,
          borderTop: '1px solid var(--hair)',
          fontSize: 9.5,
          letterSpacing: '0.16em',
          color: 'var(--ink-faint)',
          textTransform: 'uppercase',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <span>TIM · {activeTrait.correspondingTim.id}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ textTransform: 'none' }}>{activeTrait.correspondingItr}</span>
      </div>
    </motion.div>
  );
});
