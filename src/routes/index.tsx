import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingJourney } from "@/components/landing/LandingJourney";
import { LandingOperationsPreview } from "@/components/landing/LandingOperationsPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CIPET ServiceFlow — Choose Workspace" },
      {
        name: "description",
        content: "Choose the customer or operations workspace for the CIPET Lucknow product demo.",
      },
    ],
  }),
  component: EntryLanding,
});

function EntryLanding() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHero />
      <LandingJourney />
      <LandingOperationsPreview />
      <Footer />
    </div>
  );
}
