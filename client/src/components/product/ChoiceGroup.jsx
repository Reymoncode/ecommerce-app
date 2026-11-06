import { formatPrice } from '../../utils/formatPrice';

// Pick exactly one (size, crust). Native radio buttons, so arrow keys and screen readers just work.
// The selected card gets a thicker forest ring AND a filled dot, so it never relies on colour alone.
// Card edge border-strong 3.47:1 (UI boundary) · ink-muted on surface 6.99:1
export function ChoiceGroup({ legend, name, choices, value, onChange, disabled = false }) {
  return (
    <fieldset>
      <legend className="text-body font-semibold text-ink">
        {legend} <span className="ml-1 text-small font-normal text-ink-muted">Choose one</span>
      </legend>
      {/* 3 across only where the column is wide enough (wide phones, and 1280px+); a single column in between */}
      <div className="mt-3 grid gap-3 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
        {choices.map((choice) => (
          <label
            key={choice._id}
            className="relative flex min-h-tap cursor-pointer items-start gap-3 rounded-xl border border-border-strong bg-surface p-4 transition-colors duration-fast ease-out hover:bg-surface-hover has-checked:border-forest has-checked:ring-2 has-checked:ring-forest has-disabled:cursor-not-allowed has-disabled:opacity-60 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-forest"
          >
            <input
              type="radio"
              name={name}
              value={choice._id}
              checked={value === choice._id}
              onChange={() => onChange(choice._id)}
              disabled={disabled}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-border-strong peer-checked:border-forest peer-checked:*:opacity-100"
            >
              <span className="size-2.5 rounded-full bg-forest opacity-0" />
            </span>
            <span>
              <span className="block text-body font-semibold text-ink">{choice.name}</span>
              <span className="block text-small text-ink-muted">
                {choice.priceDelta > 0 ? `+${formatPrice(choice.priceDelta)}` : 'Included'}
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default ChoiceGroup;