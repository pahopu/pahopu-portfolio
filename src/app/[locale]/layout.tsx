import { DeferredWidgets } from "@/components/shared/deferred-widgets";
import { DynamicFavicon } from "@/components/shared/dynamic-favicon";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Nunito, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
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

const SITE_URL = "https://pahopu-portfolio.vercel.app";
const OG_LOCALE: Record<string, string> = { en: "en_US", vi: "vi_VN" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const ogLocale = OG_LOCALE[locale] ?? OG_LOCALE.en;
  const alternateLocales = routing.locales
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE[l] ?? OG_LOCALE.en);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s | pahopu",
    },
    description: t("description"),
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
    authors: [{ name: "Pham Hoang Phuc", url: SITE_URL }],
    creator: "Pham Hoang Phuc",

    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}`])),
    },

    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: alternateLocales,
      url: SITE_URL,
      title: t("og_title"),
      description: t("og_description"),
      siteName: "pahopu",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: t("og_title") }],
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitter_description"),
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
}

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
            <DeferredWidgets />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
