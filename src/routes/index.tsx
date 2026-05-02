import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Map, BookOpen, Search, Sparkles, ArrowRight } from "lucide-react";
import { STATE_LIST } from "@/data/states";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bharat Virasat — Discover the Soul of India" },
      { name: "description", content: "28 states. Thousands of traditions. One living archive of Indian culture." },
    ],
  }),
  component: Index,
});

function useCountUp(target: number, trigger: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger, duration]);
  return val;
}

function Particles() {
  const dots = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((_, i) => {
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 8;
        const dur = 8 + Math.random() * 10;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: "radial-gradient(circle, oklch(0.95 0.12 75 / 0.9) 0%, transparent 70%)",
              animation: `drift ${dur}s ease-in-out ${delay}s infinite, float ${dur * 0.7}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const stats = [
    { n: 28, label: "States" },
    { n: 6, label: "Union Territories" },
    { n: 100, label: "Festivals", suffix: "+" },
    { n: 200, label: "Art Forms", suffix: "+" },
  ];
  return (
    <div ref={ref} className="mx-auto max-w-5xl px-6 -mt-14 relative z-10">
      <div className="glass-strong rounded-full px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Stat key={s.label} {...s} vis={vis} />
        ))}
      </div>
    </div>
  );
}

function Stat({ n, label, suffix, vis }: { n: number; label: string; suffix?: string; vis: boolean }) {
  const v = useCountUp(n, vis);
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-saffron-deep">
        {v}{suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="glass-strong rounded-3xl p-3 transition-transform duration-300 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden">
        {STATE_LIST.slice(0, 6).map((s, i) => (
          <div
            key={s.id}
            className="aspect-square rounded-xl flex items-end p-2"
            style={{ background: s.thumbGradient, animation: `float ${4 + i * 0.4}s ease-in-out ${i * 0.2}s infinite` }}
          >
            <span className="text-[10px] font-semibold text-foreground/70 bg-white/60 backdrop-blur rounded-full px-2 py-0.5">
              {s.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const features = [
    { icon: Map, title: "Interactive Map", desc: "Click any state to dive into its festivals, food and art forms.", color: "var(--saffron)" },
    { icon: BookOpen, title: "Curated Culture", desc: "Hand-researched entries on traditions both famous and forgotten.", color: "var(--peacock)" },
    { icon: Search, title: "Smart Search", desc: "Find what calls to you across thousands of cultural artifacts.", color: "var(--lotus)" },
  ];

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layered parallax background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, oklch(0.97 0.04 70) 0%, oklch(0.93 0.08 50) 50%, oklch(0.88 0.1 30) 100%)",
          }}
        />
        {/* Silhouette layer 1 — distant hills */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-1/2 opacity-40" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M0,400 L0,250 Q150,180 300,220 T600,200 T900,230 T1200,210 L1200,400 Z" fill="oklch(0.78 0.08 30 / 0.4)" />
        </svg>
        {/* Silhouette layer 2 — temples */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-1/2 opacity-60" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M0,400 L0,320 L80,320 L100,260 L130,320 L200,320 L220,200 L240,260 L260,200 L280,320 L380,320 L400,280 L420,220 L440,180 L460,220 L480,280 L500,320 L700,320 L720,240 L740,180 L760,140 L780,180 L800,240 L820,320 L1000,320 L1020,270 L1050,320 L1200,320 L1200,400 Z" fill="oklch(0.55 0.1 25 / 0.55)" />
        </svg>
        {/* Silhouette layer 3 — foreground */}
        <svg className="absolute bottom-0 inset-x-0 w-full h-1/3 opacity-80" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,200 L0,150 Q200,120 400,140 T800,130 T1200,140 L1200,200 Z" fill="oklch(0.35 0.08 25 / 0.7)" />
        </svg>
        {/* Sun */}
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.9 0.15 70) 0%, transparent 70%)" }}
        />
        <Particles />

        <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-xs font-medium tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-saffron-deep" />
            A living digital archive of Indian heritage
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6">
            <span className="text-shimmer">Discover the Soul</span>
            <br />
            <span className="text-foreground">of India</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            28 states. Thousands of traditions. One living archive — woven from
            the festivals, flavors and folk arts that make India, India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/map"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white saffron-gradient shadow-[var(--shadow-glow-saffron)] hover:scale-105 transition-transform"
            >
              Explore the Map
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold glass hover:bg-white/80 transition-colors"
            >
              Browse by State
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-foreground/40" />
          </div>
        </div>
      </section>

      <StatsBar />

      {/* MISSION */}
      <section className="mx-auto max-w-7xl px-6 py-24 mandala-bg">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <div className="text-xs uppercase tracking-[0.22em] text-saffron-deep font-semibold mb-4">
              What is Bharat Virasat?
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
              An archive that <span className="text-shimmer">breathes</span> with India's culture.
            </h2>
            <p className="text-foreground/75 text-lg leading-relaxed mb-4">
              India is not one story — it is thirty thousand. Bharat Virasat is a digital
              museum without walls, where every state contributes its own chapter of
              festivals, recipes, dances and dialects.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Whether you're a curious traveler, a homesick diaspora, or simply someone
              who wants to understand a country of a billion stories — start here.
            </p>
          </div>
          <TiltCard />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group glass rounded-2xl p-7 lift-on-hover relative overflow-hidden"
              style={{ animation: `fade-up 0.6s ease-out ${i * 0.1}s both` }}
            >
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ background: f.color }}
              />
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${f.color}`, boxShadow: `0 8px 24px -8px ${f.color}` }}
              >
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 relative">{f.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed relative">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED STATES STRIP */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-saffron-deep font-semibold mb-2">
              Featured Journeys
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Begin where the stories sing loudest</h2>
          </div>
          <Link to="/map" className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-saffron-deep hover:gap-3 transition-all">
            View all states <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {STATE_LIST.map((s, i) => (
            <Link
              key={s.id}
              to="/state/$id"
              params={{ id: s.id }}
              className="group rounded-2xl overflow-hidden lift-on-hover relative h-64"
              style={{ animation: `scale-in 0.5s ease-out ${i * 0.08}s both` }}
            >
              <div className="absolute inset-0" style={{ background: s.bannerGradient }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-80 mb-1">{s.region}</div>
                <div className="font-display text-2xl font-bold">{s.name}</div>
                <div className="text-xs opacity-90 mt-1 line-clamp-2">{s.tagline}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
