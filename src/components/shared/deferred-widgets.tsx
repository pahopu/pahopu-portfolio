"use client";

import dynamic from "next/dynamic";

// Purely decorative, client-only widgets — no SEO/LCP content, so skip SSR and
// keep them out of the initial bundle. `ssr: false` requires a Client Component,
// hence this wrapper around the server layout.
const EasterEgg = dynamic(
  () => import("@/components/shared/easter-egg").then((m) => m.EasterEgg),
  { ssr: false }
);
const FloatingMusicPlayer = dynamic(
  () => import("@/components/shared/floating-music-player").then((m) => m.FloatingMusicPlayer),
  { ssr: false }
);

export function DeferredWidgets() {
  return (
    <>
      <FloatingMusicPlayer />
      <EasterEgg />
    </>
  );
}
