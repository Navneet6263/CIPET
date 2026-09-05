import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WorkflowControls } from "@/components/WorkflowControls";
import { useDemoAppointments } from "@/lib/workflow-store";

export function ServiceWorkflowDialog({ id, onClose }: { id: string | null; onClose: () => void }) {
  const item = useDemoAppointments().find((record) => record.id === id);
  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{item?.id}</DialogTitle>
          <DialogDescription>
            {item?.service} · {item?.customer}
          </DialogDescription>
        </DialogHeader>
        {item && (
          <>
            <dl className="grid grid-cols-2 gap-3 text-xs">
              {[
                ["Sample", item.sampleId],
                ["Technician", item.technician],
                ["Centre", item.lab],
                ["Slot", item.time],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-slate-400">{label}</dt>
                  <dd className="mt-1 font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <WorkflowControls key={item.id} id={item.id} kind="service" />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
