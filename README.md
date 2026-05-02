# 🪔 Bharat Virasat

**A living digital archive of Indian cultural heritage.**

> 28 states. Thousands of traditions. One immersive platform — woven from the festivals, flavors, and folk arts that make India, India.

---

## ✨ Features

- 🗺️ **Interactive Map** — Click any state to explore its unique cultural identity
- 📖 **Curated Culture** — Hand-researched entries on festivals, food, art forms, and traditions
- 🔍 **Smart Search** — Discover cultural artifacts across all states
- 🏛️ **State Deep-Dives** — Dedicated pages for each of India's 28 states and 6 union territories
- 📊 **Live Statistics** — Animated counters showcasing the scale of Indian heritage
- 🌗 **Premium UI** — Glassmorphism design with parallax hero, tilt cards, and micro-animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) |
| Routing | [TanStack Router](https://tanstack.com/router) (file-based) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + custom design tokens |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| UI Components | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Build Tool | [Vite 7](https://vitejs.dev/) |
| Deployment | [Cloudflare Workers](https://workers.cloudflare.com/) |
| Language | TypeScript 5 |
| Package Manager | [Bun](https://bun.sh/) / npm |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18 or [Bun](https://bun.sh/) ≥ 1.0
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (for Cloudflare deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/suprith41/bharat-virasat.git
cd bharat-virasat

# Install dependencies (using bun)
bun install

# OR using npm
npm install
```

### Development

```bash
# Start the development server
bun run dev
# OR
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
# Production build
bun run build

# Preview production build locally
bun run preview
```

### Code Quality

```bash
# Lint
bun run lint

# Format with Prettier
bun run format
```

---

## 📁 Project Structure

```
bharat-virasat/
├── src/
│   ├── routes/             # File-based routing (TanStack Router)
│   │   ├── __root.tsx      # Root layout with nav & footer
│   │   ├── index.tsx       # Home / Hero page
│   │   ├── map.tsx         # Interactive India map
│   │   ├── search.tsx      # Search across states
│   │   ├── state.$id.tsx   # Dynamic state detail page
│   │   ├── about.tsx       # About page
│   │   ├── login.tsx       # Login page
│   │   └── register.tsx    # Register page
│   ├── components/         # Reusable UI components
│   ├── data/               # Static data — states, festivals, art forms
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── styles.css          # Global styles & design tokens
├── wrangler.jsonc          # Cloudflare Workers config
├── vite.config.ts          # Vite + TanStack + Cloudflare plugin config
└── tsconfig.json
```

---

## ☁️ Deployment

This project is configured for deployment on **Cloudflare Workers** via the `@cloudflare/vite-plugin`.

```bash
# Build and deploy to Cloudflare
npm run deploy

# Run a local Cloudflare preview
npm run deploy:preview
```

Ensure your `wrangler.jsonc` is configured with your Cloudflare account details before deploying. The deploy scripts use the generated `dist/server/wrangler.json`, so you do not need a separate global Wrangler install.

---

## 🎨 Design System

The UI is built on a custom set of design tokens defined in `src/styles.css`:

- **Colors**: Saffron (`--saffron`), Peacock Blue (`--peacock`), Lotus Pink (`--lotus`) — inspired by the Indian tricolor and natural motifs
- **Glass effects**: `.glass`, `.glass-strong` utility classes for frosted-glass UI
- **Animations**: `fade-up`, `float`, `drift`, `scale-in`, `text-shimmer`
- **Typography**: Display font for headings, optimized for Indian cultural aesthetics

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add state data, improve UI, or fix a bug:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/add-karnataka-data`)
3. Commit your changes (`git commit -m 'Add Karnataka cultural data'`)
4. Push to the branch (`git push origin feature/add-karnataka-data`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ for India's timeless heritage</p>
