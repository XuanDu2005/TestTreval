import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AriaRobotCompanion, { Mood } from './AriaRobotCompanion';

interface CoreFeature {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  glowColor: string;
  ambientGradient: string;
  accentText: string;
  robotReaction: {
    mood: Mood;
    quote: string;
  };
  render4DIcon: () => JSX.Element;
}

const CORE_FEATURES: CoreFeature[] = [
  {
    id: 'ai-smart',
    number: '01',
    tag: 'AI NEURAL CORE',
    title: 'AI Thông Minh',
    subtitle: 'Đề xuất lịch trình tối ưu',
    description: 'Tự động phân tích sở thích cá nhân và tính toán lộ trình di chuyển tối ưu nhất.',
    glowColor: 'rgba(56, 189, 248, 0.6)',
    ambientGradient: 'from-cyan-500/25 via-blue-600/15 to-transparent',
    accentText: 'text-cyan-400',
    robotReaction: {
      mood: 'smart',
      quote: 'AI Neural Core sẵn sàng phân tích hành trình tối ưu cho bạn! ⚡',
    },
    render4DIcon: () => (
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
        {/* Soft Ambient Backlight Glow */}
        <div className="absolute w-28 h-28 rounded-full bg-cyan-500/25 blur-2xl opacity-70 animate-pulse pointer-events-none" />

        {/* Stepped Layer 1: Outermost Rounded Octagon Glass */}
        <div className="relative w-32 sm:w-36 h-32 sm:h-36 rounded-[28px] bg-gradient-to-br from-white/20 via-cyan-400/10 to-blue-900/25 backdrop-blur-xl border-2 border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center p-2.5 transition-transform duration-500 hover:scale-105">
          
          {/* Stepped Layer 2: Middle Concentric Glass Plate */}
          <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-white/30 via-cyan-300/20 to-blue-800/30 backdrop-blur-lg border border-white/70 shadow-[inset_0_0_14px_rgba(255,255,255,0.6)] flex items-center justify-center p-2.5">
            
            {/* Stepped Layer 3: Inner Concentric Glass Plate */}
            <div className="w-full h-full rounded-[16px] bg-gradient-to-br from-white/40 via-cyan-200/30 to-indigo-700/40 border border-white/90 shadow-[inset_0_0_10px_rgba(255,255,255,0.9)] flex items-center justify-center p-2">
              
              {/* Stepped Layer 4: Deep Core Chamber */}
              <div className="relative w-full h-full rounded-[12px] bg-gradient-to-br from-cyan-400/30 via-blue-950/60 to-slate-950/80 border border-cyan-300/60 shadow-[inset_0_0_12px_#38bdf8] flex items-center justify-center overflow-hidden">
                
                {/* 3D Volumetric Holographic Quantum Neural Core */}
                <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_4px_16px_rgba(56,189,248,0.85)] animate-pulse">
                  <defs>
                    <linearGradient id="aiFacet1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e0f2fe" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                    <linearGradient id="aiFacet2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                    <linearGradient id="aiFacet3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                    <linearGradient id="aiFacet4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0369a1" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                  <polygon points="50,8 82,30 50,50" fill="url(#aiFacet3)" />
                  <polygon points="50,8 18,30 50,50" fill="url(#aiFacet1)" />
                  <polygon points="18,30 18,70 50,50" fill="url(#aiFacet2)" />
                  <polygon points="82,30 82,70 50,50" fill="url(#aiFacet4)" />
                  <polygon points="50,92 18,70 50,50" fill="url(#aiFacet1)" />
                  <polygon points="50,92 82,70 50,50" fill="url(#aiFacet2)" />
                  <polygon points="50,8 82,30 82,70 50,92 18,70 18,30" fill="none" stroke="#e0f2fe" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="7" fill="#ffffff" filter="drop-shadow(0 0 6px #38bdf8)" />
                  <circle cx="50" cy="50" r="3.5" fill="#38bdf8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'time-saving',
    number: '02',
    tag: 'WARP SPEED 2.8S',
    title: 'Tiết Kiệm Thời Gian',
    subtitle: 'Xử lý dữ liệu siêu tốc',
    description: 'Xử lý dữ liệu siêu tốc, lên kế hoạch toàn diện chỉ trong 2.8 giây.',
    glowColor: 'rgba(14, 165, 233, 0.6)',
    ambientGradient: 'from-sky-500/25 via-blue-600/15 to-transparent',
    accentText: 'text-sky-400',
    robotReaction: {
      mood: 'cheer',
      quote: 'Xử lý siêu tốc trong 2.8 giây! Tiết kiệm hàng giờ tìm kiếm! ⏱️',
    },
    render4DIcon: () => (
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
        {/* Soft Ambient Backlight Glow */}
        <div className="absolute w-28 h-28 rounded-full bg-sky-500/25 blur-2xl opacity-70 animate-pulse pointer-events-none" />

        {/* Stepped Layer 1: Outermost Rounded Diamond Aerodynamic Plate */}
        <div className="relative w-28 sm:w-32 h-28 sm:h-32 rounded-[26px] transform rotate-45 bg-gradient-to-br from-white/20 via-sky-400/10 to-indigo-900/25 backdrop-blur-xl border-2 border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(14,165,233,0.4)] flex items-center justify-center p-2.5 transition-transform duration-500 hover:scale-105">
          
          {/* Stepped Layer 2: Middle Concentric Diamond Glass */}
          <div className="w-full h-full rounded-[20px] bg-gradient-to-br from-white/30 via-sky-300/20 to-indigo-800/30 backdrop-blur-lg border border-white/70 shadow-[inset_0_0_14px_rgba(255,255,255,0.6)] flex items-center justify-center p-2.5">
            
            {/* Stepped Layer 3: Inner Concentric Diamond Glass */}
            <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-white/40 via-sky-200/30 to-blue-700/40 border border-white/90 shadow-[inset_0_0_10px_rgba(255,255,255,0.9)] flex items-center justify-center p-2">
              
              {/* Stepped Layer 4: Deep Core Chamber */}
              <div className="relative w-full h-full rounded-[10px] bg-gradient-to-br from-sky-400/30 via-slate-950/70 to-indigo-950/80 border border-sky-300/60 shadow-[inset_0_0_12px_#0ea5e9] flex items-center justify-center overflow-hidden">
                
                {/* 3D Volumetric Supersonic Lightning Chrono Engine */}
                <div className="transform -rotate-45 relative z-10 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_4px_16px_rgba(14,165,233,0.85)] animate-pulse">
                    <defs>
                      <linearGradient id="boltGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="30%" stopColor="#fef08a" />
                        <stop offset="70%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                      <linearGradient id="boltCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e0f2fe" />
                        <stop offset="50%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0284c7" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="38" fill="none" stroke="url(#boltCyan)" strokeWidth="2.5" strokeDasharray="6 4" />
                    <circle cx="50" cy="50" r="26" fill="rgba(14, 165, 233, 0.2)" stroke="#38bdf8" strokeWidth="1.5" />
                    <polygon points="56,8 30,50 48,50 42,92 74,44 54,44" fill="url(#boltGold)" filter="drop-shadow(0 0 8px rgba(245,158,11,0.8))" />
                    <polygon points="56,8 30,50 48,50 50,44" fill="#ffffff" opacity="0.65" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'personalized',
    number: '03',
    tag: 'GU ĐỘC BẢN',
    title: 'Trải Nghiệm Cá Nhân',
    subtitle: 'May đo từng phong cách',
    description: 'May đo từng điểm đến theo đúng phong cách và sở thích riêng của bạn.',
    glowColor: 'rgba(244, 63, 94, 0.6)',
    ambientGradient: 'from-rose-500/25 via-pink-600/15 to-transparent',
    accentText: 'text-rose-400',
    robotReaction: {
      mood: 'love',
      quote: 'Lịch trình mang phong cách độc bản của riêng bạn! 💖',
    },
    render4DIcon: () => (
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
        {/* Soft Ambient Backlight Glow */}
        <div className="absolute w-28 h-28 rounded-full bg-rose-500/25 blur-2xl opacity-70 animate-pulse pointer-events-none" />

        {/* Stepped Layer 1: Outermost Concentric Rounded Diamond Glass Plate */}
        <div className="relative w-28 sm:w-32 h-28 sm:h-32 rounded-[26px] transform rotate-45 bg-gradient-to-br from-white/25 via-rose-300/15 to-pink-900/25 backdrop-blur-xl border-2 border-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(244,63,94,0.4)] flex items-center justify-center p-2.5 transition-transform duration-500 hover:scale-105">
          
          {/* Stepped Layer 2: Middle Concentric Rounded Diamond Glass Plate */}
          <div className="w-full h-full rounded-[20px] bg-gradient-to-br from-white/35 via-rose-200/25 to-purple-800/30 backdrop-blur-lg border border-white/80 shadow-[inset_0_0_14px_rgba(255,255,255,0.7)] flex items-center justify-center p-2.5">
            
            {/* Stepped Layer 3: Inner Concentric Rounded Diamond Glass Plate */}
            <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-white/45 via-rose-300/35 to-pink-700/40 border border-white shadow-[inset_0_0_10px_rgba(255,255,255,0.95)] flex items-center justify-center p-2">
              
              {/* Stepped Layer 4: Deep Glowing Chamber */}
              <div className="relative w-full h-full rounded-[10px] bg-gradient-to-br from-rose-400/35 via-pink-950/70 to-purple-950/80 border border-rose-300/70 shadow-[inset_0_0_12px_#f43f5e] flex items-center justify-center overflow-hidden">
                
                {/* 3D Volumetric Velvet Ruby Heart */}
                <div className="transform -rotate-45 relative z-10 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_4px_16px_rgba(244,63,94,0.85)] animate-pulse">
                    <defs>
                      <radialGradient id="heart3DGlow" cx="35%" cy="30%" r="65%">
                        <stop offset="0%" stopColor="#ffb1b8" />
                        <stop offset="35%" stopColor="#f43f5e" />
                        <stop offset="75%" stopColor="#be123c" />
                        <stop offset="100%" stopColor="#881337" />
                      </radialGradient>
                      <linearGradient id="heartSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                      <filter id="heartSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <path
                      d="M50,88 C25,70 10,52 10,32 C10,18 22,8 36,8 C43,8 48,13 50,18 C52,13 57,8 64,8 C78,8 90,18 90,32 C90,52 75,70 50,88 Z"
                      fill="#f43f5e"
                      opacity="0.5"
                      filter="url(#heartSoftGlow)"
                    />
                    <path
                      d="M50,85 C27,68 12,50 12,32 C12,19 23,10 36,10 C43,10 47.5,14.5 50,19 C52.5,14.5 57,10 64,10 C77,10 88,19 88,32 C88,50 73,68 50,85 Z"
                      fill="url(#heart3DGlow)"
                    />
                    <ellipse cx="32" cy="24" rx="14" ry="9" transform="rotate(-30 32 24)" fill="url(#heartSpecular)" />
                    <ellipse cx="68" cy="24" rx="8" ry="5" transform="rotate(30 68 24)" fill="url(#heartSpecular)" opacity="0.6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'realtime',
    number: '04',
    tag: 'RADAR 24/7 LIVE',
    title: 'Cập Nhật Real-Time',
    subtitle: 'Giám sát hành trình trực tiếp',
    description: 'Theo dõi thông tin chuyến bay, thời tiết và tình trạng điểm đến liên tục 24/7.',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    ambientGradient: 'from-emerald-500/25 via-teal-600/15 to-transparent',
    accentText: 'text-emerald-400',
    robotReaction: {
      mood: 'happy',
      quote: 'Radar quét liên tục 24/7, luôn cập nhật dữ liệu trực tiếp! 🛰️',
    },
    render4DIcon: () => (
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
        {/* Soft Ambient Backlight Glow */}
        <div className="absolute w-28 h-28 rounded-full bg-emerald-500/25 blur-2xl opacity-70 animate-pulse pointer-events-none" />

        {/* Stepped Layer 1: Outermost Concentric Rounded Hexagon Glass Plate */}
        <div className="relative w-32 sm:w-36 h-32 sm:h-36 rounded-[28px] bg-gradient-to-br from-white/25 via-emerald-300/15 to-teal-900/25 backdrop-blur-xl border-2 border-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center p-2.5 transition-transform duration-500 hover:scale-105">
          
          {/* Stepped Layer 2: Middle Concentric Rounded Hexagon Glass Plate */}
          <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-white/35 via-teal-200/25 to-cyan-800/30 backdrop-blur-lg border border-white/80 shadow-[inset_0_0_14px_rgba(255,255,255,0.7)] flex items-center justify-center p-2.5">
            
            {/* Stepped Layer 3: Inner Concentric Rounded Hexagon Glass Plate */}
            <div className="w-full h-full rounded-[16px] bg-gradient-to-br from-white/45 via-emerald-300/35 to-teal-700/40 border border-white shadow-[inset_0_0_10px_rgba(255,255,255,0.95)] flex items-center justify-center p-2">
              
              {/* Stepped Layer 4: Deep Glowing Chamber */}
              <div className="relative w-full h-full rounded-[12px] bg-gradient-to-br from-emerald-400/35 via-teal-950/70 to-slate-950/80 border border-emerald-300/70 shadow-[inset_0_0_12px_#10b981] flex items-center justify-center overflow-hidden">
                
                {/* 3D Volumetric Faceted Prismatic Crystal Cluster */}
                <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_4px_16px_rgba(52,211,153,0.85)] animate-pulse">
                  <defs>
                    <linearGradient id="crysFront" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="40%" stopColor="#a7f3d0" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="crysLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6ee7b7" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="crysRight" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>
                    <linearGradient id="crysTip" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <g transform="translate(8, 12) rotate(-14 30 50)">
                    <polygon points="30,15 38,30 38,75 22,75 22,30" fill="url(#crysLeft)" opacity="0.85" />
                    <polygon points="30,15 38,30 30,75 22,75" fill="url(#crysFront)" />
                    <polygon points="30,15 38,30 30,30" fill="url(#crysTip)" />
                  </g>
                  <g transform="translate(32, 12) rotate(14 45 50)">
                    <polygon points="45,20 53,35 53,75 37,75 37,35" fill="url(#crysRight)" opacity="0.85" />
                    <polygon points="45,20 53,35 45,75 37,75" fill="url(#crysFront)" />
                    <polygon points="45,20 53,35 45,35" fill="url(#crysTip)" />
                  </g>
                  <g>
                    <polygon points="50,6 64,28 64,88 36,88 36,28" fill="url(#crysLeft)" />
                    <polygon points="50,6 64,28 50,88 36,28" fill="url(#crysFront)" />
                    <polygon points="50,6 64,28 50,38" fill="url(#crysTip)" />
                    <line x1="50" y1="6" x2="50" y2="88" stroke="#ffffff" strokeWidth="1" opacity="0.7" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'security',
    number: '05',
    tag: 'BẢO VỆ 100%',
    title: 'An Toàn & Tin Cậy',
    subtitle: 'Bảo mật thông tin tối đa',
    description: 'Bảo mật thông tin tối đa và đồng hành hỗ trợ đáng tin cậy suốt chuyến đi.',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    ambientGradient: 'from-amber-500/25 via-yellow-600/15 to-transparent',
    accentText: 'text-amber-400',
    robotReaction: {
      mood: 'smart',
      quote: 'Bảo mật dữ liệu tuyệt đối và hỗ trợ tin cậy 100%! 🛡️',
    },
    render4DIcon: () => (
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
        {/* Soft Ambient Backlight Glow */}
        <div className="absolute w-28 h-28 rounded-full bg-amber-500/25 blur-2xl opacity-70 animate-pulse pointer-events-none" />

        {/* Stepped Layer 1: Outermost Concentric Rounded Shield Plate */}
        <div className="relative w-32 sm:w-36 h-32 sm:h-36 rounded-[28px] bg-gradient-to-br from-white/25 via-amber-300/15 to-yellow-900/25 backdrop-blur-xl border-2 border-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center p-2.5 transition-transform duration-500 hover:scale-105">
          
          {/* Stepped Layer 2: Middle Concentric Rounded Shield Plate */}
          <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-white/35 via-amber-200/25 to-yellow-800/30 backdrop-blur-lg border border-white/80 shadow-[inset_0_0_14px_rgba(255,255,255,0.7)] flex items-center justify-center p-2.5">
            
            {/* Stepped Layer 3: Inner Concentric Rounded Shield Plate */}
            <div className="w-full h-full rounded-[16px] bg-gradient-to-br from-white/45 via-amber-300/35 to-yellow-700/40 border border-white shadow-[inset_0_0_10px_rgba(255,255,255,0.95)] flex items-center justify-center p-2">
              
              {/* Stepped Layer 4: Deep Glowing Security Chamber */}
              <div className="relative w-full h-full rounded-[12px] bg-gradient-to-br from-amber-400/35 via-yellow-950/70 to-slate-950/80 border border-amber-300/70 shadow-[inset_0_0_12px_#f59e0b] flex items-center justify-center overflow-hidden">
                
                {/* 3D Volumetric Quantum Emerald Aegis Shield */}
                <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_4px_16px_rgba(245,158,11,0.85)] animate-pulse">
                  <defs>
                    <linearGradient id="shieldEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="40%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                    <linearGradient id="shieldPlate" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6ee7b7" />
                      <stop offset="50%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#064e3b" />
                    </linearGradient>
                  </defs>
                  <path d="M50,10 L84,24 C84,60 50,88 50,88 C50,88 16,60 16,24 Z" fill="url(#shieldPlate)" stroke="#fef08a" strokeWidth="2" />
                  <path d="M50,18 L76,28 C76,55 50,78 50,78 C50,78 24,55 24,28 Z" fill="url(#shieldEmerald)" opacity="0.85" />
                  <rect x="40" y="44" width="20" height="16" rx="4" fill="#ffffff" filter="drop-shadow(0 0 6px #fbbf24)" />
                  <path d="M44,44 V36 C44,32.7 46.7,30 50,30 C53.3,30 56,32.7 56,36 V44" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="50" cy="51" r="2.5" fill="#b45309" />
                  <line x1="50" y1="53.5" x2="50" y2="57" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function FeatureSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [userTriggeredTimestamp, setUserTriggeredTimestamp] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const features = useMemo(() => [
    {
      ...CORE_FEATURES[0],
      tag: t('home.f1Tag', 'AI NEURAL CORE'),
      title: t('home.f1Title', 'AI Thông Minh'),
      subtitle: t('home.f1Subtitle', 'Đề xuất lịch trình tối ưu'),
      description: t('home.f1Desc', 'Tự động phân tích sở thích cá nhân và tính toán lộ trình di chuyển tối ưu nhất.'),
    },
    {
      ...CORE_FEATURES[1],
      tag: t('home.f2Tag', 'TỐI ƯU 40% CHI PHÍ'),
      title: t('home.f2Title', 'Tối Ưu Ngân Sách'),
      subtitle: t('home.f2Subtitle', 'Chi tiêu thông minh'),
      description: t('home.f2Desc', 'Dự toán chi phí chính xác và tự động gợi ý các phương án tiết kiệm nhất.'),
    },
    {
      ...CORE_FEATURES[2],
      tag: t('home.f3Tag', '100% CÁ NHÂN HÓA'),
      title: t('home.f3Title', 'Trải Nghiệm Độc Bản'),
      subtitle: t('home.f3Subtitle', 'Cá nhân hoá 100%'),
      description: t('home.f3Desc', 'Mỗi hành trình là một kiệt tác độc bản dành riêng cho phong cách của bạn.'),
    },
    {
      ...CORE_FEATURES[3],
      tag: t('home.f4Tag', 'RADAR 24/7 LIVE'),
      title: t('home.f4Title', 'Cập Nhật Real-Time'),
      subtitle: t('home.f4Subtitle', 'Giám sát hành trình trực tiếp'),
      description: t('home.f4Desc', 'Theo dõi thông tin chuyến bay, thời tiết và tình trạng điểm đến liên tục 24/7.'),
    },
    {
      ...CORE_FEATURES[4],
      tag: t('home.f5Tag', 'BẢO VỆ 100%'),
      title: t('home.f5Title', 'An Toàn & Tin Cậy'),
      subtitle: t('home.f5Subtitle', 'Bảo mật thông tin tối đa'),
      description: t('home.f5Desc', 'Bảo mật thông tin tối đa và đồng hành hỗ trợ đáng tin cậy suốt chuyến đi.'),
    },
  ], [t]);

  const count = features.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const handleUserSelect = (idx: number) => {
    setActiveIndex(idx);
    setUserTriggeredTimestamp(Date.now());
  };

  // Auto-switch carousel timer (pauses when hovering on card)
  useEffect(() => {
    if (isCardHovered) return;
    autoPlayTimerRef.current = setInterval(nextSlide, 4500);
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isCardHovered, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 30) {
      nextSlide();
      setUserTriggeredTimestamp(Date.now());
    } else if (diff < -30) {
      prevSlide();
      setUserTriggeredTimestamp(Date.now());
    }
    touchStartX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isMouseDown.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (diff > 45) {
      nextSlide();
      setUserTriggeredTimestamp(Date.now());
      isMouseDown.current = false;
      mouseStartX.current = null;
    } else if (diff < -45) {
      prevSlide();
      setUserTriggeredTimestamp(Date.now());
      isMouseDown.current = false;
      mouseStartX.current = null;
    }
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    mouseStartX.current = null;
  };

  const current = features[activeIndex];

  return (
    <section
      id="features"
      className="relative h-screen max-h-screen w-full flex flex-col justify-center py-6 sm:py-8 px-4 sm:px-8 md:pr-16 lg:pr-20 snap-start snap-always select-none overflow-hidden bg-slate-950"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Dynamic Ambient Background Aura */}
      <div 
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-30"
        style={{
          background: `radial-gradient(circle, ${current.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main 2-Column Stage: Glass Card (Left) + Interactive Robot Companion (Right) */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 z-10">
        
        {/* Left Column: Glassmorphic Feature Dashboard Card (Matches Image 1) */}
        <div className="relative w-full lg:w-3/5 flex items-center justify-center">
          
          {/* Glass Card Container */}
          <div 
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
            className="relative w-full max-w-xl rounded-[32px] sm:rounded-[36px] bg-slate-900/70 backdrop-blur-2xl border border-cyan-400/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_0_30px_rgba(56,189,248,0.15)] transition-all duration-500 hover:border-cyan-400/70"
          >
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-950/70 border border-slate-700/80 text-[11px] sm:text-xs font-black tracking-widest text-slate-200 uppercase mb-6 shadow-inner">
              {current.number} • {current.tag}
            </div>

            {/* Main Content Grid: Stepped Glass Icon (Left) + Text Info (Right) */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              
              {/* Left: Concentric 4D Stepped Glass Icon Chamber */}
              <div className="shrink-0 flex items-center justify-center">
                {current.render4DIcon()}
              </div>

              {/* Right: Concise Text Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide mb-1.5">
                  <span>✦</span>
                  <span>{t('home.featuresEyebrow', 'Tính năng nổi bật')}</span>
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-white tracking-normal drop-shadow-sm">
                  {current.title}
                </h3>
              </div>

            </div>

            {/* Bottom 5-Pill Navigation Indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {features.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleUserSelect(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? 'w-8 bg-cyan-400 shadow-[0_0_12px_#38bdf8]'
                      : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={f.title}
                />
              ))}
            </div>

          </div>

        </div>

        {/* Right Column: Clean & Interactive Robot Companion */}
        <div className="relative w-full lg:w-2/5 flex items-center justify-center">
          <AriaRobotCompanion
            activeIndex={activeIndex}
            activeTitle={current.title}
            activeDescription={current.description}
            isCardHovered={isCardHovered}
            userTriggeredTimestamp={userTriggeredTimestamp}
          />
        </div>

      </div>
    </section>
  );
}
