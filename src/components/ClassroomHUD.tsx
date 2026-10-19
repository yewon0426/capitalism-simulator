import React from 'react';
import { EraMetadata } from '../types/capitalism';
import { HelpCircle, Eye, Lightbulb } from 'lucide-react';

interface ClassroomHUDProps {
  era: EraMetadata;
  projectorMode: boolean;
}

export const ClassroomHUD: React.FC<ClassroomHUDProps> = ({ era, projectorMode }) => {
  return (
    <div className={`w-full px-6 py-2 border-b select-none transition-colors duration-300 z-20 ${
      projectorMode
        ? 'bg-slate-900/95 border-slate-700 text-slate-100'
        : 'bg-slate-950/80 border-slate-800/80 text-slate-200 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Left: Era & Core Question */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-bold text-amber-400 text-sm md:text-base">
              {era.name}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              ({era.period})
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-200 truncate">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-amber-100 text-xs md:text-sm">
              {era.coreQuestion}
            </span>
          </div>
        </div>

        {/* Right: Current Observation Focus & Core Concept */}
        <div className="flex items-center gap-4 text-[11px] md:text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Eye className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span className="text-slate-400">관찰 포인트:</span>
            <span className="text-slate-200 font-medium truncate max-w-xs md:max-w-md">
              {era.observationPoint}
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-slate-300">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-amber-300/80 font-medium truncate max-w-sm">
              {era.coreConcept}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
