import { ShoppingBag } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { ButtonLink } from '../components/ui/ButtonLink';
import { CartLine } from '../components/cart/CartLine';
import { OrderSummary } from '../components/cart/OrderSummary';
import { notifyRemoved } from '../components/cart/cartToasts';
import { BRAND } from '../config/brand';
import { useCart } from '../hooks/useCart';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Cart() {
  useDocumentTitle(`Cart | ${BRAND.name}`);
  const { items, count, subtotal, setQuantity, removeItem, restoreItem } = useCart();

  // Remove at once, then offer Undo, which puts the line back in the same spot
  const handleRemove = (line) => {
    const index = items.findIndex((item) => item.key === line.key);
    removeItem(line.key);
    notifyRemoved(line.name, () => restoreItem(line, index));
  };

  return (
    <div className="bg-page pt-10 pb-section md:pt-14">
      <Container>
        <h1 className="text-h1 text-ink">Your cart</h1>

        {items.length === 0 ? (
          // ink-soft on surface-sunken 8.40:1 · the page's one tomato button
          <div className="mt-8 rounded-2xl bg-surface-sunken p-8 text-center md:p-12">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-forest text-parchment">
              <ShoppingBag className="size-7" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-heading text-h3 text-ink">Your cart is empty</h2>
            <p className="mx-auto mt-2 max-w-md text-body text-ink-soft">
              Pick a pizza, choose your crust, size and toppings, and it will show up here.
            </p>
            <ButtonLink to="/menu" size="lg" className="mt-6">
              Browse the menu
            </ButtonLink>
          </div>
        ) : (
          <>
            <p className="mt-2 text-lead text-ink-soft">
              {count} {count === 1 ? 'item' : 'items'}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-12">
              <ul className="divide-y divide-border rounded-2xl border border-border bg-surface shadow-card">
                {items.map((line) => (
                  <CartLine key={line.key} line={line} onQuantityChange={setQuantity} onRemove={handleRemove} />
                ))}
              </ul>
              <OrderSummary subtotal={subtotal} />
            </div>
          </>
        )}
      </Container>
    </div>
  );
}