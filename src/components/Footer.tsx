import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-300 bg-[#e8ebef] text-slate-800">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="text-xl font-bold">
            CIPET <span className="font-medium text-slate-500">ServiceFlow</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
            A product vision for connected industry services, from request intake to report-ready
            records.
          </p>
          <p className="mt-6 text-xs font-semibold text-blue-700">
            Product vision demo • Illustrative Lucknow data
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Lucknow centre
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-blue-700" /> Amausi Industrial Area,
              Lucknow — 226008
            </li>
            <li className="flex gap-2">
              <Phone className="size-4 shrink-0" /> +91 522 243 6227
            </li>
            <li className="flex gap-2">
              <Mail className="size-4 shrink-0" /> services.lucknow@cipet.demo
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Explore
          </p>
          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            <Link to="/services" className="flex items-center gap-1 hover:text-blue-700">
              Service catalogue <ArrowUpRight className="size-3.5" />
            </Link>
            <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-700">
              Customer requests <ArrowUpRight className="size-3.5" />
            </Link>
            <Link to="/admin/dashboard" className="flex items-center gap-1 hover:text-blue-700">
              Operations console <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-300 px-5 py-4 text-center text-xs text-slate-500">
        Demo interface for presentation and evaluation only.
      </div>
    </footer>
  );
}
