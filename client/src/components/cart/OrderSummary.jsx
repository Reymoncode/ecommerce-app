import { Link } from 'react-router-dom';
import { Banknote } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import { formatPrice } from '../../utils/formatPrice';

// The page's one tomato button (surface on tomato 6.07:1).
// There is no "Total" line on purpose: the delivery fee is only known at checkout, and a total that
// changes later feels like a trick. The subtotal is exact; the delivery line says what is still open.
export function OrderSummary({ subtotal }) {
  return (
    <aside
      aria-labelledby="summary-heading"
      className="rounded-2xl border border-border bg-surface p-6 shadow-card lg:sticky lg:top-28"
    >
      <h2 id="summary-heading" className="font-heading text-h4 text-ink">
        Order summary
      </h2>

      <dl className="mt-5 space-y-3">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-body text-ink-soft">Subtotal</dt>
          <dd className="price text-lead font-semibold text-ink">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-body text-ink-soft">Delivery</dt>
          <dd className="text-small text-ink-muted">Calculated at checkout</dd>
        </div>
      </dl>

      <p className="mt-5 flex items-start gap-3 border-t border-border pt-5 text-small text-ink-soft">
        <Banknote className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden="true" />
        Pay in cash when your order arrives.
      </p>

      <ButtonLink to="/checkout" size="lg" className="mt-6 w-full">
        Checkout
      </ButtonLink>
      <p className="mt-4 text-center">
        <Link
          to="/menu"
          className="inline-flex min-h-tap items-center rounded-xl text-body font-semibold text-forest underline decoration-2 underline-offset-4 transition-colors duration-fast hover:text-forest-hover"
        >
          Keep browsing
        </Link>
      </p>
    </aside>
  );
}

export default OrderSummary;