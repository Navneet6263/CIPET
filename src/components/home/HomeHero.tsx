import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check, FlaskConical, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const stages = [
  { label: "Select service", state: "done" },
  { label: "Request & documents", state: "done" },
  { label: "Schedule / sample", state: "done" },
  { label: "Track job", state: "current" },
  { label: "Receive report", state: "upcoming" },
  { label: "Billing & payment", state: "upcoming" },
  { label: "Dispatch / close", state: "upcoming" },
] as const;

export function HomeHero() {
  return (
    <section className="overflow-hidden border-b border-slate-200 bg-[#f8f6f1]">
      <div className="relative min-h-[520px] min-w-0 bg-[linear-gradient(90deg,#f8f6f1_0%,#f8f6f1_38%,rgba(248,246,241,.72)_54%,rgba(248,246,241,.05)_78%),url('/images/lucknow-lab-hero.png')] bg-cover bg-[68%_center] max-sm:bg-[linear-gradient(90deg,rgba(248,246,241,.95),rgba(248,246,241,.68)),url('/images/lucknow-lab-hero.png')] max-sm:bg-[66%_center]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="relative z-10 w-full min-w-0 max-w-[590px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-700/20 bg-white/75 px-3 py-1.5 text-xs font-semibold text-cyan-800 backdrop-blur">
              <span className="size-1.5 rounded-full bg-cyan-600" /> Lucknow Centre
            </span>
            <p className="mt-7 text-xs font-bold tracking-[0.18em] text-blue-700 uppercase">
              Industry services · Product vision
            </p>
            <h1 className="mt-3 max-w-[calc(100vw-2.5rem)] text-[2.55rem] leading-[1.02] font-bold tracking-[-0.035em] text-[#0a2347] sm:max-w-none sm:text-6xl">
              One request. Every service stage. Complete visibility.
            </h1>
            <p className="mt-6 max-w-[calc(100vw-2.5rem)] text-base leading-7 text-slate-600 sm:max-w-xl sm:text-lg">
              Plan testing, submit samples and follow progress with the CIPET Lucknow service team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Create service request <ArrowRight />
                </Button>
              </Link>
              <Link
                to="/track/$bookingId"
                params={{ bookingId: "CIP-LKO-26091" }}
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full bg-white/75">
                  <PlayCircle /> View demo tracking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f3f5f7]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-[0_12px_35px_rgba(15,35,65,0.06)] sm:px-7">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
                  Live service status
                </p>
                <h2 className="mt-1 text-xl font-bold text-[#0a2347]">Industry service workflow</h2>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700">
                <span className="size-2 animate-pulse rounded-full bg-blue-600" /> Stage 4 of 7
              </span>
            </div>

            <ol className="grid md:grid-cols-7">
              {stages.map(({ label, state }, index) => (
                <li
                  key={label}
                  className="relative flex min-h-16 items-start gap-3 pb-4 last:pb-0 md:block md:min-h-0 md:pb-0 md:text-center"
                >
                  {index < stages.length - 1 && (
                    <span
                      className={`absolute top-11 bottom-0 left-[23px] w-px md:top-6 md:bottom-auto md:left-1/2 md:h-px md:w-full ${index < 3 ? "bg-blue-600" : "bg-slate-300"}`}
                    />
                  )}
                  <span
                    className={`relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 text-xs font-bold md:mx-auto ${state === "done" ? "border-blue-600 bg-blue-600 text-white" : state === "current" ? "border-blue-600 bg-white text-blue-700 shadow-[0_0_0_6px_rgba(37,99,235,0.10)]" : "border-slate-300 bg-white text-slate-400"}`}
                  >
                    {state === "done" ? (
                      <Check className="size-5" />
                    ) : state === "current" ? (
                      <FlaskConical className="size-5" />
                    ) : (
                      `0${index + 1}`
                    )}
                  </span>
                  <span
                    className={`mt-1 block max-w-32 pt-2 text-sm leading-5 font-semibold md:mx-auto ${state === "current" ? "text-blue-700" : "text-slate-700"}`}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-7 grid gap-3 border-t border-slate-200 pt-5 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
              <div>
                <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  Demo request
                </p>
                <p className="mt-1 font-bold text-[#0a2347]">CIP-LKO-26091 · Tensile testing</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                <span className="size-2 rounded-full bg-blue-600" /> Testing in progress
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-slate-600">
                <CalendarDays className="size-4" /> Expected report 05 Sep
              </span>
              <Link
                to="/track/$bookingId"
                params={{ bookingId: "CIP-LKO-26091" }}
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
              >
                Open request <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
