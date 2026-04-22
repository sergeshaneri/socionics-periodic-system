import React from 'react';
import type { Lang, UIStrings, Tim, DisplayObject } from '../../types';
import { HADAMARD_MATRIX } from '../../data';

export interface HadamardViewProps {
  UI: UIStrings;
  lang: Lang;
  traits: string[];
  tims: ReadonlyArray<Tim | DisplayObject>;
  itrs: string[];
}

export const HadamardView = React.memo(function HadamardView({
  UI,
  lang,
  traits,
  tims,
  itrs,
}: HadamardViewProps) {
  return (
    <div className="p-12 h-full overflow-auto bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black title-italic uppercase mb-4">{UI.hadamard}</h2>
        <p className="text-sm opacity-60 mb-12 max-w-2xl leading-relaxed">
          {lang === 'RU'
            ? 'Основа периодической системы. Строки — ТИМы/ИТО, столбцы — признаки Рейнина. В системе реализована полная биекция всех множеств.'
            : 'Foundation of the periodic system. Rows are TIMs/ITRs, columns are Reinin traits. Full bijection of all sets is implemented.'}
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
  );
});
