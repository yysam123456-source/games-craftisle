// Craftisle Games - Service Worker
// Version: 1.0.0

const CACHE_NAME = "craftisle-games-v1.0.0";
const STATIC_CACHE = "craftisle-static-v1.0.0";
const DYNAMIC_CACHE = "craftisle-dynamic-v1.0.0";

// 静态资源 - 预缓存
const STATIC_ASSETS = [
  "/",
  "/play/2048",
  "/play/snake",
  "/play/tetris",
  "/play/sudoku",
  "/play/minesweeper",
  "/play/chess",
  "/play/flappy-wings",
  "/play/infinite-craft",
  "/play/password-game",
  "/play/slope",
  "/favorites",
  "/search",
  "/og-image.svg",
  "/icon-192x192.png",
  "/icon-512x512.png",
];

// 安装事件 - 预缓存静态资源
self.addEventListener("install", (event) => {
  console.log("[SW] Installing Service Worker...");
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("[SW] Precaching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  
  // 强制激活新版本
  self.skipWaiting();
});

// 激活事件 - 清理旧缓存
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating Service Worker...");
    
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log("[SW] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
    
  // 立即控制所有客户端
  return self.clients.claim();
});

// 请求拦截 - 缓存优先策略
self.addEventListener("fetch", (event) => {
  // 只处理 GET 请求
  if (event.request.method !== "GET") return;
    
  // 跳过非 HTTP/HTTPS 请求
  if (!event.request.url.startsWith("http")) return;
    
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 如果缓存中有，直接返回
      if (cachedResponse) {
        console.log("[SW] Serving from cache:", event.request.url);
        return cachedResponse;
      }
        
      // 否则从网络获取
      return fetch(event.request).then((networkResponse) => {
        // 检查响应是否有效
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }
          
        // 克隆响应（因为响应流只能读取一次）
        const responseToCache = networkResponse.clone();
          
        // 动态缓存新资源
        caches.open(DYNAMIC_CACHE).then((cache) => {
          console.log("[SW] Caching new resource:", event.request.url);
          cache.put(event.request, responseToCache);
        });
          
        return networkResponse;
      }).catch((error) => {
        console.log("[SW] Fetch failed:", error);
          
        // 如果是页面请求且离线，返回离线页面
        if (event.request.headers.get("accept")?.includes("text/html")) {
          return caches.match("/offline.html");
        }
          
        return new Response("Offline - Content not available", {
          status: 503,
          statusText: "Service Unavailable",
        });
      });
    })
  );
});

// 后台同步（如果需要）
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync:", event.tag);
    
  if (event.tag === "sync-gameplay") {
    event.waitUntil(syncGameplayData());
  }
});

// 推送通知（如果需要）
self.addEventListener("push", (event) => {
  console.log("[SW] Push received:", event);
    
  const options = {
    body: event.data?.text() || "New notification",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    vibrate: [200, 100, 200],
    data: {
      url: "/",
    },
  };
    
  event.waitUntil(
    self.registration.showNotification("Craftisle Games", options)
  );
});

// 通知点击事件
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked:", event);
    
  event.notification.close();
    
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || "/")
  );
});

// 辅助函数 - 同步游戏数据
async function syncGameplayData() {
  console.log("[SW] Syncing gameplay data...");
  // 这里可以实现游戏数据的后台同步
  // 例如：高分记录、游戏进度等
  return Promise.resolve();
};

console.log("[SW] Service Worker loaded successfully!");
