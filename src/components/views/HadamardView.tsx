import React, { useState } from 'react';
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
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-5">
      <div
        className="shell flex flex-col"
        style={{
          width: 'min(calc(100vw - 24px), 1240px)',
          height: 'min(calc(100vh - 148px), 780px)',
        }}
      >
        <div
          className="core flex-1 flex flex-col min-h-0"
          style={{ padding: 'clamp(14px, 2vmin, 22px)' }}
        >
          {/* Header */}
          <div className="flex items-baseline justify-between gap-4 mb-4">
            <div>
              <div className="eyebrow">H16 · Hadamard</div>
              <h2
                className="serif-italic leading-none"
                style={{
                  fontSize: 'clamp(22px, 3vmin, 32px)',
                  marginTop: 4,
                  letterSpacing: '-0.015em',
                }}
              >
                {UI.hadamard}
              </h2>
            </div>
            <p
              className="hidden md:block text-right"
              style={{
                fontSize: 12.5,
                color: 'var(--ink-dim)',
                lineHeight: 1.55,
                maxWidth: 440,
              }}
            >
              {lang === 'RU'
                ? 'Строки — ТИМы/ИТО, столбцы — признаки Рейнина. Полная биекция множеств.'
                : 'Rows — TIMs/ITRs, columns — Reinin traits. A full bijection of the sets.'}
            </p>
          </div>

          {/* Table */}
          <div
            className="relative flex-1 min-h-0 overflow-hidden"
            onMouseLeave={() => setHover(null)}
            style={{
              borderRadius: 12,
              border: '1px solid var(--hair)',
              background: 'color-mix(in oklab, var(--ink) 1.5%, transparent)',
            }}
          >
            <div className="h-full w-full overflow-auto no-scrollbar">
              <table
                className="w-full h-full mono"
                style={{
                  borderCollapse: 'separate',
                  borderSpacing: 0,
                  fontSize: 'clamp(9px, 1.05vmin, 11px)',
                }}
              >
                <thead>
                  <tr>
                    <th
                      className="sticky top-0 left-0 z-30 text-left"
                      style={thStyle({ textAlign: 'left', borderRight: true })}
                    >
                      TIM
                    </th>
                    <th
                      className="sticky top-0 z-20"
                      style={thStyle({ borderRight: true })}
                    >
                      ID
                    </th>
                    {traits.map((t, i) => (
                      <th
                        key={i}
                        className="sticky top-0 z-20"
                        style={thStyle({
                          active: hover?.c === i,
                        })}
                      >
                        {t.slice(0, 3)}
                      </th>
                    ))}
                    <th
                      className="sticky top-0 right-0 z-20 text-right"
                      style={thStyle({ textAlign: 'right', borderLeft: true })}
                    >
                      ITR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {HADAMARD_MATRIX.map((row, ridx) => {
                    const rowHover = hover?.r === ridx;
                    return (
                      <tr key={ridx}>
                        <td
                          className="sticky left-0 z-10"
                          style={{
                            ...cellStickyStyle(rowHover),
                            textAlign: 'left',
                            borderRight: '1px solid var(--hair)',
                          }}
                        >
                          {tims[ridx]?.id}
                        </td>
                        <td
                          style={{
                            padding: '7px 6px',
                            borderBottom: '1px solid var(--hair)',
                            borderRight: '1px solid var(--hair)',
                            color: 'var(--ink-faint)',
                            textAlign: 'center',
                          }}
                        >
                          {String(ridx).padStart(2, '0')}
                        </td>
                        {row.map((bit, cidx) => {
                          const active = hover?.r === ridx || hover?.c === cidx;
                          const cross = hover?.r === ridx && hover?.c === cidx;
                          return (
                            <td
                              key={cidx}
                              onMouseEnter={() => setHover({ r: ridx, c: cidx })}
                              style={{
                                padding: 0,
                                textAlign: 'center',
                                borderBottom: '1px solid var(--hair)',
                                background: cross
                                  ? 'color-mix(in oklab, var(--ink) 8%, transparent)'
                                  : active
                                    ? 'color-mix(in oklab, var(--ink) 2.5%, transparent)'
                                    : 'transparent',
                                transition: 'background-color .15s var(--e-out)',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '100%',
                                  minHeight: 20,
                                }}
                              >
                                {bit === 1 ? (
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      width: 8,
                                      height: 8,
                                      borderRadius: 2,
                                      background: 'var(--ink)',
                                      opacity: active ? 1 : 0.82,
                                    }}
                                  />
                                ) : (
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      width: 3,
                                      height: 3,
                                      borderRadius: 999,
                                      background: 'var(--ink-ghost)',
                                    }}
                                  />
                                )}
                              </div>
                            </td>
                          );
                        })}
                        <td
                          className="sticky right-0 z-10"
                          style={{
                            ...cellStickyStyle(rowHover),
                            textAlign: 'right',
                            borderLeft: '1px solid var(--hair)',
                            color: 'var(--ink-dim)',
                          }}
                        >
                          {itrs[ridx]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div
            className="flex items-center justify-between mt-4 pt-4"
            style={{ borderTop: '1px solid var(--hair)' }}
          >
            <div className="flex items-center gap-5">
              <span className="q-chip">
                <span
                  style={{
                    width: 3, height: 3, borderRadius: 999,
                    background: 'var(--ink-ghost)',
                  }}
                />
                {lang === 'RU' ? '0 · различие' : '0 · difference'}
              </span>
              <span className="q-chip" style={{ color: 'var(--ink)' }}>
                <span
                  style={{
                    width: 8, height: 8, borderRadius: 2,
                    background: 'var(--ink)',
                  }}
                />
                {lang === 'RU' ? '1 · совпадение с ИЛЭ' : '1 · match with ILE'}
              </span>
            </div>
            <div
              className="mono"
              style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.2em' }}
            >
              16 × 16 · 256 CELLS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

function thStyle({
  textAlign = 'center',
  borderRight = false,
  borderLeft = false,
  active = false,
}: {
  textAlign?: 'left' | 'center' | 'right';
  borderRight?: boolean;
  borderLeft?: boolean;
  active?: boolean;
} = {}): React.CSSProperties {
  return {
    background: 'var(--bg-core)',
    padding: '9px 8px',
    borderBottom: '1px solid var(--hair)',
    borderRight: borderRight ? '1px solid var(--hair)' : undefined,
    borderLeft: borderLeft ? '1px solid var(--hair)' : undefined,
    color: active ? 'var(--ink)' : 'var(--ink-faint)',
    fontSize: 9.5,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    fontWeight: 600,
    textAlign,
    transition: 'color .15s var(--e-out)',
    whiteSpace: 'nowrap',
  };
}

function cellStickyStyle(rowHover: boolean): React.CSSProperties {
  return {
    background: rowHover
      ? 'color-mix(in oklab, var(--ink) 4%, var(--bg-core))'
      : 'var(--bg-core)',
    padding: '7px 10px',
    borderBottom: '1px solid var(--hair)',
    color: 'var(--ink)',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    transition: 'background-color .15s var(--e-out)',
  };
}
