import React, { useState } from 'react';
import { EraId } from '../types/capitalism';
import { COMPARISON_DATA, ERAS } from '../data/curriculumData';
import { Ship, Factory, Landmark, Cpu, Table, Eye, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface ComprehensiveComparisonProps {
  onNavigateToEra: (era: EraId) => void;
  projectorMode: boolean;
}

export const ComprehensiveComparison: React.FC<ComprehensiveComparisonProps> = ({
  onNavigateToEra,
  projectorMode,
}) => {
  const [selectedEra, setSelectedEra] = useState<EraId>('commercial');
  const [showTableModal, setShowTableModal] = useState<boolean>(false);

  const eraHighlights: Record<
    EraId,
    { keywords: string[]; summary: string; icon: React.ReactNode; color: string }
  > = {
    commercial: {
      keywords: ['무역 확대', '중상주의', '국가 개입'],
      summary: '16~18세기 대항해 시대를 배경으로 해외 무역과 상품 유통을 통해 상업 자본을 축적하였으며, 왕실은 수출 장려와 수입 억제 정책으로 경제에 깊숙이 개입했습니다.',
      icon: <Ship className="w-8 h-8 text-amber-400" />,
      color: 'amber',
    },
    industrial: {
      keywords: ['산업혁명', '기계제 공업', '자유방임주의'],
      summary: '18세기 후반 증기기관 도입으로 공장제 기계 대량 생산이 발달하였고, 애덤 스미스의 자유방임주의와 보이지 않는 손을 바탕으로 자유로운 시장 경쟁을 추구했습니다.',
      icon: <Factory className="w-8 h-8 text-cyan-400" />,
      color: 'cyan',
    },
    modified: {
      keywords: ['대공황', '케인스', '정부 개입 확대'],
      summary: '1929년 대공황으로 시장 실패가 드러나자, 케인스의 유효수요 이론에 따라 정부가 대규모 공공사업(뉴딜)과 복지 정책을 통해 시장을 안정시키고자 했습니다.',
      icon: <Landmark className="w-8 h-8 text-emerald-400" />,
      color: 'emerald',
    },
    neoliberal: {
      keywords: ['스태그플레이션', '규제 완화', '시장 기능 강조'],
      summary: '1970년대 석유 파동과 스태그플레이션으로 정부 실패가 부각되자, 하이에크·프리드먼의 사상에 따라 시장 자율성을 회복하고 규제 완화 및 민영화를 추진했습니다.',
      icon: <Cpu className="w-8 h-8 text-sky-400" />,
      color: 'sky',
    },
    comparison: {
      keywords: ['역사적 변천', '시장과 정부', '상호작용'],
      summary: '자본주의는 시장과 정부의 균형점을 시대적 위기마다 끊임없이 재조정하며 발전해 온 역사적 체제입니다.',
      icon: <ShieldCheck className="w-8 h-8 text-indigo-400" />,
      color: 'indigo',
    },
  };

  const currentHighlight = eraHighlights[selectedEra];

  return (
    <div className={`w-full h-full p-6 flex flex-col justify-between overflow-y-auto select-none transition-colors duration-500 ${
      projectorMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-950 text-slate-200'
    }`}>
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>자본주의 4대 시대 역사 전개 디오라마 종합 비교</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              각 시대의 도시 모형 카드를 클릭하면 시대별 핵심 키워드와 역사적 전환 경로를 관찰할 수 있습니다.
            </p>
          </div>

          <button
            onClick={() => setShowTableModal(!showTableModal)}
            className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-amber-400 transition-colors shadow-lg"
          >
            <Table className="w-4 h-4" />
            <span>{showTableModal ? '디오라마 보기' : '시대별 비교표 보기'}</span>
          </button>
        </div>

        {/* View Mode 1: 4 Diorama Visual Cards in Parallel */}
        {!showTableModal ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {(['commercial', 'industrial', 'modified', 'neoliberal'] as EraId[]).map((eraKey) => {
                const isSelected = selectedEra === eraKey;
                const info = ERAS[eraKey];
                const highlight = eraHighlights[eraKey];

                return (
                  <div
                    key={eraKey}
                    onClick={() => setSelectedEra(eraKey)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-800/90 border-amber-400 shadow-xl ring-2 ring-amber-400/40 transform -translate-y-1'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    {/* Top indicator */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                          {highlight.icon}
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          {info.period}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2">
                        {info.name}
                      </h3>

                      {/* 3 Core Keywords for Era */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {highlight.keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-950 text-amber-300 border border-slate-800"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action to jump to simulation */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      {info.implemented ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToEra(eraKey);
                          }}
                          className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                        >
                          <span>시뮬레이터 조작</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">후속 차시 연계</span>
                      )}
                      <span className="text-[11px] text-slate-400">
                        {isSelected ? '선택됨' : '클릭하여 탐색'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Era Deep Detail Callout */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-md animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-sm">
                    {ERAS[selectedEra].name} 심층 분석
                  </span>
                  <span className="text-xs text-slate-400">
                    ({ERAS[selectedEra].period})
                  </span>
                </div>

                {ERAS[selectedEra].implemented && (
                  <button
                    onClick={() => onNavigateToEra(selectedEra)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400"
                  >
                    <span>이 시대로 이동하여 직접 시뮬레이션하기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-slate-300 block mb-1">시대적 등장 배경 및 핵심 전개:</span>
                  <p className="text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    {currentHighlight.summary}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-300 block mb-1">역사적 한계와 다음 단계로의 이행 요인:</span>
                  <p className="text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    {ERAS[selectedEra].nextTransitionReason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* View Mode 2: Integrated Comparison Table */
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/90 shadow-2xl animate-fade-in">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-bold">
                  <th className="p-3.5 whitespace-nowrap">구분</th>
                  <th className="p-3.5 whitespace-nowrap">시기 및 배경</th>
                  <th className="p-3.5 whitespace-nowrap">핵심 특징</th>
                  <th className="p-3.5 whitespace-nowrap">대표 사상가</th>
                  <th className="p-3.5 whitespace-nowrap">정부의 역할</th>
                  <th className="p-3.5 whitespace-nowrap">역사적 한계</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {COMPARISON_DATA.map((row) => (
                  <tr
                    key={row.eraId}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-3.5 font-bold text-amber-400 whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="p-3.5 text-slate-300 leading-relaxed max-w-xs">
                      <div className="font-mono text-[11px] text-slate-400 mb-0.5">{row.period}</div>
                      {row.background}
                    </td>
                    <td className="p-3.5 text-slate-200 font-medium max-w-xs leading-relaxed">
                      {row.coreFeature}
                    </td>
                    <td className="p-3.5 text-amber-300 whitespace-nowrap">
                      {row.thinkers}
                    </td>
                    <td className="p-3.5 text-cyan-300 max-w-xs leading-relaxed">
                      {row.stateRole}
                    </td>
                    <td className="p-3.5 text-rose-300/90 max-w-xs leading-relaxed">
                      {row.limitations}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
