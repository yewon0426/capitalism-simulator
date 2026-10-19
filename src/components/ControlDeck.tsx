import React from 'react';
import {
  EraId,
  CommercialState,
  IndustrialState,
  ModifiedState,
  NeoliberalState
} from '../types/capitalism';
import {
  Play,
  Pause,
  RotateCcw,
  Crosshair,
  SplitSquareVertical,
  ArrowRight,
  Check,
  BookOpen
} from 'lucide-react';

interface ControlDeckProps {
  currentEra: EraId;
  commercialState: CommercialState;
  industrialState: IndustrialState;
  modifiedState: ModifiedState;
  neoliberalState: NeoliberalState;
  activeOperationId: string;
  isPlaying: boolean;
  isLaserActive: boolean;
  isBeforeAfterActive: boolean;
  isConceptPanelOpen: boolean;
  projectorMode: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onToggleLaser: () => void;
  onToggleBeforeAfter: () => void;
  onToggleConceptPanel: () => void;
  onSelectOperation: (opId: string) => void;
  onUpdateCommercial: (updates: Partial<CommercialState>) => void;
  onUpdateIndustrial: (updates: Partial<IndustrialState>) => void;
  onUpdateModified: (updates: Partial<ModifiedState>) => void;
  onUpdateNeoliberal: (updates: Partial<NeoliberalState>) => void;
}

export const ControlDeck: React.FC<ControlDeckProps> = ({
  currentEra,
  commercialState,
  industrialState,
  modifiedState,
  neoliberalState,
  activeOperationId,
  isPlaying,
  isLaserActive,
  isBeforeAfterActive,
  isConceptPanelOpen,
  projectorMode,
  onTogglePlay,
  onReset,
  onToggleLaser,
  onToggleBeforeAfter,
  onToggleConceptPanel,
  onSelectOperation,
  onUpdateCommercial,
  onUpdateIndustrial,
  onUpdateModified,
  onUpdateNeoliberal,
}) => {
  return (
    <footer
      className={`w-full px-6 py-3 border-t select-none transition-colors duration-300 z-30 ${
        projectorMode
          ? 'bg-slate-900 border-slate-700 text-slate-100'
          : 'bg-slate-950/95 border-slate-800 text-slate-200 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: General Playback & Presentation Utilities */}
        <div className="flex items-center gap-2 order-2 md:order-1 flex-wrap">
          <button
            onClick={onTogglePlay}
            title="애니메이션 재생/일시정지 (Space)"
            className={`px-3 py-2 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors ${
              isPlaying
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-amber-500 text-slate-950 font-bold border-amber-400 hover:bg-amber-400'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? '일시정지' : '재생'}</span>
          </button>

          <button
            onClick={onReset}
            title="현재 시대 초기 상태로 되돌리기 (R)"
            className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>

          <button
            onClick={onToggleBeforeAfter}
            title="변화 전후 비교 모드 (Before / After)"
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
              isBeforeAfterActive
                ? 'bg-indigo-600 text-white border-indigo-400 font-semibold shadow-md'
                : 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>전후 비교 {isBeforeAfterActive ? 'ON' : ''}</span>
          </button>

          <button
            onClick={onToggleLaser}
            title="화면 요소를 짚어주는 레이저 포인터 모드 (L)"
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
              isLaserActive
                ? 'bg-rose-600 text-white border-rose-400 font-semibold shadow-md'
                : 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>포인터 {isLaserActive ? 'ON' : ''}</span>
          </button>

          {/* Toggle Concept Panel */}
          {currentEra !== 'comparison' && (
            <button
              onClick={onToggleConceptPanel}
              title="경제 개념 4단계 설명 사이드 패널 토글"
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
                isConceptPanelOpen
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>개념 패널 {isConceptPanelOpen ? '열림' : '닫힘'}</span>
            </button>
          )}
        </div>

        {/* Center / Right: 2~3 KEY HISTORICAL SIMULATION ACTION BUTTONS */}
        <div className="flex items-center gap-2.5 order-1 md:order-2 flex-wrap justify-center">
          {/* COMMERCIAL CAPITALISM */}
          {currentEra === 'commercial' && (
            <>
              <button
                onClick={() => {
                  onSelectOperation('tradeExpanded');
                  onUpdateCommercial({ tradeExpanded: !commercialState.tradeExpanded });
                }}
                className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                  commercialState.tradeExpanded
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                    : 'bg-slate-900 text-amber-300 border-amber-500/40 hover:bg-slate-800 hover:border-amber-400'
                }`}
              >
                {commercialState.tradeExpanded ? (
                  <Check className="w-4 h-4 text-slate-950" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                )}
                <span>조작 1: 해외 무역 확대 (상업자본 축적)</span>
              </button>

              <button
                onClick={() => {
                  onSelectOperation('stateIntervention');
                  onUpdateCommercial({ stateIntervention: !commercialState.stateIntervention });
                }}
                className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                  commercialState.stateIntervention
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md font-bold'
                    : 'bg-slate-900 text-rose-300 border-rose-500/40 hover:bg-slate-800 hover:border-rose-400'
                }`}
              >
                {commercialState.stateIntervention ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-rose-400" />
                )}
                <span>조작 2: 국가의 무역 개입 (중상주의 칙령)</span>
              </button>
            </>
          )}

          {/* INDUSTRIAL CAPITALISM */}
          {currentEra === 'industrial' && (
            <>
              <button
                onClick={() => {
                  onSelectOperation('mechanization');
                  onUpdateIndustrial({ mechanization: !industrialState.mechanization });
                }}
                className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                  industrialState.mechanization
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-bold'
                    : 'bg-slate-900 text-cyan-300 border-cyan-500/40 hover:bg-slate-800 hover:border-cyan-400'
                }`}
              >
                {industrialState.mechanization ? (
                  <Check className="w-4 h-4 text-slate-950" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                )}
                <span>조작 1: 산업혁명 (기계제 공장 도입)</span>
              </button>

              <button
                onClick={() => {
                  onSelectOperation('marketCompetition');
                  onUpdateIndustrial({ marketCompetition: !industrialState.marketCompetition });
                }}
                className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                  industrialState.marketCompetition
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                    : 'bg-slate-900 text-amber-300 border-amber-500/40 hover:bg-slate-800 hover:border-amber-400'
                }`}
              >
                {industrialState.marketCompetition ? (
                  <Check className="w-4 h-4 text-slate-950" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                )}
                <span>조작 2: 시장 경쟁 확대 (애덤 스미스)</span>
              </button>

              <button
                onClick={() => {
                  onSelectOperation('industrialShadows');
                  onUpdateIndustrial({ industrialShadows: !industrialState.industrialShadows });
                }}
                className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                  industrialState.industrialShadows
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md font-bold'
                    : 'bg-slate-900 text-rose-300 border-rose-500/40 hover:bg-slate-800 hover:border-rose-400'
                }`}
              >
                {industrialState.industrialShadows ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-rose-400" />
                )}
                <span>조작 3: 산업화의 한계 (노동·환경)</span>
              </button>
            </>
          )}

          {/* MODIFIED CAPITALISM */}
          {currentEra === 'modified' && (
            <>
              <button
                onClick={() => {
                  onSelectOperation('depressionTriggered');
                  onUpdateModified({ depressionTriggered: !modifiedState.depressionTriggered });
                }}
                className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                  modifiedState.depressionTriggered
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md font-bold'
                    : 'bg-slate-900 text-rose-300 border-rose-500/40 hover:bg-slate-800 hover:border-rose-400'
                }`}
              >
                {modifiedState.depressionTriggered ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-rose-400" />
                )}
                <span>조작 1: 대공황 발생 (수요 부족 악순환)</span>
              </button>

              <button
                onClick={() => {
                  onSelectOperation('newDealPublicWorks');
                  onUpdateModified({ newDealPublicWorks: !modifiedState.newDealPublicWorks });
                }}
                className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                  modifiedState.newDealPublicWorks
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-bold'
                    : 'bg-slate-900 text-emerald-300 border-emerald-500/40 hover:bg-slate-800 hover:border-emerald-400'
                }`}
              >
                {modifiedState.newDealPublicWorks ? (
                  <Check className="w-4 h-4 text-slate-950" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                )}
                <span>조작 2: 정부의 개입 (뉴딜 정책 / 공공사업)</span>
              </button>
            </>
          )}

          {/* NEOLIBERALISM */}
          {currentEra === 'neoliberal' && (
            <>
              <button
                onClick={() => {
                  onSelectOperation('oilShockStagflation');
                  onUpdateNeoliberal({ oilShockStagflation: !neoliberalState.oilShockStagflation });
                }}
                className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                  neoliberalState.oilShockStagflation
                    ? 'bg-rose-500 text-white border-rose-400 shadow-md font-bold'
                    : 'bg-slate-900 text-rose-300 border-rose-500/40 hover:bg-slate-800 hover:border-rose-400'
                }`}
              >
                {neoliberalState.oilShockStagflation ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-rose-400" />
                )}
                <span>조작 1: 석유 파동과 스태그플레이션</span>
              </button>

              <button
                onClick={() => {
                  onSelectOperation('marketDeregulation');
                  onUpdateNeoliberal({ marketDeregulation: !neoliberalState.marketDeregulation });
                }}
                className={`px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
                  neoliberalState.marketDeregulation
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md font-bold'
                    : 'bg-slate-900 text-sky-300 border-sky-500/40 hover:bg-slate-800 hover:border-sky-400'
                }`}
              >
                {neoliberalState.marketDeregulation ? (
                  <Check className="w-4 h-4 text-slate-950" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-sky-400" />
                )}
                <span>조작 2: 시장 기능 강조 (규제 완화·민영화)</span>
              </button>
            </>
          )}

          {currentEra === 'comparison' && (
            <div className="text-xs text-slate-400 font-medium">
              ※ 각 시대를 선택하여 시대별 핵심 키워드와 통합 비교표를 대조하세요.
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
