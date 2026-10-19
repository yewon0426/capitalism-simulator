import React from 'react';
import { EraId } from '../types/capitalism';
import { ERAS } from '../data/curriculumData';
import { X, Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface FutureEraModalProps {
  eraId: EraId | null;
  onClose: () => void;
  onNavigateToComparison: () => void;
}

export const FutureEraModal: React.FC<FutureEraModalProps> = ({
  eraId,
  onClose,
  onNavigateToComparison,
}) => {
  if (!eraId || (eraId !== 'modified' && eraId !== 'neoliberal')) return null;

  const info = ERAS[eraId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 text-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">{info.name}</h3>
              <p className="text-xs text-slate-400">{info.period}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-semibold text-amber-300 block mb-1">핵심 탐구 질문</span>
            <p className="text-slate-200 font-medium italic">
              {info.coreQuestion}
            </p>
          </div>

          <div>
            <span className="font-semibold text-slate-300 block mb-1">시대적 관찰 포인트</span>
            <p className="text-slate-300">
              {info.observationPoint}
            </p>
          </div>

          <div>
            <span className="font-semibold text-slate-300 block mb-1">핵심 원리 1문장</span>
            <p className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-200 font-medium">
              {info.coreConcept}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
            💡 본 시뮬레이터 1단계 개발에서는 <strong>상업 자본주의</strong>와 <strong>산업 자본주의</strong>를 완벽히 동작하는 디오라마로 집중 구현하였습니다. 본 단원의 세부 비교 내용은 <strong>4대 시대 종합 비교표</strong>에서 즉시 확인하실 수 있습니다.
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateToComparison();
            }}
            className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-xs flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4대 시대 종합 비교표로 이동</span>
          </button>
        </div>
      </div>
    </div>
  );
};
