import React from 'react';
import { motion } from 'motion/react';
import type { ModelProps } from '../../types';
import { DotPattern } from '../patterns/DotPattern';

const POSITIONS: ReadonlyArray<{ top: string; left: string }> = [
  { top: '14%', left: '26%' }, { top: '14%', left: '42%' }, { top: '14%', left: '58%' }, { top: '14%', left: '74%' },
  { top: '26%', left: '86%' }, { top: '42%', left: '86%' }, { top: '58%', left: '86%' }, { top: '74%', left: '86%' },
  { top: '86%', left: '74%' }, { top: '86%', left: '58%' }, { top: '86%', left: '42%' }, { top: '86%', left: '26%' },
  { top: '74%', left: '14%' }, { top: '58%', left: '14%' }, { top: '42%', left: '14%' }, { top: '26%', left: '14%' },
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
                width: 'clamp(82px, 14.5vmin, 130px)',
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
