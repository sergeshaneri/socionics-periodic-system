import { Sun, Moon, Info } from 'lucide-react';
import type { Lang, View, UIStrings } from '../../types';

export interface HeaderProps {
  UI: UIStrings;
  lang: Lang;
  darkMode: boolean;
  view: View;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onOpenAbout: () => void;
  onChangeView: (v: View) => void;
}

export function Header({
  UI,
  lang,
  darkMode,
  view,
  onToggleLang,
  onToggleTheme,
  onOpenAbout,
  onChangeView,
}: HeaderProps) {
  return (
    <header
      className="relative z-[60] flex items-center justify-between gap-3 md:gap-6 px-4 md:px-8"
      style={{
        height: 64,
        borderBottom: '1px solid var(--hair)',
        background: 'color-mix(in oklab, var(--bg) 75%, transparent)',
        backdropFilter: 'blur(18px) saturate(140%)',
        WebkitBackdropFilter: 'blur(18px) saturate(140%)',
      }}
    >
      <div className="flex items-baseline gap-4 min-w-0 shrink">
        <span
          className="serif-italic leading-none truncate"
          style={{
            fontSize: 'clamp(18px, 2.4vw, 26px)',
            letterSpacing: '-0.015em',
            color: 'var(--ink)',
          }}
        >
          {UI.title}
        </span>
        <span className="eyebrow hidden lg:inline truncate">{UI.subtitle}</span>
      </div>

      <div className="seg shrink-0" role="tablist" aria-label="view">
        <button
          role="tab"
          data-active={view === 'EXPLORE'}
          onClick={() => onChangeView('EXPLORE')}
        >
          {UI.explore}
        </button>
        <button
          role="tab"
          data-active={view === 'HADAMARD'}
          onClick={() => onChangeView('HADAMARD')}
        >
          {UI.hadamard}
        </button>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onToggleLang}
          className="icon-btn mono"
          style={{ fontSize: 11, letterSpacing: '0.08em', fontWeight: 600 }}
          aria-label="language"
        >
          {lang}
        </button>
        <button onClick={onToggleTheme} className="icon-btn" aria-label="theme">
          {darkMode ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
        </button>
        <button onClick={onOpenAbout} className="icon-btn" aria-label={UI.about}>
          <Info size={14} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
