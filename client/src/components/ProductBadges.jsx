import { Flame, Leaf, Star } from 'lucide-react';

// The same four tags as on the product card (butter is allowed on small tags only; only "Best seller" gets the stamp shadow).
// ink on butter 9.51:1 · parchment on forest 10.47:1 · warning on warning-tint 6.34:1 · success on success-tint 6.01:1
const BADGES = {
  bestseller: { label: 'Best seller', className: 'bg-butter text-ink shadow-stamp-sm', Icon: Star },
  new: { label: 'New', className: 'bg-forest text-parchment' },
  spicy: { label: 'Spicy', className: 'bg-warning-tint text-warning', Icon: Flame },
  vegetarian: { label: 'Vegetarian', className: 'bg-success-tint text-success', Icon: Leaf },
};

export function ProductBadges({ badges = [] }) {
  const items = badges.filter((key) => BADGES[key]); // unknown tag from the API: skip it
  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((key) => {
        const { label, className, Icon } = BADGES[key];
        return (
          <li
            key={key}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-label font-semibold ${className}`}
          >
            {Icon && <Icon className="size-3.5" aria-hidden="true" />}
            {label}
          </li>
        );
      })}
    </ul>
  );
}

export default ProductBadges;