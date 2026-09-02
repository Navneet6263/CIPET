import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "#product", label: "Product" },
  { href: "#journey", label: "How it works" },
  { href: "#operations", label: "For centres" },
  { href: "#payment", label: "Payment flow" },
];

export function LandingHero() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="h-7 w-1 rounded-full bg-cyan-500" />
            <span className="text-lg font-bold text-[#0a2347]">
              CIPET <span className="font-medium text-slate-500">ServiceFlow</span>
            </span>
          </Link>
          <nav className="ml-auto hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-xs font-semibold text-slate-600">
                {item.label}
              </a>
            ))}
          </nav>
          <span className="hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
            <MapPin className="size-3.5 text-cyan-600" /> Lucknow Centre
          </span>
        </div>
      </header>

      <section id="product" className="overflow-hidden border-b border-slate-200 bg-[#f8f6f1]">
        <div className="relative mx-auto min-h-[600px] max-w-[1600px] bg-[linear-gradient(90deg,#f8f6f1_0%,#f8f6f1_42%,rgba(248,246,241,.64)_58%,rgba(248,246,241,.04)_82%),url('/images/lucknow-lab-hero.png')] bg-cover bg-[72%_center] max-sm:bg-[linear-gradient(90deg,rgba(248,246,241,.96),rgba(248,246,241,.66)),url('/images/lucknow-lab-hero.png')]">
          <div className="mx-auto flex min-h-[600px] max-w-7xl items-center px-5 py-16 sm:px-6">
            <div className="relative z-10 max-w-2xl">
              <p className="text-xs font-bold tracking-[0.18em] text-blue-700 uppercase">
                Welcome to ServiceFlow
              </p>
              <h1 className="mt-4 text-4xl leading-[1.04] font-bold tracking-[-0.04em] text-[#0a2347] sm:text-6xl">
                From service request to verified report — one connected journey.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Connect industry clients and centre teams through one clear flow for requests,
                sample tracking, testing, reporting and payment.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/portal">
                  <Button size="lg">
                    Enter customer portal <ArrowRight />
                  </Button>
                </Link>
                <Link to="/admin/dashboard">
                  <Button size="lg" variant="outline" className="bg-white/80">
                    Open operations console <ArrowRight />
                  </Button>
                </Link>
              </div>
              <div className="mt-10 grid max-w-2xl gap-4 border-t border-slate-300 pt-6 sm:grid-cols-3">
                {[
                  [CheckCircle2, "Traceable workflow", "Every milestone visible"],
                  [Clock3, "Reliable turnaround", "Clear service timelines"],
                  [ShieldCheck, "Controlled access", "Role-based workspaces"],
                ].map(([Icon, title, text]) => {
                  const ItemIcon = Icon as typeof CheckCircle2;
                  return (
                    <div key={String(title)} className="flex gap-2.5">
                      <ItemIcon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      <span>
                        <strong className="block text-xs text-[#0a2347]">{String(title)}</strong>
                        <span className="text-[11px] text-slate-500">{String(text)}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
