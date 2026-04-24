import type { Lang, ModelType, ObjectType, UIStrings, View } from '../../types';
import { QUADRA_COLORS, QUADRA_NAMES_EN, QUADRA_NAMES_RU } from '../../data';

export interface ToolbarProps {
  UI: UIStrings;
  lang: Lang;
  view: View;
  modelType: ModelType;
  objectType: ObjectType;
  onChangeModel: (m: ModelType) => void;
  onChangeObject: (o: ObjectType) => void;
}

export function Toolbar({
  UI,
  lang,
  view,
  modelType,
  objectType,
  onChangeModel,
  onChangeObject,
}: ToolbarProps) {
  const quadraNames = lang === 'RU' ? QUADRA_NAMES_RU : QUADRA_NAMES_EN;
  const isHadamard = view === 'HADAMARD';

  return (
    <div
      className="relative z-50 flex items-center gap-3 md:gap-6 px-4 md:px-8 overflow-x-auto no-scrollbar"
      style={{
        height: 52,
        borderBottom: '1px solid var(--hair)',
        background: 'color-mix(in oklab, var(--bg) 75%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {!isHadamard && (
        <div className="flex items-center gap-3 shrink-0">
          <span className="eyebrow hidden sm:inline">{UI.model}</span>
          <div className="seg">
            <button
              data-active={modelType === 'PROJECTIVE'}
              onClick={() => onChangeModel('PROJECTIVE')}
            >
              {UI.projective}
            </button>
            <button
              data-active={modelType === 'CHURYUMOV'}
              onClick={() => onChangeModel('CHURYUMOV')}
            >
              {UI.churyumov}
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 shrink-0">
        <span className="eyebrow hidden sm:inline">{UI.object}</span>
        <div className="seg">
          <button data-active={objectType === 'TIM'} onClick={() => onChangeObject('TIM')}>{UI.tims}</button>
          <button data-active={objectType === 'ITR'} onClick={() => onChangeObject('ITR')}>{UI.itrs}</button>
          <button data-active={objectType === 'RD'} onClick={() => onChangeObject('RD')}>{UI.arps}</button>
        </div>
      </div>

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-5 shrink-0">
        {quadraNames.map((name, i) => (
          <span key={name} className="q-chip">
            <span className="q-dot" style={{ background: QUADRA_COLORS[i] }} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
