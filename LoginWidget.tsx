import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AdminAuthProvider } from "@/components/AdminAuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { profile } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "700"],
});

const siteUrl = "https://portfolio.vercel.app"; // TODO: replace with your actual Vercel deployment URL

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary,
  keywords: [
    "Joyal Xavier",
    "Embedded Systems Engineer",
    "IoT Developer",
    "ESP32",
    "Arduino",
    "Electronics and Communication Engineering",
    "Portfolio",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-copper-400/30`}
      >
        <ThemeProvider>
          <AdminAuthProvider>
            <ScrollProgress />
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
          </AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
