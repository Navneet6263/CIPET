import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs font-semibold text-[#0a2347]">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-11 bg-white"
      />
    </div>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <Label className="text-xs font-semibold text-[#0a2347]">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-2 h-11 bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function SectionTitle({
  number,
  title,
  text,
}: {
  number: number;
  title: string;
  text: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#0a2347]">
        {number}. {title}
      </h2>
      <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}

export function InfoBox({ text }: { text: string }) {
  return (
    <div className="mt-6 flex gap-3 rounded-md border border-blue-100 bg-blue-50 p-4">
      <Info className="size-4 shrink-0 text-blue-700" />
      <p className="text-xs leading-5 text-slate-600">{text}</p>
    </div>
  );
}
