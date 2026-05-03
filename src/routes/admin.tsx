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

const IVORY = "#FFFDF7";
const INK = "#1a1a1a";
const MUTED = "#555555";
const SAFFRON = "#FF6F00";
const PEACOCK = "#006989";
const LOTUS = "#D96C9D";
const LEAF = "#6FA35B";
const SOFT_BORDER = "rgba(0,0,0,0.08)";
const SOFT_SHADOW = "0 18px 40px rgba(26, 26, 26, 0.08)";
const PANEL_CLASS =
  "rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white/88 shadow-[0_18px_40px_rgba(26,26,26,0.08)] backdrop-blur-xl";
const INPUT_CLASS =
  "w-full rounded-xl border border-[rgba(0,0,0,0.08)] bg-[#FFFDF7] px-4 py-2.5 text-sm text-[#1a1a1a] placeholder:text-[#555555]/70 focus:outline-none focus:ring-2 focus:ring-[#FF6F00]/20 focus:border-[#FF6F00]";

const KPIS = [
  {
    label: "Total States",
    value: "35",
    delta: "+2",
    up: true,
    color: SAFFRON,
    spark: [12, 14, 13, 18, 22, 25, 28],
  },
  {
    label: "Active Users",
    value: "12.4k",
    delta: "+18%",
    up: true,
    color: PEACOCK,
    spark: [8, 9, 11, 10, 12, 13, 12.4],
  },
  {
    label: "Content Items",
    value: "847",
    delta: "+34",
    up: true,
    color: LOTUS,
    spark: [600, 650, 700, 720, 780, 820, 847],
  },
  {
    label: "Reports",
    value: "3",
    delta: "-2",
    up: false,
    color: LEAF,
    spark: [8, 7, 6, 5, 4, 5, 3],
  },
];

const VISITS = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  visits: 1200 + Math.round(Math.sin(i / 2) * 600 + i * 180),
}));

const STATE_PIE = [
  { name: "Rajasthan", value: 28, color: SAFFRON },
  { name: "Kerala", value: 22, color: PEACOCK },
  { name: "Tamil Nadu", value: 18, color: LOTUS },
  { name: "West Bengal", value: 16, color: LEAF },
  { name: "Punjab", value: 16, color: SAFFRON },
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
    <div
      className="min-h-screen flex bg-[#FFFDF7] text-[#1a1a1a]"
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, rgba(255,111,0,0.08), transparent 32%), radial-gradient(circle at bottom right, rgba(0,105,137,0.08), transparent 28%)",
      }}
    >
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-[rgba(0,0,0,0.08)] bg-white/78 backdrop-blur-2xl flex flex-col">
        <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-[rgba(0,0,0,0.08)]">
          <Logo className="h-7 w-7" />
          <div>
            <div className="font-display font-semibold text-[#1a1a1a] text-sm">Bharat Virasat</div>
            <div className="text-[10px] uppercase tracking-wider text-[#FF6F00]">Admin</div>
          </div>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === n.id
                  ? "text-white shadow-[0_14px_28px_rgba(255,111,0,0.24)]"
                  : "text-[#1a1a1a] hover:bg-[#FFF4E8]"
              }`}
              style={
                active === n.id
                  ? { background: "linear-gradient(135deg, #FF6F00 0%, #FF8F3D 100%)" }
                  : undefined
              }
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[rgba(0,0,0,0.08)]">
          <div className={PANEL_CLASS + " p-3 flex items-center gap-3"}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: "linear-gradient(135deg, #FF6F00 0%, #FF8F3D 100%)" }}
            >
              A
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[#1a1a1a] truncate">Admin User</div>
              <div className="text-[10px] text-[#555555] truncate">admin@virasat.in</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-4xl font-bold capitalize text-[#1a1a1a]">{active}</h1>
              <p className="text-[#555555] text-sm mt-1">
                Manage Bharat Virasat's living archive.
              </p>
            </div>
            <div className="flex gap-3">
              <div className={PANEL_CLASS + " rounded-full flex items-center px-4 py-2 gap-2 w-72"}>
                <Search className="h-4 w-4 text-[#555555]" />
                <input
                  placeholder="Search…"
                  className="flex-1 bg-transparent focus:outline-none text-sm text-[#1a1a1a] placeholder:text-[#555555]/70"
                />
              </div>
              <button
                className="px-4 py-2 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2 shadow-[0_14px_28px_rgba(255,111,0,0.24)]"
                style={{ background: "linear-gradient(135deg, #FF6F00 0%, #FF8F3D 100%)" }}
              >
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
          <div key={k.label} className={PANEL_CLASS + " p-5 relative overflow-hidden"}>
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-30 blur-2xl"
              style={{ background: k.color }}
            />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.24em] text-[#555555] font-semibold">
                {k.label}
              </div>
              <div className="font-display text-3xl font-bold mt-2 text-[#FF6F00]">{k.value}</div>
              <div
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold"
                style={{ color: k.up ? LEAF : SAFFRON }}
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
        <div className={"lg:col-span-2 " + PANEL_CLASS + " p-6"}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-[#1a1a1a]">Visits over time</h3>
            <span className="text-xs uppercase tracking-[0.24em] text-[#555555]">Last 12 months</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={VISITS}>
                <defs>
                  <linearGradient id="visit-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SAFFRON} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={SAFFRON} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={SOFT_BORDER} vertical={false} />
                <XAxis dataKey="month" stroke={MUTED} fontSize={11} />
                <YAxis stroke={MUTED} fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "#FFFFFF",
                    border: `1px solid ${SOFT_BORDER}`,
                    borderRadius: 12,
                    boxShadow: SOFT_SHADOW,
                    color: INK,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke={SAFFRON}
                  strokeWidth={3}
                  dot={{ fill: SAFFRON, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={PANEL_CLASS + " p-6"}>
          <h3 className="font-display text-lg font-semibold mb-4 text-[#1a1a1a]">Most explored</h3>
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
                    background: "#FFFFFF",
                    border: `1px solid ${SOFT_BORDER}`,
                    borderRadius: 12,
                    boxShadow: SOFT_SHADOW,
                    color: INK,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-3">
            {STATE_PIE.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs text-[#555555]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </div>
                <span className="font-semibold text-[#1a1a1a]">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={PANEL_CLASS + " p-6"}>
        <h3 className="font-display text-lg font-semibold mb-4 text-[#1a1a1a]">Content by category</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={CATEGORY_BARS}>
              <CartesianGrid stroke={SOFT_BORDER} vertical={false} />
              <XAxis dataKey="cat" stroke={MUTED} fontSize={11} />
              <YAxis stroke={MUTED} fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "#FFFFFF",
                  border: `1px solid ${SOFT_BORDER}`,
                  borderRadius: 12,
                  boxShadow: SOFT_SHADOW,
                  color: INK,
                }}
              />
              <Bar dataKey="count" fill={PEACOCK} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatesView() {
  return (
    <div className={PANEL_CLASS + " overflow-hidden animate-fade-up"}>
      <table className="w-full text-sm">
        <thead className="text-xs uppercase tracking-[0.24em] text-[#555555] border-b border-[rgba(0,0,0,0.08)]">
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
            <tr
              key={s.id}
              className="border-b border-[rgba(0,0,0,0.05)] hover:bg-[#FFF8ED] transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg" style={{ background: s.bannerGradient }} />
                  <div>
                    <div className="font-semibold text-[#1a1a1a]">{s.name}</div>
                    <div className="text-[11px] text-[#555555]">{s.tagline}</div>
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
                  <button className="p-2 rounded-lg hover:bg-[#FFF4E8]">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-[#FFF4E8] text-[#C84B31]">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-[#FFF4E8]">
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
      <div className={PANEL_CLASS + " p-6"}>
        <h3 className="font-display text-lg font-semibold mb-4 text-[#1a1a1a]">Add cultural entry</h3>
        <form className="space-y-4 text-sm" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#555555] mb-2">
              Title
            </label>
            <input
              className={INPUT_CLASS}
              placeholder="e.g. Pushkar Camel Fair"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#555555] mb-2">
                State
              </label>
              <select className={INPUT_CLASS}>
                {STATE_LIST.map((s) => (
                  <option key={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#555555] mb-2">
                Category
              </label>
              <select className={INPUT_CLASS}>
                <option>Festival</option>
                <option>Food</option>
                <option>Art</option>
                <option>Tradition</option>
                <option>Heritage</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#555555] mb-2">
              Description
            </label>
            <textarea
              rows={5}
              className={INPUT_CLASS + " resize-none py-3"}
              placeholder="Tell the story…"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#555555] mb-2">
              Image
            </label>
            <div className="border-2 border-dashed border-[rgba(0,0,0,0.12)] rounded-xl bg-[#FFFDF7] p-8 text-center hover:border-[#FF6F00]/60 transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📤</div>
              <div className="text-sm text-[#555555]">Drop image or click to upload</div>
            </div>
          </div>
          <button
            className="w-full py-3 rounded-full text-sm font-semibold text-white shadow-[0_14px_28px_rgba(255,111,0,0.24)]"
            style={{ background: "linear-gradient(135deg, #FF6F00 0%, #FF8F3D 100%)" }}
          >
            Save entry
          </button>
        </form>
      </div>

      <div className={PANEL_CLASS + " p-6"}>
        <h3 className="font-display text-lg font-semibold mb-4 text-[#1a1a1a]">Recent festivals</h3>
        <div className="space-y-3">
          {STATE_LIST.flatMap((s) =>
            s.festivals
              .slice(0, 1)
              .map((f) => ({ ...f, state: s.name, gradient: s.bannerGradient })),
          ).map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFF8ED] transition-colors"
            >
              <div className="w-12 h-12 rounded-lg shrink-0" style={{ background: f.gradient }} />
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm truncate text-[#1a1a1a]">{f.title}</div>
                <div className="text-xs text-[#555555] truncate">{f.state}</div>
              </div>
              <button className="p-2 rounded-lg hover:bg-[#FFF4E8]">
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
    <div className={PANEL_CLASS + " p-6 animate-fade-up"}>
      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.email} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#FFF8ED]">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #FF6F00 0%, #FF8F3D 100%)" }}
            >
              {u.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-[#1a1a1a]">{u.name}</div>
              <div className="text-xs text-[#555555]">{u.email}</div>
            </div>
            <div className="text-xs text-[#555555]">Following {u.state}</div>
            <div className="text-xs text-[#555555]">{u.joined}</div>
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
    <div className={PANEL_CLASS + " p-8 animate-fade-up max-w-2xl"}>
      <h3 className="font-display text-xl font-semibold mb-6 text-[#1a1a1a]">Platform settings</h3>
      <div className="space-y-5 text-sm">
        {[
          "Public registration",
          "Email notifications",
          "Comment moderation",
          "Allow user submissions",
        ].map((s) => (
          <div key={s} className="flex items-center justify-between">
            <span className="text-[#1a1a1a]">{s}</span>
            <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <span className="absolute inset-0 rounded-full bg-[#E9E1D7] transition peer-checked:bg-[#FF6F00]" />
              <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
