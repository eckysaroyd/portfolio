import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { EbotWidget } from "@/components/EbotWidget";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0a0a0a"  },
  ],
};

export const metadata: Metadata = {
  title: "Eckysaroyd Nyato - Full Stack Developer & AI Automation Engineer",
  description:
    "Full Stack Web Developer specializing in MERN, Laravel, Next.js, and Supabase. Building scalable web applications that drive business growth.",
  keywords: [
    "Full Stack Developer",
    "MERN",
    "Laravel",
    "Next.js",
    "React",
    "Node.js",
  ],
  icons: {
    icon: [{ url: "/images/favicon.svg", type: "image/svg+xml" }],
    apple: "/images/en-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-background text-foreground font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          storageKey="ecky-portfolio-theme"
          disableTransitionOnChange
        >
          <Header />
          {children}
          <EbotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
