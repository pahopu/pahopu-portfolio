import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import path from "node:path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Inline styles are load-bearing here (Framer Motion + the hand-rolled star-particle
// effects set `style.cssText` directly), so style-src keeps 'unsafe-inline'. Next.js'
// App Router streaming payload also relies on inline <script> tags without a nonce
// wired up, so script-src does too — this CSP mainly blocks loading *external*
// script/style/frame sources, not inline execution.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.emailjs.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.emailjs.com",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // accelerometer/gyroscope stay unrestricted — used by the shake easter egg
          // and the hero's device-orientation parallax.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
