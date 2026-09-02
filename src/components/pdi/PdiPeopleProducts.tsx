import { Plus, Trash2, UserRound } from "lucide-react";
import type { PdiDraft, PersonDraft, ProductDraft } from "@/components/pdi/PdiDraft";
import { PRODUCT_STANDARDS } from "@/components/pdi/PdiDraft";
import { PdiField, PdiSelect, PdiTitle } from "@/components/pdi/PdiFields";
import { Button } from "@/components/ui/button";

type Props = { draft: PdiDraft; update: (patch: Partial<PdiDraft>) => void };

export function PdiPeopleProducts({ step, draft, update }: Props & { step: number }) {
  return step === 2 ? (
    <Personnel draft={draft} update={update} />
  ) : (
    <Products draft={draft} update={update} />
  );
}

function PersonFields({
  title,
  value,
  onChange,
}: {
  title: string;
  value: PersonDraft;
  onChange: (value: PersonDraft) => void;
}) {
  const set = (patch: Partial<PersonDraft>) => onChange({ ...value, ...patch });
  return (
    <section className="border-t border-slate-200 pt-5">
      <h3 className="flex items-center gap-2 text-sm font-bold text-[#0a2347]">
        <UserRound className="size-4 text-blue-700" /> {title}
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <PdiField label={`${title} name *`} value={value.name} onChange={(name) => set({ name })} />
        <PdiField
          label={`${title} designation *`}
          value={value.designation}
          onChange={(designation) => set({ designation })}
        />
        <PdiField
          label={`${title} contact number *`}
          value={value.contact}
          onChange={(contact) => set({ contact })}
        />
        <PdiField
          label={`${title} email *`}
          type="email"
          value={value.email}
          onChange={(email) => set({ email })}
        />
      </div>
    </section>
  );
}

function Personnel({ draft, update }: Props) {
  const setAuthority = (patch: Partial<typeof draft.authority>) =>
    update({ authority: { ...draft.authority, ...patch } });
  return (
    <div>
      <PdiTitle
        number={3}
        title="Authority and key personnel"
        text="Add the people responsible for approvals, quality, operations and business coordination."
      />
      <div className="mt-6 rounded-md border border-blue-100 bg-blue-50/60 p-5">
        <h3 className="text-sm font-bold text-[#0a2347]">Head or authorised signatory</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <PdiField
            label="Authority name *"
            value={draft.authority.name}
            onChange={(name) => setAuthority({ name })}
          />
          <PdiField
            label="Authority designation *"
            value={draft.authority.designation}
            onChange={(designation) => setAuthority({ designation })}
          />
          <PdiField
            label="Authority contact number *"
            value={draft.authority.contact}
            onChange={(contact) => setAuthority({ contact })}
          />
          <PdiField
            label="Authority email *"
            type="email"
            value={draft.authority.email}
            onChange={(email) => setAuthority({ email })}
          />
          <div className="sm:col-span-2">
            <PdiField
              label="Company website"
              value={draft.authority.website}
              onChange={(website) => setAuthority({ website })}
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-6">
        <PersonFields
          title="Quality head"
          value={draft.qualityHead}
          onChange={(qualityHead) => update({ qualityHead })}
        />
        <PersonFields
          title="Plant head"
          value={draft.plantHead}
          onChange={(plantHead) => update({ plantHead })}
        />
        <PersonFields
          title="Marketing / business head"
          value={draft.businessHead}
          onChange={(businessHead) => update({ businessHead })}
        />
      </div>
    </div>
  );
}

function Products({ draft, update }: Props) {
  const updateProduct = (id: number, patch: Partial<ProductDraft>) =>
    update({
      products: draft.products.map((product) =>
        product.id === id ? { ...product, ...patch } : product,
      ),
    });
  const addProduct = () =>
    update({
      products: [
        ...draft.products,
        { id: Date.now(), name: "", standards: [], capacity: "", unit: "Tonnes / year" },
      ],
    });

  return (
    <div>
      <PdiTitle
        number={4}
        title="Products and applicable standards"
        text="Map each manufactured product to the standards and annual production capacity."
      />
      <div className="mt-6 space-y-5">
        {draft.products.map((product, index) => {
          const standards = PRODUCT_STANDARDS[product.name] ?? [];
          return (
            <section key={product.id} className="rounded-md border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-blue-700 uppercase">
                    Product {index + 1}
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-[#0a2347]">
                    {product.name || "Select a product category"}
                  </h3>
                </div>
                {draft.products.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      update({ products: draft.products.filter((item) => item.id !== product.id) })
                    }
                  >
                    <Trash2 /> Remove
                  </Button>
                )}
              </div>
              <div className="mt-5">
                <PdiSelect
                  label="Name of product *"
                  value={product.name}
                  onChange={(name) => updateProduct(product.id, { name, standards: [] })}
                  options={Object.keys(PRODUCT_STANDARDS)}
                  placeholder="Choose a product category"
                />
              </div>
              {product.name && (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-[#0a2347]">Applicable standards *</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {standards.map((standard) => {
                      const selected = product.standards.includes(standard);
                      return (
                        <button
                          type="button"
                          key={standard}
                          onClick={() =>
                            updateProduct(product.id, {
                              standards: selected
                                ? product.standards.filter((item) => item !== standard)
                                : [...product.standards, standard],
                            })
                          }
                          className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                            selected
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                          }`}
                        >
                          {standard}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <PdiField
                  label="Annual production capacity *"
                  value={product.capacity}
                  onChange={(capacity) => updateProduct(product.id, { capacity })}
                  placeholder="e.g. 2,500"
                />
                <PdiSelect
                  label="Capacity unit *"
                  value={product.unit}
                  onChange={(unit) => updateProduct(product.id, { unit })}
                  options={["Tonnes / year", "Units / year", "Kilometres / year"]}
                />
              </div>
            </section>
          );
        })}
      </div>
      <Button variant="outline" className="mt-5" onClick={addProduct}>
        <Plus /> Add another product
      </Button>
    </div>
  );
}
