import { Copy, Factory, UserRound } from "lucide-react";
import type { AddressDraft, PdiDraft } from "@/components/pdi/PdiDraft";
import { PdiField, PdiSelect, PdiTitle } from "@/components/pdi/PdiFields";

type Props = { draft: PdiDraft; update: (patch: Partial<PdiDraft>) => void };

export function PdiApplicantUnit({ step, draft, update }: Props & { step: number }) {
  if (step === 0) return <Applicant draft={draft} update={update} />;
  return <UnitAddresses draft={draft} update={update} />;
}

function Applicant({ draft, update }: Props) {
  const person = draft.applicant;
  const set = (patch: Partial<typeof person>) => update({ applicant: { ...person, ...patch } });
  return (
    <div>
      <PdiTitle
        number={1}
        title="Your information"
        text="Identify the person responsible for this registration."
      />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <PdiField label="Full name *" value={person.name} onChange={(name) => set({ name })} />
        <PdiField
          label="Designation *"
          value={person.designation}
          onChange={(designation) => set({ designation })}
        />
        <PdiField
          label="Mobile number *"
          value={person.contact}
          onChange={(contact) => set({ contact })}
        />
        <PdiField
          label="Email address *"
          type="email"
          value={person.email}
          onChange={(email) => set({ email })}
        />
      </div>
      <div className="mt-6 flex gap-3 rounded-md border border-blue-100 bg-blue-50 p-4">
        <UserRound className="size-5 shrink-0 text-blue-700" />
        <p className="text-xs leading-5 text-slate-600">
          This person will receive registration updates, clarification requests and the final
          decision.
        </p>
      </div>
    </div>
  );
}

function AddressBlock({
  title,
  value,
  onChange,
}: {
  title: string;
  value: AddressDraft;
  onChange: (value: AddressDraft) => void;
}) {
  const set = (patch: Partial<AddressDraft>) => onChange({ ...value, ...patch });
  return (
    <section className="border-t border-slate-200 pt-5">
      <h3 className="text-sm font-bold text-[#0a2347]">{title}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <PdiField
          label={`${title} address 1 *`}
          value={value.line1}
          onChange={(line1) => set({ line1 })}
          placeholder="Plot number and street"
        />
        <PdiField
          label={`${title} address 2`}
          value={value.line2}
          onChange={(line2) => set({ line2 })}
          placeholder="Area or landmark"
        />
        <PdiField
          label={`${title} city / town *`}
          value={value.city}
          onChange={(city) => set({ city })}
        />
        <PdiField
          label={`${title} district *`}
          value={value.district}
          onChange={(district) => set({ district })}
        />
        <PdiSelect
          label={`${title} state *`}
          value={value.state}
          onChange={(state) => set({ state })}
          options={["Uttar Pradesh", "Delhi", "Haryana", "Madhya Pradesh", "Rajasthan", "Other"]}
        />
        <PdiField
          label={`${title} PIN code *`}
          value={value.pin}
          onChange={(pin) => set({ pin })}
        />
      </div>
    </section>
  );
}

function CopyToggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-blue-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-blue-600"
      />
      <Copy className="size-3.5" /> {label}
    </label>
  );
}

function UnitAddresses({ draft, update }: Props) {
  return (
    <div>
      <PdiTitle
        number={2}
        title="Manufacturing unit and addresses"
        text="Add the legal unit details and operating locations."
      />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <PdiField
          label="Manufacturing unit name *"
          value={draft.unitName}
          onChange={(unitName) => update({ unitName })}
        />
        <PdiSelect
          label="Year of establishment *"
          value={draft.establishmentYear}
          onChange={(establishmentYear) => update({ establishmentYear })}
          options={["Before 2000", "2000–2009", "2010–2019", "2020–2026"]}
        />
      </div>
      <div className="mt-6 flex gap-3 rounded-md bg-slate-50 p-4">
        <Factory className="size-5 text-blue-700" />
        <p className="text-xs leading-5 text-slate-600">
          Use the address where manufacturing and product inspection activities take place.
        </p>
      </div>
      <div className="mt-6">
        <AddressBlock
          title="Factory"
          value={draft.factory}
          onChange={(factory) => update({ factory })}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <CopyToggle
          checked={draft.corporateSame}
          label="Corporate office same as factory"
          onChange={(corporateSame) =>
            update({ corporateSame, corporate: corporateSame ? draft.factory : draft.corporate })
          }
        />
      </div>
      {!draft.corporateSame && (
        <div className="mt-4">
          <AddressBlock
            title="Corporate office"
            value={draft.corporate}
            onChange={(corporate) => update({ corporate })}
          />
        </div>
      )}
      <div className="mt-6 flex justify-end">
        <CopyToggle
          checked={draft.registeredSame}
          label="Registered office same as corporate office"
          onChange={(registeredSame) =>
            update({
              registeredSame,
              registered: registeredSame
                ? draft.corporateSame
                  ? draft.factory
                  : draft.corporate
                : draft.registered,
            })
          }
        />
      </div>
      {!draft.registeredSame && (
        <div className="mt-4">
          <AddressBlock
            title="Registered office"
            value={draft.registered}
            onChange={(registered) => update({ registered })}
          />
        </div>
      )}
    </div>
  );
}
