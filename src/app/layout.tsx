import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "pahopu | Front-end Developer",
  description:
    "Portfolio of a Front-end Developer specialized in React & Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning: Bắt buộc phải có khi dùng next-themes để tránh lỗi console */}
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system" // Hoặc "dark" nếu muốn mặc định tối
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {/* pt-16 để nội dung không bị Navbar đè lên */}
          <main className="pt-16 min-h-screen bg-background text-foreground">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
