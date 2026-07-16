import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Agencies & Brands | Inflique",
  description:
    "Discover creators, brief a campaign, shortlist applicants, and track what went live: the whole workflow, in one directory.",
};

export default function AgenciesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
