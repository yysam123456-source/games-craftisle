// Craftisle Games - Service Worker (v2 - Safe Mode)
// Only caches real static assets (JS/CSS/images/fonts), NEVER caches HTML pages.
// This prevents "Response served by service worker has redirections" errors.

const CACHE_NAME = "craftisle-static-v2";
const ASSETS_TO_PRECACHE = [
  // App shell assets only - no page routes!
  "/",
  "/offline.html",
  "/manifest.json",
  "/og-image.svg",
  "/favicon.ico",
  "/icon-192x192.png",
  "/icon-512x512.png",
];

// Install: only precache app shell assets (no /play/* routes!)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_PRECACHE).catch((err) => {
        console.warn("[SW] Some precache assets failed (non-critical):", err.message);
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Network-first for HTML pages, Cache-first for static assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests to same origin
  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // Determine if this is a navigation/page request or a static asset
  const isNavigation = request.mode === "navigate";
  const isHTML = request.headers.get("accept")?.includes("text/html");
  const isStaticAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|otf)(\?.*)?$/i.test(url.pathname);

  if (isNavigation || isHTML) {
    // === NAVIGATION / HTML REQUESTS: Network-first, never cache ===
    // This is THE FIX for Safari redirect errors:
    // We never cache HTML responses, so no stale/redirected pages are served.
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match("/offline.html").then((r) => r || new Response("Offline", { status: 503 }));
      })
    );
    return;
  }

  if (isStaticAsset) {
    // === STATIC ASSETS: Stale-while-revalidate for resilience ===
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchPromise = fetch(request).then((response) => {
            if (response.ok && response.type === "basic") {
              cache.put(request, response.clone());
            }
            return response;
          });
          return cached || fetchPromise; // Return cache immediately, update in background
        })
      )
    );
    return;
  }

  // For everything else (API calls, XHR, etc.), just pass through
  // Don't cache these at all
});
