import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type Mood = 'normal' | 'happy' | 'cheer' | 'wink' | 'love' | 'smart';

interface AriaRobotCompanionProps {
  activeIndex?: number;
  activeDescription?: string;
  activeTitle?: string;
  isCardHovered?: boolean;
  userTriggeredTimestamp?: number;
}

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

export default function AriaRobotCompanion({
  activeIndex = 0,
  activeDescription = '',
  activeTitle = '',
  isCardHovered = false,
  userTriggeredTimestamp = 0,
}: AriaRobotCompanionProps) {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLButtonElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mood, setMood] = useState<Mood>('normal');
  const [typedText, setTypedText] = useState('');
  const [userSpeakActive, setUserSpeakActive] = useState(false);
  const blinkTimerRef = useRef<number | null>(null);
  const typingTimerRef = useRef<number | null>(null);
  const prevUserTimestamp = useRef(userTriggeredTimestamp);

  // Global continuous hyper-responsive pointer tracking
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) {
        const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        setPointer({ x: clamp(x, -1, 1), y: clamp(y, -1, 1) });
        return;
      }

      const localX = (e.clientX - (rect.left + rect.width / 2)) / 300;
      const localY = (e.clientY - (rect.top + rect.height / 2)) / 300;

      setPointer({
        x: clamp(localX, -1, 1),
        y: clamp(localY, -1, 1),
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // ONLY speak/point when USER explicitly triggers a state change
  useEffect(() => {
    if (userTriggeredTimestamp > 0 && userTriggeredTimestamp !== prevUserTimestamp.current) {
      prevUserTimestamp.current = userTriggeredTimestamp;
      setUserSpeakActive(true);

      const timer = window.setTimeout(() => {
        setUserSpeakActive(false);
      }, 4000);

      return () => window.clearTimeout(timer);
    }
  }, [userTriggeredTimestamp]);

  // Pointing & Speech active ONLY when hovering card or user explicitly triggered
  const isPointing = isCardHovered || userSpeakActive;

  // Typewriter effect when pointing
  useEffect(() => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    if (isPointing) {
      setTypedText('');
      let charIdx = 0;
      const fullText = activeDescription;

      typingTimerRef.current = window.setInterval(() => {
        if (charIdx <= fullText.length) {
          setTypedText(fullText.slice(0, charIdx));
          charIdx++;
        } else {
          if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        }
      }, 18);
    } else {
      setTypedText(activeDescription);
    }

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [isPointing, activeIndex, activeDescription]);

  // Natural blinking
  useEffect(() => {
    if (hovered || pressed || isPointing) return;

    const scheduleBlink = () => {
      const delay = 3200 + Math.random() * 2600;
      blinkTimerRef.current = window.setTimeout(() => {
        setMood('wink');
        window.setTimeout(() => setMood('normal'), 200);
        scheduleBlink();
      }, delay);
    };

    scheduleBlink();

    return () => {
      if (blinkTimerRef.current) window.clearTimeout(blinkTimerRef.current);
    };
  }, [hovered, pressed, isPointing]);

  const handleClick = () => {
    setPressed(true);
    setMood('love');

    window.setTimeout(() => {
      setPressed(false);
      setMood(hovered ? 'happy' : 'normal');
    }, 750);
  };

  // Parallax & Eye tracking calculations
  const pupilOffsetX = isPointing ? -12 : pointer.x * 12;
  const pupilOffsetY = isPointing ? 1 : pointer.y * 9;

  const headTranslateX = isPointing ? -4 : pointer.x * 3;
  const headTranslateY = pointer.y * 2;
  const headRotate = isPointing ? -4 : pointer.x * 2.5;

  // Arm gestures: Point directly to the left card when isPointing is true
  let leftArmRotate = pointer.y * 6 - pointer.x * 4;
  let rightArmRotate = pointer.y * 6 + pointer.x * 4;

  if (isPointing) {
    leftArmRotate = -96; // Straight horizontal pointing left at the Feature Card!
    rightArmRotate = 15;
  } else if (pressed || mood === 'love') {
    leftArmRotate = -35;
    rightArmRotate = 35;
  } else if (hovered || mood === 'happy') {
    leftArmRotate = -15;
    rightArmRotate = 38;
  }

  return (
    <div className="relative w-[320px] sm:w-[380px] h-[400px] sm:h-[450px] flex items-center justify-center select-none">
      
      {/* Speech Bubble: VISIBLE ONLY WHEN USER HOVERS OR USER CLICKS A STATE */}
      <div 
        className={`absolute -top-12 sm:-top-16 -left-8 sm:-left-16 z-30 max-w-[300px] sm:max-w-[340px] px-4 py-3 rounded-2xl bg-slate-900/95 border border-cyan-400/80 shadow-[0_12px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(56,189,248,0.35)] backdrop-blur-2xl transition-all duration-300 pointer-events-none ${
          isPointing 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2'
        }`}
      >
        {/* Header with Title & Audio Wave */}
        <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-slate-800">
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <span>🎙️</span> {activeTitle}
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1 h-3 bg-cyan-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite]" />
            <span className="w-1 h-4 bg-cyan-300 rounded-full animate-[pulse_0.35s_ease-in-out_infinite]" />
            <span className="w-1 h-2 bg-cyan-500 rounded-full animate-[pulse_0.7s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Spoken Typed Text */}
        <p className="text-xs sm:text-[13px] font-medium text-slate-100 leading-snug">
          {typedText}
          <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle" />
        </p>

        {/* Bubble Pointer Arrow towards Robot */}
        <div className="absolute -bottom-2 right-12 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-900/95" />
      </div>

      {/* Robot Interactive Button */}
      <button
        ref={rootRef}
        type="button"
        aria-label={t('home.robotAriaLabel', 'AI TV Robot Companion')}
        onClick={handleClick}
        onMouseEnter={() => {
          setHovered(true);
          if (!pressed && !isPointing) setMood('happy');
        }}
        onMouseLeave={() => {
          setHovered(false);
          if (!pressed && !isPointing) setMood('normal');
        }}
        className="relative w-full h-full flex items-center justify-center outline-none bg-transparent cursor-pointer group"
      >
        {/* Soft Ambient Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl opacity-60" />
        </div>

        {/* Clean Vector Robot SVG */}
        <svg
          viewBox="0 0 440 500"
          className={`w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-transform duration-200 ${
            pressed ? 'scale-105' : 'hover:scale-[1.02]'
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="robotWhiteClean" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="suitShadingClean" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="darkTitaniumClean" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="screenGlassClean" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#252a32" />
              <stop offset="50%" stopColor="#181c22" />
              <stop offset="100%" stopColor="#0d1015" />
            </linearGradient>

            <filter id="cleanPinkGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. LEFT ARM (POINTING DIRECTLY AT THE CARD WHEN isPointing IS TRUE) */}
          <g
            id="left-arm"
            style={{
              transform: `rotate(${leftArmRotate}deg)`,
              transformOrigin: '115px 300px',
              transition: 'transform 0.35s cubic-bezier(0.34, 1.3, 0.64, 1)',
            }}
          >
            {/* Shoulder Socket */}
            <circle cx="115" cy="300" r="14" fill="url(#darkTitaniumClean)" stroke="#0f172a" strokeWidth="4" />
            {/* Arm Sleeve */}
            <path
              d="M115 300 C92 340 82 385 92 425 C105 430 120 415 125 380 C128 340 128 310 115 300 Z"
              fill="url(#suitShadingClean)"
              stroke="#1e293b"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            {/* Wrist Cuff */}
            <rect x="84" y="418" width="32" height="10" rx="3" fill="#ffffff" stroke="#1e293b" strokeWidth="3.5" />
            
            {/* Hand: Crisp Pointing Hand with Extended Index Finger towards left */}
            {isPointing ? (
              <g>
                {/* Palm Base */}
                <circle cx="98" cy="438" r="12" fill="url(#robotWhiteClean)" stroke="#1e293b" strokeWidth="4.5" />
                {/* Straight Pointing Index Finger pointing Left */}
                <rect x="58" y="431" width="34" height="11" rx="5.5" fill="url(#robotWhiteClean)" stroke="#1e293b" strokeWidth="4.5" />
                {/* Glowing Pointer Light at fingertip */}
                <circle cx="64" cy="436.5" r="3.5" fill="#00e5ff" />
              </g>
            ) : (
              /* Regular Mitten Hand */
              <path
                d="M89 428 C80 438 80 455 93 462 C103 464 112 452 110 438 C110 429 105 426 89 428 Z"
                fill="url(#robotWhiteClean)"
                stroke="#1e293b"
                strokeWidth="4.5"
              />
            )}
          </g>

          {/* 2. RIGHT ARM */}
          <g
            id="right-arm"
            style={{
              transform: `rotate(${rightArmRotate}deg)`,
              transformOrigin: '325px 300px',
              transition: 'transform 0.25s ease-out',
            }}
          >
            {/* Shoulder Socket */}
            <circle cx="325" cy="300" r="14" fill="url(#darkTitaniumClean)" stroke="#0f172a" strokeWidth="4" />
            {/* Arm Sleeve */}
            <path
              d="M325 300 C348 340 358 385 348 425 C335 430 320 415 315 380 C312 340 312 310 325 300 Z"
              fill="url(#suitShadingClean)"
              stroke="#1e293b"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            {/* Wrist Cuff */}
            <rect x="324" y="418" width="32" height="10" rx="3" fill="#ffffff" stroke="#1e293b" strokeWidth="3.5" />
            {/* Hand */}
            <path
              d="M351 428 C360 438 360 455 347 462 C337 464 328 452 330 438 C330 429 335 426 351 428 Z"
              fill="url(#robotWhiteClean)"
              stroke="#1e293b"
              strokeWidth="4.5"
            />
          </g>

          {/* 3. BODY & SUIT */}
          <g id="suit-body">
            {/* Main Blazer */}
            <path
              d="M145 265 L95 460 C95 472 345 472 345 460 L295 265 Z"
              fill="url(#suitShadingClean)"
              stroke="#1e293b"
              strokeWidth="8"
              strokeLinejoin="round"
            />

            {/* Shirt Collar (V-neck) */}
            <polygon
              points="165,265 275,265 220,405"
              fill="#ffffff"
              stroke="#1e293b"
              strokeWidth="7"
              strokeLinejoin="round"
            />

            {/* Lapels */}
            <path
              d="M160 265 L215 435 L220 435 L225 435 L280 265"
              stroke="#1e293b"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Pocket with Cyan Pin */}
            <line x1="140" y1="345" x2="175" y2="345" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="158" cy="332" r="4.5" fill="#00e5ff" />

            {/* Black Necktie */}
            <polygon points="213,305 227,305 224,395 216,395" fill="#1e293b" />

            {/* Solid Neck Base */}
            <rect x="198" y="248" width="44" height="24" rx="4" fill="url(#darkTitaniumClean)" stroke="#1e293b" strokeWidth="4.5" />
          </g>

          {/* 4. HEAD, TV MONITOR & ANTENNA */}
          <g
            id="head"
            style={{
              transform: `translate(${headTranslateX}px, ${headTranslateY}px) rotate(${headRotate}deg)`,
              transformOrigin: '220px 255px',
              transition: 'transform 0.12s ease-out',
            }}
          >
            {/* Top Antenna Stem */}
            <line x1="220" y1="110" x2="220" y2="68" stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />

            {/* Top Antenna Donut */}
            <circle cx="220" cy="58" r="14" fill="url(#robotWhiteClean)" stroke="#1e293b" strokeWidth="6" />
            <circle cx="220" cy="58" r="4.5" fill="#00e5ff" />

            {/* Outer White TV Frame */}
            <rect
              x="108"
              y="108"
              width="224"
              height="148"
              rx="32"
              fill="url(#robotWhiteClean)"
              stroke="#1e293b"
              strokeWidth="9"
              strokeLinejoin="round"
            />

            {/* Inner Black Screen Glass */}
            <rect
              x="124"
              y="124"
              width="192"
              height="116"
              rx="20"
              fill="url(#screenGlassClean)"
              stroke="#1e293b"
              strokeWidth="6"
            />

            {/* 5. EXPRESSIVE EYES */}
            <g id="screen-eyes" className="transition-all duration-200">
              {mood === 'love' ? (
                // Heart Eyes
                <>
                  <path
                    d="M172 172 C162 158 148 170 172 190 C196 170 182 158 172 172 Z"
                    fill="#ff4081"
                    filter="url(#cleanPinkGlow)"
                  />
                  <path
                    d="M268 172 C258 158 244 170 268 190 C292 170 278 158 268 172 Z"
                    fill="#ff4081"
                    filter="url(#cleanPinkGlow)"
                  />
                  <ellipse cx="148" cy="202" rx="8" ry="4.5" fill="#ff4081" opacity="0.8" />
                  <ellipse cx="292" cy="202" rx="8" ry="4.5" fill="#ff4081" opacity="0.8" />
                </>
              ) : mood === 'happy' || isPointing ? (
                // Smiling Arches (^ ^) when pointing or happy
                <>
                  <path
                    d="M152 182 C160 162 184 162 192 182"
                    stroke="#ffffff"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M248 182 C256 162 280 162 288 182"
                    stroke="#ffffff"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <ellipse cx="146" cy="200" rx="8" ry="4.5" fill="#ff4081" opacity="0.85" />
                  <ellipse cx="294" cy="200" rx="8" ry="4.5" fill="#ff4081" opacity="0.85" />
                </>
              ) : mood === 'wink' ? (
                // Winking
                <>
                  <ellipse cx="172" cy="176" rx="24" ry="32" fill="#ffffff" />
                  <circle cx="172" cy="180" r="9.5" fill="#1e293b" />
                  <circle cx="175" cy="175" r="3.2" fill="#ffffff" />
                  <line x1="250" y1="178" x2="286" y2="178" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
                </>
              ) : (
                // Standard Big White Oval Eyes with Continuous Mouse Tracking
                <>
                  {/* Left Eye */}
                  <ellipse cx="172" cy="176" rx="24" ry="32" fill="#ffffff" />
                  <g style={{ transform: `translate(${pupilOffsetX}px, ${pupilOffsetY}px)`, transition: 'transform 0.04s linear' }}>
                    <circle cx="172" cy="180" r="9.5" fill="#1e293b" />
                    <circle cx="175" cy="175" r="3.2" fill="#ffffff" />
                  </g>

                  {/* Right Eye */}
                  <ellipse cx="268" cy="176" rx="24" ry="32" fill="#ffffff" />
                  <g style={{ transform: `translate(${pupilOffsetX}px, ${pupilOffsetY}px)`, transition: 'transform 0.04s linear' }}>
                    <circle cx="268" cy="180" r="9.5" fill="#1e293b" />
                    <circle cx="271" cy="175" r="3.2" fill="#ffffff" />
                  </g>
                </>
              )}
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}