import React, { useState } from 'react';
import { NeoliberalState } from '../types/capitalism';
import { Cpu, Fuel, Globe, Sparkles, TrendingUp, AlertTriangle, ShieldAlert } from 'lucide-react';

interface NeoliberalDioramaProps {
  state: NeoliberalState;
  isPlaying: boolean;
  projectorMode: boolean;
  onHotspotClick?: (title: string, description: string) => void;
}

export const NeoliberalDiorama: React.FC<NeoliberalDioramaProps> = ({
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

  const oilShock = state.oilShockStagflation;
  const deregulation = state.marketDeregulation;

  return (
    <div className={`relative w-full h-full select-none overflow-hidden flex items-center justify-center transition-colors duration-500 ${
      projectorMode ? 'bg-slate-900 text-slate-100' : 'bg-[#0a0f1d] text-slate-200'
    }`}>
      {/* Background ambient lighting */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
        oilShock && !deregulation
          ? 'bg-radial-[at_50%_40%] from-amber-950/40 via-slate-950/95 to-black'
          : 'bg-radial-[at_50%_40%] from-sky-950/30 via-slate-950/80 to-slate-950'
      }`} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Main SVG Canvas */}
      <svg
        viewBox="0 0 1200 760"
        className="w-full h-full max-h-[85vh] object-contain"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="glassTower" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>

          <linearGradient id="oilDrum" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* 1. GROUND PLANE (Modern High-Tech Urban Grid) */}
        <g id="neo-ground">
          <polygon
            points="600,70 1140,350 600,715 60,350"
            fill={oilShock && !deregulation ? '#1e293b' : '#1e3a5f'}
            stroke="#3b82f6"
            strokeWidth="1.5"
            className="transition-colors duration-700"
          />
          <polygon points="60,350 600,715 600,735 60,370" fill="#080e18" />
          <polygon points="600,715 1140,350 1140,370 600,735" fill="#040810" />

          {/* Highway interchange */}
          <polygon points="600,70 640,95 480,595 440,570" fill="#0f172a" stroke="#334155" strokeDasharray="6 6" />
        </g>

        {/* 2. PETROL GAS STATION & OIL SHOCK (Left) */}
        <g id="neo-oil">
          <g
            className="cursor-pointer"
            onClick={() => handleHotspot('gas_station', '1970년대 주유소와 석유 파동', '1973·1979년 두 차례 석유 파동으로 원유 가격이 폭등하자 공장 생산비가 급등하고 물가가 치솟았습니다.', 320, 320)}
          >
            {/* Canopy building */}
            <polygon points="260,250 380,310 320,345 200,285" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
            <polygon points="200,285 320,345 320,360 200,300" fill="#94a3b8" />
            <polygon points="320,345 380,310 380,325 320,360" fill="#64748b" />

            {/* Support pillars */}
            <line x1="220" y1="295" x2="220" y2="380" stroke="#475569" strokeWidth="4" />
            <line x1="300" y1="335" x2="300" y2="420" stroke="#475569" strokeWidth="4" />
            <line x1="360" y1="315" x2="360" y2="400" stroke="#475569" strokeWidth="4" />

            {/* Gas Pumps */}
            <rect x="235" y="360" width="16" height="24" rx="2" fill="#ef4444" stroke="#991b1b" />
            <rect x="275" y="380" width="16" height="24" rx="2" fill="#ef4444" stroke="#991b1b" />

            {/* Brand Logo */}
            <text x="290" y="300" textAnchor="middle" fontSize="12" fill="#dc2626" fontWeight="black">
              GAS OIL
            </text>

            {/* Oil Shock Price Surge indicator */}
            {oilShock && (
              <g className="animate-fade-in">
                {/* Oil Barrels */}
                <ellipse cx="360" cy="420" rx="12" ry="6" fill="url(#oilDrum)" stroke="#000" />
                <rect x="348" y="420" width="24" height="20" fill="url(#oilDrum)" />
                <ellipse cx="360" cy="440" rx="12" ry="6" fill="url(#oilDrum)" stroke="#000" />
                <text x="360" y="434" textAnchor="middle" fontSize="9" fill="#fbbf24" fontWeight="bold">OIL</text>

                {/* Price Tag */}
                <rect x="210" y="215" width="165" height="28" rx="4" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
                <text x="292" y="233" textAnchor="middle" fontSize="11" fill="#fef2f2" fontWeight="black">
                  🛢️ 유가 400% 폭등 ($3➔$12)
                </text>
              </g>
            )}
          </g>

          {/* Cars in queue */}
          {oilShock && (
            <g transform="translate(160, 390)" className="animate-fade-in">
              <rect x="0" y="0" width="45" height="18" rx="4" fill="#3b82f6" />
              <rect x="10" y="-8" width="25" height="10" rx="2" fill="#93c5fd" />
              <circle cx="8" cy="18" r="4" fill="#0f172a" />
              <circle cx="36" cy="18" r="4" fill="#0f172a" />

              <rect x="-10" y="35" width="135" height="20" rx="3" fill="#991b1b" stroke="#fca5a5" />
              <text x="57" y="49" textAnchor="middle" fontSize="9.5" fill="#fff" fontWeight="bold">
                ⚠️ 주유소 품절 대기 행렬
              </text>
            </g>
          )}
        </g>

        {/* 3. PRIVATIZATION & DEREGULATION HIGH-TECH METROPOLIS (Right) */}
        <g id="neo-enterprise">
          <g
            className="cursor-pointer"
            onClick={() => handleHotspot('tech_tower', '공기업 민영화 및 IT 혁신 타워', '신자유주의 정책에 따라 방만한 국영 통신·에너지 공기업을 민간에 매각하고 규제를 완화하여 기술 혁신을 촉진했습니다.', 740, 240)}
          >
            {/* Modern Glass Skyscraper */}
            <polygon points="680,140 820,210 750,250 610,180" fill="url(#glassTower)" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="610,180 750,250 750,420 610,350" fill="#0369a1" />
            <polygon points="750,250 820,210 820,380 750,420" fill="#075985" />

            {/* Grid windows on glass facade */}
            {[0, 1, 2, 3, 4].map((f) => (
              <g key={f}>
                <line x1="620" y1={210 + f * 26} x2="740" y2={270 + f * 26} stroke="#bae6fd" strokeWidth="1" opacity="0.6" />
              </g>
            ))}

            {/* Satellite Communications Dish on roof */}
            <ellipse cx="715" cy="175" rx="16" ry="10" fill="#f8fafc" stroke="#64748b" transform="rotate(-30 715 175)" />
            <line x1="715" y1="175" x2="725" y2="155" stroke="#f59e0b" strokeWidth="2" />

            {/* Label banner */}
            <rect x="620" y="115" width="180" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="710" y="131" textAnchor="middle" fontSize="11" fill="#7dd3fc" fontWeight="black">
              {deregulation ? '🏢 민영화 혁신 기업 (IT/Finance)' : '🏛️ 국영 통신·에너지 공기업'}
            </text>
          </g>

          {/* Global Container Port (자유 무역과 세계화) */}
          {deregulation && (
            <g
              className="cursor-pointer animate-fade-in"
              transform="translate(860, 410)"
              onClick={() => handleHotspot('global_trade', '세계화와 글로벌 자유 무역', '국경 간 자본과 상품 이동에 대한 관세와 규제를 철폐하여 전 세계가 단일 시장으로 통합되었습니다.', 860, 410)}
            >
              {/* Modern Container Ship */}
              <polygon points="0,30 90,75 75,95 -15,50" fill="#334155" stroke="#1e293b" />
              {/* Colorful Containers */}
              <rect x="15" y="15" width="18" height="15" fill="#ef4444" stroke="#991b1b" />
              <rect x="35" y="25" width="18" height="15" fill="#3b82f6" stroke="#1d4ed8" />
              <rect x="55" y="35" width="18" height="15" fill="#10b981" stroke="#047857" />

              <rect x="-10" y="105" width="145" height="22" rx="3" fill="#0f172a" stroke="#38bdf8" />
              <text x="62" y="120" textAnchor="middle" fontSize="10" fill="#38bdf8" fontWeight="bold">
                🌐 글로벌 자유무역 (세계화)
              </text>
            </g>
          )}

          {/* Deregulation Scissors / Removed Barrier */}
          {deregulation && (
            <g className="animate-fade-in" transform="translate(560, 460)">
              <rect x="-20" y="0" width="165" height="24" rx="4" fill="#14532d" stroke="#4ade80" />
              <text x="62" y="16" textAnchor="middle" fontSize="11" fill="#bbf7d0" fontWeight="bold">
                ✂️ 규제 완화 (시장 자율 복원)
              </text>
            </g>
          )}
        </g>

        {/* Hotspot pins */}
        <g id="neo-pins">
          {oilShock && (
            <g className="cursor-pointer" onClick={() => handleHotspot('stag_pin', '스태그플레이션', '석유파동과 물가폭등', 290, 220)}>
              <circle cx="290" cy="220" r="14" fill="#dc2626" opacity="0.8" />
              <circle cx="290" cy="220" r="8" fill="#ffffff" />
              <text x="290" y="224" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="black">1</text>
            </g>
          )}

          {deregulation && (
            <g className="cursor-pointer" onClick={() => handleHotspot('dereg_pin', '신자유주의 개혁', '규제 완화와 민영화', 710, 120)}>
              <circle cx="710" cy="120" r="14" fill="#0284c7" opacity="0.8" />
              <circle cx="710" cy="120" r="8" fill="#ffffff" />
              <text x="710" y="124" textAnchor="middle" fontSize="10" fill="#0284c7" fontWeight="black">2</text>
            </g>
          )}
        </g>
      </svg>

      {/* Popover Callout */}
      {activeHotspot && (
        <div
          className="absolute z-30 max-w-xs p-4 rounded-xl shadow-2xl bg-slate-900/95 border border-sky-500/50 backdrop-blur-md animate-fade-in text-left pointer-events-auto"
          style={{
            left: `${Math.min(Math.max(activeHotspot.x / 12, 10), 75)}%`,
            top: `${Math.min(Math.max(activeHotspot.y / 7.6, 12), 70)}%`,
          }}
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-700 mb-2">
            <span className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
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
          oilShock && !deregulation
            ? 'bg-rose-950/80 border-rose-500/40 text-rose-200'
            : deregulation
            ? 'bg-sky-950/80 border-sky-500/40 text-sky-200'
            : 'bg-slate-900/80 border-slate-700 text-slate-300'
        }`}>
          <Cpu className="w-4 h-4 text-sky-400" />
          <span>
            {deregulation
              ? '신자유주의: 규제 완화 · 공기업 민영화 · 시장 경쟁력 강화'
              : oilShock
              ? '석유 파동 위기: 스태그플레이션(경기 침체 + 고물가)과 정부 실패'
              : '1970년대 초반: 케인스주의 복지 국가 모델 시기'}
          </span>
        </div>
      </div>
    </div>
  );
};
