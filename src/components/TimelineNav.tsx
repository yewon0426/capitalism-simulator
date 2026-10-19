import React from 'react';
import { EraId } from '../types/capitalism';
import { ERAS } from '../data/curriculumData';
import { Monitor, BookOpen, Layers } from 'lucide-react';

interface TimelineNavProps {
  currentEra: EraId;
  onSelectEra: (era: EraId) => void;
  projectorMode: boolean;
  onToggleProjector: () => void;
  onOpenTeacherDrawer: () => void;
}

export const TimelineNav: React.FC<TimelineNavProps> = ({
  currentEra,
  onSelectEra,
  projectorMode,
  onToggleProjector,
  onOpenTeacherDrawer,
}) => {
  const eraKeys: EraId[] = ['commercial', 'industrial', 'modified', 'neoliberal', 'comparison'];

  return (
    <header className={`w-full flex items-center justify-between px-6 py-2.5 border-b select-none transition-colors duration-300 z-40 ${
      projectorMode
        ? 'bg-slate-900 border-slate-700 text-slate-100'
        : 'bg-slate-950/90 border-slate-800 text-slate-200 backdrop-blur-md'
    }`}>
      {/* Zone 1: Brand Wordmark (Single clean text element) */}
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold tracking-tight text-amber-400">
          CAPITALISM LAB
        </span>
        <span className="hidden md:inline text-xs text-slate-400">
          고등학교 통합사회2 자본주의 역사 시뮬레이터
        </span>
      </div>

      {/* Zone 2: Navigation Era Tabs (Single-line interactive controls) */}
      <nav className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
        {eraKeys.map((id) => {
          const era = ERAS[id];
          const isActive = currentEra === id;
          const isPreview = !era.implemented && id !== 'comparison';

          return (
            <button
              key={id}
              onClick={() => onSelectEra(id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {id === 'comparison' && <Layers className="w-3.5 h-3.5" />}
              <span>{era.name}</span>
              {isPreview && (
                <span className="text-[10px] text-slate-400 opacity-80">(안내)</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Primary Teacher Tools */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleProjector}
          title="교실 빔프로젝터용 고대비 모드 전환 (P)"
          className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            projectorMode
              ? 'bg-amber-400 text-slate-950 border-amber-300 font-semibold'
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>{projectorMode ? '프로젝터 모드 ON' : '프로젝터 모드'}</span>
        </button>

        <button
          onClick={onOpenTeacherDrawer}
          className="px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors flex items-center gap-1.5 whitespace-nowrap"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>수업 설명서 & 큐카드</span>
        </button>
      </div>
    </header>
  );
};
