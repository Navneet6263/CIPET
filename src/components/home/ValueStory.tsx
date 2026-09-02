import { CheckSquare2, Clock3, FileStack } from "lucide-react";

const values = [
  {
    icon: CheckSquare2,
    title: "Clear requirements",
    text: "Guided inputs help capture the right service, method and sample details the first time.",
  },
  {
    icon: Clock3,
    title: "Visible turnaround",
    text: "A shared timeline keeps request owners informed from sample planning through delivery.",
  },
  {
    icon: FileStack,
    title: "Report-ready records",
    text: "Request documents, activity history and final deliverables stay connected in one place.",
  },
];

export function ValueStory() {
  return (
    <section className="overflow-hidden bg-white px-5 py-20 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.4fr]">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-cyan-700 uppercase">
            Connected by design
          </p>
          <h2 className="mt-3 text-4xl leading-tight font-bold text-[#0a2347]">
            Built around the work, not the paperwork.
          </h2>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            A single operating view for customers and service teams, designed to reduce follow-ups
            and make every next step clear.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="border-l border-slate-200 pl-6">
              <span
                className={`grid size-11 place-items-center rounded-full ${index === 1 ? "bg-cyan-50 text-cyan-700" : index === 2 ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}
              >
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-[#0a2347]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
