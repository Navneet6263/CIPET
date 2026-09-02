import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  FileBarChart,
  Gauge,
  LogOut,
  Menu,
  PackageCheck,
  Settings,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const operations = [
  { to: "/admin/registrations", label: "PDI registrations", icon: Building2 },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/admin/samples", label: "Sample flow", icon: PackageCheck },
  { to: "/admin/equipment", label: "Equipment", icon: Wrench },
] as const;

const insights = [
  { to: "/admin/analytics", label: "Centre performance", icon: BarChart3 },
  { to: "/admin/reports", label: "Operational reports", icon: FileBarChart },
] as const;

const mobileLinks = [
  { to: "/admin/dashboard", label: "Overview", icon: Gauge },
  ...operations,
  ...insights,
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function NavDropdown({
  label,
  links,
}: {
  label: string;
  links: typeof operations | typeof insights;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-slate-600 outline-none transition hover:bg-slate-100 hover:text-blue-700 data-[state=open]:bg-blue-50 data-[state=open]:text-blue-700">
        {label} <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 p-2">
        <DropdownMenuLabel className="text-[10px] tracking-[0.14em] text-slate-400 uppercase">
          {label}
        </DropdownMenuLabel>
        {links.map(({ to, label: itemLabel, icon: Icon }) => (
          <DropdownMenuItem key={to} asChild className="p-0">
            <Link
              to={to}
              className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-sm text-slate-600"
              activeProps={{ className: "bg-blue-50 font-semibold text-blue-700" }}
            >
              <Icon className="size-4" /> {itemLabel}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AdminNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-[0_1px_10px_rgba(15,35,65,0.05)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 sm:px-6">
        <Link to="/admin/dashboard" className="flex shrink-0 items-center gap-2.5">
          <span className="h-7 w-1 rounded-full bg-cyan-500" />
          <span className="text-lg font-bold text-[#0a2347]">
            CIPET <span className="hidden font-medium text-slate-500 sm:inline">ServiceFlow</span>
          </span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="ml-3 hidden items-center gap-2 border-l border-slate-200 py-2 pl-5 text-xs font-semibold text-[#0a2347] outline-none md:flex">
            Lucknow Centre <ChevronDown className="size-3.5 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60 p-2">
            <DropdownMenuLabel>Active operations centre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-blue-50 text-blue-700">Lucknow Centre</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          <Link
            to="/admin/dashboard"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-blue-700"
            activeProps={{ className: "bg-blue-50 text-blue-700" }}
          >
            Overview
          </Link>
          <NavDropdown label="Operations" links={operations} />
          <NavDropdown label="Insights" links={insights} />
          <Link
            to="/admin/settings"
            className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-blue-700"
            activeProps={{ className: "bg-blue-50 text-blue-700" }}
          >
            Settings
          </Link>
          <Link
            to="/portal"
            className="ml-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Customer portal
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-blue-600" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden items-center gap-2 rounded-md p-1.5 text-left outline-none hover:bg-slate-100 sm:flex">
              <span className="grid size-8 place-items-center rounded-full bg-[#0a2347] text-[10px] font-bold text-white">
                AK
              </span>
              <span className="hidden text-xs xl:block">
                <strong className="block text-[#0a2347]">Anil Kumar</strong>
                <span className="text-slate-400">Centre admin</span>
              </span>
              <ChevronDown className="size-3.5 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 p-2">
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <UserRound /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/">
                  <LogOut /> Exit operations
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle admin navigation"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-2xl gap-1 sm:grid-cols-2">
            {mobileLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100"
                activeProps={{ className: "bg-blue-50 font-semibold text-blue-700" }}
              >
                <Icon className="size-4" /> {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
