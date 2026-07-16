import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Space_Grotesk, DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { LandingNav } from "@/components/landing-nav";
import { SiteFooter } from "@/components/site-footer";

// Font wiring mirrors influ-app-frontend/src/app/layout.tsx so the marketing
// surface renders identically: Bricolage (--font-display) + Space Grotesk
// (--font-grotesk) carry the landing; Montserrat is the body face.
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Inflique — cast the right creator",
  description:
    "A casting directory for the creator economy — search creators by niche, reach, and audience, or paste a profile link and get real numbers back in seconds.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfair.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <Providers>
          {/* Reproduces the "A4" public layout from the main app's app-shell.tsx:
              top-nav + content + footer on the marketing paper canvas. */}
          <main className="flex min-h-screen flex-col bg-[var(--lp-paper)]">
            <div className="mx-auto w-full max-w-7xl px-4 pt-6">
              <LandingNav />
            </div>
            <div className="flex-1">{children}</div>
            <div className="mx-auto w-full max-w-6xl px-4 pb-6">
              <SiteFooter />
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
