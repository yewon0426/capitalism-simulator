import React, { useState } from 'react';
import { OperationExplanation } from '../types/capitalism';
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  TableProperties,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ConceptExplorationPanelProps {
  currentOperation: OperationExplanation;
  allOperations: OperationExplanation[];
  onSelectOperation: (opId: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  projectorMode: boolean;
}

export const ConceptExplorationPanel: React.FC<ConceptExplorationPanelProps> = ({
  currentOperation,
  allOperations,
  onSelectOperation,
  isOpen,
  onToggleOpen,
  projectorMode,
}) => {
  // Step navigation: 1, 2, 3, 4, or 'all'
  const [activeStep, setActiveStep] = useState<number | 'all'>(1);
  const [activeViewMode, setActiveViewMode] = useState<'steps' | 'matrix' | 'terms'>('steps');

  if (!isOpen) {
    return (
      <button
        onClick={onToggleOpen}
        title="경제 개념 4단계 심층 설명 패널 열기"
        className={`absolute right-4 top-4 z-40 px-3.5 py-2.5 rounded-xl border shadow-2xl flex items-center gap-2 text-xs font-bold transition-all duration-300 backdrop-blur-md ${
          projectorMode
            ? 'bg-amber-400 text-slate-950 border-amber-300 hover:bg-amber-300'
            : 'bg-slate-900/90 text-amber-300 border-amber-500/40 hover:bg-slate-800'
        }`}
      >
        <BookOpen className="w-4 h-4 text-amber-400" />
        <span>개념 설명 패널 열기</span>
        <ChevronLeft className="w-4 h-4" />
      </button>
    );
  }

  const steps = [
    { num: 1, data: currentOperation.step1Before, badge: '변화 이전' },
    { num: 2, data: currentOperation.step2Background, badge: '역사적 배경' },
    { num: 3, data: currentOperation.step3After, badge: '경제 구조 변화' },
    { num: 4, data: currentOperation.step4Significance, badge: '발전사적 의미' },
  ];

  return (
    <aside
      className={`absolute right-0 top-0 bottom-0 z-40 w-full sm:w-[420px] md:w-[460px] border-l shadow-2xl flex flex-col transition-all duration-300 select-none ${
        projectorMode
          ? 'bg-slate-900 border-slate-700 text-slate-100'
          : 'bg-slate-950/95 border-slate-800 text-slate-200 backdrop-blur-xl'
      }`}
    >
      {/* 1. Header with Collapse Button and Operation Tabs */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/80">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h3 className={`font-bold text-white flex items-center gap-1.5 ${projectorMode ? 'text-base' : 'text-sm'}`}>
                <span>자본주의 전개 심층 분석</span>
              </h3>
              <p className="text-[11px] text-slate-400">4단계 인과 구조 & EBS 핵심 개념</p>
            </div>
          </div>

          <button
            onClick={onToggleOpen}
            title="패널 접기"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Operation Selector Chips (allows switching which operation to inspect) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {allOperations.map((op) => {
            const isSelected = op.operationId === currentOperation.operationId;
            return (
              <button
                key={op.operationId}
                onClick={() => {
                  onSelectOperation(op.operationId);
                  setActiveStep(1);
                }}
                className={`px-2.5 py-1 text-xs rounded-md font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <span>{op.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sub-Nav Mode (4-Step Breakdown vs Before/After Comparison vs Terms) */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveViewMode('steps')}
            className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors ${
              activeViewMode === 'steps'
                ? 'bg-slate-800 text-amber-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4단계 인과 설명</span>
          </button>

          {currentOperation.comparisonMatrix && (
            <button
              onClick={() => setActiveViewMode('matrix')}
              className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors ${
                activeViewMode === 'matrix'
                  ? 'bg-slate-800 text-amber-300 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableProperties className="w-3.5 h-3.5" />
              <span>전후 비교표</span>
            </button>
          )}

          <button
            onClick={() => setActiveViewMode('terms')}
            className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors ${
              activeViewMode === 'terms'
                ? 'bg-slate-800 text-amber-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>용어 풀이 ({currentOperation.terms.length})</span>
          </button>
        </div>

        {activeViewMode === 'steps' && (
          <button
            onClick={() => setActiveStep(activeStep === 'all' ? 1 : 'all')}
            className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1"
          >
            {activeStep === 'all' ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            <span>{activeStep === 'all' ? '단계별 보기' : '전체 펼치기'}</span>
          </button>
        )}
      </div>

      {/* 3. Panel Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* VIEW MODE 1: 4-STEP CAUSAL PROGRESSION */}
        {activeViewMode === 'steps' && (
          <>
            {/* Step progress pills (if not all expanded) */}
            {activeStep !== 'all' && (
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-medium text-center">
                {steps.map((st) => (
                  <button
                    key={st.num}
                    onClick={() => setActiveStep(st.num)}
                    className={`py-1.5 rounded transition-all ${
                      activeStep === st.num
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span>{st.num}단계</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step Content Cards */}
            <div className="space-y-3">
              {steps.map((st) => {
                const isCurrent = activeStep === 'all' || activeStep === st.num;
                if (!isCurrent) return null;

                const stepColors = [
                  'border-slate-700 bg-slate-900/60',
                  'border-blue-500/40 bg-blue-950/20',
                  'border-cyan-500/40 bg-cyan-950/20',
                  'border-amber-500/40 bg-amber-950/20',
                ];

                const badgeColors = [
                  'bg-slate-800 text-slate-300',
                  'bg-blue-900/60 text-blue-200',
                  'bg-cyan-900/60 text-cyan-200',
                  'bg-amber-900/60 text-amber-200',
                ];

                return (
                  <div
                    key={st.num}
                    className={`p-3.5 rounded-xl border transition-all duration-300 ${stepColors[st.num - 1]}`}
                  >
                    {/* Step Title Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2.5">
                      <h4 className={`font-bold text-white flex items-center gap-2 ${projectorMode ? 'text-sm' : 'text-xs'}`}>
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-xs">
                          {st.num}
                        </span>
                        <span>{st.data.title}</span>
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${badgeColors[st.num - 1]}`}>
                        {st.badge}
                      </span>
                    </div>

                    {/* Complete prose explanation */}
                    <p className={`leading-relaxed text-slate-200 mb-3 ${projectorMode ? 'text-sm' : 'text-xs'}`}>
                      {st.data.content}
                    </p>

                    {/* Key Core Bullet Points */}
                    <div className="space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        핵심 정리 포인트
                      </span>
                      {st.data.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-slate-300 text-[11px] leading-relaxed">
                          <span className="text-amber-400 shrink-0">▪</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step navigation next button (when single step view) */}
            {typeof activeStep === 'number' && (
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep(Math.max(1, (activeStep as number) - 1))}
                  className="px-3 py-1.5 rounded-lg text-xs border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>이전 단계</span>
                </button>

                <span className="text-xs text-slate-400 font-mono">
                  {activeStep} / 4 단계
                </span>

                {activeStep < 4 ? (
                  <button
                    onClick={() => setActiveStep((activeStep as number) + 1)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 flex items-center gap-1 shadow-sm"
                  >
                    <span>다음 단계</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveStep('all')}
                    className="px-3 py-1.5 rounded-lg text-xs bg-emerald-600 text-white font-bold hover:bg-emerald-500 flex items-center gap-1 shadow-sm"
                  >
                    <span>전체 정리 보기</span>
                  </button>
                )}
              </div>
            )}

            {/* Misconception Warning Callout (if exists) */}
            {currentOperation.misconceptionWarning && (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs leading-relaxed animate-fade-in">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>교과서 오개념 바로잡기</span>
                </div>
                <div className="font-semibold text-rose-300 text-[11px] mb-1">
                  {currentOperation.misconceptionWarning.misconception}
                </div>
                <div className="text-slate-200 text-[11px]">
                  {currentOperation.misconceptionWarning.correction}
                </div>
              </div>
            )}
          </>
        )}

        {/* VIEW MODE 2: BEFORE / AFTER COMPARISON MATRIX */}
        {activeViewMode === 'matrix' && currentOperation.comparisonMatrix && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs">
              <span className="font-bold text-indigo-300 block mb-1">
                조작 전후 경제 구조 비교 매트릭스
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                생산 방식, 생산 규모, 노동 형태, 자본가의 역할 4가지 축을 기준으로 조작 이전과 이후의 구조적 차이를 명확히 구분합니다.
              </p>
            </div>

            <div className="space-y-2.5">
              {currentOperation.comparisonMatrix.map((dim, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2"
                >
                  <div className="font-bold text-amber-400 flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>비교 기준: {dim.dimension}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 font-semibold block mb-0.5">
                        [조작 전]
                      </span>
                      <p className="text-slate-300 leading-snug">{dim.before}</p>
                    </div>

                    <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                      <span className="text-cyan-300 font-semibold block mb-0.5">
                        [조작 후]
                      </span>
                      <p className="text-cyan-100 leading-snug">{dim.after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 leading-tight">
              ※ EBS 2022 개정 통합사회2 72~75쪽 ‘산업혁명과 공장제 기계공업의 발달’ 단원 비교 기준 완벽 적용
            </p>
          </div>
        )}

        {/* VIEW MODE 3: STUDENT-FRIENDLY VOCABULARY GLOSSARY */}
        {activeViewMode === 'terms' && (
          <div className="space-y-2.5 animate-fade-in">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              💡 고등학교 학생들의 눈높이에 맞춘 쉬운 용어 풀이입니다.
            </div>

            {currentOperation.terms.map((term, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5"
              >
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{term.term}</span>
                </div>
                <p className="text-slate-200 text-[11px] leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  {term.easyDefinition}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Footer Note (Historical Continuity reminder) */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/90 text-[10px] text-slate-400 leading-tight">
        <span>
          ※ 역사적 유의점: 자본주의의 각 시대는 이전 구조가 하루아침에 완전히 사라진 것이 아니라, 기존 생산·유통 방식 위에 새로운 기술과 제도가 점진적으로 중첩되며 발전한 과정입니다.
        </span>
      </div>
    </aside>
  );
};
