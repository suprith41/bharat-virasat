import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { STATE_LIST, type CulturalItem } from "@/data/states";
import usePexelsImage from "@/hooks/usePexelsImage";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Bharat Virasat" },
      {
        name: "description",
        content: "Search across festivals, food, art and heritage of every Indian state.",
      },
    ],
  }),
  component: SearchPage,
});

const PLACEHOLDERS = [
  "Search Bihu festival…",
  "Search Madhubani art…",
  "Search Kerala cuisine…",
  "Search Bharatanatyam…",
  "Search Phulkari embroidery…",
];

const FILTERS = [
  { id: "festivals", label: "Festivals" },
  { id: "food", label: "Food" },
  { id: "art", label: "Art" },
  { id: "traditions", label: "Traditions" },
  { id: "heritage", label: "Heritage" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

const TRENDING = [
  "Durga Puja",
  "Onam Sadya",
  "Bhangra",
  "Kathakali",
  "Pushkar Fair",
  "Roshogolla",
  "Tanjore",
  "Ghoomar",
];

interface ResultItem extends CulturalItem {
  state: string;
  stateId: string;
  category: FilterId;
}

function getPexelsQuery(item: ResultItem) {
  const suffix =
    item.category === "festivals"
      ? "festival india"
      : item.category === "food"
        ? "food india"
        : item.category === "art"
          ? "art india"
          : item.category === "traditions"
            ? "tradition india"
            : "heritage india";

  return `${item.title} ${suffix}`;
}

function SearchResultCard({ item, index }: { item: ResultItem; index: number }) {
  const { imageUrl, loading } = usePexelsImage(getPexelsQuery(item));

  return (
    <Link
      to="/state/$id"
      params={{ id: item.stateId }}
      className="block glass rounded-2xl overflow-hidden lift-on-hover animate-fade-up"
    >
      <div className="w-full relative overflow-hidden" style={{ height: 100 + ((index * 37) % 80) }}>
        {loading ? (
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
            onLoad={() => console.log(`✓ Search image loaded for: ${item.title}`)}
            onError={() => console.warn(`✗ Search image failed for: ${item.title}`)}
            crossOrigin="anonymous"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: item.image }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/40" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-wider text-saffron-deep font-bold">
            {item.category}
          </span>
          <span className="text-[10px] text-muted-foreground">{item.state}</span>
        </div>
        <h3 className="font-display font-semibold text-base mb-1">{item.title}</h3>
        <p className="text-xs text-foreground/70 line-clamp-3">{item.description}</p>
      </div>
    </Link>
  );
}

function SearchPage() {
  const [q, setQ] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<FilterId>>(new Set());
  const [phIdx, setPhIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length), 3000);
    return () => clearInterval(t);
  }, []);

  const allItems: ResultItem[] = useMemo(() => {
    const out: ResultItem[] = [];
    for (const s of STATE_LIST) {
      const cats: [FilterId, CulturalItem[]][] = [
        ["festivals", s.festivals],
        ["food", s.food],
        ["art", s.art],
        ["traditions", s.traditions],
        ["heritage", s.heritage],
      ];
      for (const [cat, list] of cats) {
        for (const item of list) {
          out.push({ ...item, state: s.name, stateId: s.id, category: cat });
        }
      }
    }
    return out;
  }, []);

  const results = useMemo(() => {
    let r = allItems;
    if (activeFilters.size > 0) r = r.filter((i) => activeFilters.has(i.category));
    if (q.trim()) {
      const qq = q.toLowerCase();
      r = r.filter(
        (i) =>
          i.title.toLowerCase().includes(qq) ||
          i.description.toLowerCase().includes(qq) ||
          i.state.toLowerCase().includes(qq) ||
          (i.tags || []).some((t) => t.toLowerCase().includes(qq)),
      );
    }
    return r;
  }, [allItems, q, activeFilters]);

  const toggle = (id: FilterId) => {
    setActiveFilters((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 mandala-bg">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-10 animate-fade-up">
          <div className="text-xs uppercase tracking-[0.22em] text-saffron-deep font-semibold mb-2">
            Discover
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Search the <span className="text-shimmer">cultural archive</span>
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-strong rounded-full flex items-center px-6 py-4 gap-3 shadow-[var(--shadow-glow-saffron)]">
            <Search className="h-5 w-5 text-saffron-deep" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={PLACEHOLDERS[phIdx]}
              className="flex-1 bg-transparent focus:outline-none text-base placeholder:text-muted-foreground transition-all"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {FILTERS.map((f) => {
            const on = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                onClick={() => toggle(f.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  on
                    ? "saffron-gradient text-white shadow-[var(--shadow-glow-saffron)]"
                    : "glass hover:bg-white/80"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {!q && activeFilters.size === 0 && (
          <div className="mt-10">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 text-center">
              Trending searches
            </div>
            <div className="flex gap-2 overflow-x-auto py-2 px-1 justify-start md:justify-center">
              {TRENDING.map((t) => (
                <button
                  key={t}
                  onClick={() => setQ(t)}
                  className="shrink-0 px-4 py-2 rounded-full text-sm glass hover:bg-saffron/15 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          {results.length === 0 ? (
            <div className="text-center py-16 animate-fade-up">
              <div className="mx-auto w-32 h-32 rounded-full saffron-gradient opacity-20 blur-2xl mb-[-80px]" />
              <div className="relative">
                <svg viewBox="0 0 120 120" className="mx-auto w-32 h-32">
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="var(--saffron-deep)"
                    strokeWidth="3"
                  />
                  <line
                    x1="72"
                    y1="72"
                    x2="95"
                    y2="95"
                    stroke="var(--saffron-deep)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <text x="60" y="55" textAnchor="middle" fontSize="20">
                    🪔
                  </text>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold mt-4">Nothing found</h3>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                Even India's vastness has limits — try another search.
              </p>
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-4">{results.length} results</div>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5 [&>*]:break-inside-avoid">
                {results.map((r, i) => (
                  <SearchResultCard key={i} item={r} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
