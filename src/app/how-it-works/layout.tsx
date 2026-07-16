import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Inflique",
  description:
    "How brands, agencies, and creators each move through Inflique's casting directory, from first search to tracked results.",
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
