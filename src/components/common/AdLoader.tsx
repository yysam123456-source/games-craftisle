'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { isAdsEnabled, isAdsEnabledSync } from '@/lib/config/ads';

/**
 * AdLoader - Client component that conditionally loads AdSense scripts.
 *
 * Uses runtime config (remote or hardcoded) to decide whether to load ads.
 * This runs on the client after hydration, so remote config fetch works.
 *
 * Note: Static HTML pages (/games/island-builder/) load AdSense via inline script.
 * This component is for Next.js dynamic pages.
 */
export function AdLoader() {
  const [adsEnabled, setAdsEnabled] = useState(isAdsEnabledSync());
  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const enabled = await isAdsEnabled();
      if (!cancelled) {
        setAdsEnabled(enabled);
      }
    }

    // Get AdSense client ID from config or env
    const win = window as unknown as {
      __ADS_CONFIG__?: { clientId?: string };
      ENV?: { NEXT_PUBLIC_ADSENSE_CLIENT_ID?: string };
    };
    const id =
      win.__ADS_CONFIG__?.clientId ??
      win.ENV?.NEXT_PUBLIC_ADSENSE_CLIENT_ID ??
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ??
      '';
    setClientId(id);

    check();
    return () => { cancelled = true; };
  }, []);

  if (!adsEnabled || !clientId) return null;

  return (
    <>
      {/* AdSense script - only load once */}
      <Script
        id="adsbygoogle"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
