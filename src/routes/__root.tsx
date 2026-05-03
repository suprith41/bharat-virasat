import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import appCss from "../styles.css?url";
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
      { title: "Bharat Virasat" },
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
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
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
  const isAuth = path === "/login" || path === "/register";

  useEffect(() => {
    const cleanupMap = new Map<Element, EventListener>();
    const interactiveSelector = [
      "button",
      "a",
      "[role='button']",
      "[data-state]",
      "[data-slot='card']",
      ".glass",
      ".glass-strong",
      ".lift-on-hover",
      ".saffron-gradient",
    ].join(", ");

    const resolveRippleColor = (target: HTMLElement) => {
      const backgroundColor = window.getComputedStyle(target).backgroundColor;
      const channels = backgroundColor.match(/[\d.]+/g);
      if (!channels || channels.length < 3) {
        return "rgba(255, 111, 0, 0.3)";
      }

      const [r, g, b, a = "1"] = channels.map(Number);
      if (a < 0.12) {
        return "rgba(255, 111, 0, 0.3)";
      }

      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      return luminance < 0.62 ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 111, 0, 0.3)";
    };

    const attachRipple = (el: Element) => {
      if (!(el instanceof HTMLElement) || cleanupMap.has(el)) return;

      el.classList.add("has-ripple");

      const onClick: EventListener = (e) => {
        const mouseEvent = e as MouseEvent;
        const target = el as HTMLElement;
        const rect = target.getBoundingClientRect();

        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;

        const size = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) * 2;

        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x - size / 2}px`;
        ripple.style.top = `${y - size / 2}px`;
        ripple.style.backgroundColor = resolveRippleColor(target);

        target.appendChild(ripple);

        ripple.addEventListener("animationend", () => {
          ripple.remove();
        });
      };

      el.addEventListener("click", onClick);
      cleanupMap.set(el, onClick);
    };

    const hydrateRipples = (root: ParentNode = document) => {
      root.querySelectorAll(interactiveSelector).forEach(attachRipple);
    };

    hydrateRipples();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(interactiveSelector)) {
            attachRipple(node);
          }
          hydrateRipples(node);
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanupMap.forEach((listener, el) => {
        el.removeEventListener("click", listener);
      });
    };
  }, [path]);

  return (
    <div className={isAdmin ? "dark min-h-screen bg-background" : "min-h-screen bg-background"}>
      {!isAdmin && !isAuth && <Navbar />}
      <main className={!isAdmin && !isAuth ? "pt-0" : ""}>
        <Outlet />
      </main>
      {!isAdmin && !isAuth && <Footer />}
    </div>
  );
}
