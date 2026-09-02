import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, ChevronDown, MapPin, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { USER_PROFILE } from "@/MOCK_DATA";

const links = [
  { to: "/services", label: "Services" },
  { to: "/dashboard", label: "Requests" },
  { to: "/bookings-history", label: "Tracking" },
  { to: "/notifications", label: "Reports" },
  { to: "/admin/dashboard", label: "Operations" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 overflow-x-clip border-b border-slate-200 bg-white/95 text-slate-900 shadow-[0_1px_10px_rgba(15,35,65,0.06)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-4 px-4 sm:px-6">
        <Link to="/portal" className="flex min-w-0 shrink items-center gap-2.5 overflow-hidden">
          <span className="h-7 w-1 rounded-full bg-cyan-400" />
          <span className="min-w-0 truncate text-lg font-bold tracking-tight sm:text-xl">
            CIPET{" "}
            <span className="hidden font-medium text-slate-500 min-[360px]:inline">
              ServiceFlow
            </span>
          </span>
        </Link>

        <span className="ml-3 hidden items-center gap-1.5 border-l border-slate-200 pl-5 text-xs text-slate-500 md:flex">
          <MapPin className="size-3.5 text-cyan-600" /> Lucknow Centre{" "}
          <ChevronDown className="size-3.5" />
        </span>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-700"
              activeProps={{ className: "bg-blue-50 text-blue-700" }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/track/$bookingId" params={{ bookingId: "CIP-LKO-26091" }}>
            <Button
              variant="outline"
              size="sm"
              className="ml-2 border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            >
              Track request
            </Button>
          </Link>
          <Link to="/services">
            <Button size="sm" className="ml-1 bg-blue-600 text-white hover:bg-blue-500">
              New request
            </Button>
          </Link>
          <Link to="/notifications" aria-label="Notifications" className="relative ml-1 p-2">
            <Bell className="size-4 text-slate-500" />
            <span className="absolute top-1 right-1 size-2 rounded-full bg-amber-400" />
          </Link>
          <Link to="/profile" aria-label={`${USER_PROFILE.name} profile`} className="p-2">
            <User className="size-4 text-slate-500" />
          </Link>
        </nav>

        <button
          className="ml-auto shrink-0 rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          {[...links, { to: "/profile", label: "Profile" }].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:text-blue-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
