import type { ModelType, ObjectType, UIStrings } from '../../types';

export interface ToolbarProps {
  UI: UIStrings;
  modelType: ModelType;
  objectType: ObjectType;
  onChangeModel: (m: ModelType) => void;
  onChangeObject: (o: ObjectType) => void;
}

export function Toolbar({
  UI,
  modelType,
  objectType,
  onChangeModel,
  onChangeObject,
}: ToolbarProps) {
  return (
    <div className="w-full border-b border-[var(--line)] flex items-center justify-center gap-6 md:gap-12 py-3 px-4 md:px-8 bg-[var(--bg)]/95 backdrop-blur-md z-50 shadow-sm overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <div className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">{UI.model}</div>
        <div className="flex border border-[var(--line)] p-1 bg-[var(--dim)]/30">
          <button onClick={() => onChangeModel('PROJECTIVE')} className={`btn-tech border-none whitespace-nowrap min-h-[40px] px-6 ${modelType === 'PROJECTIVE' ? 'active' : ''}`}>{UI.projective}</button>
          <button onClick={() => onChangeModel('CHURYUMOV')} className={`btn-tech border-none whitespace-nowrap min-h-[40px] px-6 ${modelType === 'CHURYUMOV' ? 'active' : ''}`}>{UI.churyumov}</button>
        </div>
      </div>

      <div className="h-6 w-[1px] bg-[var(--line)] shrink-0" />

      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <div className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">{UI.object}</div>
        <div className="flex border border-[var(--line)] p-1 bg-[var(--dim)]/30">
          <button onClick={() => onChangeObject('TIM')} className={`btn-tech border-none whitespace-nowrap min-h-[40px] px-6 ${objectType === 'TIM' ? 'active' : ''}`}>{UI.tims}</button>
          <button onClick={() => onChangeObject('ITR')} className={`btn-tech border-none whitespace-nowrap min-h-[40px] px-6 ${objectType === 'ITR' ? 'active' : ''}`}>{UI.itrs}</button>
          <button onClick={() => onChangeObject('RD')} className={`btn-tech border-none whitespace-nowrap min-h-[40px] px-6 ${objectType === 'RD' ? 'active' : ''}`}>{UI.arps}</button>
        </div>
      </div>
    </div>
  );
}
