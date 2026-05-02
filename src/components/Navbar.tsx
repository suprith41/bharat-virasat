import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/map", label: "Explore Map" },
  { to: "/search", label: "Search" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onHero = path === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  const transparent = onHero && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent ? "bg-transparent" : "glass-strong"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo className="h-9 w-9 transition-transform group-hover:rotate-180 duration-700" />
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold tracking-tight text-foreground">
              Bharat Virasat
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              भारत विरासत
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => {
            const active = path === n.to || (n.to !== "/" && path.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  active ? "text-saffron-deep" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {n.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full saffron-gradient" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium rounded-full text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 text-sm font-semibold rounded-full text-white saffron-gradient shadow-[var(--shadow-glow-saffron)] hover:scale-105 transition-transform"
          >
            Register
          </Link>
        </div>

        <button
          className="md:hidden glass rounded-full p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden glass-strong border-t border-white/40 animate-fade-in">
          <div className="px-6 py-6 space-y-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="block px-4 py-3 rounded-xl text-base font-medium hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-3 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                className="px-4 py-2.5 rounded-full text-center text-sm font-medium border border-border"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2.5 rounded-full text-center text-sm font-semibold text-white saffron-gradient"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
