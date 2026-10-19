import React, { useState } from 'react';
import { EraId } from '../types/capitalism';
import { ERAS, TEACHER_CUE_CARDS } from '../data/curriculumData';
import { X, BookOpen, MessageSquare, ListCollapse, Bookmark, GraduationCap } from 'lucide-react';

interface TeacherDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentEra: EraId;
}

export const TeacherDrawer: React.FC<TeacherDrawerProps> = ({
  isOpen,
  onClose,
  currentEra,
}) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'cuecard' | 'glossary'>('cuecard');

  if (!isOpen) return null;

  const eraInfo = ERAS[currentEra];
  const cueCard = TEACHER_CUE_CARDS[currentEra] || TEACHER_CUE_CARDS['commercial'];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Drawer Container */}
      <div className="w-full max-w-xl h-full bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col text-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-white">교사용 수업 지원 시스템</h2>
              <p className="text-xs text-slate-400">2022 개정 교육과정 고등학교 통합사회2 연계</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 p-2 gap-1.5 text-xs font-medium">
          <button
            onClick={() => setActiveTab('cuecard')}
            className={`flex-1 py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'cuecard'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>수업 발문 큐카드 & 판서</span>
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex-1 py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'curriculum'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>성취기준 및 개념 해설</span>
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex-1 py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'glossary'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <ListCollapse className="w-3.5 h-3.5" />
            <span>역사 개념 용어 사전</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
          {/* TAB 1: TEACHER CUE CARD */}
          {activeTab === 'cuecard' && (
            <div className="space-y-5">
              {/* Current Era Context Banner */}
              <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  현재 진행 중인 시대
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {eraInfo.name} ({eraInfo.period})
                </h3>
              </div>

              {/* Inquiry Question to Students */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-2">
                  <Bookmark className="w-4 h-4" />
                  <span>학생 유도 질문 (Teacher Prompt)</span>
                </div>
                <p className="text-sm font-medium text-amber-100 leading-relaxed italic">
                  {cueCard.questionToStudents}
                </p>
              </div>

              {/* Teaching Guide Note */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  교사용 수업 지도 팁
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-3.5 rounded-lg border border-slate-700/80">
                  {cueCard.teacherGuideText}
                </p>
              </div>

              {/* Board Summary */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  칠판 판서 요약안
                </h4>
                <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                  {cueCard.boardSummary.map((line, idx) => (
                    <div key={idx} className="text-emerald-400 leading-relaxed">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM STANDARDS */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30">
                <div className="text-xs font-bold text-indigo-300 mb-1">
                  2022 개정 통합사회2 성취기준
                </div>
                <div className="text-xs text-slate-200 font-medium">
                  [10통사04-01] 자본주의의 역사적 전개 과정과 각 시기의 경제적 특징을 파악하고, 오늘날 우리 사회의 경제 체제를 이해한다.
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase">
                  시대별 핵심 개념 체계
                </h4>
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700">
                    <div className="font-bold text-amber-400 mb-1">1. 상업 자본주의 (16~18세기)</div>
                    <p className="text-slate-300">
                      신항로 개척 이후 무역을 통해 상업 자본이 축적되었으며, 국가는 관세 부과와 자국 선박 보호(중상주의)를 통해 경제에 적극 개입했습니다.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700">
                    <div className="font-bold text-cyan-400 mb-1">2. 산업 자본주의 (18세기 후반~19세기)</div>
                    <p className="text-slate-300">
                      증기기관에 바탕을 둔 기계제 공업이 발전하고 애덤 스미스의 자유방임주의와 ‘보이지 않는 손’에 따라 시장 경쟁이 중시되었습니다. 그러나 장시간 노동과 빈부격차라는 구조적 문제가 나타났습니다.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700">
                    <div className="font-bold text-emerald-400 mb-1">3. 수정 자본주의 (20세기 1930년대~)</div>
                    <p className="text-slate-300">
                      1929년 대공황으로 자유방임주의의 한계(시장 실패)가 드러나자 케인스의 유효수요 이론에 따라 정부가 공공사업과 복지 제도로 시장에 적극 개입했습니다.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700">
                    <div className="font-bold text-sky-400 mb-1">4. 신자유주의 (1970년대 말~)</div>
                    <p className="text-slate-300">
                      1970년대 석유 파동으로 스태그플레이션(경기 침체 + 물가 상승)이 발생하며 정부 실패가 지적되자, 하이에크·프리드먼을 중심으로 규제 완화, 민영화, 시장 기능의 복원을 추진했습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HISTORICAL GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
                <span className="font-bold text-amber-300">중상주의 (Mercantilism)</span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  16~18세기 유럽 절대왕정이 국가의 부를 증대시키기 위해 금·은 등 귀금속의 축적을 중시하고, 무역 흑자를 위해 수출을 장려하며 수입을 제한한 경제 정책.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
                <span className="font-bold text-amber-300">영국 항해법 (Navigation Acts, 1651)</span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  영국 및 그 식민지로 들어오는 상품을 반드시 영국 선박이나 원산지 선박으로만 수송하도록 규정하여 네덜란드 등 경쟁국의 해운업을 견제하고 자국 해상 무역을 독점하려 한 법령.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
                <span className="font-bold text-cyan-300">자유방임주의 (Laissez-faire)</span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  국가가 개인의 경제활동에 간섭하지 않고 자유로운 경쟁에 맡겨둘 때 가장 이상적인 경제 질서와 사회적 번영이 이루어진다는 경제 사상.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
                <span className="font-bold text-cyan-300">보이지 않는 손 (Invisible Hand)</span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  애덤 스미스가 『국부론』(1776)에서 제시한 개념으로, 개인이 오직 자신의 이익을 위해 행동하더라도 시장의 가격 기구라는 ‘보이지 않는 손’에 의해 사회 전체의 자원이 가장 효율적으로 배분된다는 원리.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
                <span className="font-bold text-emerald-300">유효수요 (Effective Demand)</span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  케인스 경제학의 핵심 개념으로, 단순한 욕구가 아니라 실제로 지불 능력이 뒷받침된 구매 수요. 대공황의 원인을 유효수요의 부족으로 보았습니다.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700">
                <span className="font-bold text-sky-300">스태그플레이션 (Stagflation)</span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  경기 침체(Stagnation)와 물가 상승(Inflation)이 동시에 일어나는 기현상. 1970년대 석유 파동으로 인해 발생하여 기존 케인스주의 처방의 한계를 드러냈습니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
