import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bharat Virasat" },
      { name: "description", content: "Bharat Virasat is a digital cultural museum of India — its mission, philosophy, and the story behind it." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 mandala-bg">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-xs uppercase tracking-[0.22em] text-saffron-deep font-semibold mb-2">About</div>
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
          A love letter to <span className="text-shimmer">India's plurality</span>.
        </h1>
        <p className="text-lg text-foreground/75 leading-relaxed mb-6">
          Bharat Virasat began with a question: how do you fit a civilization of a billion stories
          into a single archive — without flattening any of them?
        </p>
        <p className="text-foreground/70 leading-relaxed mb-6">
          The answer, we think, is to begin small and stay reverent. Each state on this platform
          is curated by hand, drawing from oral traditions, regional scholars and lived practice.
          Nothing here is tourist gloss. Everything is meant to send you deeper.
        </p>
        <p className="text-foreground/70 leading-relaxed mb-10">
          We don't think of India as a country to be summarized. We think of it as a conversation —
          one that has been going on for five thousand years. This platform is our small contribution
          to keeping it audible.
        </p>

        <div className="glass-strong rounded-2xl p-8 my-12">
          <h2 className="font-display text-2xl font-bold mb-3">Our principles</h2>
          <ul className="space-y-3 text-foreground/80">
            <li>· Depth over breadth — fewer entries, told properly.</li>
            <li>· Regional voices, not just metropolitan ones.</li>
            <li>· Living traditions, not museum specimens.</li>
            <li>· Beauty as a form of respect.</li>
          </ul>
        </div>

        <Link
          to="/map"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white saffron-gradient shadow-[var(--shadow-glow-saffron)]"
        >
          Begin exploring →
        </Link>
      </div>
    </div>
  );
}
