import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronRight, MapPin, Languages, Star, Landmark, Sparkles } from "lucide-react";
import { STATES, type CulturalItem } from "@/data/states";

export const Route = createFileRoute("/state/$id")({
  loader: ({ params }) => {
    const state = STATES[params.id];
    if (!state) throw notFound();
    return { state };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.state.name} — Bharat Virasat` },
          { name: "description", content: `${loaderData.state.tagline}. Festivals, food, art and heritage of ${loaderData.state.name}.` },
          { property: "og:title", content: `${loaderData.state.name} — Bharat Virasat` },
          { property: "og:description", content: loaderData.state.tagline },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="pt-32 text-center">
      <h1 className="font-display text-3xl">State not yet curated</h1>
      <Link to="/map" className="text-saffron-deep mt-4 inline-block">Back to map →</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="pt-32 text-center">
      <p>{error.message}</p>
    </div>
  ),
  component: StatePage,
});

const TABS = [
  { id: "festivals", label: "🎉 Festivals" },
  { id: "food", label: "🍛 Food" },
  { id: "art", label: "🎨 Art & Craft" },
  { id: "traditions", label: "👗 Traditions" },
  { id: "heritage", label: "🏛️ Heritage" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function StatePage() {
  const { state } = Route.useLoaderData();
  const [tab, setTab] = useState<TabId>("festivals");
  const [trivia, setTrivia] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTrivia((i) => (i + 1) % state.trivia.length), 5000);
    return () => clearInterval(t);
  }, [state.trivia.length]);

  const items: Record<TabId, CulturalItem[]> = {
    festivals: state.festivals,
    food: state.food,
    art: state.art,
    traditions: state.traditions,
    heritage: state.heritage,
  };

  return (
    <div className="min-h-screen">
      {/* HERO BANNER */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <div className="absolute inset-0" style={{ background: state.bannerGradient }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 paisley-pattern opacity-30" />

        <div className="relative h-full mx-auto max-w-7xl px-6 flex flex-col justify-end pb-12 pt-28">
          <nav className="flex items-center gap-1.5 text-xs text-white/90 mb-4 drop-shadow-md">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/map" className="hover:underline">Map</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold">{state.name}</span>
          </nav>
          <div className="text-xs uppercase tracking-[0.25em] text-white/90 font-semibold mb-3 drop-shadow">
            {state.region} India
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            {state.name}
          </h1>
          <p className="font-display italic text-xl md:text-2xl text-white/95 mt-3 drop-shadow">
            {state.tagline}
          </p>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="mx-auto max-w-7xl px-6 -mt-10 relative z-10">
        <div className="glass-strong rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: MapPin, label: "Capital", value: state.capital },
            { icon: Languages, label: "Language", value: state.language },
            { icon: Star, label: "Famous For", value: state.famousFor },
            { icon: Landmark, label: "UNESCO Sites", value: state.unescoSites.toString() },
          ].map((s) => (
            <div key={s.label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg saffron-gradient flex items-center justify-center shrink-0">
                <s.icon className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="text-sm font-semibold truncate">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TABS */}
      <section className="mx-auto max-w-7xl px-6 mt-16">
        <div className="sticky top-20 z-20 -mx-6 px-6 py-3 backdrop-blur-md bg-background/80 border-y border-border/40">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  tab === t.id ? "text-saffron-deep" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {t.label}
                {tab === t.id && (
                  <span className="absolute inset-0 rounded-full bg-saffron/15 -z-10 animate-scale-in" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mt-10">
          <div className="lg:col-span-3">
            <div key={tab} className="grid sm:grid-cols-2 gap-5 animate-fade-up">
              {items[tab].map((item, i) => (
                <CulturalCard key={i} item={item} kind={tab} />
              ))}
            </div>
          </div>

          {/* DID YOU KNOW */}
          <aside className="lg:col-span-1">
            <div className="glass-strong rounded-2xl p-6 sticky top-36 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-30 blur-2xl saffron-gradient" />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-saffron-deep font-semibold mb-4">
                  <Sparkles className="h-3.5 w-3.5" />
                  Did you know?
                </div>
                <div key={trivia} className="animate-fade-in min-h-[80px]">
                  <p className="font-display text-lg leading-snug text-foreground/90">
                    "{state.trivia[trivia]}"
                  </p>
                </div>
                <div className="mt-5 flex gap-1.5">
                  {state.trivia.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all ${i === trivia ? "w-8 bg-saffron-deep" : "w-2 bg-foreground/20"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/map"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-sm font-medium hover:bg-white/80 transition-colors"
          >
            ← Back to map
          </Link>
        </div>
      </section>
    </div>
  );
}

function CulturalCard({ item, kind }: { item: CulturalItem; kind: TabId }) {
  const isFestival = kind === "festivals";
  return (
    <article
      className={`group rounded-2xl overflow-hidden glass lift-on-hover ${isFestival ? "festive-border" : ""}`}
    >
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: item.image }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {item.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur text-saffron-deep">
            {item.badge}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold mb-1.5">{item.title}</h3>
        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">{item.description}</p>
        {item.tags && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-leaf/20 text-foreground/80">
                {t}
              </span>
            ))}
          </div>
        )}
        <button className="mt-4 text-xs font-semibold text-saffron-deep hover:gap-2 inline-flex items-center gap-1 transition-all">
          Learn more <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}
