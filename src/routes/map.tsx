import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { MAP_STATES } from "@/data/indiaMap";
import { STATES, REGIONS, REGION_FILL, type Region } from "@/data/states";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Interactive Map — Bharat Virasat" },
      {
        name: "description",
        content:
          "Explore every Indian state on an interactive cultural map. Hover for festivals, click to dive deeper.",
      },
    ],
  }),
  component: MapPage,
});

const FEATURED_PULSE = new Set(["RJ", "KL", "TN", "WB"]);

function MapPage() {
  const navigate = useNavigate();
  const [region, setRegion] = useState<Region | "all">("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (region === "all") return MAP_STATES;
    return MAP_STATES.filter((s) => s.region === region);
  }, [region]);
  const dimmed = useMemo(() => new Set(filtered.map((s) => s.id)), [filtered]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MAP_STATES.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const hoveredState = hovered ? MAP_STATES.find((s) => s.id === hovered) : null;
  const detailedHover = hoveredState && STATES[hoveredState.id];

  const goToState = (id: string) => {
    if (STATES[id]) navigate({ to: "/state/$id", params: { id } });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 mandala-bg">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header + search */}
        <div className="text-center mb-8 animate-fade-up">
          <div className="text-xs uppercase tracking-[0.22em] text-saffron-deep font-semibold mb-2">
            The Map
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            <span className="text-shimmer">Hover. Click. Discover.</span>
          </h1>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Every state is a doorway. Brush over one to peek inside, click to step through.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-8 relative">
          <div className="glass-strong rounded-full flex items-center px-5 py-3.5 gap-3 shadow-[var(--shadow-glass)]">
            <Search className="h-5 w-5 text-saffron-deep" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a state… try 'Kerala'"
              className="flex-1 bg-transparent focus:outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
          {suggestions.length > 0 && (
            <div className="absolute top-full mt-2 inset-x-0 glass-strong rounded-2xl overflow-hidden z-20 animate-scale-in">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => goToState(s.id)}
                  className="w-full flex items-center justify-between px-5 py-3 text-left text-sm hover:bg-saffron/10 transition-colors"
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{s.region}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left: region filters */}
          <aside className="lg:col-span-2 order-2 lg:order-1">
            <div className="glass-strong rounded-2xl p-4 sticky top-24">
              <div className="text-[10px] uppercase tracking-[0.2em] text-saffron-deep font-semibold mb-3">
                Regions
              </div>
              <div className="flex lg:flex-col gap-2 overflow-x-auto">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                    className={`shrink-0 lg:shrink text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      region === r.id
                        ? "saffron-gradient text-white shadow-[var(--shadow-glow-saffron)]"
                        : "hover:bg-saffron/10 text-foreground/80"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Map */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="glass-strong rounded-3xl p-4 md:p-6 relative overflow-hidden">
              <svg
                viewBox="0 0 700 800"
                className="w-full h-auto"
                onMouseLeave={() => {
                  setHovered(null);
                  setTooltip(null);
                }}
              >
                <defs>
                  <linearGradient id="hover-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.16 70)" />
                    <stop offset="100%" stopColor="oklch(0.65 0.2 35)" />
                  </linearGradient>
                  <filter id="lift" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow
                      dx="0"
                      dy="6"
                      stdDeviation="6"
                      floodColor="oklch(0.4 0.15 40)"
                      floodOpacity="0.45"
                    />
                  </filter>
                </defs>

                {MAP_STATES.map((s) => {
                  const isVisible = dimmed.has(s.id);
                  const isHover = hovered === s.id;
                  const isFeatured = FEATURED_PULSE.has(s.id);
                  return (
                    <g
                      key={s.id}
                      onMouseEnter={(e) => {
                        setHovered(s.id);
                        const svg = e.currentTarget.ownerSVGElement as SVGSVGElement;
                        const rect = svg.getBoundingClientRect();
                        const pt = svg.createSVGPoint();
                        pt.x = s.cx;
                        pt.y = s.cy;
                        const ctm = svg.getScreenCTM();
                        if (ctm) {
                          const screen = pt.matrixTransform(ctm);
                          setTooltip({ x: screen.x - rect.left, y: screen.y - rect.top });
                        }
                      }}
                      onClick={() => goToState(s.id)}
                      className="cursor-pointer"
                      style={{
                        filter: isHover ? "url(#lift)" : undefined,
                        transition: "filter 0.25s",
                      }}
                    >
                      <path
                        d={s.d}
                        fill={
                          isHover
                            ? "url(#hover-grad)"
                            : isVisible
                              ? REGION_FILL[s.region]
                              : "oklch(0.95 0.005 80)"
                        }
                        stroke="white"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        opacity={isVisible ? 1 : 0.35}
                        style={{
                          transition: "fill 0.3s, opacity 0.3s, transform 0.25s",
                          transformOrigin: `${s.cx}px ${s.cy}px`,
                          transform: isHover ? "translateY(-3px) scale(1.02)" : "none",
                          animation:
                            isFeatured && isVisible && !isHover
                              ? "pulse-glow 2.5s ease-in-out infinite"
                              : undefined,
                        }}
                      />
                      <text
                        x={s.cx}
                        y={s.cy}
                        textAnchor="middle"
                        className="pointer-events-none select-none"
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          fill: isHover ? "white" : "oklch(0.3 0.05 40)",
                          transition: "fill 0.25s",
                        }}
                      >
                        {s.id}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip */}
              {hoveredState && tooltip && (
                <div
                  className="absolute pointer-events-none glass-strong rounded-2xl p-4 w-60 animate-scale-in z-10"
                  style={{
                    left: Math.min(tooltip.x + 16, 600),
                    top: Math.max(tooltip.y - 80, 8),
                  }}
                >
                  <div
                    className="h-16 rounded-xl mb-3"
                    style={{
                      background:
                        STATES[hoveredState.id]?.bannerGradient || REGION_FILL[hoveredState.region],
                    }}
                  />
                  <div className="font-display font-bold text-base mb-1">{hoveredState.name}</div>
                  {detailedHover ? (
                    <div className="space-y-1.5 text-xs text-foreground/70">
                      <div>
                        <span className="font-semibold text-saffron-deep">Festival:</span>{" "}
                        {detailedHover.iconicFestival}
                      </div>
                      <div>
                        <span className="font-semibold text-saffron-deep">Dish:</span>{" "}
                        {detailedHover.signatureDish}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Profile coming soon</div>
                  )}
                </div>
              )}

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                {(["north", "south", "east", "west", "northeast", "central"] as Region[]).map(
                  (r) => (
                    <div key={r} className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-3 h-3 rounded-sm"
                        style={{ background: REGION_FILL[r] }}
                      />
                      <span className="capitalize">{r}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Right: currently exploring */}
          <aside className="lg:col-span-3 order-3">
            <div className="glass-strong rounded-2xl p-5 sticky top-24">
              <div className="text-[10px] uppercase tracking-[0.2em] text-saffron-deep font-semibold mb-3">
                Currently Exploring
              </div>
              {hoveredState ? (
                <div className="animate-fade-in">
                  <div
                    className="h-28 rounded-xl mb-4 relative overflow-hidden"
                    style={{
                      background:
                        STATES[hoveredState.id]?.bannerGradient || REGION_FILL[hoveredState.region],
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-2 left-3 text-white">
                      <div className="text-[10px] uppercase tracking-wider opacity-80">
                        {hoveredState.region}
                      </div>
                      <div className="font-display text-lg font-bold">{hoveredState.name}</div>
                    </div>
                  </div>
                  {detailedHover ? (
                    <>
                      <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                        {detailedHover.quickFact}
                      </p>
                      <button
                        onClick={() => goToState(hoveredState.id)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white saffron-gradient hover:scale-[1.02] transition-transform"
                      >
                        Deep Dive <ArrowRight className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      Detailed profile is being curated for this state.
                    </p>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  Hover any state to begin
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-border/60">
                <div className="text-[10px] uppercase tracking-[0.2em] text-saffron-deep font-semibold mb-3">
                  Featured
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Array.from(FEATURED_PULSE).map((id) => {
                    const s = STATES[id];
                    if (!s) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => goToState(id)}
                        className="rounded-xl h-16 relative overflow-hidden lift-on-hover"
                        style={{ background: s.bannerGradient }}
                      >
                        <div className="absolute inset-0 bg-black/30" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          {s.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
