import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import {
  Sparkles,
  Search,
  MessageSquare,
  PhoneCall,
  Mail,
  Compass,
  ShieldCheck,
  CreditCard,
  HelpCircle,
  BrainCircuit,
  ArrowRight,
  ChevronDown,
  Send
} from 'lucide-react';

const FAQS_DATA = [
  {
    question: 'TravelMind tạo lịch trình du lịch cá nhân hóa như thế nào?',
    answer: 'AI của TravelMind phân tích sở thích cá nhân, quỹ thời gian, ngân sách dự tính và kết hợp với dữ liệu thời gian thực (thời tiết, mật độ giao thông, giờ mở cửa) để tạo nên lịch trình tối ưu nhất trong vòng 30 giây.',
  },
  {
    question: 'Tôi có thể chỉnh sửa lịch trình sau khi AI đã tạo không?',
    answer: 'Hoàn toàn được! Bạn có thể tự do thêm bớt điểm đến, thay đổi khách sạn, hoán đổi thời gian hoặc yêu cầu AI tái cấu trúc lại toàn bộ chuyến đi chỉ với một cú nhấp chuột.',
  },
  {
    question: 'Dữ liệu cá nhân và hành trình của tôi có được bảo mật không?',
    answer: 'Chúng tôi cam kết bảo mật 100% dữ liệu của bạn bằng công nghệ mã hóa chuẩn quốc tế. Thông tin cá nhân và lịch trình không bao giờ được chia sẻ cho bên thứ ba khi chưa có sự đồng ý của bạn.',
  },
  {
    question: 'Làm thế nào để sử dụng trợ lý AI trong lúc đang đi du lịch?',
    answer: 'Bạn chỉ cần mở tính năng "Hỏi AI TravelMind" ở góc phải màn hình. AI sẽ tự động định vị vị trí hiện tại của bạn để gợi ý quán ăn ngon, chỉ đường và cảnh báo mưa nắng theo thời gian thực.',
  },
  {
    question: 'Tôi cần hỗ trợ khẩn cấp trong chuyến đi thì liên hệ ai?',
    answer: 'Bạn có thể gọi trực tiếp đến Hotline 24/7 của chúng tôi (+84 123 456 789) hoặc nhắn tin trực tiếp qua khung chat để được đội ngũ chuyên viên hỗ trợ tức thì.',
  },
];

export default function SupportPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return FAQS_DATA;
    const term = query.toLowerCase();
    return FAQS_DATA.filter(
      (f) => f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term)
    );
  }, [query]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const faqEl = document.getElementById('faq-section');
    if (faqEl) {
      faqEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-28 sm:pt-32 pb-16 space-y-16 select-none font-sans">
      
      {/* ========================================================================= */}
      {/* 1. HERO SUPPORT BANNER (SEARCH & LIVE AI CHAT PREVIEW) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-[36px] sm:rounded-[44px] border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-white via-blue-50/40 to-slate-50 dark:from-[#0B1528] dark:via-[#09101F] dark:to-[#050B18] shadow-[0_20px_60px_rgba(37,99,235,0.08)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.6)] p-6 sm:p-10 lg:p-14">
        
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-400/15 dark:bg-indigo-600/20 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Text & Search Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200/80 dark:border-blue-700/60 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:text-cyan-300 shadow-xs backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Trung tâm hỗ trợ 24/7</span>
            </div>

            <h1 className="font-outfit text-3xl sm:text-5xl lg:text-[52px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Chúng tôi có thể giúp gì <br />
              <span className="font-display italic font-normal tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent drop-shadow-xs">
                cho chuyến đi của bạn?
              </span>
            </h1>

            {/* Smart Search Form */}
            <form onSubmit={handleSearch} className="flex max-w-xl items-center rounded-2xl border border-slate-200/90 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-2 shadow-lg backdrop-blur-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm câu hỏi, hướng dẫn, lịch trình..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 font-normal"
              />
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                Tìm kiếm
              </button>
            </form>

            {/* Popular Search Keywords */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Từ khóa phổ biến:</span>
              {['Lập lịch AI', 'Đổi vé', 'Thời tiết', 'Bảo mật', 'Chi tiêu'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="rounded-lg bg-white dark:bg-slate-800 px-2.5 py-1 text-blue-600 dark:text-cyan-300 font-semibold border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition cursor-pointer text-[11px]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Right Visual Column (Interactive Live AI Chat Preview) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px]">
            <div className="w-full max-w-sm rounded-3xl border border-slate-200/80 dark:border-blue-500/30 bg-white/95 dark:bg-slate-900/95 p-5 shadow-2xl backdrop-blur-2xl transition-transform duration-500 hover:scale-[1.02]">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30">
                    <MessageSquare className="h-5 w-5" />
                    <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Trợ lý AI TravelMind</div>
                    <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">● Trực tuyến 24/7</div>
                  </div>
                </div>
              </div>

              {/* Chat Simulation Messages */}
              <div className="space-y-2.5 py-4 text-left text-xs">
                <div className="max-w-[85%] rounded-2xl rounded-tl-xs bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 leading-relaxed text-slate-700 dark:text-slate-300">
                  Chào bạn! Tôi có thể giúp gì cho chuyến du lịch sắp tới của bạn?
                </div>
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-xs bg-blue-600 px-3.5 py-2.5 leading-relaxed text-white shadow-md shadow-blue-500/20 font-medium">
                  Gợi ý lịch trình 3N2Đ tại Đà Nẵng cho 2 người giúp tôi với!
                </div>
                <div className="max-w-[88%] rounded-2xl rounded-tl-xs bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 px-3.5 py-2.5 leading-relaxed text-blue-900 dark:text-cyan-200 font-medium">
                  ✨ Đã sẵn sàng! Lịch trình tối ưu đi bộ và thưởng thức ẩm thực đã hoàn tất trong 2.5s.
                </div>
              </div>

              {/* Open Chat Trigger Button */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('travelmind:open-chat'))}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:scale-[1.02] active:scale-95 transition cursor-pointer"
              >
                <span>Nhắn tin với AI ngay</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 3 QUICK CONTACT CHANNEL CARDS (BENTO GLASS) */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        
        {/* Channel 1: AI Chat */}
        <div className="group relative rounded-3xl border border-blue-200/70 bg-gradient-to-br from-white to-blue-50/80 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 dark:border-blue-500/20 dark:from-slate-900 dark:to-blue-950/25 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-6 w-6" />
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Phản hồi tức thì
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Trợ lý AI thông minh
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Giải đáp mọi thắc mắc về lịch trình, gợi ý quán ngon và xử lý phát sinh tức thời 24/7.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            {user ? (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('travelmind:open-chat'))}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Mở khung chat</span>
                <span>→</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Đăng nhập để chat</span>
                <span>→</span>
              </Link>
            )}
          </div>
        </div>

        {/* Channel 2: Hotline 24/7 */}
        <div className="group relative rounded-3xl border border-violet-200/70 bg-gradient-to-br from-white to-violet-50/80 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 dark:border-violet-500/20 dark:from-slate-900 dark:to-violet-950/25 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-400" />
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300 group-hover:scale-110 transition-transform">
                <PhoneCall className="h-6 w-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                Hotline 24/7
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Tổng đài khẩn cấp
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Đội ngũ tổng đài viên túc trực hỗ trợ các tình huống khẩn cấp trong chuyến đi của bạn.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <a
              href="tel:+84123456789"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-violet-600 dark:text-violet-300 group-hover:translate-x-1 transition-transform cursor-pointer"
            >
              <span>+84 123 456 789</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Channel 3: Email Support */}
        <div className="group relative rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-white to-emerald-50/80 p-7 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 dark:border-emerald-500/20 dark:from-slate-900 dark:to-emerald-950/25 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-400" />
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300 group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Email hỗ trợ
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Hộp thư chuyên viên
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Gửi yêu cầu hợp tác, khiếu nại dịch vụ hoặc đóng góp ý kiến để chúng tôi phục vụ tốt hơn.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <a
              href="mailto:contact@travelmind.com"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-300 group-hover:translate-x-1 transition-transform cursor-pointer"
            >
              <span>contact@travelmind.com</span>
              <span>→</span>
            </a>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. KNOWLEDGE BASE CATEGORIES (KHO KIẾN THỨC DU LỊCH 6 CHỦ ĐỀ - BENTO RICH) */}
      {/* ========================================================================= */}
      <section className="rounded-[40px] border border-slate-200/90 dark:border-slate-800 bg-gradient-to-b from-slate-50/90 via-white/80 to-blue-50/40 dark:from-[#0B1528] dark:via-[#09101F] dark:to-[#050B18] p-6 sm:p-10 lg:p-14 text-left relative overflow-hidden shadow-xl">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 h-96 w-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-96 w-96 bg-cyan-400/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200/80 dark:border-blue-700/60 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:text-cyan-300 shadow-xs backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
            <span>Thư viện kiến thức du lịch</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mt-3">
            Khám phá tài liệu & Cẩm nang hướng dẫn
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-normal">
            Chọn chủ đề để xem hướng dẫn từng bước, mẹo tối ưu chi phí và làm chủ trợ lý AI du lịch.
          </p>
        </div>

        {/* 6 Rich Bento Knowledge Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10 relative z-10">
          
          {/* Card 1: Bắt đầu */}
          <div className="group relative rounded-3xl border border-blue-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 group-hover:scale-110 transition-transform shadow-xs">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                  8 bài viết
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                Bắt đầu với TravelMind
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                Hướng dẫn tạo tài khoản, thiết lập hồ sơ sở thích và tương tác với trợ lý du lịch AI.
              </p>

              {/* Mini Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  ✨ Tạo tài khoản
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  👤 Hồ sơ du lịch
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-blue-100/60 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300">
                  🤖 Làm quen AI
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Thời gian đọc ~ 5 phút</span>
              <span className="font-bold text-blue-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                Xem ngay →
              </span>
            </div>
          </div>

          {/* Card 2: Lên lịch trình */}
          <div className="group relative rounded-3xl border border-violet-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-400" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-300 group-hover:scale-110 transition-transform shadow-xs">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/60 px-2.5 py-1 rounded-full border border-violet-200 dark:border-violet-800">
                  12 bài viết • Hot
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                Lên lịch trình & Tùy chỉnh
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                Cách AI kiến tạo lộ trình độc bản, thêm bớt điểm đến và tối ưu khoảng cách di chuyển.
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  ⚡ Lập lịch 30s
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  📍 Đa điểm dừng
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-violet-100/60 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300">
                  💰 Tiết kiệm 45%
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Hướng dẫn đầy đủ</span>
              <span className="font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
                Xem ngay →
              </span>
            </div>
          </div>

          {/* Card 3: Trợ lý AI & Thời tiết */}
          <div className="group relative rounded-3xl border border-amber-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 group-hover:scale-110 transition-transform shadow-xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                  6 bài viết
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Trợ lý AI & Dự báo thời tiết
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                Tận dụng radar thời tiết thông minh, nhận gợi ý ẩm thực và đổi tuyến khi trời mưa.
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  ☀️ Radar thời tiết
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  🍲 Quán ngon quanh bạn
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-amber-100/60 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                  ⚠️ Cảnh báo mưa
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Cập nhật thời gian thực</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                Xem ngay →
              </span>
            </div>
          </div>

          {/* Card 4: Bảo mật */}
          <div className="group relative rounded-3xl border border-emerald-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-400" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 group-hover:scale-110 transition-transform shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  9 bài viết
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Bảo mật & Quyền riêng tư
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                Chính sách bảo mật dữ liệu hành trình cá nhân, mã hóa dữ liệu chuẩn quốc tế.
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  🔒 Mã hóa 256-bit
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  🛡️ 100% Riêng tư
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  🔑 Xác thực 2 lớp
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Cam kết an toàn</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                Xem ngay →
              </span>
            </div>
          </div>

          {/* Card 5: Thanh toán */}
          <div className="group relative rounded-3xl border border-rose-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-500 to-pink-400" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 group-hover:scale-110 transition-transform shadow-xs">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-800">
                  7 bài viết
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Thanh toán & Đặt dịch vụ
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                Thông tin phương thức thanh toán, hoàn tiền và đối soát chi phí du lịch minh bạch.
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  💳 Visa / VNPay / MoMo
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  ⚡ 0đ Phí ẩn
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-rose-100/60 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                  🔄 Hoàn tiền 24h
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Bảo hiểm giao dịch</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
                Xem ngay →
              </span>
            </div>
          </div>

          {/* Card 6: Khắc phục sự cố */}
          <div className="group relative rounded-3xl border border-indigo-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 group-hover:scale-110 transition-transform shadow-xs">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                  10 bài viết
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Khắc phục sự cố thường gặp
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                Giải quyết các vấn đề về kết nối mạng, định vị GPS, đồng bộ hoặc đổi mật khẩu.
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  📍 Lỗi định vị GPS
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  📶 Mất kết nối
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-100/60 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                  🔄 Khôi phục tài khoản
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Tự xử lý nhanh</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                Xem ngay →
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION & TRUST GUARANTEE) */}
      {/* ========================================================================= */}
      <section id="faq-section" className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left pt-6">
        
        {/* FAQ Header & Trust Card Left */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200/80 dark:border-blue-700/60 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:text-cyan-300 shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Câu hỏi thường gặp</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mt-3 leading-tight">
              Giải đáp nhanh các thắc mắc phổ biến
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-normal">
              Tổng hợp những câu hỏi được người dùng quan tâm nhiều nhất khi trải nghiệm TravelMind.
            </p>
          </div>

          {/* Trust & Support Guarantee Bento Box */}
          <div className="rounded-3xl border border-blue-200/80 dark:border-slate-800 bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 p-6 space-y-4 shadow-sm">
            <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cam kết chất lượng dịch vụ</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-300 font-bold text-[10px]">
                  ✓
                </span>
                <span>Phản hồi yêu cầu trong chưa đầy <strong>5 phút</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-300 font-bold text-[10px]">
                  ✓
                </span>
                <span>Chuyên viên thực tế & AI đồng hành 24/7</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-300 font-bold text-[10px]">
                  ✓
                </span>
                <span>Hỗ trợ định vị cứu hộ du lịch khẩn cấp</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="mailto:contact@travelmind.com"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-xs shadow-md shadow-blue-500/25 transition cursor-pointer"
              >
                <span>Liên hệ chuyên viên ngay</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List Right */}
        <div className="lg:col-span-7 space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            const qNum = `0${index + 1}`;
            return (
              <div
                key={index}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-blue-500/60 dark:border-blue-500/50 bg-white dark:bg-slate-900 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/20'
                    : 'border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-slate-300 hover:bg-white shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-extrabold text-xs transition-colors ${
                        isOpen
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {qNum}
                    </span>
                    <span className="text-xs sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? 'bg-blue-600 text-white rotate-180 shadow-sm shadow-blue-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
                    <p className="font-normal">{faq.answer}</p>
                    <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-[11px] font-semibold text-blue-700 dark:text-cyan-300">
                      <span>💡 Mẹo: Bạn có thể thử nghiệm tính năng này trực tiếp trên trình tạo lịch trình.</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. LUXURY CLOSING CTA BOX (KHỞI ĐẦU CHUYẾN ĐI MƠ ƯỚC) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-[40px] sm:rounded-[48px] bg-gradient-to-r from-[#0E2A47] via-[#1E3A8A] to-[#0284C7] p-8 sm:p-14 lg:p-16 text-center text-white shadow-2xl border border-blue-400/30">
        
        {/* Background Overlay Travel Image */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
          alt="Travel Horizon"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay scale-105 pointer-events-none"
        />
        
        {/* Ambient Glows */}
        <div className="absolute -top-10 -right-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Đội ngũ chuyên viên luôn túc trực</span>
          </div>

          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Vẫn chưa tìm thấy câu trả lời?
          </h3>
          
          <p className="text-xs sm:text-base text-blue-100/90 leading-relaxed font-normal max-w-xl mx-auto">
            Hãy kết nối trực tiếp với đội ngũ TravelMind. Chúng tôi cam kết phản hồi và hỗ trợ bạn trong thời gian sớm nhất!
          </p>

          {/* Liquid Glass Apple 3D CTA Button */}
          <div className="pt-4 flex items-center justify-center">
            <a
              href="mailto:contact@travelmind.com"
              className="group relative inline-flex items-center justify-between gap-6 rounded-full bg-gradient-to-b from-[#4387f6] via-[#2563eb] to-[#1a4ecb] pl-8 pr-3.5 py-3 text-white border border-white/70 shadow-[inset_0_2px_3px_rgba(255,255,255,0.85),inset_0_-3px_5px_rgba(15,23,42,0.4),0_20px_40px_-8px_rgba(37,99,235,0.6)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:shadow-[inset_0_2.5px_4px_rgba(255,255,255,0.95),inset_0_-3.5px_6px_rgba(15,23,42,0.45),0_25px_50px_-8px_rgba(37,99,235,0.7)] active:scale-95 cursor-pointer overflow-hidden"
            >
              <span className="pointer-events-none absolute inset-x-3 top-1 h-[45%] rounded-full bg-gradient-to-b from-white/60 via-white/20 to-transparent blur-[0.4px]" />
              <span className="pointer-events-none absolute inset-x-5 bottom-1 h-[25%] rounded-full bg-gradient-to-t from-white/35 to-transparent blur-[0.5px]" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.95)] drop-shadow-[0_0_15px_rgba(147,197,253,0.8)] transition-transform duration-500 group-hover:scale-110"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                  >
                    <path d="M11 9C11 14 8 16 3 17C8 18 11 20 11 25C11 20 14 18 19 17C14 16 11 14 11 9Z" className="animate-pulse" />
                    <path d="M20 3C20 6.5 18 8 15 8.8C18 9.5 20 11 20 14.5C20 11 22 9.5 25 8.8C22 8 20 6.5 20 3Z" />
                    <path d="M24 18C24 20.8 22.5 22 20 22.6C22.5 23.2 24 24.5 24 27.2C24 24.5 25.5 23.2 28 22.6C25.5 22 24 20.8 24 18Z" />
                  </svg>
                </div>
                
                <span className="font-bold text-base sm:text-lg tracking-tight text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.3)]">
                  Gửi yêu cầu hỗ trợ
                </span>
              </div>

              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-white/40 to-white/15 border border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:from-white/55 group-hover:to-white/25 group-hover:translate-x-1 overflow-hidden">
                <span className="pointer-events-none absolute inset-x-1 top-0.5 h-[42%] rounded-full bg-gradient-to-b from-white/75 to-transparent" />
                <ArrowRight className="relative z-10 w-5 h-5 text-white drop-shadow-xs" />
              </div>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
