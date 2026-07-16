import { MarketingHero, CtaPrimary, CtaSecondary } from "@/components/marketing-sections";

export default function NotFound() {
  return (
    <MarketingHero
      eyebrow="404"
      title="This page isn't cast."
      subtitle="The link you followed doesn't match anything here. Head back to the roster or the homepage."
    >
      <CtaPrimary href="/">Back to homepage</CtaPrimary>
      <CtaSecondary href="/discover">Explore the roster</CtaSecondary>
    </MarketingHero>
  );
}
