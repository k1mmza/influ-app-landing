"use client";

// Only next-themes is wired up here. The main app's providers.tsx also sets up
// QueryClientProvider and useUserStore rehydration, but nothing on this static
// site needs either of those. The marketing palette already has a dark variant
// defined in globals.css.
import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
