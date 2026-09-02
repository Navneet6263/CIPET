import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { HomeHero } from "@/components/home/HomeHero";
import { PortalAccess } from "@/components/home/PortalAccess";
import { ServiceExplorer } from "@/components/home/ServiceExplorer";
import { ValueStory } from "@/components/home/ValueStory";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "CIPET ServiceFlow — Lucknow Industry Services" },
      { name: "description", content: "One request, every service stage and complete visibility." },
    ],
  }),
  component: CustomerPortal,
});

function CustomerPortal() {
  return (
    <PageShell>
      <HomeHero />
      <PortalAccess />
      <ServiceExplorer />
      <ValueStory />
    </PageShell>
  );
}
