import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Inflique",
  description:
    "From first search to tracked results — how brands, agencies, and creators each move through Inflique's casting directory.",
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
