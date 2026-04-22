import { Sun, Moon } from 'lucide-react';
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
    <header className="px-8 md:px-16 py-6 border-b border-[var(--line)] flex flex-wrap gap-8 justify-between items-center bg-[var(--bg)]/90 backdrop-blur-xl z-[60] shadow-sm">
      <div className="flex flex-wrap items-center gap-8 md:gap-12">
        <div className="min-w-fit">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black title-italic leading-none uppercase tracking-tighter">{UI.title}</h1>
          <div className="text-[9px] md:text-[10px] font-bold text-accent uppercase tracking-[0.4em] mt-2">{UI.subtitle}</div>
        </div>
        <div className="flex border border-[var(--line)] min-h-10 bg-[var(--dim)]/30 p-1 flex-wrap gap-1">
          <button
            onClick={() => onChangeView('EXPLORE')}
            className={`px-4 md:px-6 py-2 text-[10px] uppercase font-black tracking-widest transition-all ${view === 'EXPLORE' ? 'bg-accent text-bg' : 'opacity-40 hover:opacity-100'}`}
          >
            {UI.explore}
          </button>
          <div className="w-[1px] h-4 bg-[var(--line)] self-center mx-3" />
          <button
            onClick={() => onChangeView('HADAMARD')}
            className={`px-4 md:px-6 py-2 text-[10px] uppercase font-black tracking-widest transition-all ${view === 'HADAMARD' ? 'bg-accent text-bg' : 'opacity-40 hover:opacity-100'}`}
          >
            {UI.hadamard}
          </button>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={onToggleLang}
          className="px-4 h-10 border border-[var(--line)] text-[11px] font-black uppercase tracking-widest hover:bg-[var(--glass)]"
        >
          {lang}
        </button>
        <button
          onClick={onToggleTheme}
          className="w-10 h-10 border border-[var(--line)] flex items-center justify-center hover:bg-[var(--glass)]"
        >
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <button
          onClick={onOpenAbout}
          className="px-6 h-10 bg-ink text-bg text-[11px] font-black uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-transform"
        >
          {UI.about}
        </button>
      </div>
    </header>
  );
}
