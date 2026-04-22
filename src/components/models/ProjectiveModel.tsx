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
  objectType
}: ModelProps) {
  const isTrait = objectType === 'RD';
  return (
    <div className={`grid grid-cols-4 w-full max-w-[680px] p-10 border border-[var(--line)] bg-[var(--glass)] rounded-sm ${isTrait ? 'gap-x-4 gap-y-12 pb-16' : 'gap-x-6 gap-y-10 pb-16'} my-8`}>
      {currentObjects.map((obj, idx) => (
        <motion.div
          key={obj.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex flex-col items-center transition-all cursor-pointer group rounded-sm p-3 relative ${
            hoveredIdx === idx ? 'bg-accent/10 z-20' : 'bg-transparent'
          }`}
          onMouseEnter={() => setHoveredIdx(idx)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          <div className={`w-full aspect-square border transition-all rounded-sm shadow-sm ${
            hoveredIdx === idx ? 'border-accent scale-105 shadow-accent/20' : 'border-[var(--line)] bg-[var(--bg)]/40 hover:bg-[var(--glass)]'
          }`}>
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
          <div className={`mt-3 w-full font-mono font-black transition-all px-2 py-2 rounded-sm border text-center leading-[1.1] backdrop-blur-md shadow-lg ${isTrait ? 'text-[10px] tracking-tight' : 'text-[12px] tracking-normal'} ${
             hoveredIdx === idx ? 'bg-accent/95 text-bg border-accent opacity-100 scale-105' : 'bg-[var(--bg)]/80 border-[var(--line)] opacity-80'
          }`}>
            {isTrait && obj.id.includes('/') ? (
              obj.id.split('/').map((part, i) => (
                <div key={i}>{part.trim()}{i === 0 ? '/' : ''}</div>
              ))
            ) : obj.id}
          </div>
        </motion.div>
      ))}
    </div>
  );
});
