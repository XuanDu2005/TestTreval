import { Link } from 'react-router-dom';

interface BrandLogoProps {
  to?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  adminBadge?: boolean;
  className?: string;
}

export default function BrandLogo({
  to = '/',
  size = 'md',
  showText = true,
  adminBadge = false,
  className = '',
}: BrandLogoProps) {
  const emblemSizes = {
    sm: 'h-8 w-8 rounded-xl',
    md: 'h-9 w-9 rounded-2xl',
    lg: 'h-11 w-11 rounded-[18px]',
  };

  const iconSizes = {
    sm: 'w-4.5 h-4.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Dynamic Flight Emblem with Gloss Highlight & Gradient */}
      <div
        className={`relative flex items-center justify-center bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-md shadow-blue-500/30 ring-1 ring-white/30 dark:ring-white/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/40 shrink-0 ${emblemSizes[size]}`}
      >
        {/* Soft top-left gloss reflection */}
        <div className="absolute top-0.5 left-1 w-3.5 h-1.5 bg-white/40 rounded-full blur-[0.5px] pointer-events-none" />

        {/* Modern Aerodynamic Jet Plane Icon */}
        <svg
          viewBox="0 0 24 24"
          className={`${iconSizes[size]} -rotate-45 drop-shadow-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
          fill="currentColor"
        >
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>

        {/* Subtle Bottom Ambient Glow */}
        <div className="absolute -bottom-1 inset-x-2 h-2 bg-cyan-400/30 blur-xs rounded-full pointer-events-none" />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`font-black tracking-tight text-slate-900 dark:text-white leading-none ${textSizes[size]}`}
          >
            Travel<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Mind</span>
          </span>

          {adminBadge && (
            <span className="rounded-md bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 px-1.5 py-0.5 text-[10px] font-extrabold text-blue-700 dark:text-cyan-300 uppercase tracking-wider leading-none">
              Admin
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}
