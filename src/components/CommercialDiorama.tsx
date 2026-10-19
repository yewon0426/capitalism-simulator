import React, { useState } from 'react';
import { CommercialState } from '../types/capitalism';
import { Anchor, ShieldAlert, Sparkles, HelpCircle, ArrowUpRight, Ban, Coins, Building2, Package } from 'lucide-react';

interface CommercialDioramaProps {
  state: CommercialState;
  isPlaying: boolean;
  projectorMode: boolean;
  onHotspotClick?: (title: string, description: string) => void;
}

export const CommercialDiorama: React.FC<CommercialDioramaProps> = ({
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

  const tradeExpanded = state.tradeExpanded;
  const mercantilism = state.stateIntervention;

  return (
    <div className={`relative w-full h-full select-none overflow-hidden flex items-center justify-center transition-colors duration-500 ${
      projectorMode ? 'bg-slate-900 text-slate-100' : 'bg-[#0a1120] text-slate-200'
    }`}>
      {/* Ambient background sky / ocean gradient */}
      <div className="absolute inset-0 bg-radial-[at_50%_40%] from-blue-900/20 via-slate-950/80 to-slate-950 pointer-events-none" />

      {/* Grid subtle guide for diorama depth */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Main SVG Diorama Canvas */}
      <svg
        viewBox="0 0 1200 760"
        className="w-full h-full max-h-[85vh] object-contain"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Water gradient */}
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c2540" />
            <stop offset="50%" stopColor="#0a3258" />
            <stop offset="100%" stopColor="#061c33" />
          </linearGradient>

          {/* Pier Stone Gradient */}
          <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Wood Deck Gradient */}
          <linearGradient id="woodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Gold Shimmer */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Sail Fabric Gradient */}
          <linearGradient id="sailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. OCEAN WATER SURFACE (Isometric Diamond / Polygon)    */}
        {/* ======================================================== */}
        <g id="water-surface">
          {/* Base water basin */}
          <polygon
            points="600,60 1160,340 600,720 40,340"
            fill="url(#waterGrad)"
            stroke="#1e3a5f"
            strokeWidth="3"
          />

          {/* Water wave depth contour */}
          <polygon
            points="40,340 600,720 600,745 40,365"
            fill="#030b14"
          />
          <polygon
            points="600,720 1160,340 1160,365 600,745"
            fill="#020810"
          />

          {/* Gentle animated water ripples */}
          <g className={isPlaying ? 'animate-sea-wave' : ''} opacity="0.35">
            <path d="M200,340 Q250,330 300,345 T400,340" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M450,260 Q500,250 550,265 T650,260" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M700,380 Q750,370 800,385 T900,380" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M350,450 Q400,440 450,455 T550,450" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M600,530 Q650,520 700,535 T800,530" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* 2. STONE HARBOR QUAY & DOCKS (Left-to-Center Landmass)   */}
        {/* ======================================================== */}
        <g id="harbor-landmass">
          {/* Mainland cobblestone wharf */}
          <polygon
            points="600,60 880,200 580,360 300,220"
            fill="#334155"
            stroke="#475569"
            strokeWidth="2"
          />
          {/* Quay front wall */}
          <polygon
            points="300,220 580,360 580,385 300,245"
            fill="#1e293b"
          />
          <polygon
            points="580,360 880,200 880,225 580,385"
            fill="#0f172a"
          />

          {/* Main Wooden Pier reaching into the water */}
          <polygon
            points="520,330 680,410 600,450 440,370"
            fill="url(#woodGrad)"
            stroke="#92400e"
            strokeWidth="1.5"
          />
          {/* Pier side timbers */}
          <polygon
            points="440,370 600,450 600,465 440,385"
            fill="#271104"
          />
          <polygon
            points="600,450 680,410 680,425 600,465"
            fill="#170902"
          />

          {/* Pier wooden piles (submerged pillars) */}
          <line x1="450" y1="385" x2="450" y2="430" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
          <line x1="520" y1="420" x2="520" y2="465" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
          <line x1="600" y1="465" x2="600" y2="510" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
          <line x1="670" y1="425" x2="670" y2="470" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />

          {/* Mooring bollards and ropes */}
          <circle cx="480" cy="355" r="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
          <circle cx="560" cy="395" r="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
          <circle cx="640" cy="435" r="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
        </g>

        {/* ======================================================== */}
        {/* 3. COMMERCIAL BUILDINGS & GUILD HOUSES                   */}
        {/* ======================================================== */}
        <g id="buildings">
          {/* 3A. Merchant Guild House / Trading Company */}
          <g
            className="cursor-pointer transition-transform hover:opacity-95"
            onClick={() => handleHotspot('guild', '상인 길드 및 무역 상점', '동인도회사와 같은 초기 특허 무역 상인들의 본거지입니다. 원거리 해상 교역을 조직하고 막대한 상업 이윤을 창출했습니다.', 600, 160)}
          >
            {/* Base building */}
            <polygon points="560,110 640,150 600,175 520,135" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="520,135 600,175 600,215 520,175" fill="#cbd5e1" />
            <polygon points="600,175 640,150 640,190 600,215" fill="#94a3b8" />
            {/* Steep Gothic Roof */}
            <polygon points="560,110 600,70 640,150" fill="#b91c1c" />
            <polygon points="520,135 600,70 560,110" fill="#dc2626" />
            {/* Windows & Doors */}
            <rect x="545" y="150" width="10" height="15" fill="#1e293b" transform="skewY(20)" />
            <rect x="565" y="160" width="10" height="15" fill="#1e293b" transform="skewY(20)" />
            {/* Guild Banner */}
            <line x1="600" y1="70" x2="600" y2="45" stroke="#f59e0b" strokeWidth="2" />
            <polygon points="600,45 625,52 600,60" fill="#f59e0b" />
          </g>

          {/* 3B. Storage Warehouses (Expands when trade expands) */}
          <g
            className="cursor-pointer"
            onClick={() => handleHotspot('warehouse', '항구 물류 보관 창고', '원거리 항해로 들여온 향신료, 생사, 면직물, 설탕 등의 귀중한 교역품을 보관하던 항만 물류 거점입니다.', 420, 200)}
          >
            <polygon points="380,170 440,200 400,225 340,195" fill="#e2e8f0" />
            <polygon points="340,195 400,225 400,255 340,225" fill="#94a3b8" />
            <polygon points="400,225 440,200 440,230 400,255" fill="#64748b" />
            {/* Roof */}
            <polygon points="380,170 410,145 440,200" fill="#b45309" />
            <polygon points="340,195 410,145 380,170" fill="#d97706" />

            {/* Extra Warehouse appears if trade expanded */}
            {tradeExpanded && (
              <g className="transition-all duration-700 animate-fade-in">
                <polygon points="460,140 520,170 480,195 420,165" fill="#e2e8f0" />
                <polygon points="420,165 480,195 480,225 420,195" fill="#94a3b8" />
                <polygon points="480,195 520,170 520,200 480,225" fill="#64748b" />
                <polygon points="460,140 490,115 520,170" fill="#9a3412" />
                <polygon points="420,165 490,115 460,140" fill="#c2410c" />
              </g>
            )}
          </g>

          {/* 3C. Royal Customs House (중상주의 조작 시 활성화) */}
          {mercantilism && (
            <g
              className="transition-all duration-700 cursor-pointer animate-fade-in"
              onClick={() => handleHotspot('customs', '왕실 세관 및 보호무역 관청', '1651년 영국 항해법(Navigation Acts) 등 중상주의 정책 집행 기관입니다. 자국 선박에만 무역 특권을 부여하고 외국 완제품에 고율 관세를 부과했습니다.', 720, 240)}
            >
              {/* Grand Stone building with royal crest */}
              <polygon points="680,180 770,225 730,250 640,205" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
              <polygon points="640,205 730,250 730,285 640,240" fill="#cbd5e1" />
              <polygon points="730,250 770,225 770,260 730,285" fill="#94a3b8" />
              {/* Royal Blue Pavilion Roof */}
              <polygon points="680,180 725,140 770,225" fill="#1e3a8a" />
              <polygon points="640,205 725,140 680,180" fill="#1d4ed8" />
              {/* Crown Emblem Banner */}
              <line x1="725" y1="140" x2="725" y2="105" stroke="#f59e0b" strokeWidth="2.5" />
              <rect x="715" y="105" width="22" height="16" fill="#fbbf24" stroke="#78350f" rx="2" />
              <text x="726" y="117" textAnchor="middle" fontSize="10" fill="#78350f" fontWeight="bold">👑</text>
              <text x="705" y="305" fill="#38bdf8" fontSize="12" fontWeight="bold" className="drop-shadow">
                왕실 세관 (Customs)
              </text>
            </g>
          )}
        </g>

        {/* ======================================================== */}
        {/* 4. SHIPS IN HARBOR (Caravels & Galleons)                 */}
        {/* ======================================================== */}
        <g id="ships">
          {/* 4A. Initial Merchant Boat (always present, gentle sway) */}
          <g
            className={`cursor-pointer ${isPlaying ? 'animate-gentle-sway' : ''}`}
            style={{ transformOrigin: '400px 420px' }}
            onClick={() => handleHotspot('caravel1', '초기 소형 무역선 (카라벨선)', '대항해 시대 초기를 열었던 목조 범선입니다. 연안 및 초기 원거리 항로에서 상품을 실어날랐습니다.', 400, 420)}
          >
            {/* Wooden Hull */}
            <path
              d="M320,410 C340,435 440,440 460,415 L445,400 C410,412 350,405 320,410 Z"
              fill="#78350f"
              stroke="#451a03"
              strokeWidth="1.5"
            />
            {/* Mast */}
            <line x1="390" y1="410" x2="390" y2="330" stroke="#451a03" strokeWidth="3" />
            <line x1="355" y1="410" x2="355" y2="350" stroke="#451a03" strokeWidth="2" />
            {/* White billowed Sails */}
            <path d="M388,335 Q420,355 388,380 Z" fill="url(#sailGrad)" stroke="#94a3b8" />
            <path d="M354,355 Q380,370 354,395 Z" fill="url(#sailGrad)" stroke="#94a3b8" />
            {/* Pennant Flag */}
            <polygon points="390,330 405,335 390,340" fill="#dc2626" />
          </g>

          {/* 4B. EXPANDED TRADE SHIPS (Appear on Action 1) */}
          {tradeExpanded && (
            <g className="transition-all duration-1000 animate-fade-in">
              {/* Grand Ocean Galleon 1 (Center Right) */}
              <g
                className={`cursor-pointer ${isPlaying ? 'animate-gentle-sway' : ''}`}
                style={{ transformOrigin: '760px 480px' }}
                onClick={() => handleHotspot('galleon_east', '대형 대양 갈레온 무역선', '신대륙과 아시아를 오가며 막대한 향신료와 귀금속을 싣고 돌아온 3본 마스트 무역선입니다.', 760, 480)}
              >
                {/* Ship reflection in water */}
                <ellipse cx="760" cy="530" rx="90" ry="14" fill="#082f49" opacity="0.4" />
                {/* Massive Wooden Hull */}
                <path
                  d="M660,470 C690,520 830,525 860,475 L840,450 C800,470 710,460 660,470 Z"
                  fill="#542508"
                  stroke="#271104"
                  strokeWidth="2"
                />
                {/* Castle decks (Forecastle & Sterncastle) */}
                <polygon points="660,470 690,460 685,440 655,450" fill="#78350f" />
                <polygon points="840,450 860,475 875,445 845,435" fill="#78350f" />
                {/* 3 Main Masts */}
                <line x1="710" y1="465" x2="710" y2="350" stroke="#271104" strokeWidth="4" />
                <line x1="765" y1="470" x2="765" y2="320" stroke="#271104" strokeWidth="4.5" />
                <line x1="820" y1="460" x2="820" y2="360" stroke="#271104" strokeWidth="3.5" />
                {/* Yardarms & Billowing Square Sails */}
                <path d="M708,360 Q740,385 708,415 Z" fill="url(#sailGrad)" stroke="#64748b" />
                <path d="M708,420 Q740,440 708,455 Z" fill="url(#sailGrad)" stroke="#64748b" />
                <path d="M763,330 Q805,360 763,395 Z" fill="url(#sailGrad)" stroke="#64748b" />
                <path d="M763,405 Q810,435 763,460 Z" fill="url(#sailGrad)" stroke="#64748b" />
                <path d="M818,370 Q848,395 818,425 Z" fill="url(#sailGrad)" stroke="#64748b" />
                {/* Merchant Trade Ensign Flags */}
                <polygon points="765,320 790,328 765,335" fill="#f59e0b" />
                <polygon points="710,350 730,356 710,362" fill="#3b82f6" />
                {/* Unloading Cargo Sling */}
                <line x1="765" y1="400" x2="720" y2="435" stroke="#fcd34d" strokeWidth="2" strokeDasharray="3 3" />
                <rect x="710" y="432" width="16" height="14" fill="#d97706" rx="2" />
              </g>

              {/* Distant Galleon 2 (Sailing into harbor, Upper Right) */}
              <g
                className={isPlaying ? 'animate-gentle-sway' : ''}
                style={{ transformOrigin: '980px 280px' }}
                opacity="0.85"
              >
                <path d="M920,280 C940,310 1020,315 1040,285 Z" fill="#78350f" />
                <line x1="980" y1="285" x2="980" y2="200" stroke="#451a03" strokeWidth="3" />
                <path d="M978,210 Q1005,230 978,255 Z" fill="url(#sailGrad)" stroke="#94a3b8" />
              </g>
            </g>
          )}

          {/* 4C. MERCANTILIST NAVAL PATROL & IMPORT RESTRICTION (Action 2) */}
          {mercantilism && (
            <g className="transition-all duration-700 animate-fade-in">
              {/* Royal Navy Warship patrolling (Right) */}
              <g
                className="cursor-pointer"
                onClick={() => handleHotspot('patrol', '왕실 해군 호위선', '중상주의 하에서 국가는 식민지 항로를 군사적으로 보호하고, 타국 상선의 접근을 감시·차단했습니다.', 940, 430)}
              >
                <path d="M880,420 C910,460 1010,465 1030,425 L1015,405 C980,420 920,410 880,420 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
                <line x1="950" y1="415" x2="950" y2="330" stroke="#0f172a" strokeWidth="3.5" />
                <path d="M948,340 Q985,365 948,395 Z" fill="#f8fafc" stroke="#475569" />
                {/* Royal Lion Flag */}
                <rect x="948" y="325" width="24" height="15" fill="#dc2626" />
                <text x="960" y="336" textAnchor="middle" fontSize="10" fill="#fef08a" fontWeight="bold">🦁</text>
                {/* Cannon Ports */}
                <circle cx="920" cy="425" r="3" fill="#000" />
                <circle cx="950" cy="430" r="3" fill="#000" />
                <circle cx="980" cy="430" r="3" fill="#000" />
              </g>

              {/* Blocked Foreign Ship at barrier (Left water) */}
              <g
                className="cursor-pointer opacity-80"
                onClick={() => handleHotspot('blockade', '외국 무역선 입항 제한 (영국 항해법)', '외국 국적 선박의 상품 수입을 금지하거나 가혹한 관세를 부과하여, 자국의 금·은 화폐가 해외로 유출되는 것을 막았습니다.', 200, 480)}
              >
                {/* Water barricade buoy */}
                <line x1="160" y1="460" x2="280" y2="530" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" />
                <circle cx="220" cy="495" r="8" fill="#ef4444" />
                <text x="220" y="499" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="black">✕</text>
                {/* Blocked foreign ship */}
                <path d="M140,490 C160,515 230,520 250,495 Z" fill="#64748b" stroke="#334155" />
                <line x1="190" y1="495" x2="190" y2="430" stroke="#334155" strokeWidth="2" />
                <path d="M188,440 Q210,455 188,475 Z" fill="#cbd5e1" />
                {/* Ban Sign */}
                <rect x="140" y="440" width="80" height="22" rx="4" fill="#991b1b" stroke="#f87171" strokeWidth="1" />
                <text x="180" y="455" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">
                  ⛔ 수입 제한 (관세)
                </text>
              </g>
            </g>
          )}
        </g>

        {/* ======================================================== */}
        {/* 5. CARGO CRATES, MERCHANTS, AND CAPITAL ACCUMULATION    */}
        {/* ======================================================== */}
        <g id="quay-activities">
          {/* 5A. Basic Crate Stack */}
          <g
            className="cursor-pointer"
            onClick={() => handleHotspot('crates', '교역 물품: 향신료와 비단', '인도, 동남아, 신대륙에서 유입된 향신료(후추, 계피), 직물, 귀금속입니다. 유럽 귀족과 부유층 사이에서 폭발적 수요를 기록했습니다.', 460, 320)}
          >
            <rect x="460" y="325" width="18" height="18" fill="#b45309" stroke="#78350f" rx="1" />
            <rect x="480" y="320" width="18" height="18" fill="#d97706" stroke="#92400e" rx="1" />
            <rect x="470" y="306" width="18" height="18" fill="#f59e0b" stroke="#b45309" rx="1" />
            <text x="479" y="319" textAnchor="middle" fontSize="9" fill="#451a03" fontWeight="bold">SPICE</text>
          </g>

          {/* 5B. EXPANDED CARGO (Action 1) */}
          {tradeExpanded && (
            <g className="transition-all duration-700 animate-fade-in">
              {/* Additional Crates on Pier */}
              <g onClick={() => handleHotspot('trade_overflow', '대량 교역 화물 집적', '해외 시장이 급성장함에 따라 항구 곳곳에 물품이 쌓이고, 대규모 상인 집단이 형성되었습니다.', 540, 360)}>
                <rect x="535" y="365" width="20" height="20" fill="#b45309" stroke="#78350f" />
                <rect x="557" y="360" width="20" height="20" fill="#92400e" stroke="#451a03" />
                <rect x="546" y="344" width="20" height="20" fill="#f59e0b" stroke="#b45309" />
                <text x="556" y="358" textAnchor="middle" fontSize="8" fill="#451a03" fontWeight="black">SILK</text>

                <rect x="620" y="415" width="18" height="18" fill="#047857" stroke="#065f46" />
                <text x="629" y="428" textAnchor="middle" fontSize="8" fill="#ecfdf5" fontWeight="bold">TEA</text>
              </g>

              {/* 5C. COMMERCIAL CAPITAL VAULT & GOLD PILES (상업 자본 축적) */}
              <g
                className="cursor-pointer transition-all duration-700"
                onClick={() => handleHotspot('capital', '상업 자본의 축적 (Merchant Capital)', '원거리 무역을 통해 유럽으로 막대한 금과 은이 유입되고 상인 자본이 형성되었습니다. 이 자본은 훗날 산업혁명의 핵심 기반이 됩니다.', 630, 290)}
              >
                {/* Vault Building */}
                <polygon points="620,230 680,260 650,280 590,250" fill="#e2e8f0" stroke="#cbd5e1" />
                <polygon points="590,250 650,280 650,305 590,275" fill="#94a3b8" />
                <polygon points="650,280 680,260 680,285 650,305" fill="#64748b" />
                {/* Shimmering Gold Coins */}
                <g className={isPlaying ? 'animate-coin-shimmer' : ''}>
                  <ellipse cx="610" cy="275" rx="14" ry="7" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1" />
                  <ellipse cx="625" cy="285" rx="16" ry="8" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1" />
                  <ellipse cx="642" cy="280" rx="14" ry="7" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1" />
                  <ellipse cx="618" cy="270" rx="12" ry="6" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1" />
                  <ellipse cx="632" cy="276" rx="13" ry="6.5" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1" />
                </g>
                {/* Floating Capital Tag */}
                <rect x="585" y="210" width="115" height="24" rx="4" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="642" y="226" textAnchor="middle" fontSize="11" fill="#fef08a" fontWeight="black" className="drop-shadow">
                  💰 상업 자본 축적 (금·은)
                </text>
              </g>
            </g>
          )}

          {/* 5D. MERCANTILISM POLICY FLOW ARROWS (Action 2) */}
          {mercantilism && (
            <g className="transition-all duration-700 animate-fade-in pointer-events-none">
              {/* Export Encouragement Golden Arrow */}
              <g>
                <path
                  d="M620,380 C700,370 780,410 820,440"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  strokeDasharray="8 4"
                />
                <polygon points="825,445 815,435 830,432" fill="#fbbf24" />
                <rect x="670" y="375" width="95" height="20" rx="3" fill="#14532d" stroke="#4ade80" />
                <text x="717" y="389" textAnchor="middle" fontSize="10" fill="#bbf7d0" fontWeight="bold">
                  ↗ 수출 장려 (금화 유입)
                </text>
              </g>
            </g>
          )}
        </g>

        {/* ======================================================== */}
        {/* 6. INTERACTIVE HOTSPOT PIN MARKERS                       */}
        {/* ======================================================== */}
        <g id="hotspot-markers">
          {/* Marker 1: Galleon */}
          <g
            className="cursor-pointer"
            onClick={() => handleHotspot('ship_marker', '무역선단', '신항로 개척 이후 원거리 해양 무역 확대를 상징합니다.', 760, 360)}
          >
            <circle cx="760" cy="360" r="14" fill="#0284c7" opacity="0.8" />
            <circle cx="760" cy="360" r="8" fill="#ffffff" />
            <text x="760" y="364" textAnchor="middle" fontSize="10" fill="#0284c7" fontWeight="black">1</text>
          </g>

          {/* Marker 2: Capital Vault */}
          {tradeExpanded && (
            <g
              className="cursor-pointer"
              onClick={() => handleHotspot('vault_marker', '상업 자본', '상업과 무역을 통한 자본 축적이 자본주의 발달의 첫 단계를 이끌었습니다.', 640, 245)}
            >
              <circle cx="640" cy="245" r="14" fill="#d97706" opacity="0.8" />
              <circle cx="640" cy="245" r="8" fill="#ffffff" />
              <text x="640" y="249" textAnchor="middle" fontSize="10" fill="#d97706" fontWeight="black">2</text>
            </g>
          )}

          {/* Marker 3: Royal Customs */}
          {mercantilism && (
            <g
              className="cursor-pointer"
              onClick={() => handleHotspot('customs_marker', '중상주의 세관', '수출을 늘리고 수입을 막아 국가의 부(금·은)를 쌓으려 한 국가 개입 정책입니다.', 730, 185)}
            >
              <circle cx="730" cy="185" r="14" fill="#dc2626" opacity="0.8" />
              <circle cx="730" cy="185" r="8" fill="#ffffff" />
              <text x="730" y="189" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="black">3</text>
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

      {/* Floating Mini Status Indicator on Diorama Canvas */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
        <div className={`px-3 py-1.5 rounded-lg border backdrop-blur-md text-xs font-medium flex items-center gap-2 ${
          tradeExpanded
            ? 'bg-amber-950/80 border-amber-500/40 text-amber-200'
            : 'bg-slate-900/80 border-slate-700 text-slate-300'
        }`}>
          <Anchor className="w-4 h-4 text-amber-400" />
          <span>무역 활동: {tradeExpanded ? '대양 원거리 무역선단 활성화 (상업자본 축적)' : '소규모 연안 무역 단계'}</span>
        </div>

        {mercantilism && (
          <div className="px-3 py-1.5 rounded-lg border bg-rose-950/80 border-rose-500/40 text-rose-200 backdrop-blur-md text-xs font-medium flex items-center gap-2 animate-fade-in">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>국가 개입: 중상주의 칙령 (수출 장려 · 수입 제한 · 영국 항해법 1651)</span>
          </div>
        )}
      </div>

      {/* Historical Limit Callout Badge (at bottom right of diorama) */}
      {tradeExpanded && mercantilism && (
        <div className="absolute bottom-4 right-4 z-20 max-w-sm p-3 rounded-lg border bg-slate-900/90 border-amber-500/30 text-xs text-slate-300 shadow-xl backdrop-blur-md pointer-events-auto">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>다음 시대로의 전개 배경과 한계</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">
            상업 자본 축적과 시장 확대는 상품을 더 빠르고 많이 만들 수 있는 기술 혁신(기계)의 필요성을 낳았고, 이는 18세기 후반 <strong>산업혁명</strong>의 직접적인 불씨가 되었습니다.
          </p>
        </div>
      )}
    </div>
  );
};
