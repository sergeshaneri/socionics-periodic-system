import React from 'react';
import { motion } from 'motion/react';
import type { ModelProps } from '../../types';
import { DotPattern } from '../patterns/DotPattern';

/**
 * 4 cards per SIDE — each side carries a single quadra (Alpha=top, Beta=right,
 * Gamma=bottom, Delta=left). Corners are deliberately empty so the quadra-per-edge
 * structure stays legible.
 */
const POSITIONS: ReadonlyArray<{ top: string; left: string }> = [
  { top: '8%',  left: '24%' }, { top: '8%',  left: '41%' }, { top: '8%',  left: '59%' }, { top: '8%',  left: '76%' },
  { top: '24%', left: '92%' }, { top: '41%', left: '92%' }, { top: '59%', left: '92%' }, { top: '76%', left: '92%' },
  { top: '92%', left: '76%' }, { top: '92%', left: '59%' }, { top: '92%', left: '41%' }, { top: '92%', left: '24%' },
  { top: '76%', left: '8%'  }, { top: '59%', left: '8%'  }, { top: '41%', left: '8%'  }, { top: '24%', left: '8%'  },
];

export const ChuryumovModel = React.memo(function ChuryumovModel({
  currentObjects,
  lang,
  hoveredIdx,
  setHoveredIdx,
  hoveredTraitIdx,
  setHoveredTraitIdx,
  setMousePos,
  objectType,
}: ModelProps) {
  return (
    <div
      className="shell"
      data-model="churyumov"
      style={{
        width: 'min(calc(100vh - 140px), calc(100vw - 20px), 820px)',
        aspectRatio: '1 / 1',
      }}
    >
      <div className="core w-full h-full relative">
        {currentObjects.map((obj, idx) => {
          const isHover = hoveredIdx === idx;
          return (
            <div
              key={obj.id}
              className="absolute"
              style={{
                top: POSITIONS[idx].top,
                left: POSITIONS[idx].left,
                width: 'clamp(58px, 13vmin, 120px)',
                aspectRatio: '1 / 1',
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.32, delay: idx * 0.012, ease: [0.23, 1, 0.32, 1] }}
                className="cell-shell relative w-full h-full"
                data-hover={isHover}
                style={{ padding: 0 }}
              >
                <div className="cell-core absolute" style={{ top: 4, left: 4, right: 4, bottom: 4 }}>
                  <DotPattern
                    bits={obj.bits}
                    quadraIdx={obj.quadra}
                    itemIdx={idx}
                    modelType="CHURYUMOV"
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
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
