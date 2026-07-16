"use client";

// Minimal Providers for the static landing. The main app's providers.tsx also
// wires QueryClientProvider (react-query) + useUserStore rehydration + a readable
// -mode provider — none of which the landing content uses — so only next-themes
// is kept here (the marketing palette has a full dark variant in globals.css).
import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
