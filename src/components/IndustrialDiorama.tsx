import React, { useState, useEffect } from 'react';
import { IndustrialState } from '../types/capitalism';
import { Cog, Flame, Factory, Scale, AlertTriangle, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

interface IndustrialDioramaProps {
  state: IndustrialState;
  isPlaying: boolean;
  projectorMode: boolean;
  onHotspotClick?: (title: string, description: string) => void;
}

export const IndustrialDiorama: React.FC<IndustrialDioramaProps> = ({
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

  // Live educational production output counter tick
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTicker((prev) => (prev + 1) % 1000);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleHotspot = (id: string, title: string, desc: string, x: number, y: number) => {
    setActiveHotspot({ id, title, desc, x, y });
    if (onHotspotClick) onHotspotClick(title, desc);
  };

  const mechanization = state.mechanization;
  const competition = state.marketCompetition;
  const shadows = state.industrialShadows;

  // Real-time calculated virtual production amounts based on ticker
  const manualCount = mechanization ? 2 : Math.min(2 + (ticker % 3), 4);
  const factoryCount = mechanization ? (12 + (ticker % 5)) : 0;

  return (
    <div className={`relative w-full h-full select-none overflow-hidden flex items-center justify-center transition-colors duration-500 ${
      projectorMode ? 'bg-slate-900 text-slate-100' : 'bg-[#0f172a] text-slate-200'
    }`}>
      {/* Ambient background sky / factory soot gradient */}
      <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
        shadows
          ? 'bg-radial-[at_50%_30%] from-amber-950/30 via-slate-950/90 to-black'
          : 'bg-radial-[at_50%_30%] from-sky-900/20 via-slate-950/80 to-slate-950'
      }`} />

      {/* Industrial Grid Lines */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Main SVG Diorama Canvas */}
      <svg
        viewBox="0 0 1200 760"
        className="w-full h-full max-h-[85vh] object-contain"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Brick Gradient */}
          <linearGradient id="brickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991b1b" />
            <stop offset="50%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>

          {/* Roof Slate Gradient */}
          <linearGradient id="slateRoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Iron & Steel Gear Gradient */}
          <linearGradient id="ironGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Steam Cloud Filter */}
          <filter id="steamBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. GROUND PLANE (Cobblestone District & Brick Roads)     */}
        {/* ======================================================== */}
        <g id="ground-plane">
          {/* Main isometric base */}
          <polygon
            points="600,80 1140,360 600,720 60,360"
            fill={shadows ? '#1c1917' : '#334155'}
            stroke="#475569"
            strokeWidth="2"
            className="transition-colors duration-700"
          />

          {/* Ground edge depth contour */}
          <polygon
            points="60,360 600,720 600,740 60,380"
            fill="#090d16"
          />
          <polygon
            points="600,720 1140,360 1140,380 600,740"
            fill="#05080e"
          />

          {/* Cobblestone roadway cutting through center */}
          <polygon
            points="600,80 660,120 400,600 340,560"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </g>

        {/* ======================================================== */}
        {/* 2. INITIAL WORKSHOP vs TRANSFORMED RED BRICK FACTORY     */}
        {/* ======================================================== */}
        {!mechanization ? (
          /* 2A. 18th Century Cottage Craft Workshop (가내 수공업) */
          <g
            className="cursor-pointer transition-all duration-700"
            onClick={() => handleHotspot('cottage', '가내 수공업 작업장 (Cottage Industry)', '산업혁명 이전의 전통적인 생산 방식입니다. 장인과 농가에서 물레와 손베틀을 이용해 수작업으로 면직물을 소량 생산했습니다.', 480, 320)}
          >
            {/* Wooden Cottage Walls */}
            <polygon points="440,240 560,300 480,350 360,290" fill="#d97706" stroke="#92400e" strokeWidth="2" />
            <polygon points="360,290 480,350 480,420 360,360" fill="#b45309" />
            <polygon points="480,350 560,300 560,370 480,420" fill="#78350f" />

            {/* Thatched Straw Roof */}
            <polygon points="440,240 480,180 560,300" fill="#fde047" stroke="#ca8a04" />
            <polygon points="360,290 480,180 440,240" fill="#facc15" stroke="#ca8a04" />

            {/* Wooden Beams & Windows */}
            <line x1="420" y1="320" x2="420" y2="390" stroke="#451a03" strokeWidth="3" />
            <rect x="380" y="320" width="20" height="25" fill="#fef08a" stroke="#451a03" />
            <rect x="500" y="340" width="22" height="30" fill="#451a03" />

            {/* Hand Spinning Wheel & Weaver Silhouette inside front porch */}
            <g transform="translate(490, 360)">
              <circle cx="15" cy="15" r="10" fill="none" stroke="#ca8a04" strokeWidth="2" />
              <line x1="5" y1="15" x2="25" y2="15" stroke="#ca8a04" strokeWidth="1.5" />
              <line x1="15" y1="5" x2="15" y2="25" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="28" cy="18" r="4" fill="#f8fafc" />
              <text x="36" y="22" fontSize="9" fill="#fef08a" fontWeight="bold">손베틀 장인</text>
            </g>

            {/* Label Tag */}
            <rect x="370" y="160" width="140" height="24" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
            <text x="440" y="176" textAnchor="middle" fontSize="11" fill="#fef08a" fontWeight="bold">
              가내 수공업 (Manual Craft)
            </text>
          </g>
        ) : (
          /* 2B. Mechanized Red Brick Factory A (기계제 대공업) */
          <g
            className="cursor-pointer transition-all duration-700 animate-fade-in"
            onClick={() => handleHotspot('factoryA', '제1 증기 동력 방적 공장 (Factory A)', '제임스 와트의 증기기관과 동력 방적기·방직기를 결합한 근대식 공장입니다. 분업화와 기계 동력으로 생산성을 수직 상승시켰습니다.', 460, 260)}
          >
            {/* Multi-story brick factory main body */}
            <polygon points="400,160 580,250 480,310 300,220" fill="#991b1b" stroke="#7f1d1d" strokeWidth="2" />
            <polygon points="300,220 480,310 480,440 300,350" fill="#7f1d1d" stroke="#450a0a" />
            <polygon points="480,310 580,250 580,380 480,440" fill="#450a0a" />

            {/* Factory Glass Facade Windows (Regular repetitive grid = Industrial standardization) */}
            {[0, 1, 2].map((floor) => (
              <g key={floor}>
                <rect x="330" y={250 + floor * 30} width="16" height="20" fill="#38bdf8" opacity="0.8" transform="skewY(20)" />
                <rect x="370" y={270 + floor * 30} width="16" height="20" fill="#38bdf8" opacity="0.8" transform="skewY(20)" />
                <rect x="410" y={290 + floor * 30} width="16" height="20" fill="#38bdf8" opacity="0.8" transform="skewY(20)" />
                <rect x="450" y={310 + floor * 30} width="16" height="20" fill="#38bdf8" opacity="0.8" transform="skewY(20)" />
              </g>
            ))}

            {/* Sawtooth Factory Roof (전형적인 영국 산업혁명기 톱니 지붕) */}
            <polygon points="400,160 450,110 450,185" fill="#475569" />
            <polygon points="450,185 500,135 500,210" fill="#475569" />
            <polygon points="500,210 550,160 550,235" fill="#475569" />
            {/* Glass skylights on roof */}
            <polygon points="350,190 400,160 450,185 400,215" fill="#64748b" />
            <polygon points="400,215 450,185 500,210 450,240" fill="#64748b" />

            {/* Factory Name Banner */}
            <rect x="310" y="145" width="130" height="22" rx="3" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
            <text x="375" y="160" textAnchor="middle" fontSize="11" fill="#fca5a5" fontWeight="black">
              🏭 기계제 공장 (Factory A)
            </text>
          </g>
        )}

        {/* ======================================================== */}
        {/* 3. JAMES WATT'S STEAM ENGINE & MECHANICAL GEARS          */}
        {/* ======================================================== */}
        {mechanization && (
          <g
            className="cursor-pointer transition-all duration-700 animate-fade-in"
            onClick={() => handleHotspot('steamEngine', '제임스 와트의 증기기관 (Steam Engine)', '석탄을 태워 발생시킨 고압 증기로 피스톤과 대형 플라이휠을 구동하여 공장 전체의 방적기에 기계 동력을 공급합니다.', 230, 360)}
          >
            {/* Stone boiler house platform */}
            <polygon points="180,310 260,350 220,380 140,340" fill="#475569" />
            <polygon points="140,340 220,380 220,440 140,400" fill="#334155" />
            <polygon points="220,380 260,350 260,410 220,440" fill="#1e293b" />

            {/* Iron Boiler Cylinder */}
            <rect x="160" y="310" width="35" height="50" rx="6" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <line x1="177" y1="310" x2="177" y2="280" stroke="#94a3b8" strokeWidth="4" />

            {/* Reciprocating Walking Beam (시소 피스톤 레버) */}
            <line x1="177" y1="280" x2="235" y2="295" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
            <circle cx="206" cy="287" r="4" fill="#0f172a" />

            {/* Large Iron Flywheel (돌아가는 플라이휠 대형 기어) */}
            <g
              transform="translate(235, 330)"
              className={isPlaying ? 'animate-gear-spin' : ''}
              style={{ transformOrigin: '0px 0px' }}
            >
              <circle cx="0" cy="0" r="26" fill="none" stroke="url(#ironGrad)" strokeWidth="5" />
              <line x1="-26" y1="0" x2="26" y2="0" stroke="#cbd5e1" strokeWidth="3" />
              <line x1="0" y1="-26" x2="0" y2="26" stroke="#cbd5e1" strokeWidth="3" />
              <line x1="-18" y1="-18" x2="18" y2="18" stroke="#cbd5e1" strokeWidth="2.5" />
              <line x1="-18" y1="18" x2="18" y2="-18" stroke="#cbd5e1" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="7" fill="#0f172a" stroke="#cbd5e1" />
            </g>

            {/* Secondary Interlocking Gear */}
            <g
              transform="translate(270, 350)"
              className={isPlaying ? 'animate-gear-reverse' : ''}
              style={{ transformOrigin: '0px 0px' }}
            >
              <circle cx="0" cy="0" r="14" fill="none" stroke="url(#ironGrad)" strokeWidth="3.5" />
              <line x1="-14" y1="0" x2="14" y2="0" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#cbd5e1" strokeWidth="2" />
            </g>

            {/* Steam vent puffs (증기기관 증기 배출) */}
            {isPlaying && (
              <g className="animate-steam">
                <circle cx="177" cy="265" r="7" fill="#ffffff" opacity="0.7" filter="url(#steamBlur)" />
                <circle cx="174" cy="250" r="10" fill="#ffffff" opacity="0.5" filter="url(#steamBlur)" />
                <circle cx="180" cy="235" r="13" fill="#ffffff" opacity="0.3" filter="url(#steamBlur)" />
              </g>
            )}

            {/* Steam Engine Label */}
            <rect x="140" y="445" width="115" height="20" rx="3" fill="#0f172a" stroke="#38bdf8" />
            <text x="197" y="459" textAnchor="middle" fontSize="10" fill="#7dd3fc" fontWeight="bold">
              ⚙️ 증기기관 (와트)
            </text>
          </g>
        )}

        {/* ======================================================== */}
        {/* 4. WORKER CONCENTRATION (농촌에서 도시 공장으로 유입)   */}
        {/* ======================================================== */}
        {mechanization && (
          <g
            className="cursor-pointer transition-all duration-700 animate-fade-in"
            onClick={() => handleHotspot('laborMigration', '임금 노동자 집적 (Wage Laborers)', '인클로저 운동 등으로 토지를 잃은 농민들이 일자리를 찾아 도시 공장으로 대거 유입되어 임금 노동자 계급을 형성했습니다.', 360, 480)}
          >
            {/* Trail of workers walking into factory gates */}
            {[0, 1, 2, 3].map((idx) => {
              const wx = 350 + idx * 30;
              const wy = 470 + idx * 20;
              return (
                <g key={idx} transform={`translate(${wx}, ${wy})`}>
                  <circle cx="0" cy="-10" r="3.5" fill="#f8fafc" />
                  <line x1="0" y1="-6" x2="0" y2="5" stroke="#334155" strokeWidth="3" />
                  <line x1="0" y1="5" x2="-3" y2="14" stroke="#0f172a" strokeWidth="2" />
                  <line x1="0" y1="5" x2="3" y2="14" stroke="#0f172a" strokeWidth="2" />
                </g>
              );
            })}
            <rect x="340" y="540" width="120" height="20" rx="3" fill="#1e293b" stroke="#94a3b8" />
            <text x="400" y="554" textAnchor="middle" fontSize="10" fill="#e2e8f0" fontWeight="medium">
              🚶 농촌 인구 공장 집중
            </text>
          </g>
        )}

        {/* ======================================================== */}
        {/* 5. MARKET COMPETITION & ADAM SMITH (Action 2)            */}
        {/* ======================================================== */}
        {competition && (
          <g className="transition-all duration-700 animate-fade-in">
            {/* 5A. Competing Factory B (Right side) */}
            <g
              className="cursor-pointer"
              onClick={() => handleHotspot('factoryB', '경쟁 기업 공장 (Factory B)', '시장에 진입한 또 다른 민간 기업입니다. 원가 절감과 기술 개발을 통해 고객을 유치하려는 자율적 시장 경쟁을 보여줍니다.', 750, 260)}
            >
              {/* Factory B Building */}
              <polygon points="680,180 840,260 760,310 600,230" fill="#1e3a8a" stroke="#1d4ed8" strokeWidth="2" />
              <polygon points="600,230 760,310 760,420 600,340" fill="#1d4ed8" />
              <polygon points="760,310 840,260 840,370 760,420" fill="#1e40af" />
              {/* Windows */}
              {[0, 1, 2].map((f) => (
                <g key={f}>
                  <rect x="630" y={260 + f * 28} width="16" height="18" fill="#fef08a" opacity="0.9" transform="skewY(20)" />
                  <rect x="670" y={280 + f * 28} width="16" height="18" fill="#fef08a" opacity="0.9" transform="skewY(20)" />
                  <rect x="710" y={300 + f * 28} width="16" height="18" fill="#fef08a" opacity="0.9" transform="skewY(20)" />
                </g>
              ))}
              {/* Banner */}
              <rect x="620" y="165" width="130" height="22" rx="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="685" y="180" textAnchor="middle" fontSize="11" fill="#93c5fd" fontWeight="black">
                🏭 경쟁 공장 (Factory B)
              </text>
            </g>

            {/* 5B. Adam Smith's "Invisible Hand" & Market Balance Scales */}
            <g
              className="cursor-pointer"
              onClick={() => handleHotspot('invisibleHand', '보이지 않는 손 (애덤 스미스)', '개인들이 사익을 추구하며 자유롭게 경쟁하면, 가격 기구(보이지 않는 손)가 수요와 공급을 자율적으로 조절하여 사회 전체의 부를 증진시킨다는 자유방임주의의 핵심 원리입니다.', 600, 430)}
            >
              {/* Floating Medallion */}
              <ellipse cx="600" cy="420" rx="75" ry="35" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
              {/* Scales of balance */}
              <line x1="600" y1="400" x2="600" y2="425" stroke="#fbbf24" strokeWidth="3" />
              <line x1="565" y1="410" x2="635" y2="410" stroke="#fbbf24" strokeWidth="2.5" />
              <polygon points="565,410 555,425 575,425" fill="#f59e0b" />
              <polygon points="635,410 625,425 645,425" fill="#f59e0b" />
              {/* Text */}
              <text x="600" y="438" textAnchor="middle" fontSize="11" fill="#fef08a" fontWeight="black" className="drop-shadow">
                ⚖️ 보이지 않는 손 (자유 경쟁)
              </text>
              <text x="600" y="450" textAnchor="middle" fontSize="9" fill="#94a3b8">
                『국부론』 (1776) · 시장 가격 자율 조정
              </text>
            </g>
          </g>
        )}

        {/* ======================================================== */}
        {/* 6. SHADOWS OF INDUSTRIALIZATION (Action 3)               */}
        {/* ======================================================== */}
        {shadows && (
          <g className="transition-all duration-700 animate-fade-in">
            {/* 6A. Industrial Smokestacks Billowing Dark Soot Particles */}
            <g
              className="cursor-pointer"
              onClick={() => handleHotspot('pollution', '환경 오염 및 석탄 매연', '석탄 연소로 인한 런던 스모그 등 극심한 대기·수질 오염이 발생하며 도시 환경과 시민 건강을 위협했습니다.', 430, 90)}
            >
              {/* Brick Chimney Stack 1 */}
              <polygon points="415,160 435,160 430,70 420,70" fill="#450a0a" stroke="#1f2937" strokeWidth="1" />
              {/* Brick Chimney Stack 2 */}
              <polygon points="475,135 495,135 490,55 480,55" fill="#450a0a" stroke="#1f2937" strokeWidth="1" />

              {/* Billowing Soot Smoke Plumes */}
              <g opacity="0.85">
                <circle cx="425" cy="50" r="14" fill="#334155" filter="url(#steamBlur)" />
                <circle cx="435" cy="35" r="20" fill="#1e293b" filter="url(#steamBlur)" />
                <circle cx="455" cy="20" r="28" fill="#0f172a" filter="url(#steamBlur)" />

                <circle cx="485" cy="35" r="16" fill="#334155" filter="url(#steamBlur)" />
                <circle cx="505" cy="18" r="22" fill="#1e293b" filter="url(#steamBlur)" />
                <circle cx="535" cy="8" r="32" fill="#0f172a" filter="url(#steamBlur)" />
              </g>

              {/* Warning Sign */}
              <rect x="360" y="25" width="125" height="20" rx="3" fill="#991b1b" stroke="#fca5a5" />
              <text x="422" y="39" textAnchor="middle" fontSize="10" fill="#fef2f2" fontWeight="bold">
                ⚠️ 석탄 매연과 도시 오염
              </text>
            </g>

            {/* 6B. Worker Slums & Low-Wage Hardship (Bottom Left) */}
            <g
              className="cursor-pointer"
              onClick={() => handleHotspot('inequality', '노동 문제와 빈부 격차', '초기 산업화 시기 일 14~16시간의 가혹한 노동, 아동 노동 착취, 비위생적인 빈민가 형성 등 자본주의의 구조적 모순이 표출되었습니다.', 240, 500)}
            >
              {/* Crowded tenement row */}
              <polygon points="200,460 260,490 230,510 170,480" fill="#3f3f46" stroke="#27272a" />
              <polygon points="170,480 230,510 230,550 170,520" fill="#27272a" />
              <polygon points="230,510 260,490 260,530 230,550" fill="#18181b" />

              <polygon points="270,495 330,525 300,545 240,515" fill="#3f3f46" stroke="#27272a" />
              <polygon points="240,515 300,545 300,580 240,550" fill="#27272a" />

              <rect x="180" y="585" width="145" height="22" rx="3" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
              <text x="252" y="600" textAnchor="middle" fontSize="10" fill="#fca5a5" fontWeight="bold">
                🏚️ 빈민가 · 장시간 노동 착취
              </text>
            </g>
          </g>
        )}

        {/* ======================================================== */}
        {/* 7. HOTSPOT PIN MARKERS                                   */}
        {/* ======================================================== */}
        <g id="industrial-pins">
          {mechanization && (
            <g
              className="cursor-pointer"
              onClick={() => handleHotspot('steam_pin', '증기기관', '기계 동력 혁명', 200, 310)}
            >
              <circle cx="200" cy="310" r="14" fill="#0284c7" opacity="0.8" />
              <circle cx="200" cy="310" r="8" fill="#ffffff" />
              <text x="200" y="314" textAnchor="middle" fontSize="10" fill="#0284c7" fontWeight="black">1</text>
            </g>
          )}

          {competition && (
            <g
              className="cursor-pointer"
              onClick={() => handleHotspot('hand_pin', '보이지 않는 손', '시장 자유 경쟁', 600, 390)}
            >
              <circle cx="600" cy="390" r="14" fill="#d97706" opacity="0.8" />
              <circle cx="600" cy="390" r="8" fill="#ffffff" />
              <text x="600" y="394" textAnchor="middle" fontSize="10" fill="#d97706" fontWeight="black">2</text>
            </g>
          )}

          {shadows && (
            <g
              className="cursor-pointer"
              onClick={() => handleHotspot('shadow_pin', '산업화의 한계', '노동과 환경 문제', 425, 70)}
            >
              <circle cx="425" cy="70" r="14" fill="#dc2626" opacity="0.8" />
              <circle cx="425" cy="70" r="8" fill="#ffffff" />
              <text x="425" y="74" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="black">3</text>
            </g>
          )}
        </g>
      </svg>

      {/* Popover Callout for Hotspots */}
      {activeHotspot && (
        <div
          className="absolute z-30 max-w-xs p-4 rounded-xl shadow-2xl bg-slate-900/95 border border-amber-500/50 backdrop-blur-md animate-fade-in text-left pointer-events-auto"
          style={{
            left: `${Math.min(Math.max(activeHotspot.x / 12, 10), 75)}%`,
            top: `${Math.min(Math.max(activeHotspot.y / 7.6, 12), 70)}%`,
          }}
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-700 mb-2">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
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

      {/* Real-time Educational Virtual Productivity Comparison Bar (Top Right) */}
      <div className="absolute top-4 right-4 z-20 max-w-sm p-3.5 rounded-xl border bg-slate-900/90 border-slate-700 shadow-2xl backdrop-blur-md pointer-events-none">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-200 pb-2 border-b border-slate-800 mb-2">
          <span className="flex items-center gap-1.5 text-sky-400">
            <TrendingUp className="w-4 h-4" />
            생산 방식별 생산량 비교 모형
          </span>
          <span className="text-[11px] font-mono text-slate-400">단위 시간당</span>
        </div>

        <div className="space-y-2">
          {/* Manual craft output */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-amber-300">가내 수공업 (손베틀 작업)</span>
              <span className="font-mono font-bold text-amber-400">{manualCount} 개</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${(manualCount / 16) * 100}%` }}
              />
            </div>
          </div>

          {/* Mechanized factory output */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-cyan-300">기계제 공업 (증기기관 방적기)</span>
              <span className="font-mono font-bold text-cyan-400">
                {mechanization ? `${factoryCount} 개 (▲ 600%)` : '미도입 (0 개)'}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  mechanization ? 'bg-cyan-400' : 'bg-slate-700'
                }`}
                style={{ width: `${mechanization ? (factoryCount / 16) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        <p className="mt-2 text-[10px] text-slate-400 leading-tight">
          ※ 교육용 가상 비교 수치 (기계 동력에 의한 비약적 생산성 폭증을 직관적으로 보여주기 위한 수업용 모델)
        </p>
      </div>

      {/* Floating Mini Status Indicator on Diorama Canvas (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
        <div className={`px-3 py-1.5 rounded-lg border backdrop-blur-md text-xs font-medium flex items-center gap-2 ${
          mechanization
            ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-200'
            : 'bg-slate-900/80 border-slate-700 text-slate-300'
        }`}>
          <Factory className="w-4 h-4 text-cyan-400" />
          <span>생산 체제: {mechanization ? '공장제 기계공업 (증기 동력 대량 생산)' : '가내 수공업 (전통 수작업)'}</span>
        </div>

        {competition && (
          <div className="px-3 py-1.5 rounded-lg border bg-amber-950/80 border-amber-500/40 text-amber-200 backdrop-blur-md text-xs font-medium flex items-center gap-2 animate-fade-in">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>시장 경제: 자유방임주의 & 보이지 않는 손 (자율적 가격 기구)</span>
          </div>
        )}

        {shadows && (
          <div className="px-3 py-1.5 rounded-lg border bg-rose-950/80 border-rose-500/40 text-rose-200 backdrop-blur-md text-xs font-medium flex items-center gap-2 animate-fade-in">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>산업화의 한계: 노동 문제 · 빈부격차 · 환경오염 발생</span>
          </div>
        )}
      </div>

      {/* Next Era Transition Hint (Bottom Right) */}
      {shadows && (
        <div className="absolute bottom-4 right-4 z-20 max-w-sm p-3 rounded-lg border bg-slate-900/90 border-amber-500/30 text-xs text-slate-300 shadow-xl backdrop-blur-md pointer-events-auto">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>수정 자본주의로의 전개 배경</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">
            시장의 자율성만을 믿었던 자유방임주의는 과잉 생산과 유효수요 부족, 독점 문제를 통제하지 못해 1929년 <strong>대공황</strong>으로 치달았고, 정부의 역할을 재조정하는 계기가 되었습니다.
          </p>
        </div>
      )}
    </div>
  );
};
