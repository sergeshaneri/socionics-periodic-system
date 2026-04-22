/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
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
} from './types';
import { UI_STRINGS } from './i18n/ui-strings';
import { useHoverState } from './hooks/useHoverState';
import { getTraitExplanation } from './utils/trait-explanation';

import { ChuryumovModel } from './components/models/ChuryumovModel';
import { ProjectiveModel } from './components/models/ProjectiveModel';
import { HadamardView } from './components/views/HadamardView';
import { TraitTooltip } from './components/tooltip/TraitTooltip';

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
           ) : <HadamardView UI={UI} lang={lang} traits={traits} tims={objectType === 'TIM' ? (lang === 'RU' ? TIMS_RU : TIMS_EN) : currentObjects} itrs={itrs} />}
        </div>
      </main>

      <AnimatePresence>
        {activeTrait && activeItem && (
          <TraitTooltip
            activeTrait={activeTrait}
            objectType={objectType}
            lang={lang}
            mousePos={mousePos}
            hoveredTraitIdx={hoveredTraitIdx}
            color={color}
          />
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
