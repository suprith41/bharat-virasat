import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Map, BookOpen, Search, Sparkles, ArrowRight } from "lucide-react";
import { STATE_LIST } from "@/data/states";
import { StateCardImage } from "@/components/StateCardImage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bharat Virasat — Discover the Soul of India" },
      {
        name: "description",
        content: "35 states. Thousands of traditions. One living archive of Indian culture.",
      },
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
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const stats = [
    { n: 28, label: "States" },
    { n: 8, label: "Union Territories" },
    { n: 100, label: "Festivals", suffix: "+" },
    { n: 200, label: "Art Forms", suffix: "+" },
  ];
  return (
    <div ref={ref} className="mx-auto max-w-5xl px-6 relative z-10 pt-8">
      <div className="glass-strong rounded-full px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Stat key={s.label} {...s} vis={vis} />
        ))}
      </div>
    </div>
  );
}

function Stat({
  n,
  label,
  suffix,
  vis,
}: {
  n: number;
  label: string;
  suffix?: string;
  vis: boolean;
}) {
  const v = useCountUp(n, vis);
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-saffron-deep">
        {v}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function Index() {
  const features = [
    {
      icon: Map,
      title: "Interactive Map",
      desc: "Click any state to dive into its festivals, food and art forms.",
      color: "var(--saffron)",
    },
    {
      icon: BookOpen,
      title: "Curated Culture",
      desc: "Hand-researched entries on traditions both famous and forgotten.",
      color: "var(--peacock)",
    },
    {
      icon: Search,
      title: "Smart Search",
      desc: "Find what calls to you across thousands of cultural artifacts.",
      color: "var(--lotus)",
    },
  ];

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative h-screen min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://videos.pexels.com/video-files/6583710/6583710-uhd_3840_2160_25fps.mp4"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.25)" }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-xs font-medium tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-saffron-deep" />A living digital archive of Indian
            heritage
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6">
            <span className="text-shimmer">Discover the Soul</span>
            <br />
            <span className="text-foreground">of India</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            35 states. Thousands of traditions. One living archive — woven from the festivals,
            flavors and folk arts that make India, India.
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
        <div className="animate-fade-up">
          <div className="text-xs uppercase tracking-[0.22em] text-saffron-deep font-semibold mb-4">
            What is Bharat Virasat?
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
            An archive that <span className="text-shimmer">breathes</span> with India's culture.
          </h2>
          <p className="text-foreground/75 text-lg leading-relaxed mb-4">
            India is not one story — it is thirty thousand. Bharat Virasat is a digital museum
            without walls, where every state contributes its own chapter of festivals, recipes,
            dances and dialects.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            Whether you're a curious traveler, a homesick diaspora, or simply someone who wants to
            understand a country of a billion stories — start here.
          </p>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Begin where the stories sing loudest
            </h2>
          </div>
          <Link
            to="/map"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-saffron-deep hover:gap-3 transition-all"
          >
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
              <StateCardImage
                src={s.image}
                alt={s.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-80 mb-1">
                  {s.region}
                </div>
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
