import { CheckCircle2, Clock, Loader2, PackageCheck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_LABEL, type Status } from "@/MOCK_DATA";

const styles: Record<Status, string> = {
  pending: "bg-muted text-muted-foreground border-border",
  "in-progress": "bg-warning/15 text-warning-foreground border-warning/40",
  ready: "bg-info/15 text-info border-info/40",
  completed: "bg-success/15 text-success border-success/40",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

const icons: Record<Status, typeof Clock> = {
  pending: Clock,
  "in-progress": Loader2,
  ready: PackageCheck,
  completed: CheckCircle2,
  cancelled: XCircle,
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const Icon = icons[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
        styles[status],
        className,
      )}
    >
      <Icon className={cn("size-3.5", status === "in-progress" && "animate-spin")} />
      {STATUS_LABEL[status]}
    </span>
  );
}
