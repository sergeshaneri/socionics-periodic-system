/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun,
  Moon,
  X
} from 'lucide-react';
import { 
  TRAITS_EN, 
  TRAITS_RU, 
  POLES_EN, 
  POLES_RU, 
  TIMS_EN, 
  TIMS_RU, 
  ITR_EN, 
  ITR_RU, 
  HADAMARD_MATRIX, 
  QUADRA_COLORS,
  ABOUT_TEXT_RU,
  ABOUT_TEXT_EN
} from './data';
import type {
  Lang,
  ObjectType,
  ModelType,
  View,
  UIStrings,
  AboutContent,
  DisplayObject,
  Tim
} from './types';
import { CHURYUMOV_P16 } from './constants/churyumov';
import { UI_STRINGS } from './i18n/ui-strings';
import { useHoverState } from './hooks/useHoverState';
import { getTraitExplanation } from './utils/trait-explanation';

interface DotPatternProps {
  bits: number[];
  quadraIdx: number;
  itemIdx: number;
  modelType: ModelType;
  hoveredIdx: number | null;
  hoveredTraitIdx: number | null;
  setHoveredTraitIdx: (idx: number | null) => void;
  setHoveredIdx: (idx: number | null) => void;
  setMousePos: (pos: { x: number; y: number }) => void;
  label: string;
  objectType?: ObjectType;
}

const DotPattern = React.memo(({ 
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
  objectType
}: DotPatternProps & { lang: Lang }) => {
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
        const bitIdx = CHURYUMOV_P16.findIndex(p => p[0] === row && p[1] === col);
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
           const bitIdx = CHURYUMOV_P16.findIndex(p => p[0] === r && p[1] === c);
           const bit = bitIdx !== -1 ? bits[bitIdx] : null;
           const isCellHovered = hoveredTraitIdx === bitIdx && hoveredIdx === itemIdx;
           
           return (
             <div 
               key={i}
               className={`transition-all duration-300 relative ${bitIdx === -1 ? 'opacity-0' : ''}`}
               style={{
                 backgroundColor: bit === 1 ? color : (bitIdx !== -1 ? 'rgba(40, 40, 40, 0.8)' : 'transparent'),
                 border: bitIdx !== -1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                 borderColor: isCellHovered ? 'var(--ink)' : 'rgba(255,255,255,0.05)',
                 transform: isCellHovered ? 'scale(1.1)' : 'scale(1)',
                 zIndex: isCellHovered ? 10 : 1,
                 boxShadow: bit === 1 && isCellHovered ? `0 0 15px ${color}` : 'none'
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
                  ? 'clamp(14px, 18cqi, 32px)'  // ТИМы - крупный шрифт
                  : 'clamp(9px, 10cqi, 16px)',  // Всё остальное - единый размер с переносом
                lineHeight: isTIM ? '1.05' : '1.15',
                wordBreak: isTIM ? 'normal' : 'break-word',
                overflowWrap: 'break-word'
              }}
            >
            {isRD && label.includes('/') ? (
                  // Признаки Рейнина - разбиваем по /
                  label.split('/').map((part, i) => (
                    <div key={i} style={{ lineHeight: '1.15' }}>{part.trim()}{i === 0 ? '/' : ''}</div>
                  ))
                ) : isITR && label.includes(' ') ? (
                  // Отношения с пробелами - разбиваем на строки
                  label.split(' ').map((word, i) => (
                    <div key={i} style={{ lineHeight: '1.15' }}>{word}</div>
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
              boxShadow: bit === 1 && isCellHovered ? `0 0 15px ${color}` : 'none'
            }}
          />
        );
      })}
    </div>
  );
});

interface ModelProps {
  currentObjects: DisplayObject[];
  lang: Lang;
  UI: UIStrings;
  hoveredIdx: number | null;
  setHoveredIdx: (idx: number | null) => void;
  hoveredTraitIdx: number | null;
  setHoveredTraitIdx: (idx: number | null) => void;
  setMousePos: (pos: { x: number; y: number }) => void;
  objectType: ObjectType;
}

const ChuryumovModel = React.memo(({ 
  currentObjects, 
  lang, 
  UI, 
  hoveredIdx, 
  setHoveredIdx, 
  hoveredTraitIdx, 
  setHoveredTraitIdx, 
  setMousePos,
  objectType
}: ModelProps) => {
  const positions = [
    { top: '10%', left: '25%' }, { top: '10%', left: '42%' }, { top: '10%', left: '58%' }, { top: '10%', left: '75%' },
    { top: '25%', left: '90%' }, { top: '42%', left: '90%' }, { top: '58%', left: '90%' }, { top: '75%' , left: '90%' },
    { top: '90%', left: '75%' }, { top: '90%', left: '58%' }, { top: '90%', left: '42%' }, { top: '90%', left: '25%' },
    { top: '75%', left: '10%' }, { top: '58%', left: '10%' }, { top: '42%', left: '10%' }, { top: '25%', left: '10%' },
  ];
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
            top: positions[idx].top, 
            left: positions[idx].left,
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

const ProjectiveModel = React.memo(({ 
  currentObjects, 
  lang,
  UI, 
  hoveredIdx, 
  setHoveredIdx, 
  hoveredTraitIdx, 
  setHoveredTraitIdx, 
  setMousePos,
  objectType
}: ModelProps) => {
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

interface HadamardViewProps {
  UI: UIStrings;
  lang: Lang;
  traits: string[];
  HADAMARD_MATRIX: number[][];
  tims: (Tim | DisplayObject)[];
  itrs: string[];
}

const HadamardView = React.memo(({ UI, lang, traits, HADAMARD_MATRIX, tims, itrs }: HadamardViewProps) => (
  <div className="p-12 h-full overflow-auto bg-[var(--bg)]">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-4xl font-black title-italic uppercase mb-4">{UI.hadamard}</h2>
      <p className="text-sm opacity-60 mb-12 max-w-2xl leading-relaxed">
        {lang === 'RU' 
          ? "Основа периодической системы. Строки — ТИМы/ИТО, столбцы — признаки Рейнина. В системе реализована полная биекция всех множеств."
          : "Foundation of the periodic system. Rows are TIMs/ITRs, columns are Reinin traits. Full bijection of all sets is implemented."}
      </p>
      <div className="border border-[var(--line)] bg-black/20 overflow-x-auto shadow-2xl">
        <table className="w-full text-center font-mono text-[9px] border-collapse">
          <thead>
            <tr className="bg-[var(--dim)]/50 border-b border-[var(--line)]">
              <th className="p-3 border-r border-[var(--line)] text-accent whitespace-nowrap">TIM_ID</th>
              <th className="p-3 border-r border-[var(--line)] text-accent whitespace-nowrap">ID_HEX</th>
              {traits.map((t, i) => (
                <th key={i} className="p-3 border-r border-[var(--line)] whitespace-nowrap opacity-50 font-bold">
                  {t.slice(0, 3)}
                </th>
              ))}
              <th className="p-3 text-accent whitespace-nowrap">REL_ITR</th>
            </tr>
          </thead>
          <tbody>
            {HADAMARD_MATRIX.map((row, ridx) => (
              <tr key={ridx} className={`border-b border-[var(--line)] hover:bg-accent/5 transition-colors ${ridx === 0 ? 'bg-accent/5' : ''}`}>
                <td className="p-3 border-r border-[var(--line)] font-bold text-accent whitespace-nowrap">
                  {ridx === 0 && <span className="inline-block w-1 h-1 bg-accent rounded-full mr-2 animate-pulse" />}
                  {tims[ridx]?.id}
                </td>
                <td className="p-3 border-r border-[var(--line)] opacity-40">{ridx < 10 ? `0${ridx}` : ridx}</td>
                {row.map((bit, cidx) => (
                  <td key={cidx} className={`p-3 border-r border-[var(--line)] ${bit === 1 ? 'text-accent font-black' : 'opacity-10'}`}>{bit}</td>
                ))}
                <td className="p-3 font-bold text-accent whitespace-nowrap opacity-60">{itrs[ridx]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
));

export default function App() {
  const [lang, setLang] = useState<Lang>('RU');
  const [objectType, setObjectType] = useState<ObjectType>('TIM');
  const [modelType, setModelType] = useState<ModelType>('PROJECTIVE');
  const [view, setView] = useState<View>('EXPLORE');
  const [darkMode, setDarkMode] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  const {
    hoveredIdx, setHoveredIdx,
    hoveredTraitIdx, setHoveredTraitIdx,
    mousePos, setMousePos,
  } = useHoverState([view, modelType, objectType, lang, darkMode]);

  const traits = lang === 'RU' ? TRAITS_RU : TRAITS_EN;
  const poles = lang === 'RU' ? POLES_RU : POLES_EN;
  const tims = lang === 'RU' ? TIMS_RU : TIMS_EN;
  const itrs = lang === 'RU' ? ITR_RU : ITR_EN;
  const UI = UI_STRINGS[lang];

  const currentObjects = useMemo(() => {
    if (objectType === 'TIM') return tims.map((t, idx) => ({ ...t, bits: HADAMARD_MATRIX[idx] }));
    if (objectType === 'ITR') return itrs.map((name, idx) => ({ id: name, name, bits: HADAMARD_MATRIX[idx], quadra: Math.floor(idx / 4) }));
    
    // RDs/Traits: show dual poles if not Existence
    const polesList = lang === 'RU' ? POLES_RU : POLES_EN;
    return traits.map((name, idx) => {
      let displayName = name;
      if (idx > 0 && polesList[idx]) {
        displayName = `${polesList[idx][0]} / ${polesList[idx][1]}`;
      }
      return { id: displayName, name: displayName, bits: HADAMARD_MATRIX[idx], quadra: Math.floor(idx / 4) };
    });
  }, [objectType, tims, itrs, traits, lang]);

  const activeItem = hoveredIdx !== null ? currentObjects[hoveredIdx] : null;
  const activeTrait =
    hoveredTraitIdx !== null && hoveredIdx !== null
      ? getTraitExplanation({
          traitIdx: hoveredTraitIdx,
          itemIdx: hoveredIdx,
          lang,
          objectType,
          currentObjects,
          tims,
          itrs,
          traits,
          poles,
        })
      : null;

  const color = activeItem ? QUADRA_COLORS[activeItem.quadra || 0] : 'var(--accent)';

  const help = lang === 'RU' ? ABOUT_TEXT_RU : ABOUT_TEXT_EN;

  return (
    <div className={`flex flex-col h-screen select-none ${!darkMode ? 'light' : ''}`} style={{ backgroundColor: 'var(--bg)', color: 'var(--ink)' }}>
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="custom-grid-bg" />
      </div>

      <header className="px-8 md:px-16 py-6 border-b border-[var(--line)] flex flex-wrap gap-8 justify-between items-center bg-[var(--bg)]/90 backdrop-blur-xl z-[60] shadow-sm">
        <div className="flex flex-wrap items-center gap-8 md:gap-12">
          <div className="min-w-fit">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black title-italic leading-none uppercase tracking-tighter">{UI.title}</h1>
            <div className="text-[9px] md:text-[10px] font-bold text-accent uppercase tracking-[0.4em] mt-2">{UI.subtitle}</div>
          </div>
          <div className="flex border border-[var(--line)] min-h-10 bg-[var(--dim)]/30 p-1 flex-wrap gap-1">
            <button 
              onClick={() => setView('EXPLORE')}
              className={`px-4 md:px-6 py-2 text-[10px] uppercase font-black tracking-widest transition-all ${view === 'EXPLORE' ? 'bg-accent text-bg' : 'opacity-40 hover:opacity-100'}`}
            >
              {UI.explore}
            </button>
            <div className="w-[1px] h-4 bg-[var(--line)] self-center mx-3" />
            <button 
              onClick={() => setView('HADAMARD')}
              className={`px-4 md:px-6 py-2 text-[10px] uppercase font-black tracking-widest transition-all ${view === 'HADAMARD' ? 'bg-accent text-bg' : 'opacity-40 hover:opacity-100'}`}
            >
              {UI.hadamard}
            </button>
          </div>
        </div>

        <div className="flex gap-2 items-center">
            <button 
              onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')}
              className="px-4 h-10 border border-[var(--line)] text-[11px] font-black uppercase tracking-widest hover:bg-[var(--glass)]"
            >
              {lang}
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 border border-[var(--line)] flex items-center justify-center hover:bg-[var(--glass)]"
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button 
              onClick={() => setShowAbout(true)}
              className="px-6 h-10 bg-ink text-bg text-[11px] font-black uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-transform"
            >
              {UI.about}
            </button>
        </div>
      </header>

      <AboutModal show={showAbout} onClose={() => setShowAbout(false)} lang={lang} content={help} UI={UI} />

      <main className="flex-1 flex flex-col min-h-0 bg-[var(--bg)] relative">
        {/* Horizontal Toolbar */}
        <div className="w-full border-b border-[var(--line)] flex items-center justify-center gap-6 md:gap-12 py-3 px-4 md:px-8 bg-[var(--bg)]/95 backdrop-blur-md z-50 shadow-sm overflow-x-auto no-scrollbar">
           <div className="flex items-center gap-3 md:gap-4 shrink-0">
              <div className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">{UI.model}</div>
                <div className="flex border border-[var(--line)] p-1 bg-[var(--dim)]/30">
                  <button onClick={() => setModelType('PROJECTIVE')} className={`btn-tech border-none whitespace-nowrap min-h-[40px] px-6 ${modelType === 'PROJECTIVE' ? 'active' : ''}`}>{UI.projective}</button>
                  <button onClick={() => setModelType('CHURYUMOV')} className={`btn-tech border-none whitespace-nowrap min-h-[40px] px-6 ${modelType === 'CHURYUMOV' ? 'active' : ''}`}>{UI.churyumov}</button>
                </div>
           </div>

           <div className="h-6 w-[1px] bg-[var(--line)] shrink-0" />

           <div className="flex items-center gap-3 md:gap-4 shrink-0">
              <div className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">{UI.object}</div>
              <div className="flex border border-[var(--line)] p-1 bg-[var(--dim)]/30">
                <button onClick={() => setObjectType('TIM')} className={`btn-tech border-none whitespace-nowrap min-h-[40px] px-6 ${objectType === 'TIM' ? 'active' : ''}`}>{UI.tims}</button>
                <button onClick={() => setObjectType('ITR')} className={`btn-tech border-none whitespace-nowrap min-h-[40px] px-6 ${objectType === 'ITR' ? 'active' : ''}`}>{UI.itrs}</button>
                <button onClick={() => setObjectType('RD')} className={`btn-tech border-none whitespace-nowrap min-h-[40px] px-6 ${objectType === 'RD' ? 'active' : ''}`}>{UI.arps}</button>
              </div>
           </div>
        </div>

        <div className="flex-1 relative flex justify-center items-start overflow-auto p-12 md:p-16 lg:p-20 no-scrollbar pb-32">
           {view === 'EXPLORE' ? (
             <AnimatePresence mode="wait">
                <motion.div 
                  key={modelType}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 1.02 }}
                  className="w-full h-auto min-h-full flex flex-col items-center justify-start p-8 md:p-12"
                >
                   {modelType === 'PROJECTIVE' ? (
                     <ProjectiveModel 
                       currentObjects={currentObjects}
                       lang={lang}
                       UI={UI}
                       hoveredIdx={hoveredIdx}
                       setHoveredIdx={setHoveredIdx}
                       hoveredTraitIdx={hoveredTraitIdx}
                       setHoveredTraitIdx={setHoveredTraitIdx}
                       setMousePos={setMousePos}
                       objectType={objectType}
                     />
                   ) : (
                     <ChuryumovModel 
                       currentObjects={currentObjects}
                       lang={lang}
                       UI={UI}
                       hoveredIdx={hoveredIdx}
                       setHoveredIdx={setHoveredIdx}
                       hoveredTraitIdx={hoveredTraitIdx}
                       setHoveredTraitIdx={setHoveredTraitIdx}
                       setMousePos={setMousePos}
                       objectType={objectType}
                     />
                   )}
                </motion.div>
             </AnimatePresence>
           ) : <HadamardView UI={UI} lang={lang} traits={traits} HADAMARD_MATRIX={HADAMARD_MATRIX} tims={objectType === 'TIM' ? (lang === 'RU' ? TIMS_RU : TIMS_EN) : currentObjects} itrs={itrs} />}
        </div>
      </main>

      <AnimatePresence>
        {(activeTrait && activeItem) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
               opacity: 1, 
               scale: 1,
               x: mousePos.x > window.innerWidth * 0.65 ? '-110%' : '25px',
               y: mousePos.y > window.innerHeight * 0.6 ? '-110%' : '25px'
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fractal-tooltip border-l-4"
            style={{ 
               left: mousePos.x, 
               top: mousePos.y,
               borderLeftColor: color
            }}
          >
             <div className="flex flex-col gap-5">
                {/* Header Section */}
                <div>
                   <div className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-1 opacity-60">
                      {objectType === 'TIM' ? (lang === 'RU' ? 'ТИМ' : 'TIM') : 
                       objectType === 'ITR' ? (lang === 'RU' ? 'ИТО' : 'ITR') :
                       (lang === 'RU' ? 'ПРИЗНАК' : 'TRAIT')}
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
                           boxShadow: activeTrait.bit === 1 ? `0 0 20px ${color}, 0 0 40px ${color}44` : 'none'
                        }}
                      />
                      {activeTrait.bit === 1 && (
                         <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: color }} />
                      )}
                   </div>
                   <div className="text-[12px] font-bold">
                      {activeTrait.bit === 0 && <span className="text-accent underline decoration-2 underline-offset-4 mr-1">{lang === 'RU' ? 'НЕ ' : 'NOT '}</span>} 
                      {lang === 'RU' ? 'Эквивалентно' : 'Equivalent to'} {activeTrait.equivalenceBase} = {activeTrait.bit}
                   </div>
                </div>

                {/* Description Text */}
                <div className="text-[13px] leading-relaxed text-ink/80 opacity-[0.95] min-h-[60px]">
                   {activeTrait.description}
                </div>

                {/* Footer Meta (Semi-transparent) */}
                <div className="mt-2 text-[10px] font-mono opacity-40 leading-tight border-t border-ink/5 pt-4">
                   BIT index = {hoveredTraitIdx !== null ? hoveredTraitIdx + 1 : '?'} ~ {activeTrait.correspondingTim.id} ~ {activeTrait.correspondingItr} ~ {activeTrait.correspondingRd}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AboutModalProps {
  show: boolean;
  onClose: () => void;
  lang: Lang;
  UI: UIStrings;
  content: AboutContent;
}

function AboutModal({ show, onClose, lang, UI, content }: AboutModalProps) {
  if (!show) return null;
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[var(--bg)]/95 backdrop-blur-3xl flex items-center justify-center p-8 md:p-16"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.98, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-[var(--bg)] border border-[var(--line)] w-full max-w-6xl h-full flex flex-col shadow-2xl relative overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="px-12 py-10 border-b border-[var(--line)] flex justify-between items-center bg-[var(--dim)]/20">
            <div>
              <h2 className="text-4xl font-black title-italic uppercase tracking-tighter">{UI.about}</h2>
              <div className="text-[10px] opacity-30 uppercase font-mono tracking-[0.4em] mt-2">H16 Fractal Manual / Extensive Characteristics</div>
            </div>
            <button onClick={onClose} className="w-12 h-12 border border-[var(--line)] flex items-center justify-center hover:bg-accent hover:text-bg transition-all transform hover:rotate-90">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-12 md:p-20 space-y-20 scroll-smooth">
             <section className="p-10 bg-accent/10 border-2 border-accent/30 rounded-sm relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <div className="text-8xl font-black italic uppercase">Origin</div>
                </div>
                <div className="relative z-10 flex items-center gap-6">
                   <div className="h-16 w-[4px] bg-accent" />
                   <div>
                      <h3 className="text-xl md:text-2xl font-black title-italic uppercase tracking-tighter text-accent mb-2">
                        {lang === 'RU' ? 'ИЛЭ — Единица Системы' : 'ILE — System Unit'}
                      </h3>
                      <p className="text-[15px] leading-relaxed max-w-2xl font-bold italic-serif">
                        {lang === 'RU' 
                          ? 'ТИМ ИЛЭ ("Дон Кихот") принят за начало координат. Любой паттерн показывает степень соответствия объекта базису ИЛЭ. Положительные ячейки (1) означают совпадение полюса признака с ИЛЭ, серые (0) — различие.'
                          : 'ILE ("Don Quixote") is adopted as the system origin. Patterns show the degree of correspondence to the ILE basis. Plus cells (1) mean trait pole coincidence with ILE, gray (0) means difference.'}
                      </p>
                   </div>
                </div>
             </section>

             <div className="grid md:grid-cols-2 gap-20">
                <div className="space-y-12">
                   <section className="space-y-4">
                      <div className="flex items-center gap-4">
                         <div className="h-[2px] w-8 bg-accent" />
                         <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">{lang === 'RU' ? 'ОСНОВЫ' : 'FOUNDATIONS'}</h3>
                      </div>
                      <p className="text-[15px] leading-relaxed opacity-80">{content.intro}</p>
                   </section>
                   <section className="space-y-4">
                      <div className="flex items-center gap-4">
                         <div className="h-[2px] w-8 bg-accent" />
                         <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">{lang === 'RU' ? 'МАТЕМАТИКА' : 'MATHEMATICS'}</h3>
                      </div>
                      <p className="text-[15px] leading-relaxed opacity-80">{content.hadamard}</p>
                   </section>
                   <section className="space-y-4">
                      <div className="flex items-center gap-4">
                         <div className="h-[2px] w-8 bg-accent" />
                         <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">{lang === 'RU' ? 'ФРАКТАЛЬНОСТЬ' : 'FRACTALITY'}</h3>
                      </div>
                      <p className="text-[15px] leading-relaxed opacity-80">{content.fractality}</p>
                   </section>
                </div>
                <div className="space-y-12">
                   <section className="space-y-4">
                      <div className="flex items-center gap-4">
                         <div className="h-[2px] w-8 bg-accent" />
                         <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">{lang === 'RU' ? 'МОДЕЛИ' : 'MODELS'}</h3>
                      </div>
                      <p className="text-[15px] leading-relaxed opacity-80">{content.models}</p>
                   </section>
                   <section className="space-y-4">
                      <div className="flex items-center gap-4">
                         <div className="h-[2px] w-8 bg-accent" />
                         <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">{lang === 'RU' ? 'СЕМАНТИКА' : 'SEMANTICS'}</h3>
                      </div>
                      <p className="text-[15px] leading-relaxed opacity-80">{content.semantics}</p>
                   </section>
                   <section className="p-10 bg-accent/5 border border-accent/20 rounded-sm">
                      <h4 className="text-[11px] font-black uppercase mb-4 tracking-[0.2em]">{lang === 'RU' ? 'ЭКСТЕНСИВНЫЕ ХАРАКТЕРИСТИКИ' : 'EXTENSIVE CHARACTERISTICS'}</h4>
                      <p className="text-[14px] leading-relaxed opacity-80 italic italic-serif">{content.detailed}</p>
                   </section>
                </div>
             </div>

             <section className="pt-20 border-t border-[var(--line)]">
                <div className="flex flex-col items-center mb-12">
                   <h3 className="text-xs font-black uppercase text-accent tracking-[0.5em] mb-4">HADAMARD_CORE_VISUALIZATION (H16)</h3>
                   <div className="w-16 h-[2px] bg-accent opacity-30" />
                </div>
                <div className="max-w-4xl mx-auto border border-[var(--line)] p-1 bg-black/40">
                   <div className="grid border-t border-l border-[var(--line)]" style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}>
                      {HADAMARD_MATRIX.flatMap((row, ri) => 
                        row.map((val, ci) => {
                          const isBenchmark = ri === 0;
                          return (
                            <div 
                              key={`${ri}-${ci}`} 
                              className={`aspect-square flex items-center justify-center text-[7px] border-r border-b border-[var(--line)] font-mono transition-all hover:bg-accent/40 cursor-help ${val === 1 ? 'text-accent font-black' : 'opacity-20'} ${isBenchmark ? 'bg-accent/10 outline outline-1 outline-accent/40 outline-offset-[-2px]' : ''}`}
                            >
                               {val}
                            </div>
                          );
                        })
                      )}
                   </div>
                </div>
             </section>
          </div>

          <div className="px-12 py-8 border-t border-[var(--line)] bg-[var(--dim)]/30 flex justify-between items-center text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">
             <span>© SOCIONICS_FRACTAL_PROJECT v1.2</span>
             <span>SYMMETRICAL_HADAMARD_ENGINE_READY</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
