import { createFileRoute } from "@tanstack/react-router";
import { Save, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminShell } from "@/components/PageShell";
import { TIME_SLOTS } from "@/MOCK_DATA";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Lab Settings — CIPET Lab Admin" },
      {
        name: "description",
        content:
          "Configure laboratory profile, capacity, appointment slots, staff accounts and notification templates.",
      },
      { property: "og:title", content: "CIPET Lab Settings" },
      { property: "og:description", content: "Laboratory configuration and staff management." },
    ],
  }),
  component: AdminSettings,
});

const staff = [
  { name: "Dr. Rakesh Menon", role: "Lab In-charge", email: "rakesh.menon@cipet.demo" },
  { name: "Sunita Rao", role: "Senior Technician", email: "sunita.rao@cipet.demo" },
  { name: "Imran Shaikh", role: "Technician", email: "imran.shaikh@cipet.demo" },
  { name: "Neha Gupta", role: "Report Desk", email: "neha.gupta@cipet.demo" },
];

function AdminSettings() {
  return (
    <AdminShell
      title="Settings"
      description="Laboratory configuration, staff and notifications"
      actions={
        <Button onClick={() => toast.success("Settings saved")}>
          <Save /> Save Changes
        </Button>
      }
    >
      <Tabs defaultValue="lab">
        <TabsList>
          <TabsTrigger value="lab">Lab profile</TabsTrigger>
          <TabsTrigger value="capacity">Capacity &amp; slots</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="notify">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="lab" className="mt-6">
          <div className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="labname">Laboratory name</Label>
              <Input id="labname" defaultValue="CIPET Lucknow Industry Services Centre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="labcode">Lab code</Label>
              <Input id="labcode" defaultValue="CIPET-DEL-01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact number</Label>
              <Input id="phone" defaultValue="+91 11 2696 1234" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Official email</Label>
              <Input id="email" defaultValue="services.lucknow@cipet.demo" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                rows={3}
                defaultValue="Amausi Industrial Area, Lucknow 226008"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="capacity" className="mt-6">
          <div className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="daily">Daily sample capacity</Label>
              <Input id="daily" type="number" defaultValue={40} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="perslot">Samples per slot</Label>
              <Input id="perslot" type="number" defaultValue={6} />
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-foreground">Available appointment slots</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {TIME_SLOTS.map((slot) => (
                  <label
                    key={slot}
                    className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-foreground">{slot}</span>
                    <Switch defaultChecked />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="mt-6">
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-border p-5">
              <h2 className="font-semibold text-foreground">Staff accounts</h2>
              <Button size="sm" onClick={() => toast.success("Invitation sent")}>
                <UserPlus /> Add Staff
              </Button>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-[10px] tracking-wide text-slate-400 uppercase">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {staff.map((s) => (
                  <tr key={s.email} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-medium text-foreground">{s.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.role}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.email}</td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.success(`${s.name} updated`)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="notify" className="mt-6">
          <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-6">
            {[
              ["Email notifications", "Send report-ready and status emails to customers"],
              ["SMS alerts", "Send SMS for sample received and report ready"],
              ["WhatsApp updates", "Send tracking updates on WhatsApp"],
              [
                "Daily digest to lab in-charge",
                "Summary of appointments, samples and revenue at 7 PM",
              ],
            ].map(([title, desc]) => (
              <label
                key={title}
                className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">{title}</span>
                  <span className="block text-xs text-muted-foreground">{desc}</span>
                </span>
                <Switch defaultChecked />
              </label>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AdminShell>
  );
}
