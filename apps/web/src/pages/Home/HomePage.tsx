import { useState, useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import FeaturedTrips from '@/components/home/FeaturedTrips';

const SECTIONS = [
  { id: 'hero', name: 'Khám phá', index: 0 },
  { id: 'features', name: 'Tính năng AI', index: 1 },
  { id: 'featured-trips', name: 'Hành trình nổi bật', index: 2 },
  { id: 'footer-page', name: 'Chân trang', index: 3 },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = (idx: number) => {
    if (idx < 0 || idx >= SECTIONS.length) return;
    
    let targetEl: HTMLElement | null = null;
    if (idx === 0) targetEl = document.getElementById('hero');
    if (idx === 1) targetEl = document.getElementById('features');
    if (idx === 2) targetEl = document.getElementById('featured-trips');
    if (idx === 3) targetEl = document.querySelector('footer');

    if (targetEl) {
      setActiveSection(idx);
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Observe section visibility naturally without hijacking wheel/touch events
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || (entry.target.tagName.toLowerCase() === 'footer' ? 'footer-page' : '');
            const sec = SECTIONS.find((s) => s.id === id);
            if (sec) {
              setActiveSection(sec.index);
            }
          }
        });
      },
      { threshold: 0.45 }
    );

    ['hero', 'features', 'featured-trips'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const footerEl = document.querySelector('footer');
    if (footerEl) observer.observe(footerEl);

    return () => observer.disconnect();
  }, []);

  // Keyboard Up/Down Navigation for comfortable browsing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea', 'select'].includes((document.activeElement?.tagName || '').toLowerCase())) {
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const next = Math.min(activeSection + 1, SECTIONS.length - 1);
        scrollToSection(next);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const next = Math.max(activeSection - 1, 0);
        scrollToSection(next);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  return (
    <div className="relative w-full">
      
      {/* 🧭 Floating Right Page Dot Navigator */}
      <aside
        aria-label="Page Navigation"
        className="fixed right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 p-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/80 dark:border-slate-800 shadow-xl transition-all select-none"
      >
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSection === idx;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(idx)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
              title={sec.name}
            >
              {/* Tooltip Label on Hover */}
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900/90 dark:bg-white/95 px-2.5 py-1 text-[11px] font-bold text-white dark:text-slate-900 opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1">
                {sec.name}
              </span>

              {/* Indicator Pill */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'h-6 w-2 bg-gradient-to-b from-blue-500 to-indigo-600 shadow-sm shadow-blue-500/50 scale-110'
                    : 'h-2 w-2 bg-slate-300 dark:bg-slate-700 hover:bg-blue-400 dark:hover:bg-cyan-400 group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* 1. Hero Section */}
      <div className="w-full">
        <HeroSection />
      </div>

      {/* 2. AI Features Grid (Page 2 Full Bleed) */}
      <div className="w-full">
        <FeatureSection />
      </div>

      {/* 3. Featured Itineraries (Page 3 Full Bleed) */}
      <div className="w-full">
        <FeaturedTrips />
      </div>
    </div>
  );
}