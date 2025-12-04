import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    icon: "/icon",
    shortcut: "/icon",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "font-sans antialiased bg-background text-foreground"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <Navbar />
          <main className="pt-16 min-h-screen text-foreground">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
