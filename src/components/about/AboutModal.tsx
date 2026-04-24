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
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{
            background: 'color-mix(in oklab, var(--bg) 82%, transparent)',
            backdropFilter: 'blur(20px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.98, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 12, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col relative overflow-hidden"
            style={{
              background: 'var(--bg-elev)',
              border: '1px solid var(--hair)',
              borderRadius: 18,
              width: '100%',
              maxWidth: 1040,
              height: 'min(92vh, 820px)',
              boxShadow:
                '0 30px 80px -30px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between gap-6 px-8 md:px-12"
              style={{
                height: 84,
                borderBottom: '1px solid var(--hair)',
                flexShrink: 0,
              }}
            >
              <div>
                <div className="eyebrow">H16 · Fractal Manual</div>
                <h2
                  className="serif-italic leading-none"
                  style={{ fontSize: 32, marginTop: 4, letterSpacing: '-0.01em' }}
                >
                  {UI.about}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="icon-btn"
                aria-label="close"
                style={{ width: 40, height: 40 }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 md:px-12 py-10">
              {/* Origin */}
              <section
                className="mb-12 p-8 rounded-xl"
                style={{
                  background: 'color-mix(in oklab, var(--accent) 8%, transparent)',
                  border: '1px solid color-mix(in oklab, var(--accent) 25%, transparent)',
                }}
              >
                <div className="eyebrow" style={{ color: 'var(--accent)' }}>
                  {lang === 'RU' ? 'Начало координат' : 'Origin'}
                </div>
                <h3
                  className="serif-italic"
                  style={{
                    fontSize: 24,
                    lineHeight: 1.2,
                    marginTop: 6,
                    marginBottom: 10,
                  }}
                >
                  {lang === 'RU' ? 'ИЛЭ — единица системы' : 'ILE — system unit'}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--ink-dim)' }}>
                  {lang === 'RU'
                    ? 'ТИМ ИЛЭ («Дон Кихот») принят за начало координат. Любой паттерн показывает степень соответствия объекта базису ИЛЭ. Ячейки «1» означают совпадение полюса признака с ИЛЭ, «0» — различие.'
                    : 'The ILE TIM ("Don Quixote") is adopted as the system origin. Each pattern shows the degree of correspondence to the ILE basis. Cells of "1" mean the trait pole coincides with ILE, "0" means difference.'}
                </p>
              </section>

              {/* Two columns */}
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mb-12">
                {[
                  { eyebrow: lang === 'RU' ? 'Основы' : 'Foundations', body: content.intro },
                  { eyebrow: lang === 'RU' ? 'Математика' : 'Mathematics', body: content.hadamard },
                  { eyebrow: lang === 'RU' ? 'Фрактальность' : 'Fractality', body: content.fractality },
                  { eyebrow: lang === 'RU' ? 'Модели' : 'Models', body: content.models },
                  { eyebrow: lang === 'RU' ? 'Семантика' : 'Semantics', body: content.semantics },
                  { eyebrow: lang === 'RU' ? 'Экстенсивные характеристики' : 'Extensive', body: content.detailed },
                ].map((s, i) => (
                  <section key={i}>
                    <div className="eyebrow mb-2">{s.eyebrow}</div>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: 'var(--ink-dim)',
                      }}
                    >
                      {s.body}
                    </p>
                  </section>
                ))}
              </div>

              {/* Hadamard mini */}
              <section>
                <div
                  className="flex items-center justify-between mb-5"
                  style={{ paddingTop: 24, borderTop: '1px solid var(--hair)' }}
                >
                  <div>
                    <div className="eyebrow">H16 Visualization</div>
                    <h4
                      className="serif-italic"
                      style={{ fontSize: 20, marginTop: 2 }}
                    >
                      {lang === 'RU' ? 'Матрица Адамара' : 'Hadamard Matrix'}
                    </h4>
                  </div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.18em' }}>
                    16 × 16
                  </div>
                </div>
                <div
                  className="mx-auto"
                  style={{
                    maxWidth: 520,
                    border: '1px solid var(--hair)',
                    borderRadius: 8,
                    padding: 4,
                  }}
                >
                  <div
                    className="grid"
                    style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))', gap: 2 }}
                  >
                    {HADAMARD_MATRIX.flatMap((row, ri) =>
                      row.map((val, ci) => (
                        <div
                          key={`${ri}-${ci}`}
                          className="aspect-square"
                          style={{
                            background: val === 1 ? 'var(--ink)' : 'var(--ink-ghost)',
                            borderRadius: 2,
                            opacity: val === 1 ? 0.9 : 1,
                          }}
                          title={`${ri}:${ci}=${val}`}
                        />
                      ))
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between px-8 md:px-12 mono"
              style={{
                height: 48,
                borderTop: '1px solid var(--hair)',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: 'var(--ink-faint)',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              <span>© Socionics Fractal Project</span>
              <span>Hadamard engine · ready</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
