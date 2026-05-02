import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 mandala-bg">
      <div className="max-w-md text-center glass-strong rounded-3xl p-10">
        <h1 className="font-display text-7xl font-bold text-shimmer">404</h1>
        <h2 className="mt-4 font-display text-2xl text-foreground">Lost in the bazaar</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page wandered off into the alleys. Let's get you home.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white saffron-gradient shadow-[var(--shadow-glow-saffron)]"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bharat Virasat — Discover the Soul of India" },
      {
        name: "description",
        content:
          "A digital cultural museum of India: 35 states, thousands of festivals, art forms and traditions in one immersive archive.",
      },
      { name: "author", content: "Bharat Virasat" },
      { property: "og:title", content: "Bharat Virasat — Discover the Soul of India" },
      {
        property: "og:description",
        content:
          "Explore India's living heritage through an interactive map of states, festivals, food and art.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = path.startsWith("/admin");
  const isLogin = path === "/login";
  const isAuth = isLogin || path === "/register";
  return (
    <div
      className={
        isAdmin
          ? "dark min-h-screen bg-background custom-cursor-enabled"
          : "min-h-screen bg-background custom-cursor-enabled"
      }
      data-cursor-enabled={!isLogin}
    >
      {!isLogin && <CustomCursor />}
      {!isAdmin && !isAuth && <Navbar />}
      <main className={!isAdmin && !isAuth ? "pt-0" : ""}>
        <Outlet />
      </main>
      {!isAdmin && !isAuth && <Footer />}
    </div>
  );
}
