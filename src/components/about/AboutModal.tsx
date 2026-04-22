import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { Lang, UIStrings, AboutContent } from '../../types';
import { HADAMARD_MATRIX } from '../../data';

export interface AboutModalProps {
  show: boolean;
  onClose: () => void;
  lang: Lang;
  UI: UIStrings;
  content: AboutContent;
}

export function AboutModal({ show, onClose, lang, UI, content }: AboutModalProps) {
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
          onClick={(e) => e.stopPropagation()}
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
