import React from 'react';
import { motion } from 'motion/react';
import type { ModelProps } from '../../types';
import { DotPattern } from '../patterns/DotPattern';

const POSITIONS: ReadonlyArray<{ top: string; left: string }> = [
  { top: '10%', left: '25%' }, { top: '10%', left: '42%' }, { top: '10%', left: '58%' }, { top: '10%', left: '75%' },
  { top: '25%', left: '90%' }, { top: '42%', left: '90%' }, { top: '58%', left: '90%' }, { top: '75%', left: '90%' },
  { top: '90%', left: '75%' }, { top: '90%', left: '58%' }, { top: '90%', left: '42%' }, { top: '90%', left: '25%' },
  { top: '75%', left: '10%' }, { top: '58%', left: '10%' }, { top: '42%', left: '10%' }, { top: '25%', left: '10%' },
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
    <div className="relative w-full aspect-square max-w-[800px] flex items-center justify-center bg-[var(--bg)] border border-[var(--line)] shadow-2xl rounded-sm my-12">
      <div className="absolute inset-[26%] bg-[var(--dim)]/40 border border-[var(--line)] flex flex-col items-center justify-center z-0 overflow-hidden rounded-sm backdrop-blur-md">
         <div className="absolute inset-0 opacity-10 pointer-events-none custom-grid-bg" />
      </div>

      {currentObjects.map((obj, idx) => (
        <motion.div
          key={obj.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`absolute w-[15%] p-1.5 rounded-sm border transition-all cursor-pointer group bg-[var(--bg)]/10 ${
            hoveredIdx === idx ? 'border-accent bg-accent/20 z-20 shadow-xl scale-110' : 'border-transparent z-10'
          }`}
          style={{ 
            top: POSITIONS[idx].top, 
            left: POSITIONS[idx].left,
            transform: 'translate(-50%, -50%)',
          }}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
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
        </motion.div>
      ))}
    </div>
  );
});
