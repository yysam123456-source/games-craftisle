"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<{ outcome: "accepted" | "dismissed" }>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWARegistration() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [newServiceWorker, setNewServiceWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    // 注册 Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("PWA: Service Worker registered successfully:", registration);

          // 检查是否有新的 Service Worker
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // 新版本已安装，提示用户更新
                  setNewServiceWorker(newWorker);
                  setShowUpdatePrompt(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error("PWA: Service Worker registration failed:", error);
        });
    }

    // 监听安装提示
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // 监听应用已安装
    const handleAppInstalled = () => {
      console.log("PWA: App installed successfully");
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // 处理安装
  const handleInstall = async () => {
    if (!deferredPrompt) return;

    const result = await deferredPrompt.prompt();
    console.log("PWA: Install prompt result:", result.outcome);

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // 处理更新
  const handleUpdate = () => {
    if (!newServiceWorker) return;

    // 通知新的 Service Worker 跳过等待，立即激活
    newServiceWorker.postMessage({ type: "SKIP_WAITING" });
    setShowUpdatePrompt(false);

    // 重新加载页面
    window.location.reload();
  };

  // 关闭更新提示
  const dismissUpdate = () => {
    setShowUpdatePrompt(false);
  };

  return (
    <>
      {/* 安装提示 */}
      {isInstallable && !isInstalled && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
          <div className="bg-card/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="text-3xl">📱</div>
              <div className="flex-1">
                <p className="font-bold text-foreground mb-1">Install Craftisle Games</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Install this app on your device for quick access and offline play!
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Install
                  </button>
                  <button
                    onClick={() => setIsInstallable(false)}
                    className="px-4 py-2 bg-white/5 text-muted-foreground rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 更新提示 */}
      {showUpdatePrompt && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-down">
          <div className="bg-card/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="text-3xl">🔄</div>
              <div className="flex-1">
                <p className="font-bold text-foreground mb-1">Update Available</p>
                <p className="text-sm text-muted-foreground mb-3">
                  A new version of Craftisle Games is available. Update now for the latest features!
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Update Now
                  </button>
                  <button
                    onClick={dismissUpdate}
                    className="px-4 py-2 bg-white/5 text-muted-foreground rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
