import { EasterEgg } from "@/components/shared/easter-egg";
import { DynamicFavicon } from "@/components/shared/dynamic-favicon";
import { FloatingMusicPlayer } from "@/components/shared/floating-music-player";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pahopu-portfolio.vercel.app"),
  title: {
    default: "pahopu | Front-End Developer",
    template: "%s | pahopu",
  },
  description:
    "Front-End Developer with 2+ years building large-scale ERP systems and healthcare platforms. CS graduate (GPA 9.14). Vue 3 & React specialist. Currently employed, open to connect.",
  keywords: [
    "Front-End Developer",
    "Vue 3",
    "React",
    "Next.js",
    "TypeScript",
    "ERP Systems",
    "Portfolio",
    "Pham Hoang Phuc",
    "Phạm Hoàng Phúc",
    "pahopu",
  ],
  authors: [
    { name: "Pham Hoang Phuc", url: "https://pahopu-portfolio.vercel.app" },
  ],
  creator: "Pham Hoang Phuc",

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
    url: "https://pahopu-portfolio.vercel.app",
    title: "pahopu — Front-End Developer",
    description:
      "2+ years building large-scale ERP systems and healthcare platforms. Vue 3 & React specialist with a strong CS foundation. Currently employed, open to connect.",
    siteName: "pahopu",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "pahopu — Front-End Developer" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "pahopu | Front-End Developer",
    description:
      "2+ years building ERP systems & healthcare platforms. Vue 3 & React specialist. CS grad (GPA 9.14).",
    creator: "@pahopu",
    images: ["/opengraph-image"],
  },

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/icon",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "vi")) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          nunito.variable,
          geistMono.variable,
          "font-sans antialiased bg-background text-foreground"
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <DynamicFavicon />
            <ScrollProgress />
            <Navbar />
            <main className="pt-16 min-h-screen text-foreground">{children}</main>
            <FloatingMusicPlayer />
            <EasterEgg />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
