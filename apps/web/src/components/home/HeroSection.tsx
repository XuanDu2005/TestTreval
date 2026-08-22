import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroVisual from './HeroVisual';

export default function HeroSection() {
  const { t } = useTranslation();

  const scrollToNextSection = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden h-screen max-h-screen flex flex-col justify-between pt-20 sm:pt-24 pb-6 px-6 sm:px-12 lg:px-16 xl:px-24 snap-start snap-always">
      {/* Background ambient lighting effects */}
      <div className="absolute top-12 left-1/4 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-[110px] dark:bg-blue-600/15 pointer-events-none" />
      <div className="absolute top-16 right-12 -z-10 h-88 w-88 rounded-full bg-purple-500/10 blur-[130px] dark:bg-purple-600/20 pointer-events-none" />

      <div className="grid items-center gap-8 lg:grid-cols-[52%_48%] xl:grid-cols-[50%_50%] my-auto w-full max-w-[1400px] mx-auto">
        {/* Left Column: Clean & Artistic Typography & CTAs (Shifted smoothly right with comfortable padding) */}
        <div className="space-y-6 text-center lg:text-left z-10 -mt-2 lg:pl-4 xl:pl-8">

          {/* Artistic Dual-Typography Headline */}
          <h1 className="font-outfit text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            {t('home.heroTitle1')} <br />
            <span className="font-display italic font-normal tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-xs">
              {t('home.heroTitle2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg font-normal text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            {t('home.heroDesc')}
          </p>

          {/* Single Enriched CTA Button (Hiệu ứng kính bong bóng Apple iOS 3D Liquid Glass) */}
          <div className="flex items-center justify-center lg:justify-start pt-3">
            <Link
              to="/recommendations"
              className="group relative inline-flex items-center justify-between gap-6 rounded-full bg-gradient-to-b from-[#4387f6] via-[#2563eb] to-[#1a4ecb] pl-6 pr-3 py-2.5 text-white border border-white/60 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.75),inset_0_-2.5px_4px_rgba(15,23,42,0.35),0_12px_28px_-6px_rgba(37,99,235,0.38)] backdrop-blur-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[inset_0_2px_3px_rgba(255,255,255,0.9),inset_0_-3px_5px_rgba(15,23,42,0.4),0_16px_36px_-6px_rgba(37,99,235,0.5)] active:scale-95 cursor-pointer overflow-hidden"
            >
              {/* Lớp phản quang vòm kính bong bóng phía trên (iOS Bubble Top Dome Reflection) */}
              <span className="pointer-events-none absolute inset-x-2.5 top-1 h-[45%] rounded-full bg-gradient-to-b from-white/55 via-white/15 to-transparent blur-[0.4px]" />
              
              {/* Lớp phản quang ánh sáng mép đáy (iOS Bubble Bottom Rim Reflection) */}
              <span className="pointer-events-none absolute inset-x-4 bottom-1 h-[25%] rounded-full bg-gradient-to-t from-white/30 to-transparent blur-[0.5px]" />

              {/* Cụm Sparkle Pha Lê & Chữ */}
              <div className="flex items-center gap-3 relative z-10">
                {/* Cụm sao lấp lánh đa điểm chuẩn 100% theo ảnh mẫu 1 */}
                <div className="relative flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.95)] drop-shadow-[0_0_15px_rgba(147,197,253,0.8)] transition-transform duration-500 group-hover:scale-110"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    {/* 1. Ngôi sao chính lớn nhất (Bên trái dưới) */}
                    <path
                      d="M11 9C11 14 8 16 3 17C8 18 11 20 11 25C11 20 14 18 19 17C14 16 11 14 11 9Z"
                      className="animate-pulse"
                    />

                    {/* 2. Ngôi sao phía trên (Chính giữa trên) */}
                    <path
                      d="M20 3C20 6.5 18 8 15 8.8C18 9.5 20 11 20 14.5C20 11 22 9.5 25 8.8C22 8 20 6.5 20 3Z"
                    />

                    {/* 3. Ngôi sao nhỏ phía dưới bên phải */}
                    <path
                      d="M24 18C24 20.8 22.5 22 20 22.6C22.5 23.2 24 24.5 24 27.2C24 24.5 25.5 23.2 28 22.6C25.5 22 24 20.8 24 18Z"
                    />

                    {/* 4. Hạt kim cương phát sáng nhỏ (Góc trên bên trái) */}
                    <polygon points="10,3 11.5,5 10,7 8.5,5" className="opacity-90" />

                    {/* 5. Điểm sáng tròn nhỏ (Góc trên bên phải) */}
                    <circle cx="27" cy="8" r="1.5" className="opacity-90" />
                  </svg>
                </div>
                
                <span className="font-outfit font-black text-lg sm:text-xl tracking-tight text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.25)]">
                  {t('home.ctaPrimary')}
                </span>
              </div>

              {/* Nút tròn kính mờ bong bóng chứa mũi tên (iOS Glass Sphere Arrow) */}
              <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-white/35 to-white/10 border border-white/70 shadow-[inset_0_1px_2px_rgba(255,255,255,0.85),0_2px_8px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:from-white/50 group-hover:to-white/20 group-hover:translate-x-1 overflow-hidden">
                {/* Phản quang vòm tròn trên mũi tên */}
                <span className="pointer-events-none absolute inset-x-1 top-0.5 h-[42%] rounded-full bg-gradient-to-b from-white/70 to-transparent" />
                
                <svg className="relative z-10 w-5 h-5 text-white transition-transform duration-300 drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          </div>

        </div>

        {/* Right Column: Pristine 3D Interactive WebGL Globe with Silky Smooth Airplanes */}
        <div className="w-full flex justify-center items-center">
          <HeroVisual />
        </div>
      </div>

      {/* Bottom Scroll Indicator Pill (Nâng lên cao, luôn nằm trong khung nhìn màn hình) */}
      <div className="pt-2 sm:pt-3 -mt-3 sm:-mt-6 lg:-mt-8 flex justify-center relative z-20">
        <button
          type="button"
          onClick={scrollToNextSection}
          className="group flex flex-col items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-cyan-300 transition-all cursor-pointer active:scale-95 animate-bounce [animation-duration:2.5s]"
          title={t('home.scrollDown')}
        >
          <div className="flex items-center gap-2 rounded-full border border-sky-400/50 bg-white/95 dark:bg-slate-900/95 px-4 py-1.5 backdrop-blur-xl shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-sky-500 group-hover:shadow-blue-500/25">
            <span className="h-2 w-2 rounded-full bg-sky-500 animate-ping" />
            <span className="text-sky-700 dark:text-cyan-300 font-bold uppercase tracking-wider text-[11px]">
              {t('home.scrollDown')}
            </span>
            <span className="text-sky-600 dark:text-cyan-300 font-bold transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}
