import { useMemo, useState, useEffect } from "react";
import {
  ArrowRight,

  AlertTriangle,
  Wallet, CheckCircle2, XCircle, Undo2, ArrowDown, ChevronDown, MessageCircle, Coffee,

} from "lucide-react";
import ChatWidget from "./ChatWidget";

export default function LandingPage() {
  // コンテンツ定義：後から文言変更しやすいようにまとめています
  const brand = useMemo(
    () => ({
      name: "0円SEO",
      badge: "β提供",
      heroTag: "メールをご覧の方への限定公開",
      primaryCta: "無料相談はこちら",
      secondaryCta: "先にお申し込みフォームを見る",
      footer: "株式会社AIMA",
    }),
    []
  );

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_CHAT === "true";
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const existingScript = document.getElementById("timerex_embed");
    if (existingScript) {
      if (typeof (window as Window & { TimerexCalendar?: () => void }).TimerexCalendar === "function") {
        (window as Window & { TimerexCalendar?: () => void }).TimerexCalendar?.();
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "timerex_embed";
    script.src = "https://asset.timerex.net/js/embed.js";
    script.async = true;
    script.onload = () => {
      (window as Window & { TimerexCalendar?: () => void }).TimerexCalendar?.();
    };
    document.body.appendChild(script);
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById("application-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-5xl">
          <div className="flex items-center gap-2">
            <div className="font-bold text-xl tracking-tight text-slate-900">
              {brand.name}
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium bg-slate-100 px-2 py-1 rounded text-slate-600 border border-slate-200">
              {brand.badge}
            </span>
          </div>

          <button
            onClick={scrollToForm}
            className="bg-red-600 text-white px-4 py-2 text-sm font-bold rounded-lg hover:bg-red-500 transition-colors shadow-sm"
          >
            {brand.primaryCta}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white text-slate-900 pb-16 md:pb-24 relative overflow-hidden">
        {/* 背景の装飾（アクセント） - Removed for clean look */}


        <div className="w-full text-center relative z-10">
          <img
            src={`${baseUrl}hero_main.png`}
            alt="0円SEO - 成果が出なければ費用を請求しない全額返金型SEO"
            className="w-full h-auto mx-auto relative z-0"
          />

          <div className="container mx-auto px-4 relative z-10 -mt-12 sm:-mt-24 md:-mt-32 lg:-mt-40 pb-4 pointer-events-none">
            <div className="flex flex-col gap-2 justify-center md:justify-start items-center md:items-start pointer-events-auto md:ml-32 lg:ml-40">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                  onClick={scrollToForm}
                  className="w-full sm:w-auto group bg-yellow-500 text-slate-900 text-base md:text-lg font-bold py-4 px-12 rounded-xl shadow-[0_4px_14px_0_rgba(234,179,8,0.39)] hover:bg-yellow-400 hover:shadow-[0_6px_20px_rgba(234,179,8,0.23)] hover:-translate-y-0.5 transition-all flex items-center justify-center"
                >
                  無料相談はこちら
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Conventional SEO Problem */}
      <section className="py-24 bg-slate-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Header: 結論を先に述べる */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              現在のSEO対策の問題点
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-3xl mx-auto">
              現在のSEO対策は、毎月固定費が発生します
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative">


            {/* STEP 1: Costs Occur */}
            <div className="relative z-10 mb-12">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 relative shadow-sm text-left">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider">
                  STEP 1
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-6 mt-2 text-center">半年間のコストの目安</h3>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                  {/* Left: Accumulation (Previously Right) */}
                  <div className="w-full md:w-1/2">
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <div className="space-y-3 font-mono text-sm">
                        <div className="flex justify-between items-center text-slate-500">
                          <span>1ヶ月目</span>
                          <span>...50万円</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500">
                          <span>2ヶ月目</span>
                          <span>...50万円</span>
                        </div>
                        <div className="h-px bg-slate-200 my-2"></div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-700">6ヶ月間の合計</span>
                          <span className="font-bold text-xl text-slate-900">300万円</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Detail (Previously Left) */}
                  <div className="w-full md:w-1/2 space-y-4">
                    <p className="font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">コストの内訳</p>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">コンサルティング料</div>
                      <div className="text-slate-600 dark:text-slate-400 text-xs">月額30万円〜</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">記事制作料</div>
                      <div className="text-slate-600 text-xs">20万円（1本5万を想定）</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-12 relative z-10">
              <ArrowDown className="w-8 h-8 text-slate-300" />
            </div>

            {/* STEP 2: No Results & Loss */}
            <div className="relative z-10 mb-12">
              <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center relative shadow-sm">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider z-20">
                  STEP 2
                </div>

                {/* Background Clipper */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
                  <div className="absolute -right-6 -bottom-6 text-red-100 opacity-50">
                    <AlertTriangle size={120} />
                  </div>
                </div>

                <h3 className="font-bold text-xl text-slate-900 mb-6 mt-4 relative z-10">SEOのアルゴリズムは"ブラックボックス"</h3>

                <h4 className="font-bold text-lg text-red-800 mb-4 relative z-10">どれだけ投資しても、成果が出るとは限らない</h4>

                <div className="bg-white/60 rounded-xl p-6 border border-red-100 relative z-10 backdrop-blur-sm max-w-sm mx-auto mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-600">投資額</span>
                    <span className="text-lg font-bold text-slate-800">300万円</span>
                  </div>
                  <div className="flex justify-center my-2">
                    <ArrowDown className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-600">全記事</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-red-600">Googleランク外</span>
                    </div>
                  </div>
                </div>

                <div className="text-center relative z-10">
                  <p className="text-slate-800 text-sm leading-relaxed font-medium mb-1">
                    <a href="https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Ahrefsの調査</a>によれば、新規公開ページで1年以内にTop10入りするのは<span className="text-red-600 font-bold">6.1%</span>。
                  </p>
                  <p className="text-red-700 text-base font-bold leading-relaxed bg-red-50 inline-block px-4 py-2 rounded-lg mt-2 border border-red-100">
                    つまり、ごく一部の会社しか、SEOの恩恵は受けられないことがわかっています。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion / Bridge */}
          <div className="mt-16 text-center">
            <p className="text-xl md:text-3xl font-bold text-slate-800 leading-relaxed tracking-wide">
              SEOは最小限のコストで投資し、
              <br />
              短期間で<span className="text-slate-900 bg-yellow-200 px-1">「自社に合うかどうか」</span>を見極めることが大切
            </p>
          </div>

        </div>
      </section>

      {/* Transition to 0 Yen SEO Solution - Final Image Replacement */}
      <section className="mt-24 relative z-20 w-full bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <img
            src={`${baseUrl}solution_final.png`}
            alt="当社のSEO対策は完全成果報酬"
            className="w-full h-auto"
          />
        </div>
      </section>


      {/* Scheme aka 0 Yen SEO Mechanism - Risk Zero Scheme */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              0円SEOのしくみ
            </h2>
            <p className="text-lg text-slate-600">
              最初に予算をお預かりしますが、<span className="font-bold text-slate-900 bg-yellow-100 px-1">成果が出なければ全額お返し</span>します。
            </p>
          </div>

          {/* Flow Container */}
          <div className="relative">


            {/* STEP 1: START */}
            <div className="relative z-10 mb-12">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 max-w-3xl mx-auto text-center relative shadow-sm">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider">
                  STEP 1
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 mt-2">予算を預ける</h3>
                <div className="flex flex-col items-center">
                  <div className="inline-flex items-center gap-4 bg-white border border-slate-200 px-6 py-3 rounded-xl">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-slate-500 font-bold">預かり金</div>
                      <div className="text-xl font-bold text-slate-900">100万円</div>
                    </div>
                  </div>
                  <div className="relative inline-flex mt-4">
                    <span className="group relative inline-flex text-xs font-bold text-slate-600 underline underline-offset-4 hover:text-slate-900 transition-colors cursor-help">
                      ※予算をお預かりする理由
                      <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-64 -translate-x-1/2 translate-y-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-xs text-slate-700 shadow-lg opacity-0 transition-opacity transition-transform duration-150 group-hover:opacity-100 group-hover:translate-y-0">
                        事前に予算をお預かりすることで、成果が出た場合の支払いを明確にしつつ、
                        返金が必要なケースでも迅速に対応できる体制を整えるためです。
                        <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-slate-200 bg-white"></span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-12 relative z-10">
              <ArrowDown className="w-8 h-8 text-slate-300" />
            </div>

            {/* STEP 2: ACTION */}
            <div className="relative z-10 max-w-2xl mx-auto mb-12">
              <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl p-8 shadow-lg relative overflow-hidden">

                <div className="text-center mb-8">
                  <div className="inline-block bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider mb-4">
                    STEP 2: 施策スタート
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">
                    半年間、記事制作を代行します
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 relative">
                  {/* Vertical Divider (Desktop Only) */}
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-slate-200 -translate-x-1/2"></div>

                  {/* Left: Client */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Client</div>
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <Coffee className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      すべてのステップで、柔軟な対応が可能です。例えば、キーワードは貴社で選んで頂いても問題ありません。<br />
                      また、貴社のフォーマットに従って納品することもできます。
                    </p>
                  </div>

                  {/* Right: Company */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Flow</div>
                    <div className="mb-4">
                      <p className="font-bold text-sm text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                        4,000字 / 月4本 × 6ヶ月
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 items-center text-sm font-bold text-slate-600 w-full">
                      <div className="w-full bg-slate-50 py-2 rounded border border-slate-100">キーワード選定</div>
                      <ArrowDown className="w-4 h-4 text-slate-300" />
                      <div className="w-full bg-slate-50 py-2 rounded border border-slate-100">構成案作成</div>
                      <ArrowDown className="w-4 h-4 text-slate-300" />
                      <div className="w-full bg-slate-50 py-2 rounded border border-slate-100">本文作成</div>
                      <ArrowDown className="w-4 h-4 text-slate-300" />
                      <div className="w-full bg-emerald-50 text-emerald-700 py-2 rounded border border-emerald-100">納品</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-12 relative z-10">
              <ArrowDown className="w-8 h-8 text-slate-300" />
            </div>

            {/* STEP 3: BRANCHING RESULTS */}
            {/* STEP 3: BRANCHING RESULTS */}
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider mb-4">
                  STEP 3: 精算
                </div>
                <h3 className="font-bold text-xl text-slate-900">
                  成果の有無で、対応が分かれます
                </h3>
              </div>

              {/* Branching Visual - Hidden for now as it doesn't match 3 columns */}
              <div className="hidden relative h-24 w-full max-w-2xl mx-auto mb-4">
                {/* Placeholder for future 3-branch SVG if needed */}
              </div>

              {/* Mobile Arrow for Branching (Fallback) */}
              <div className="flex justify-center my-6 md:hidden">
                <ArrowDown className="w-8 h-8 text-slate-300" />
              </div>

              <div className="grid md:grid-cols-3 gap-4 relative z-20">

                {/* Pattern A: All Success (NEW) */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 relative overflow-hidden shadow-xl ring-4 ring-emerald-100">
                  <div className="absolute top-0 right-0 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-bl-lg border-l border-b border-white/20">
                    パターン A
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-white">全記事上位表示された！</h4>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 space-y-3 border border-white/20 backdrop-blur-sm">
                    <div className="flex justify-between text-sm text-emerald-50">
                      <span>預かり金</span>
                      <span className="font-medium text-white">100万円</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-white font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        成果報酬
                      </span>
                      <span className="font-bold text-white">- 100万円</span>
                    </div>
                    <div className="h-px bg-white/20"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">返金額</span>
                      <span className="font-bold text-xl text-yellow-300">0円</span>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-100 mt-3 text-center opacity-80">
                    ※全記事（24本）が10位以内に入った場合
                  </p>
                </div>

                {/* Pattern B: Partial Success (Old A) */}
                <div className="bg-white border-2 border-emerald-100 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-bl-lg">
                    パターン B
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-800">10記事上位表示された！</h4>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">預かり金</span>
                      <span className="font-medium text-slate-900">100万円</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        成果報酬
                      </span>
                      <span className="font-bold text-emerald-700">- 42万円</span>
                    </div>
                    <div className="h-px bg-emerald-200"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700">返金額</span>
                      <span className="font-bold text-xl text-slate-900">58万円</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 text-center">
                    ※記事が10位以内に入った場合、1記事につき4万2,000円を預かり金からマイナス
                  </p>
                </div>

                {/* Pattern C: Fail (Old B) */}
                <div className="bg-slate-800 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg border-2 border-yellow-400/50">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                    パターン C
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                      <XCircle className="w-6 h-6 text-slate-400" />
                    </div>
                    <h4 className="font-bold text-lg text-white">順位が上がらなかった...</h4>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 space-y-3 border border-white/10">
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>預かり金</span>
                      <span>100万円</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-yellow-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                        成果報酬
                      </span>
                      <span className="font-bold text-yellow-400">0円</span>
                    </div>
                    <div className="h-px bg-white/20"></div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">返金額</span>
                      <span className="font-bold text-2xl text-yellow-400">100万円</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 mt-3 text-center flex items-center justify-center gap-1">
                    <Undo2 className="w-3 h-3" />
                    そのまま全額お返しします
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion Badge */}

        </div>
      </section>


      {/* Trust/Security Section - Professional Design */}



      {/* Why it works - Classic Premium (Back to Basics) */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              0円SEOが成立する理由
            </h2>
            <p className="text-slate-500 text-lg leading-loose">
              <span className="font-bold text-slate-900">AIの登場によって</span>、<br className="md:hidden" />
              SEOの実務的な部分はコストがほとんどかからなくなっています。
            </p>
          </div>

          {/* 2-Column Comparison Flow */}
          <div className="max-w-4xl mx-auto space-y-12 mb-24 px-4">

            {/* Before */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Text */}
                <div className="text-center md:text-left md:border-r md:border-slate-300 md:pr-8">
                  <p className="text-lg text-slate-700 font-bold leading-relaxed">
                    AIが登場する前は、<br />
                    すべてライターが<span className="border-b-4 border-slate-200">手作業</span>で制作していました。
                  </p>
                </div>

                {/* Right: Data */}
                <div className="space-y-6">
                  <p className="text-xs text-slate-500 font-bold tracking-widest text-center md:text-left">
                    かつて、1記事を作るのにかかっていたコスト
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                      <span className="text-sm font-bold text-slate-600">制作から納品まで</span>
                      <span className="text-2xl font-bold text-slate-800">1ヶ月</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                      <span className="text-sm font-bold text-slate-600">1記事（10,000字）のコスト</span>
                      <span className="text-2xl font-bold text-slate-800">50,000円</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowDown className="w-10 h-10 text-slate-300" />
            </div>

            {/* After */}
            <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                NOW
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Text */}
                <div className="text-center md:text-left md:border-r md:border-slate-100 md:pr-8">
                  <p className="text-xl text-slate-900 font-bold leading-relaxed">
                    AIの登場によって、<br />
                    SEO対策のコストが1/10,000になりました。
                  </p>
                </div>

                {/* Right: Data */}
                <div className="space-y-6">
                  <p className="text-xs text-blue-600 font-bold tracking-widest text-center md:text-left">
                    いま、AIなら
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-blue-50 pb-2">
                      <span className="text-sm font-bold text-slate-600">制作から納品まで</span>
                      <span className="text-3xl font-bold text-blue-600">30秒</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-blue-50 pb-2">
                      <span className="text-sm font-bold text-slate-600">1記事（10,000字）のコスト</span>
                      <span className="text-3xl font-bold text-blue-600">5円</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quality Assurance / Hybrid System (Vertical Narrative Layout) */}
          <div className="mt-32 max-w-4xl mx-auto">

            <div className="text-center mb-20">
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 flex flex-col items-center gap-4">
                <span>だからといって、</span>
                <span className="bg-yellow-100 px-2">AI任せにはしません。</span>
              </h3>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                「速い・安い」だけでは、SEOで勝つことはできません。<br />
                私たちは、<span className="font-bold text-slate-900 border-b-2 border-slate-900">自社開発AI</span>と<span className="font-bold text-slate-900 border-b-2 border-slate-900">トップライター</span>の<br className="md:hidden" />2段階工程で品質を担保しています。
              </p>
            </div>

            <div className="space-y-12">

              {/* Step 1: Copernicus */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2">Step 1: AI Generation</div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    AIによる構成案、たたき台の作成<br />
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    当社では、独自のAI執筆ツール"Copernicus"を開発。一般的なAIライターツールと違い、Gemini 3.0やChatGPT 5.2など、複数のAIツールから最適な文章を選択します。さらに、さまざまな業界の事前知識をインプットしており、専門的な内容の文章も執筆可能です。
                  </p>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <div className="rounded-xl shadow-xl overflow-hidden border border-slate-200">
                      <img
                        src={`${baseUrl}copernicus_terminal.png`}
                      alt="Copernicus Engine v3.2"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Connector Arrow */}
              <div className="flex justify-center md:justify-start md:pl-8">
                <ArrowDown className="w-8 h-8 text-slate-300" />
              </div>

              {/* Step 2: Human Supervision */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="text-rose-600 font-bold tracking-widest text-xs uppercase mb-2">Step 2: Human Check</div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    プロのWebライターによる監修<br />
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    AIが生成した記事を、<a href="https://a-i-l-a.jp/" className="font-bold text-slate-900 underline underline-offset-4">AIライター協会</a>の理事長を務める水間雄紀が編集します。
                    AI特有の「嘘」や「違和感」を排除し、Googleが好む権威性と、ユーザーを動かすセールスライティングを付加して完成させます。
                  </p>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 relative text-left">
                    <div className="pt-2">
                      <div className="w-full aspect-[4/3] rounded-lg bg-slate-200 overflow-hidden mb-6 relative">
                        <img
                          src={`${baseUrl}representative.jpg`}
                          alt="水間 雄紀"
                          className="w-full h-full object-cover object-[center_35%]"
                        />
                      </div>

                      <h5 className="text-2xl font-bold text-slate-900 mb-1">水間 雄紀</h5>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-4">
                        <a href="https://a-i-l-a.jp/" className="underline underline-offset-2">AIライター協会</a> 理事長 / 編集
                      </p>

                      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg">
                        近畿大学文芸学部卒。メディアファクトリー、宝島社が主催する文学賞で最終選考まで進む。その後、2018年にコンテンツ制作事業を開始し、上場企業や大手企業中心に1万本以上の記事を制作する。現在はコンテンツ制作会社の品質管理責任者を兼任し、株式会社AIMAで代表取締役を務める
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Introduction Flow (Simple Vertical) */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-3xl">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              導入フロー
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              お申し込みから<span className="text-slate-900 font-bold border-b-2 border-yellow-300">最短3営業日</span>で開始可能です。
            </p>
          </div>

          <div className="space-y-12">

            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-slate-200 shrink-0 leading-none mt-1">01</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">申し込み</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  <a href="#application-form" className="underline underline-offset-4">下記お問い合わせフォーム</a>からご相談ください。<br />
                  Webミーティングによる面談や打ち合わせも可能です。
                </p>
              </div>
            </div>



            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-slate-200 shrink-0 leading-none mt-1">02</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">契約・入金</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  クラウドサインにて契約し、指定の口座にご入金いただきます。
                </p>
              </div>
            </div>



            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-slate-200 shrink-0 leading-none mt-1">03</div>
              <div className="w-full">
                <h3 className="text-xl font-bold text-slate-900 mb-2">施策の実行</h3>
                <div className="bg-slate-50 border-2 border-slate-900 rounded-xl p-6 mt-3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-slate-900">期間：6ヶ月間</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600">以下のサイクルを回します</p>
                    <ul className="space-y-2 text-sm font-bold text-slate-800">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        キーワード選定
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        構成案作成
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        本文作成
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                        納品
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>



            {/* Step 4 */}
            <div className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-slate-200 shrink-0 leading-none mt-1">04</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">預り金の精算</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  成果状況に基づいて精算を行い、業務終了となります。更新も可能です。
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Case Studies (Added as requested) */}
      <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              導入事例
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Case 1 */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={`${baseUrl}case1.jpg`}
                  alt="Case Study 1"
                  className="w-full h-full object-cover object-[center_40%] transform transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-slate-900/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                  AGA管理アプリ運営会社様
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                  1年の取り組みでオウンドメディアが<span className="text-blue-600">月間100PVから12万PVに</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  徹底したキーワード選定と高品質な記事制作を1年間継続。その結果、ドメインの評価が底上げされ、月間12万PVを超える主力メディアへと成長しました。
                </p>
              </div>
            </div>

            {/* Case 2 */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
              <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={`${baseUrl}case2.png`}
                  alt="Case Study 2"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 bg-slate-900/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                  岐阜県の製造会社様
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                  上位表示はできなかったものの全額返金され<span className="text-green-600">リスクゼロ</span>
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  難易度の高いキーワードに挑戦したものの、規定の順位には達しませんでした。しかし、契約に基づき費用は全額返金。金銭的リスクを負わずにSEOの可能性を検証できました。
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-4xl">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">よくある質問</h2>
            <p className="text-slate-500">
              サービスに関する重要事項をまとめました。
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "「結局は返金されないのでは？」という不安があるのですが",
                a: (
                  <>
                    <p className="mb-4">
                      ご不安はもっともです。返金条件は事前に契約書で明文化し、達成状況は双方で確認できる
                      指標で判定します。未達の場合は、定めたルールに基づいて返金が実行されます。
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-bold text-slate-800">
                      条件と判定方法を先に透明化しているため、「うやむやな判断」になりません。
                    </div>
                  </>
                ),
              },
              {
                q: "簡単に上位表示できる、誰も検索しないようなキーワードばかり選ばれることはありませんか？",
                a: (
                  <>
                    <p className="mb-4">
                      ご安心ください。キーワード選定はお客様と合意の上で決定します。
                      検索ボリュームがあり、ビジネスに繋がるキーワード（CVに近いワード）をご提案し、ご納得いただいてから施策を開始します。
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-bold text-slate-800">
                      意味のないワードで順位を上げても、私たちの実績としても意味がないためです。
                    </div>
                  </>
                ),
              },
              {
                q: "万が一、成果が出なかった場合（失敗時）はどうなりますか？",
                a: (
                  <>
                    <p className="mb-4">
                      お預かりしたデポジットは<span className="font-bold text-slate-900 text-lg mx-1">全額返金</span>されます。<br />
                      さらに、制作済みの記事資産（最大30本）の著作権は御社に譲渡し、返還や削除は求めません。
                    </p>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm font-bold text-blue-900">
                      つまり、「お金を払ったのに何も残らない」という事態は100%起きません。
                    </div>
                  </>
                ),
              },
              {
                q: "どのような企業が対象ですか？",
                a: (
                  <>
                    <p className="mb-4">
                      「広告費はかけているがSEOは後回し」「成果不明な施策に固定費を払いたくない」「意思決定が早い」という企業様に最適化されています。
                    </p>
                    <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-xl">
                      <span className="font-bold text-slate-700 block mb-1">※以下のような場合はお断りしています</span>
                      個人サイト・趣味ブログ・検証目的・コンテンツ運用体制がない・決裁に半年以上かかる場合。
                    </p>
                  </>
                ),
              },
              {
                q: "「成果」の定義は何ですか？",
                a: (
                  <div className="space-y-2">
                    <p className="mb-4 font-medium text-slate-700">
                      契約期間中に、Google検索で10位以内に表示されますと、<br />
                      成果報酬として預り金から<span className="font-bold text-slate-900 border-b-2 border-yellow-200">1記事あたり4万2,000円</span>を差し引かせていただきます。
                    </p>
                  </div>
                ),
              },
              {
                q: "預り金は100万円のみですか？",
                a: (
                  <>
                    <p className="mb-4">
                      幅広く対応しておりますが、預り金によって制作できる記事の本数は決まっております（1本あたり約4.2万円で換算）。
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span>預り金 50万円</span>
                        <span>半年で12本制作</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span>預り金 100万円</span>
                        <span>半年で24本制作</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>預り金 200万円</span>
                        <span>半年で48本制作</span>
                      </div>
                    </div>
                  </>
                ),
              },
              {
                q: "6ヶ月経つまでに解約（途中解約）はできますか？",
                a: (
                  <>
                    <p className="mb-4">
                      原則として、6ヶ月未満での解約はお断りしております。
                      私たちが記事制作コストを全額先行投資（リスク負担）しているためです。
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-bold text-slate-800">
                      やむを得ない事情で解約される場合は、返金保証の対象外となり、それまでに制作した記事の実費のみご精算いただきます。
                    </div>
                  </>
                ),
              },
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${isOpen ? "border-slate-300 shadow-md" : "border-slate-200 shadow-sm hover:border-slate-300"
                    }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-6 md:p-8 flex items-start gap-4 focus:outline-none"
                  >
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${isOpen ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"}`}>
                      Q
                    </span>
                    <div className="flex-1 pt-1">
                      <h3 className={`text-lg font-bold transition-colors ${isOpen ? "text-slate-900" : "text-slate-800"}`}>
                        {faq.q}
                      </h3>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-slate-100 rotate-180" : "bg-white"}`}>
                      <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? "text-slate-900" : "text-slate-400"}`} />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="px-6 md:px-8 pb-8 pl-18 md:pl-20">
                      <div className="text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section >



      {/* Contact & Application Area */}
      < section id="application-form" className="py-24 bg-slate-900 text-white scroll-mt-20" >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">お問い合わせ/お申し込みはこちら</h2>
            <p className="text-slate-400">
              ご興味をお持ちいただけましたら、<br className="md:hidden" />
              まずはお気軽にご連絡ください。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Contact (TimeRex) */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-900/50">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold">お問い合わせ</h3>
                  <p className="text-slate-400 text-sm mt-1">オンラインで日程調整が可能です</p>
                </div>
              </div>

              {/* TimeRex Embed */}
              <div className="h-[500px] w-full">
                <div
                  id="timerex_calendar"
                  data-url="https://timerex.net/s/said99mcx_4110/05900a9a"
                  className="w-full h-full rounded-2xl border border-slate-200 bg-white"
                />
              </div>
            </div>

            {/* Right: Application Form */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xl font-bold shadow-lg shadow-yellow-900/50">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold">お申し込み</h3>
                  <p className="text-slate-400 text-sm mt-1">以下のフォームへご入力ください</p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("送信機能はまだ接続されていません。");
                }}
                className="bg-white text-slate-900 p-8 rounded-2xl shadow-xl space-y-6"
              >
                <Field label="会社名" placeholder="例：株式会社AIMA" />
                <Field label="担当者名" placeholder="例：山田 太郎" />
                <Field label="サイトURL" placeholder="https://example.com" />
                <Field label="メールアドレス" type="email" placeholder="info@example.com" />
                <SelectField
                  label="預り金希望額（税別）"
                  defaultValue="100"
                  options={[
                    { value: "50", label: "50万円（半年で12本）" },
                    { value: "100", label: "100万円（半年で24本）" },
                    { value: "200", label: "200万円（半年で48本）" },
                  ]}
                />

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                  >
                    送信する
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4 leading-relaxed bg-gray-50 py-2 rounded-lg">
                    ※ メールを送信しても契約ではありませんので<br />ご安心ください。
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div >
      </section >

      {/* Footer */}
      < footer className="bg-slate-950 text-slate-500 py-12 text-center text-sm border-t border-slate-900" >
        <div className="container mx-auto px-4">
          <div className="font-bold text-slate-400 text-lg mb-4">{brand.footer}</div>
          <div className="flex justify-center gap-6 mb-8 text-xs">
            <a href="/tokutei" className="hover:text-slate-300 transition-colors">特定商取引法に基づく表記</a>
            <a href="/privacy" className="hover:text-slate-300 transition-colors">プライバシーポリシー</a>
            <a href="https://ai-and-marketing.jp/" className="hover:text-slate-300 transition-colors">運営会社</a>
          </div>
          <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </footer >

      {/* Floating CTA (mobile only) */}
      < div className="md:hidden fixed bottom-6 left-0 right-0 px-4 z-50" >
        <button
          onClick={scrollToForm}
          className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-2xl flex items-center justify-center gap-3 border border-red-700 ring-2 ring-white/10"
        >
          {brand.primaryCta}
          <ArrowRight className="w-5 h-5 text-yellow-500" />
        </button>
      </div >

      {/* Chat Floating Button */}
      {chatEnabled && !isChatOpen && (
        <a
          href="#"
          className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 animate-fade-in group"
          onClick={(e) => {
            e.preventDefault();
            setIsChatOpen(true);
          }}
        >
          <div className="bg-white text-blue-600 border border-blue-100 shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-full px-6 py-4 flex items-center gap-3 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] transition-all">
            <div className="bg-blue-100 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="font-bold text-base tracking-wide">今すぐチャットで相談してみる</span>
          </div>
        </a>
      )}

      {/* Chat Widget */}
      {chatEnabled && <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
    </div >
  );
}

interface FieldProps {
  label: React.ReactNode;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function Field({ label, type = "text", placeholder, required = false }: FieldProps) {
  return (
    <div>
      <label className="block font-bold mb-2 text-sm text-slate-700">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors placeholder-gray-400"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: React.ReactNode;
  options: { value: string; label: string }[];
  defaultValue?: string;
  required?: boolean;
}

function SelectField({ label, options, defaultValue, required = false }: SelectFieldProps) {
  return (
    <div>
      <label className="block font-bold mb-2 text-sm text-slate-700">{label}</label>
      <div className="relative">
        <select
          required={required}
          defaultValue={defaultValue}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 pr-10 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors appearance-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-600">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
