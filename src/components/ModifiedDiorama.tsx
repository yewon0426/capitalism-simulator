import React, { useState } from 'react';
import { ModifiedState } from '../types/capitalism';
import { Landmark, TrendingDown, Hammer, Sparkles, AlertCircle, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface ModifiedDioramaProps {
  state: ModifiedState;
  isPlaying: boolean;
  projectorMode: boolean;
  onHotspotClick?: (title: string, description: string) => void;
}

export const ModifiedDiorama: React.FC<ModifiedDioramaProps> = ({
  state,
  isPlaying,
  projectorMode,
  onHotspotClick,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<{
    id: string;
    title: string;
    desc: string;
    x: number;
    y: number;
  } | null>(null);

  const handleHotspot = (id: string, title: string, desc: string, x: number, y: number) => {
    setActiveHotspot({ id, title, desc, x, y });
    if (onHotspotClick) onHotspotClick(title, desc);
  };

  const depression = state.depressionTriggered;
  const newDeal = state.newDealPublicWorks;

  return (
    <div className={`relative w-full h-full select-none overflow-hidden flex items-center justify-center transition-colors duration-500 ${
      projectorMode ? 'bg-slate-900 text-slate-100' : 'bg-[#0b1320] text-slate-200'
    }`}>
      {/* Background ambient lighting */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
        depression && !newDeal
          ? 'bg-radial-[at_50%_40%] from-slate-900/60 via-slate-950/95 to-black'
          : 'bg-radial-[at_50%_40%] from-emerald-950/20 via-slate-950/80 to-slate-950'
      }`} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* SVG Canvas for 1930s Great Depression & New Deal Dam */}
      <svg
        viewBox="0 0 1200 760"
        className="w-full h-full max-h-[85vh] object-contain"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="damConcrete" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="riverWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>

        {/* ======================================================== */}
        {/* 1. GROUND PLANE (1930s River Basin & City District)     */}
        {/* ======================================================== */}
        <g id="mod-ground">
          {/* Main isometric land */}
          <polygon
            points="600,70 1140,350 600,715 60,350"
            fill={depression && !newDeal ? '#1e293b' : '#334155'}
            stroke="#475569"
            strokeWidth="2"
            className="transition-colors duration-700"
          />

          {/* Contour edges */}
          <polygon points="60,350 600,715 600,735 60,370" fill="#090d16" />
          <polygon points="600,715 1140,350 1140,370 600,735" fill="#05080e" />

          {/* River valley winding through right side (for TVA dam) */}
          <polygon
            points="750,150 950,250 820,580 620,480"
            fill="url(#riverWater)"
            opacity="0.75"
          />
        </g>

        {/* ======================================================== */}
        {/* 2. INDUSTRIAL CITY & SHUTTERED FACTORIES (Left)          */}
        {/* ======================================================== */}
        <g id="mod-city">
          {/* Factory building */}
          <g
            className="cursor-pointer"
            onClick={() => handleHotspot('closed_factory', '가동 중단된 공장과 재고 누적', '1929년 대공황 당시 대중의 유효수요(구매력) 부족으로 대량 생산된 제품이 창고에 쌓이고 연쇄 도산했습니다.', 360, 240)}
          >
            <polygon points="280,180 440,260 360,310 200,230" fill="#475569" stroke="#334155" strokeWidth="2" />
            <polygon points="200,230 360,310 360,420 200,340" fill="#334155" />
            <polygon points="360,310 440,260 440,370 360,420" fill="#1e293b" />

            {/* Sawtooth roof */}
            <polygon points="280,180 330,130 330,205" fill="#1e293b" />
            <polygon points="330,205 380,155 380,230" fill="#1e293b" />

            {/* Windows: dark if depression, lit if recovered */}
            {[0, 1, 2].map((f) => (
              <g key={f}>
                <rect
                  x="230"
                  y={255 + f * 28}
                  width="16"
                  height="18"
                  fill={depression && !newDeal ? '#0f172a' : '#fef08a'}
                  transform="skewY(20)"
                />
                <rect
                  x="270"
                  y={275 + f * 28}
                  width="16"
                  height="18"
                  fill={depression && !newDeal ? '#0f172a' : '#fef08a'}
                  transform="skewY(20)"
                />
              </g>
            ))}

            {/* Closed Sign if depression */}
            {depression && !newDeal && (
              <g className="animate-fade-in">
                <rect x="235" y="315" width="85" height="24" rx="3" fill="#991b1b" stroke="#fca5a5" strokeWidth="1" />
                <text x="277" y="331" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">
                  ⛔ 휴업 (CLOSED)
                </text>
              </g>
            )}

            {/* Resumed Operations Banner if New Deal active */}
            {newDeal && (
              <g className="animate-fade-in">
                <rect x="225" y="315" width="105" height="24" rx="3" fill="#065f46" stroke="#34d399" strokeWidth="1" />
                <text x="277" y="331" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">
                  ✅ 공장 재가동 (Reopened)
                </text>
              </g>
            )}
          </g>

          {/* Unsold Inventory Crates piling up on the street */}
          {depression && !newDeal && (
            <g
              className="cursor-pointer animate-fade-in"
              onClick={() => handleHotspot('inventory', '판매되지 못한 과잉 재고', '소비자들의 지갑이 닫히자 공장에서 만든 상품들이 팔리지 않고 길가와 창고에 그대로 방치되었습니다.', 380, 440)}
            >
              <rect x="360" y="420" width="22" height="20" fill="#b45309" stroke="#78350f" />
              <rect x="385" y="415" width="22" height="20" fill="#b45309" stroke="#78350f" />
              <rect x="372" y="398" width="22" height="20" fill="#d97706" stroke="#92400e" />
              <rect x="350" y="390" width="70" height="18" rx="2" fill="#7f1d1d" stroke="#f87171" />
              <text x="385" y="403" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">
                재고 누적 (과잉 생산)
              </text>
            </g>
          )}

          {/* Breadline / Soup Kitchen (무료 급식소 빵 배급 줄) */}
          {depression && !newDeal && (
            <g
              className="cursor-pointer animate-fade-in"
              onClick={() => handleHotspot('breadline', '실업자 무료 급식소 (Breadline)', '실업률이 25%에 달하자 수많은 실직자들이 끼니를 때우기 위해 자선 무료 급식소에 끝없이 줄을 섰습니다.', 250, 480)}
            >
              {/* Soup kitchen tent */}
              <polygon points="170,440 230,470 200,490 140,460" fill="#78350f" />
              <polygon points="140,460 200,490 200,530 140,500" fill="#451a03" />
              <polygon points="200,490 230,470 230,510 200,530" fill="#271104" />
              <text x="175" y="475" textAnchor="middle" fontSize="9" fill="#fef08a" fontWeight="bold">무료급식소</text>

              {/* Line of unemployed workers */}
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i} transform={`translate(${210 + i * 22}, ${490 + i * 14})`}>
                  <circle cx="0" cy="-8" r="3.5" fill="#e2e8f0" />
                  <line x1="0" y1="-5" x2="0" y2="6" stroke="#334155" strokeWidth="2.5" />
                  <line x1="0" y1="6" x2="-2" y2="13" stroke="#0f172a" strokeWidth="1.5" />
                  <line x1="0" y1="6" x2="2" y2="13" stroke="#0f172a" strokeWidth="1.5" />
                </g>
              ))}

              <rect x="210" y="555" width="135" height="20" rx="3" fill="#450a0a" stroke="#ef4444" />
              <text x="277" y="569" textAnchor="middle" fontSize="10" fill="#fca5a5" fontWeight="bold">
                🍞 실업자 배급 줄 (실업률 25%)
              </text>
            </g>
          )}
        </g>

        {/* ======================================================== */}
        {/* 3. NEW DEAL TVA HYDROELECTRIC DAM CONSTRUCTION (Right)   */}
        {/* ======================================================== */}
        {newDeal && (
          <g className="transition-all duration-1000 animate-fade-in">
            {/* Grand Hydro Dam across the river */}
            <g
              className="cursor-pointer"
              onClick={() => handleHotspot('tva_dam', '테네시강 유역 개발 공사 (TVA Dam)', '루스벨트 뉴딜 정책의 상징적 국책 토목 사업입니다. 대규모 공공 일자리를 창출하여 노동자에게 임금을 주고 유효수요를 일으켰습니다.', 780, 320)}
            >
              {/* Dam massive curved wall */}
              <polygon points="680,260 880,360 840,430 640,330" fill="url(#damConcrete)" stroke="#cbd5e1" strokeWidth="2" />
              <polygon points="640,330 840,430 840,480 640,380" fill="#334155" />
              <polygon points="840,430 880,360 880,410 840,480" fill="#1e293b" />

              {/* Spillway water overflow chutes */}
              <rect x="710" y="340" width="14" height="40" fill="#38bdf8" opacity="0.9" transform="skewY(25)" />
              <rect x="740" y="355" width="14" height="40" fill="#38bdf8" opacity="0.9" transform="skewY(25)" />
              <rect x="770" y="370" width="14" height="40" fill="#38bdf8" opacity="0.9" transform="skewY(25)" />

              {/* Construction Crane */}
              <line x1="820" y1="310" x2="820" y2="230" stroke="#f59e0b" strokeWidth="4" />
              <line x1="770" y1="230" x2="870" y2="230" stroke="#f59e0b" strokeWidth="3" />
              <line x1="850" y1="230" x2="850" y2="270" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
              <rect x="842" y="270" width="16" height="14" fill="#94a3b8" />

              {/* Public Works Banner */}
              <rect x="670" y="220" width="170" height="26" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="2" />
              <text x="755" y="238" textAnchor="middle" fontSize="12" fill="#ecfdf5" fontWeight="black">
                🏗️ 뉴딜 공공사업 (TVA 댐)
              </text>
            </g>

            {/* Workers employed in public works */}
            <g transform="translate(680, 460)">
              {[0, 1, 2].map((k) => (
                <g key={k} transform={`translate(${k * 30}, ${k * 15})`}>
                  <circle cx="0" cy="-8" r="4" fill="#facc15" />
                  <line x1="0" y1="-4" x2="0" y2="6" stroke="#1e3a8a" strokeWidth="3" />
                  <line x1="0" y1="6" x2="-3" y2="14" stroke="#0f172a" strokeWidth="2" />
                  <line x1="0" y1="6" x2="3" y2="14" stroke="#0f172a" strokeWidth="2" />
                  <line x1="2" y1="0" x2="8" y2="-6" stroke="#94a3b8" strokeWidth="1.5" />
                </g>
              ))}
              <rect x="-10" y="30" width="125" height="20" rx="3" fill="#1e293b" stroke="#38bdf8" />
              <text x="52" y="44" textAnchor="middle" fontSize="10" fill="#7dd3fc" fontWeight="bold">
                👷 정부 일자리 & 소득 창출
              </text>
            </g>

            {/* Effective Demand Circulation Flow (Green Arrows) */}
            <g className="pointer-events-none">
              <path
                d="M660,510 C540,560 440,510 380,450"
                fill="none"
                stroke="#34d399"
                strokeWidth="4"
                strokeDasharray="6 4"
              />
              <polygon points="375,445 385,455 390,440" fill="#34d399" />
              <rect x="420" y="520" width="130" height="22" rx="3" fill="#064e3b" stroke="#34d399" />
              <text x="485" y="535" textAnchor="middle" fontSize="10" fill="#a7f3d0" fontWeight="bold">
                ↗ 유효수요(소비) 회복
              </text>
            </g>
          </g>
        )}

        {/* Hotspot pin markers */}
        <g id="mod-pins">
          {depression && !newDeal && (
            <g className="cursor-pointer" onClick={() => handleHotspot('dep_pin', '대공황 악순환', '수요 부족으로 인한 실업', 270, 480)}>
              <circle cx="270" cy="480" r="14" fill="#dc2626" opacity="0.8" />
              <circle cx="270" cy="480" r="8" fill="#ffffff" />
              <text x="270" y="484" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="black">1</text>
            </g>
          )}

          {newDeal && (
            <g className="cursor-pointer" onClick={() => handleHotspot('newdeal_pin', '뉴딜 공공사업', '유효수요 창출', 750, 220)}>
              <circle cx="750" cy="220" r="14" fill="#059669" opacity="0.8" />
              <circle cx="750" cy="220" r="8" fill="#ffffff" />
              <text x="750" y="224" textAnchor="middle" fontSize="10" fill="#059669" fontWeight="black">2</text>
            </g>
          )}
        </g>
      </svg>

      {/* Popover Callout */}
      {activeHotspot && (
        <div
          className="absolute z-30 max-w-xs p-4 rounded-xl shadow-2xl bg-slate-900/95 border border-emerald-500/50 backdrop-blur-md animate-fade-in text-left pointer-events-auto"
          style={{
            left: `${Math.min(Math.max(activeHotspot.x / 12, 10), 75)}%`,
            top: `${Math.min(Math.max(activeHotspot.y / 7.6, 12), 70)}%`,
          }}
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-700 mb-2">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {activeHotspot.title}
            </span>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded hover:bg-slate-800"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-normal">
            {activeHotspot.desc}
          </p>
        </div>
      )}

      {/* Floating Status Indicator */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
        <div className={`px-3 py-1.5 rounded-lg border backdrop-blur-md text-xs font-medium flex items-center gap-2 ${
          depression && !newDeal
            ? 'bg-rose-950/80 border-rose-500/40 text-rose-200'
            : newDeal
            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
            : 'bg-slate-900/80 border-slate-700 text-slate-300'
        }`}>
          <Landmark className="w-4 h-4 text-emerald-400" />
          <span>
            {newDeal
              ? '수정 자본주의: 적극적 정부 개입 (뉴딜 정책 & 유효수요 창출)'
              : depression
              ? '대공황 위기: 유효수요 부족으로 인한 대량 실업과 공장 폐쇄'
              : '1920년대 번영기: 시장 자율성에 의존하던 시기'}
          </span>
        </div>
      </div>
    </div>
  );
};
