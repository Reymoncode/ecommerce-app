import { Link } from 'react-router-dom';
import { Flame, Leaf, Plus, Star } from 'lucide-react';
import { Button } from './ui/Button';
import { ButtonLink } from './ui/ButtonLink';
import { ProductImage } from './ProductImage';
import { formatPrice } from '../utils/formatPrice';

const BADGES = {
  bestseller: { label: 'Best seller', className: 'bg-butter text-ink shadow-stamp-sm', Icon: Star },
  new: { label: 'New', className: 'bg-forest text-parchment' },
  spicy: { label: 'Spicy', className: 'bg-warning-tint text-warning', Icon: Flame },
  vegetarian: { label: 'Vegetarian', className: 'bg-success-tint text-success', Icon: Leaf },
};

const badgeBase = 'inline-flex items-center gap-1 rounded-full px-3 py-1 text-label font-semibold';

export function ProductCard({ product, onAdd, adding = false }) {
  const { name, slug, description, image, price, badges = [], isAvailable, isCustomizable } = product;
  const detailUrl = `/menu/${slug}`;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-3 shadow-card transition-shadow duration-base ease-out hover:shadow-card-hover md:p-4">
      <div className="relative overflow-hidden rounded-xl">
        <ProductImage
          src={image}
          className={`aspect-[4/3] w-full transition-transform duration-base ease-out motion-safe:group-hover:scale-[1.03] ${
            isAvailable ? '' : 'opacity-60'
          }`}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {!isAvailable && <span className={`${badgeBase} bg-ink text-surface`}>Sold out</span>}
          {badges.slice(0, 2).map((key) => {
            const badge = BADGES[key];
            if (!badge) return null; // unknown tag from the API: skip it instead of crashing
            const { label, className, Icon } = badge;
            return (
              <span key={key} className={`${badgeBase} ${className}`}>
                {Icon && <Icon className="size-3.5" aria-hidden="true" />}
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Stretched link: the title's ::after covers the whole card; the action button sits above it (z-10).
          The focus ring is drawn on that ::after so it wraps the card, not just the title. */}
      <h3 className="mt-4 line-clamp-2 font-heading text-h4 text-ink">
        <Link
          to={detailUrl}
          className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-forest"
        >
          {name}
        </Link>
      </h3>
      <p className="mt-1 line-clamp-2 text-small text-ink-muted">{description}</p>

      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <p className="text-ink">
          {isCustomizable && <span className="block text-label font-normal text-ink-muted">From</span>}
          <span className="price text-lead">{formatPrice(price)}</span>
        </p>

        <div className="relative z-10">
          {isCustomizable ? (
            <ButtonLink to={detailUrl} variant="secondary" size="sm" aria-label={`Customize ${name}`}>
              Customize
            </ButtonLink>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              loading={adding}
              disabled={!isAvailable}
              onClick={() => onAdd?.(product)}
              aria-label={isAvailable ? `Add ${name} to cart` : `${name} is sold out`}
            >
              {!adding && isAvailable && <Plus className="size-4" aria-hidden="true" />}
              {isAvailable ? 'Add' : 'Sold out'}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;