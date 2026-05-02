import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect, type MouseEvent } from "react";
import { Search, ArrowRight } from "lucide-react";
import indiaMap from "@svg-maps/india";
import { ComposableMap, Geography, Geographies } from "react-simple-maps";
import { geoIdentity } from "d3-geo";
import parseSvgPath from "svg-path-parser";
import { MAP_STATES } from "@/data/indiaMap";
import { STATES, REGIONS, REGION_FILL, type Region } from "@/data/states";
import { normalizeStateName } from "@/lib/stateRouting";
import { StateCardImage } from "@/components/StateCardImage";
import { Skeleton } from "@/components/ui/skeleton";

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

type MapEntry = {
  id: string;
  name: string;
  path: string;
  region: Region;
  hasDetail: boolean;
  featured: boolean;
};

type IndiaFeature = {
  type: "Feature";
  properties: {
    id: string;
    name: string;
    region: Region;
    hasDetail: boolean;
    featured: boolean;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][][] | number[][][];
  };
};

const MAP_LOOKUP = new Map(MAP_STATES.map((state) => [normalizeStateName(state.name), state] as const));

function parseSvgPathToRings(path: string) {
  const rings: [number, number][][] = [];
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  let ring: [number, number][] | null = null;

  const closeRing = () => {
    if (ring && ring.length > 2) {
      const [firstX, firstY] = ring[0];
      const [lastX, lastY] = ring[ring.length - 1];
      if (firstX !== lastX || firstY !== lastY) {
        ring.push([firstX, firstY]);
      }
      rings.push(ring);
    }
    ring = null;
  };

  const commands = parseSvgPath(path) as Array<
    | { code: "M"; x: number; y: number }
    | { code: "m"; x: number; y: number }
    | { code: "L"; x: number; y: number }
    | { code: "l"; x: number; y: number }
    | { code: "Z" }
    | { code: "z" }
  >;

  for (const command of commands) {
    switch (command.code) {
      case "M":
        closeRing();
        x = command.x;
        y = command.y;
        startX = x;
        startY = y;
        ring = [[x, y]];
        break;
      case "m":
        closeRing();
        x += command.x;
        y += command.y;
        startX = x;
        startY = y;
        ring = [[x, y]];
        break;
      case "L":
        x = command.x;
        y = command.y;
        ring?.push([x, y]);
        break;
      case "l":
        x += command.x;
        y += command.y;
        ring?.push([x, y]);
        break;
      case "Z":
      case "z":
        if (ring) {
          ring.push([startX, startY]);
        }
        closeRing();
        x = startX;
        y = startY;
        break;
    }
  }

  closeRing();
  return rings;
}

function pathToGeometry(path: string) {
  const rings = parseSvgPathToRings(path);
  if (rings.length <= 1) {
    return {
      type: "Polygon" as const,
      coordinates: [rings[0] ?? []],
    };
  }

  return {
    type: "MultiPolygon" as const,
    coordinates: rings.map((ring) => [ring]),
  };
}

const INDIA_ENTRIES: MapEntry[] = indiaMap.locations.map((location) => {
  const matched = MAP_LOOKUP.get(normalizeStateName(location.name));
  const detailedState = STATES[matched?.id ?? ""];
  if (!matched) {
    return null;
  }
  return {
    id: location.id,
    name: location.name,
    path: location.path,
    region: matched?.region ?? "central",
    hasDetail: Boolean(detailedState),
    featured: Boolean(detailedState?.featured),
  };
}).filter(Boolean) as MapEntry[];

const INDIA_FEATURE_COLLECTION = {
  type: "FeatureCollection" as const,
  features: INDIA_ENTRIES.map((entry) => ({
    type: "Feature" as const,
    properties: {
      id: entry.id,
      name: entry.name,
      region: entry.region,
      hasDetail: entry.hasDetail,
      featured: entry.featured,
    },
    geometry: pathToGeometry(entry.path),
  })) as IndiaFeature[],
};

function MapPage() {
  const navigate = useNavigate();
  const [region, setRegion] = useState<Region | "all">("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null);
  const [query, setQuery] = useState("");
  const [stateImages, setStateImages] = useState<Record<string, string>>({});
  const [loadingImages, setLoadingImages] = useState(true);
  const mapShellRef = useRef<HTMLDivElement>(null);

  // Preload all state images on mount
  useEffect(() => {
    const fetchAllImages = async () => {
      const states = [
        "Rajasthan",
        "Kerala",
        "Tamil Nadu",
        "West Bengal",
        "Punjab",
        "Jammu Kashmir",
        "Odisha",
        "Meghalaya",
        "Assam",
        "Madhya Pradesh",
        "Maharashtra",
        "Telangana",
      ];

      try {
        const results = await Promise.all(
          states.map(async (state) => {
            try {
              const res = await fetch(
                `https://api.pexels.com/v1/search?query=${encodeURIComponent(state + " india")}&per_page=1`,
                {
                  headers: {
                    Authorization: import.meta.env.VITE_PEXELS_API_KEY,
                  },
                }
              );
              const data = await res.json();
              return [state, data.photos[0]?.src?.large || ""];
            } catch (err) {
              console.error(`Failed to fetch image for ${state}:`, err);
              return [state, ""];
            }
          })
        );
        setStateImages(Object.fromEntries(results));
        console.log("✓ All state images preloaded");
      } catch (err) {
        console.error("Failed to preload state images:", err);
      } finally {
        setLoadingImages(false);
      }
    };

    fetchAllImages();
  }, []);

  const filtered = useMemo(() => {
    if (region === "all") return INDIA_ENTRIES;
    return INDIA_ENTRIES.filter((s) => s.region === region);
  }, [region]);
  const dimmed = useMemo(() => new Set(filtered.map((s) => s.id)), [filtered]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return INDIA_ENTRIES.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const hoveredState = hovered ? INDIA_ENTRIES.find((s) => s.id === hovered) : null;
  const detailedHover = hoveredState
    ? STATES[MAP_LOOKUP.get(normalizeStateName(hoveredState.name))?.id ?? ""]
    : null;

  const goToState = (stateName: string) => {
    navigate({ to: "/state/$id", params: { id: stateName } });
  };

  const updateTooltipFromEvent = (event: MouseEvent<SVGPathElement>) => {
    const shellRect = mapShellRef.current?.getBoundingClientRect();
    if (!shellRect) return;
    setTooltip({
      x: event.clientX - shellRect.left,
      y: event.clientY - shellRect.top,
    });
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
                  onClick={() => goToState(s.name)}
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
            <div ref={mapShellRef} className="glass-strong rounded-3xl p-4 md:p-6 relative overflow-hidden">
              <ComposableMap
                width={612}
                height={696}
                projection={geoIdentity()}
                className="w-full h-auto"
              >
                <defs>
                  <filter id="lift" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow
                      dx="0"
                      dy="6"
                      stdDeviation="6"
                      floodColor="oklch(0.4 0.15 40)"
                      floodOpacity="0.25"
                    />
                  </filter>
                </defs>

                <Geographies geography={INDIA_FEATURE_COLLECTION}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const entry = geo.properties as IndiaFeature["properties"];
                      const isVisible = dimmed.has(entry.id);
                      const isHover = hovered === entry.id;
                      const fill = REGION_FILL[entry.region] ?? REGION_FILL.central;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(event) => {
                            setHovered(entry.id);
                            updateTooltipFromEvent(event);
                          }}
                          onMouseMove={(event) => {
                            updateTooltipFromEvent(event);
                          }}
                          onMouseLeave={() => {
                            setHovered(null);
                            setTooltip(null);
                          }}
                          onClick={() => goToState(entry.name)}
                          onFocus={(event) => {
                            setHovered(entry.id);
                            updateTooltipFromEvent(event as unknown as MouseEvent<SVGPathElement>);
                          }}
                          style={{
                            default: {
                              fill,
                              stroke: "white",
                              strokeWidth: 1.6,
                              outline: "none",
                              opacity: isVisible ? 1 : 0.3,
                              cursor: "pointer",
                              transition: "all 180ms ease",
                              transformBox: "fill-box",
                              transformOrigin: "center",
                            },
                            hover: {
                              fill,
                              stroke: "white",
                              strokeWidth: 1.8,
                              outline: "none",
                              opacity: 1,
                              cursor: "pointer",
                              filter: "brightness(1.08) saturate(1.05)",
                              transform: "translateY(-2px) scale(1.015)",
                              transformBox: "fill-box",
                              transformOrigin: "center",
                            },
                            pressed: {
                              fill,
                              stroke: "white",
                              strokeWidth: 1.8,
                              outline: "none",
                              opacity: 1,
                              cursor: "pointer",
                            },
                          }}
                          className={isHover ? "shadow-[0_8px_24px_-10px_rgba(0,0,0,0.45)]" : ""}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>

              {/* Tooltip */}
              {hoveredState && tooltip && (
                <div
                  className="absolute pointer-events-none glass-strong rounded-2xl p-4 w-60 animate-scale-in z-10"
                  style={{
                    left: isNaN(Math.min(tooltip.x + 16, 600)) ? 0 : Math.min(tooltip.x + 16, 600),
                    top: isNaN(Math.max(tooltip.y - 80, 8)) ? 0 : Math.max(tooltip.y - 80, 8),
                  }}
                >
                  <div className="h-16 rounded-xl mb-3 relative overflow-hidden">
                    {loadingImages ? (
                      <Skeleton className="h-full w-full rounded-none" />
                    ) : stateImages[hoveredState.name] ? (
                      <>
                        <img
                          src={stateImages[hoveredState.name]}
                          alt={hoveredState.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          onLoad={() => console.log(`Tooltip image loaded: ${hoveredState.name}`)}
                          onError={() =>
                            console.warn(`Tooltip image failed to load: ${hoveredState.name}`)
                          }
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      </>
                    ) : (
                      <StateCardImage
                        src={
                          STATES[MAP_LOOKUP.get(normalizeStateName(hoveredState.name))?.id ?? ""]
                            ?.image
                        }
                        alt={hoveredState.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                  </div>
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
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.42)), url(${STATES[hoveredState.id]?.image ?? ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
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
                  {INDIA_ENTRIES.filter((entry) => entry.featured).map((entry) => {
                    const stateInfo = STATES[MAP_LOOKUP.get(normalizeStateName(entry.name))?.id ?? ""];
                    if (!stateInfo) return null;
                    return (
                      <button
                        key={entry.id}
                        onClick={() => goToState(entry.name)}
                        className="rounded-xl h-16 relative overflow-hidden lift-on-hover"
                      >
                        <StateCardImage
                          src={stateInfo.image}
                          alt={stateInfo.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          {stateInfo.name}
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
