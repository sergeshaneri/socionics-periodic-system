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
  color,
}: TraitTooltipProps) {
  const flipX = mousePos.x > window.innerWidth * 0.6;
  const flipY = mousePos.y > window.innerHeight * 0.55;
  const offsetX = flipX ? '-108%' : '20px';
  const offsetY = flipY ? '-108%' : '18px';

  const isLit = activeTrait.bit === 1;

  // Subject styling per object type
  const isITRRelation = objectType === 'ITR';

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
      {/* Header: subject + pole */}
      <div>
        <div
          className="serif-italic"
          style={{
            fontSize: isITRRelation ? 21 : 22,
            lineHeight: 1.12,
            letterSpacing: '-0.015em',
            color: 'var(--ink)',
          }}
        >
          {activeTrait.subjectName}
        </div>
        {activeTrait.poleName && (
          <div
            style={{
              marginTop: 4,
              fontFamily: 'var(--font-sans)',
              fontWeight: objectType === 'TIM' ? 800 : 700,
              fontSize: 13,
              letterSpacing: objectType === 'TIM' ? '0.08em' : '0.02em',
              textTransform: objectType === 'TIM' ? 'uppercase' : 'none',
              color: isLit ? color : 'var(--ink)',
              transition: 'color .2s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            {activeTrait.poleName}
          </div>
        )}
      </div>

      {/* Lamp + equivalence */}
      <div
        className="flex items-center gap-3"
        style={{
          margin: '14px 0',
          padding: '12px 0',
          borderTop: '1px solid var(--hair)',
          borderBottom: '1px solid var(--hair)',
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'relative',
            width: 14,
            height: 14,
            flexShrink: 0,
            display: 'inline-block',
          }}
        >
          {/* outer halo (only when lit) */}
          {isLit && (
            <span
              style={{
                position: 'absolute',
                inset: -6,
                borderRadius: 999,
                background: `radial-gradient(circle, ${color}55 0%, transparent 65%)`,
                filter: 'blur(2px)',
                pointerEvents: 'none',
              }}
            />
          )}
          {/* the bulb */}
          <span
            style={{
              position: 'relative',
              display: 'block',
              width: '100%',
              height: '100%',
              borderRadius: 999,
              background: isLit ? color : 'transparent',
              border: isLit ? `1px solid ${color}` : '1.5px solid var(--ink-faint)',
              boxShadow: isLit
                ? `0 0 10px ${color}cc, 0 0 18px ${color}66, inset 0 0 4px rgba(255,255,255,0.35)`
                : 'inset 0 0 0 0 transparent',
              transition: 'background 200ms cubic-bezier(0.23,1,0.32,1), box-shadow 200ms cubic-bezier(0.23,1,0.32,1)',
            }}
          />
        </span>
        <span style={{ fontSize: 13, color: 'var(--ink-dim)' }}>
          {!isLit && (
            <span style={{ color: 'var(--ink)', fontWeight: 700, marginRight: 4 }}>
              {lang === 'RU' ? 'НЕ' : 'NOT'}
            </span>
          )}
          {lang === 'RU' ? 'Эквивалентно' : 'Equivalent to'}{' '}
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>
            {activeTrait.equivalenceBase}
          </span>{' '}
          ={' '}
          <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{activeTrait.bit}</span>
        </span>
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 12.5,
          lineHeight: 1.55,
          color: 'var(--ink-dim)',
        }}
      >
        {activeTrait.description}
      </div>

      {/* Footer (semi-transparent) */}
      <div
        className="mono"
        style={{
          marginTop: 14,
          paddingTop: 10,
          borderTop: '1px solid var(--hair)',
          fontSize: 10,
          letterSpacing: '0.06em',
          color: 'var(--ink-faint)',
          opacity: 0.85,
        }}
      >
        {activeTrait.footerLine}
      </div>
    </motion.div>
  );
});
