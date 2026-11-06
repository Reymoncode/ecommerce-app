import { Check, Plus } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';

// Pick any number of extras. Each row shows a plus that turns into a check when picked.
// Out-of-stock toppings stay visible but disabled, with the word "Out" (not just a faded row).
// ink on surface 16.93:1 · ink-muted on surface 6.99:1 · disabled rows are inactive controls (exempt from AA)
export function ToppingGroup({ toppings, selectedIds, onToggle, disabled = false }) {
  return (
    <fieldset>
      <legend className="text-body font-semibold text-ink">
        Extra toppings <span className="ml-1 text-small font-normal text-ink-muted">Optional</span>
      </legend>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
        {toppings.map((topping) => {
          const out = !topping.isAvailable;
          const isDisabled = disabled || out;
          return (
            <li key={topping._id}>
              <label
                className={`group relative flex min-h-tap items-center gap-3 rounded-xl border p-3 transition-colors duration-fast ease-out has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-forest ${
                  isDisabled
                    ? 'cursor-not-allowed border-border bg-disabled text-disabled-fg'
                    : 'cursor-pointer border-border-strong bg-surface text-ink hover:bg-surface-hover has-checked:border-forest has-checked:ring-2 has-checked:ring-forest'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(topping._id)}
                  onChange={() => onToggle(topping._id)}
                  disabled={isDisabled}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-current group-has-checked:border-forest group-has-checked:bg-forest group-has-checked:text-parchment"
                >
                  <Plus className="size-4 group-has-checked:hidden" />
                  <Check className="hidden size-4 group-has-checked:block" />
                </span>
                <span className="flex-1 text-body font-medium">{topping.name}</span>
                <span className={`price text-small ${out ? '' : 'text-ink-muted'}`}>
                  {out ? 'Out' : `+${formatPrice(topping.price)}`}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export default ToppingGroup;