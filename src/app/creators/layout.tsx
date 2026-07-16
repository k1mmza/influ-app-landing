import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Creators | Inflique",
  description:
    "Build a profile from your real numbers, apply to campaigns that fit, and keep a track record brands can trust.",
};

export default function CreatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
