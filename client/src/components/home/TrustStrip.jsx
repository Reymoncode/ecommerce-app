import { Banknote, ChefHat, Truck, Wheat } from 'lucide-react';
import { Container } from '../ui/Container';

const POINTS = [
  { title: 'Dough made daily', body: 'Hand-stretched fresh, not frozen', Icon: Wheat },
  { title: 'Made your way', body: 'Choose the crust, size and toppings', Icon: ChefHat },
  { title: 'Delivered to your door', body: 'Baked to order, then on its way', Icon: Truck },
  { title: 'Cash on delivery', body: 'Pay when your order arrives', Icon: Banknote },
];


export function TrustStrip() {
  return (
    <section aria-label="Why order with us" className="bg-surface-sunken py-10 md:py-12">
      <Container>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {POINTS.map(({ title, body, Icon }) => (
            <li key={title} className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-forest">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-body font-semibold text-ink">{title}</p>
                <p className="mt-0.5 text-small text-ink-soft">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default TrustStrip;