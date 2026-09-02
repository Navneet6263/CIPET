import { Check, CircleDot, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { TimelineStep } from "@/MOCK_DATA";

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative divide-y divide-border">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={step.title} className="relative flex gap-4 py-5 first:pt-0 last:pb-0">
            {!isLast && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-8 left-[15px] h-full w-0.5",
                  step.state === "done" ? "bg-success" : "bg-border",
                )}
              />
            )}
            <span
              className={cn(
                "z-10 grid size-8 shrink-0 place-items-center rounded-full border-2",
                step.state === "done" && "border-success bg-success text-success-foreground",
                step.state === "current" && "border-warning bg-warning text-warning-foreground",
                step.state === "upcoming" && "border-border bg-card text-muted-foreground",
              )}
            >
              {step.state === "done" ? (
                <Check className="size-4" />
              ) : step.state === "current" ? (
                <CircleDot className="size-4 animate-pulse" />
              ) : (
                <Clock className="size-4" />
              )}
            </span>
            <div
              className={cn("min-w-0 flex-1 pt-1", step.state === "current" && "text-foreground")}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                <span className="text-xs text-muted-foreground">{step.timestamp}</span>
              </div>
              {step.detail && <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>}
              {typeof step.progress === "number" && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs font-medium text-foreground">
                    <span>Progress</span>
                    <span>{step.progress}%</span>
                  </div>
                  <Progress value={step.progress} className="mt-1.5 h-2" />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
