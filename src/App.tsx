/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
} from './types';
import { UI_STRINGS } from './i18n/ui-strings';
import { useHoverState } from './hooks/useHoverState';
import { getTraitExplanation } from './utils/trait-explanation';

import { ChuryumovModel } from './components/models/ChuryumovModel';
import { ProjectiveModel } from './components/models/ProjectiveModel';
import { HadamardView } from './components/views/HadamardView';
import { TraitTooltip } from './components/tooltip/TraitTooltip';
import { AboutModal } from './components/about/AboutModal';
import { Header } from './components/layout/Header';
import { Toolbar } from './components/layout/Toolbar';

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

      <Header
        UI={UI}
        lang={lang}
        darkMode={darkMode}
        view={view}
        onToggleLang={() => setLang(lang === 'RU' ? 'EN' : 'RU')}
        onToggleTheme={() => setDarkMode(!darkMode)}
        onOpenAbout={() => setShowAbout(true)}
        onChangeView={setView}
      />

      <AboutModal show={showAbout} onClose={() => setShowAbout(false)} lang={lang} content={help} UI={UI} />

      <main className="flex-1 flex flex-col min-h-0 bg-[var(--bg)] relative">
        <Toolbar
          UI={UI}
          modelType={modelType}
          objectType={objectType}
          onChangeModel={setModelType}
          onChangeObject={setObjectType}
        />

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

