import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  MapPinned,
  Sparkles,
  Users,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Edit2,
  Trash2,
  MoreVertical,
  ArrowUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { Logo } from "@/components/Logo";
import { STATE_LIST } from "@/data/states";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Bharat Virasat" }] }),
  component: AdminPage,
});

const NAV = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "states", icon: MapPinned, label: "States" },
  { id: "festivals", icon: Sparkles, label: "Festivals" },
  { id: "users", icon: Users, label: "Users" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const KPIS = [
  {
    label: "Total States",
    value: "28",
    delta: "+2",
    up: true,
    color: "var(--saffron)",
    spark: [12, 14, 13, 18, 22, 25, 28],
  },
  {
    label: "Active Users",
    value: "12.4k",
    delta: "+18%",
    up: true,
    color: "var(--peacock)",
    spark: [8, 9, 11, 10, 12, 13, 12.4],
  },
  {
    label: "Content Items",
    value: "847",
    delta: "+34",
    up: true,
    color: "var(--lotus)",
    spark: [600, 650, 700, 720, 780, 820, 847],
  },
  {
    label: "Reports",
    value: "3",
    delta: "-2",
    up: false,
    color: "var(--leaf)",
    spark: [8, 7, 6, 5, 4, 5, 3],
  },
];

const VISITS = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  visits: 1200 + Math.round(Math.sin(i / 2) * 600 + i * 180),
}));

const STATE_PIE = [
  { name: "Rajasthan", value: 28, color: "oklch(0.7 0.18 50)" },
  { name: "Kerala", value: 22, color: "oklch(0.72 0.13 145)" },
  { name: "Tamil Nadu", value: 18, color: "oklch(0.65 0.2 25)" },
  { name: "West Bengal", value: 16, color: "oklch(0.55 0.15 230)" },
  { name: "Punjab", value: 16, color: "oklch(0.78 0.12 350)" },
];

const CATEGORY_BARS = [
  { cat: "Festivals", count: 142 },
  { cat: "Food", count: 198 },
  { cat: "Art", count: 167 },
  { cat: "Traditions", count: 124 },
  { cat: "Heritage", count: 216 },
];

function AdminPage() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 glass-dark border-r border-white/10 flex flex-col">
        <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <Logo className="h-7 w-7" />
          <div>
            <div className="font-display font-semibold text-foreground text-sm">Bharat Virasat</div>
            <div className="text-[10px] uppercase tracking-wider text-saffron">Admin</div>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === n.id
                  ? "saffron-gradient text-white shadow-[var(--shadow-glow-saffron)]"
                  : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="glass-dark rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full saffron-gradient flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">Admin User</div>
              <div className="text-[10px] text-muted-foreground truncate">admin@virasat.in</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold capitalize">{active}</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage Bharat Virasat's living archive.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="glass-dark rounded-full flex items-center px-4 py-2 gap-2 w-72">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search…"
                  className="flex-1 bg-transparent focus:outline-none text-sm"
                />
              </div>
              <button className="px-4 py-2 rounded-full text-sm font-semibold text-white saffron-gradient inline-flex items-center gap-2 shadow-[var(--shadow-glow-saffron)]">
                <Plus className="h-4 w-4" /> New
              </button>
            </div>
          </div>

          {active === "dashboard" && <DashboardView />}
          {active === "states" && <StatesView />}
          {active === "festivals" && <FestivalsView />}
          {active === "users" && <UsersView />}
          {active === "analytics" && <AnalyticsView />}
          {active === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k) => (
          <div key={k.label} className="glass-dark rounded-2xl p-5 relative overflow-hidden">
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-30 blur-2xl"
              style={{ background: k.color }}
            />
            <div className="relative">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {k.label}
              </div>
              <div className="font-display text-3xl font-bold mt-2">{k.value}</div>
              <div
                className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${k.up ? "text-leaf" : "text-destructive"}`}
              >
                {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {k.delta}
              </div>
              <div className="h-10 mt-3">
                <ResponsiveContainer>
                  <LineChart data={k.spark.map((v, i) => ({ i, v }))}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={k.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-dark rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Visits over time</h3>
            <span className="text-xs text-muted-foreground">Last 12 months</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={VISITS}>
                <defs>
                  <linearGradient id="visit-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.17 60)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.78 0.17 60)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
                <XAxis dataKey="month" stroke="oklch(0.7 0.03 240)" fontSize={11} />
                <YAxis stroke="oklch(0.7 0.03 240)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.24 0.04 250)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="oklch(0.78 0.17 60)"
                  strokeWidth={3}
                  dot={{ fill: "oklch(0.78 0.17 60)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-dark rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Most explored</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={STATE_PIE}
                  dataKey="value"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {STATE_PIE.map((s) => (
                    <Cell key={s.name} fill={s.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.24 0.04 250)",
                    border: "1px solid oklch(1 0 0 / 0.1)",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-3">
            {STATE_PIE.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </div>
                <span className="font-semibold">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-dark rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Content by category</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={CATEGORY_BARS}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.06)" vertical={false} />
              <XAxis dataKey="cat" stroke="oklch(0.7 0.03 240)" fontSize={11} />
              <YAxis stroke="oklch(0.7 0.03 240)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.24 0.04 250)",
                  border: "1px solid oklch(1 0 0 / 0.1)",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="count" fill="oklch(0.55 0.15 230)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatesView() {
  return (
    <div className="glass-dark rounded-2xl overflow-hidden animate-fade-up">
      <table className="w-full text-sm">
        <thead className="text-xs uppercase tracking-wider text-muted-foreground border-b border-white/10">
          <tr>
            <th className="text-left px-6 py-3 font-semibold">
              <div className="inline-flex items-center gap-1 cursor-pointer">
                State <ArrowUp className="h-3 w-3" />
              </div>
            </th>
            <th className="text-left px-6 py-3 font-semibold">Region</th>
            <th className="text-left px-6 py-3 font-semibold">Capital</th>
            <th className="text-left px-6 py-3 font-semibold">Items</th>
            <th className="text-left px-6 py-3 font-semibold">UNESCO</th>
            <th className="text-right px-6 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {STATE_LIST.map((s) => (
            <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg" style={{ background: s.bannerGradient }} />
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-[11px] text-muted-foreground">{s.tagline}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 capitalize">{s.region}</td>
              <td className="px-6 py-4">{s.capital}</td>
              <td className="px-6 py-4">
                {s.festivals.length +
                  s.food.length +
                  s.art.length +
                  s.traditions.length +
                  s.heritage.length}
              </td>
              <td className="px-6 py-4">{s.unescoSites}</td>
              <td className="px-6 py-4 text-right">
                <div className="inline-flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-white/10">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10">
                    <MoreVertical className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FestivalsView() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 animate-fade-up">
      <div className="glass-dark rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Add cultural entry</h3>
        <form className="space-y-4 text-sm" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Title
            </label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-saffron"
              placeholder="e.g. Pushkar Camel Fair"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                State
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-saffron">
                {STATE_LIST.map((s) => (
                  <option key={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Category
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-saffron">
                <option>Festival</option>
                <option>Food</option>
                <option>Art</option>
                <option>Tradition</option>
                <option>Heritage</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Description
            </label>
            <textarea
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-saffron resize-none"
              placeholder="Tell the story…"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Image
            </label>
            <div className="border-2 border-dashed border-white/15 rounded-xl p-8 text-center hover:border-saffron/60 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📤</div>
              <div className="text-sm text-muted-foreground">Drop image or click to upload</div>
            </div>
          </div>
          <button className="w-full py-3 rounded-full text-sm font-semibold text-white saffron-gradient">
            Save entry
          </button>
        </form>
      </div>

      <div className="glass-dark rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Recent festivals</h3>
        <div className="space-y-3">
          {STATE_LIST.flatMap((s) =>
            s.festivals
              .slice(0, 1)
              .map((f) => ({ ...f, state: s.name, gradient: s.bannerGradient })),
          ).map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg shrink-0" style={{ background: f.gradient }} />
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm truncate">{f.title}</div>
                <div className="text-xs text-muted-foreground truncate">{f.state}</div>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/10">
                <Edit2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersView() {
  const users = [
    { name: "Aanya Sharma", email: "aanya@example.com", joined: "Mar 2026", state: "Rajasthan" },
    { name: "Rohan Iyer", email: "rohan@example.com", joined: "Feb 2026", state: "Kerala" },
    {
      name: "Meera Banerjee",
      email: "meera@example.com",
      joined: "Jan 2026",
      state: "West Bengal",
    },
    { name: "Arjun Singh", email: "arjun@example.com", joined: "Apr 2026", state: "Punjab" },
  ];
  return (
    <div className="glass-dark rounded-2xl p-6 animate-fade-up">
      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.email} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5">
            <div className="w-10 h-10 rounded-full saffron-gradient flex items-center justify-center text-white font-bold text-sm">
              {u.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{u.name}</div>
              <div className="text-xs text-muted-foreground">{u.email}</div>
            </div>
            <div className="text-xs text-muted-foreground">Following {u.state}</div>
            <div className="text-xs text-muted-foreground">{u.joined}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  return <DashboardView />;
}

function SettingsView() {
  return (
    <div className="glass-dark rounded-2xl p-8 animate-fade-up max-w-2xl">
      <h3 className="font-display text-xl font-semibold mb-6">Platform settings</h3>
      <div className="space-y-5 text-sm">
        {[
          "Public registration",
          "Email notifications",
          "Comment moderation",
          "Allow user submissions",
        ].map((s) => (
          <div key={s} className="flex items-center justify-between">
            <span>{s}</span>
            <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <span className="absolute inset-0 rounded-full bg-white/15 transition peer-checked:bg-saffron" />
              <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
