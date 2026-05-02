import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-gradient-to-b from-transparent to-secondary/40 paisley-pattern">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-saffron to-lotus" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Logo className="h-8 w-8" />
            <span className="font-display text-xl font-semibold">Bharat Virasat</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            A living digital archive of India's states, festivals, art forms and traditions —
            curated for explorers and storytellers.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-saffron-deep mb-4 font-sans font-semibold">
            Explore
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                to="/map"
                className="text-foreground/80 hover:text-saffron-deep transition-colors"
              >
                Interactive Map
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="text-foreground/80 hover:text-saffron-deep transition-colors"
              >
                Search Culture
              </Link>
            </li>
            <li>
              <Link
                to="/state/$id"
                params={{ id: "RJ" }}
                className="text-foreground/80 hover:text-saffron-deep transition-colors"
              >
                Featured State
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-foreground/80 hover:text-saffron-deep transition-colors"
              >
                About the Project
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-saffron-deep mb-4 font-sans font-semibold">
            Stay in the loop
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Monthly dispatches on a different state's living traditions.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-full glass text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
            />
            <button className="px-5 py-2.5 rounded-full text-sm font-semibold text-white saffron-gradient hover:scale-105 transition-transform">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 Bharat Virasat. A digital tribute to India's living heritage.</p>
          <p>Made with reverence in भारत</p>
        </div>
      </div>
    </footer>
  );
}
