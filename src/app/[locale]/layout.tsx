import { EasterEgg } from "@/components/shared/easter-egg";
import { DynamicFavicon } from "@/components/shared/dynamic-favicon";
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
    default: "pahopu | Software Engineer",
    template: "%s | pahopu",
  },
  description:
    "A high-performance engineering portfolio built with Next.js 15, TypeScript, and Tailwind CSS. Featuring scalable system architectures and technical case studies.",
  keywords: [
    "Software Engineer",
    "Front-End Engineer",
    "Next.js Developer",
    "React",
    "TypeScript",
    "Portfolio",
    "Pham Hoang Phuc",
    "pahopu",
  ],
  authors: [
    { name: "Pham Hoang Phuc", url: "https://pahopu-portfolio.vercel.app" },
  ],
  creator: "Pham Hoang Phuc",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pahopu-portfolio.vercel.app",
    title: "pahopu | Software Engineer & Front-End Specialist",
    description:
      "Showcasing large-scale ERP systems, AI integrations, and custom game engines. Built with an engineer's mindset.",
    siteName: "pahopu Portfolio",
  },

  twitter: {
    card: "summary_large_image",
    title: "pahopu | Software Engineer",
    description:
      "Building scalable web applications with Next.js & TypeScript.",
    creator: "@pahopu",
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
            <EasterEgg />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
