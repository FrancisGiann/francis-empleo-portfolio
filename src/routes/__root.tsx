import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster, toast } from "sonner";

import appCss from "../styles.css?url";
import { ThemeProvider, useTheme } from "../hooks/use-theme";
import { RetroModeProvider } from "../hooks/use-konami";
import { useRetroMode } from "../hooks/use-retro-mode";
import { ScrollProgress } from "../components/ScrollProgress";

const BOOT_VERSION = "fge-boot-v1";
const BOOT_STORAGE_KEY = `portfolio-boot:${BOOT_VERSION}`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Francis Giann Empleo — Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Francis Giann Empleo, a full-stack developer building fast, reliable web applications.",
      },
      { name: "author", content: "Francis Giann Empleo" },
      { property: "og:title", content: "Francis Giann Empleo — Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Francis Giann Empleo, a full-stack developer building fast, reliable web applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "google-site-verification", content: "VU_3WMk5x9V2pELEn9SroZ8UskTFM7m914pOG4ST5uk" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.jpg", type: "image/jpeg" },
      { rel: "apple-touch-icon", href: "/favicon.jpg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Space+Grotesk:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
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
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RetroModeProvider>
          <KonamiWatcher />
          <ScrollProgress />
          <BootSequence />
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </RetroModeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function KonamiWatcher() {
  const { theme } = useTheme();
  const { enabled } = useRetroMode();

  useEffect(() => {
    // Check if retro mode was ever discovered this session or previously
    const hasDiscovered = localStorage.getItem("konami-retro") === "1";
    
    if (!enabled && !hasDiscovered) {
      const timer = setTimeout(() => {
        toast("SYSTEM MESSAGE", {
          description: "Hint: Try typing ↑ ↑ ↓ ↓ ← → ← → B A",
          className: "font-pixel",
          duration: 8000,
        });
      }, 15000); // Trigger after 15 seconds of viewing the site
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [enabled]);

  return <Toaster theme={theme} position="bottom-right" />;
}

function BootSequence() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hasCompleted = false;
    try {
      hasCompleted = localStorage.getItem(BOOT_STORAGE_KEY) === "1";
    } catch {
      // Storage can be unavailable in private or restricted browsing contexts.
    }
    if (reducedMotion || hasCompleted) return;

    let completed = false;
    setVisible(true);
    const timer = window.setTimeout(() => {
      completed = true;
      try {
        localStorage.setItem(BOOT_STORAGE_KEY, "1");
      } catch {
        // The sequence remains a harmless one-time-per-mount status if storage is blocked.
      }
      setVisible(false);
    }, 1150);

    return () => {
      window.clearTimeout(timer);
      if (!completed) setVisible(false);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="boot-sequence" role="status" aria-live="polite" aria-atomic="true">
      <span>FGE_OS v1.0</span>
      <span>LOADING PROJECTS...</span>
      <span>PORTFOLIO READY</span>
    </div>
  );
}
