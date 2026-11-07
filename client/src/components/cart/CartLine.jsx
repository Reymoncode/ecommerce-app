import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { ProductImage } from '../ProductImage';
import { QuantityStepper } from '../product/QuantityStepper';
import { MAX_QUANTITY } from '../../utils/cart';
import { formatPrice } from '../../utils/formatPrice';

// ink on surface 16.93:1 · ink-muted on surface 6.99:1 · ink-soft on surface 10.20:1
export function CartLine({ line, onQuantityChange, onRemove }) {
  const { name, slug, image, options, unitPrice, quantity } = line;
  // Two lines of the same pizza can differ only by their options, so the labels include them
  const label = options.length > 0 ? `${name} (${options.join(', ')})` : name;

  return (
    <li className="p-4 md:p-6">
      <div className="flex gap-4">
        {/* Decorative: the name link next to it already says what this is */}
        <div className="size-20 shrink-0 overflow-hidden rounded-xl md:size-24">
          <ProductImage src={image} alt="" className="size-full" />
        </div>

        <div className="min-w-0 flex-1">
          {/* flex-wrap: a long name takes the whole line and the price drops under it instead of squeezing both */}
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
            <h3 className="min-w-0 flex-auto font-heading text-h4 break-words text-ink">
              <Link
                to={`/menu/${slug}`}
                className="rounded-xl underline-offset-4 transition-colors duration-fast hover:text-forest hover:underline"
              >
                {name}
              </Link>
            </h3>
            <p className="price shrink-0 text-lead font-semibold text-ink">{formatPrice(unitPrice * quantity)}</p>
          </div>
          {options.length > 0 && <p className="mt-1 text-small text-ink-soft">{options.join(', ')}</p>}
          <p className="price mt-1 text-small text-ink-muted">{formatPrice(unitPrice)} each</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <QuantityStepper
          value={quantity}
          onChange={(next) => onQuantityChange(line.key, next)}
          max={MAX_QUANTITY}
          itemName={label}
        />
        <button
          type="button"
          onClick={() => onRemove(line)}
          aria-label={`Remove ${label} from cart`}
          className="inline-flex min-h-tap items-center gap-2 rounded-xl px-3 text-small font-semibold text-ink-soft underline-offset-4 transition-colors duration-fast hover:text-error hover:underline"
        >
          <Trash2 className="size-4" aria-hidden="true" />
          Remove
        </button>
      </div>
    </li>
  );
}

export default CartLine;