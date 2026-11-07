import { Minus, Plus } from 'lucide-react';

const stepButton =
  'inline-flex size-11 items-center justify-center rounded-full border border-border-strong bg-surface text-ink transition-colors duration-fast ease-out hover:bg-surface-hover disabled:cursor-not-allowed disabled:border-border disabled:bg-disabled disabled:text-disabled-fg';

// 44px round buttons (touch target) around the number. The number is announced politely when it changes.
// itemName is for lists (the cart): it makes each stepper's labels unique, e.g. "Decrease quantity of Margherita".
export function QuantityStepper({ value, onChange, min = 1, max = 10, disabled = false, itemName }) {
  const of = itemName ? ` of ${itemName}` : '';
  return (
    <div role="group" aria-label={itemName ? `Quantity: ${itemName}` : 'Quantity'} className="inline-flex items-center gap-3">
      <button
        type="button"
        aria-label={`Decrease quantity${of}`}
        disabled={disabled || value <= min}
        onClick={() => onChange(value - 1)}
        className={stepButton}
      >
        <Minus className="size-5" aria-hidden="true" />
      </button>
      <output aria-live="polite" className="price min-w-8 text-center text-lead font-semibold text-ink">
        {value}
      </output>
      <button
        type="button"
        aria-label={`Increase quantity${of}`}
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        className={stepButton}
      >
        <Plus className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export default QuantityStepper;