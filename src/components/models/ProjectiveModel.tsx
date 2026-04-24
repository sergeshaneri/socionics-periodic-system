import React from 'react';
import { motion } from 'motion/react';
import type { ModelProps } from '../../types';
import { DotPattern } from '../patterns/DotPattern';

export const ProjectiveModel = React.memo(function ProjectiveModel({
  currentObjects,
  lang,
  hoveredIdx,
  setHoveredIdx,
  hoveredTraitIdx,
  setHoveredTraitIdx,
  setMousePos,
  objectType,
}: ModelProps) {
  const isTrait = objectType === 'RD';
  return (
    <div
      className="shell"
      data-model="projective"
      style={{
        width: 'min(calc((100vh - 140px) * 5 / 6), calc(100vw - 20px), 700px)',
        aspectRatio: '5 / 6',
      }}
    >
      <div
        className="core h-full w-full"
        style={{ padding: 'clamp(10px, 1.6vmin, 18px)' }}
      >
        <div
          className="grid grid-cols-4 grid-rows-4 h-full w-full"
          style={{ gap: 'clamp(6px, 1vmin, 12px)' }}
        >
          {currentObjects.map((obj, idx) => {
            const isHover = hoveredIdx === idx;
            return (
              <motion.div
                key={obj.id}
                initial={{ opacity: 0, y: 4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, delay: idx * 0.008, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col min-h-0"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div
                  className="cell-shell relative"
                  data-hover={isHover}
                  style={{ aspectRatio: '1 / 1', padding: 0, flex: '0 0 auto', width: '100%' }}
                >
                  <div
                    className="cell-core absolute"
                    style={{ top: 5, left: 5, right: 5, bottom: 5 }}
                  >
                    <DotPattern
                      bits={obj.bits}
                      quadraIdx={obj.quadra}
                      itemIdx={idx}
                      modelType="PROJECTIVE"
                      hoveredIdx={hoveredIdx}
                      hoveredTraitIdx={hoveredTraitIdx}
                      setHoveredTraitIdx={setHoveredTraitIdx}
                      setHoveredIdx={setHoveredIdx}
                      setMousePos={setMousePos}
                      lang={lang}
                      label={obj.id}
                      objectType={objectType}
                    />
                  </div>
                </div>

                <div
                  className="flex-1 flex items-center justify-center text-center"
                  style={{
                    padding: '4px 2px 0',
                    minHeight: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: isTrait
                        ? 'clamp(8.5px, 1vmin, 11px)'
                        : 'clamp(10.5px, 1.25vmin, 13px)',
                      fontWeight: 600,
                      letterSpacing: isTrait ? '0' : '0.03em',
                      textTransform: isTrait ? 'none' : 'uppercase',
                      lineHeight: 1.12,
                      color: isHover ? 'var(--ink)' : 'var(--ink-dim)',
                      transition: 'color .2s cubic-bezier(0.23, 1, 0.32, 1)',
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: isTrait && obj.id.includes('/') ? 'normal' : 'nowrap',
                    }}
                  >
                    {isTrait && obj.id.includes('/') ? (
                      obj.id.split('/').map((part, i) => (
                        <div
                          key={i}
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {part.trim()}
                          {i === 0 ? ' /' : ''}
                        </div>
                      ))
                    ) : (
                      obj.id
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
