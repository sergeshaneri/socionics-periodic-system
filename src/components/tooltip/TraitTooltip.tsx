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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: mousePos.x > window.innerWidth * 0.65 ? '-110%' : '25px',
        y: mousePos.y > window.innerHeight * 0.6 ? '-110%' : '25px',
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fractal-tooltip border-l-4"
      style={{
        left: mousePos.x,
        top: mousePos.y,
        borderLeftColor: color,
      }}
    >
      <div className="flex flex-col gap-5">
        {/* Header Section */}
        <div>
          <div className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-1 opacity-60">
            {objectType === 'TIM'
              ? lang === 'RU'
                ? 'ТИМ'
                : 'TIM'
              : objectType === 'ITR'
                ? lang === 'RU'
                  ? 'ИТО'
                  : 'ITR'
                : lang === 'RU'
                  ? 'ПРИЗНАК'
                  : 'TRAIT'}
          </div>
          <h4 className="text-xl font-black title-italic leading-tight">
            {activeTrait.subjectName}{' '}
            <span className="text-accent uppercase">{activeTrait.poleName}</span>
          </h4>
        </div>

        {/* Bulb & Equivalence */}
        <div className="flex items-center gap-4 py-2 border-y border-ink/5">
          <div className="relative">
            <div
              className={`w-6 h-6 rounded-full transition-all duration-500 border-2 ${
                activeTrait.bit === 1 ? 'border-transparent' : 'border-ink/20 opacity-30 shadow-inner'
              }`}
              style={{
                backgroundColor: activeTrait.bit === 1 ? color : 'transparent',
                boxShadow:
                  activeTrait.bit === 1
                    ? `0 0 20px ${color}, 0 0 40px ${color}44`
                    : 'none',
              }}
            />
            {activeTrait.bit === 1 && (
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ backgroundColor: color }}
              />
            )}
          </div>
          <div className="text-[12px] font-bold">
            {activeTrait.bit === 0 && (
              <span className="text-accent underline decoration-2 underline-offset-4 mr-1">
                {lang === 'RU' ? 'НЕ ' : 'NOT '}
              </span>
            )}
            {lang === 'RU' ? 'Эквивалентно' : 'Equivalent to'} {activeTrait.equivalenceBase} ={' '}
            {activeTrait.bit}
          </div>
        </div>

        {/* Description Text */}
        <div className="text-[13px] leading-relaxed text-ink/80 opacity-[0.95] min-h-[60px]">
          {activeTrait.description}
        </div>

        {/* Footer Meta (Semi-transparent) */}
        <div className="mt-2 text-[10px] font-mono opacity-40 leading-tight border-t border-ink/5 pt-4">
          BIT index = {hoveredTraitIdx !== null ? hoveredTraitIdx + 1 : '?'} ~{' '}
          {activeTrait.correspondingTim.id} ~ {activeTrait.correspondingItr} ~{' '}
          {activeTrait.correspondingRd}
        </div>
      </div>
    </motion.div>
  );
});
