import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, CircleAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { ErrorPanel } from '../components/ui/ErrorPanel';
import { ProductImage } from '../components/ProductImage';
import { ProductBadges } from '../components/ProductBadges';
import { ChoiceGroup } from '../components/product/ChoiceGroup';
import { ToppingGroup } from '../components/product/ToppingGroup';
import { QuantityStepper } from '../components/product/QuantityStepper';
import { BRAND } from '../config/brand';
import { useProduct } from '../hooks/useProduct';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice } from '../utils/formatPrice';

const MAX_QUANTITY = 10;

const crumbLink =
  'inline-flex min-h-tap items-center rounded-xl text-small text-ink-muted underline-offset-4 transition-colors duration-fast hover:text-ink hover:underline';

function Breadcrumb({ product }) {
  const { category } = product;
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1">
        <li>
          <Link to="/menu" className={crumbLink}>
            Menu
          </Link>
        </li>
        {category && (
          <li className="flex items-center gap-1">
            <ChevronRight className="size-4 text-ink-muted" aria-hidden="true" />
            <Link to={`/menu?category=${category.slug}`} className={crumbLink}>
              {category.name}
            </Link>
          </li>
        )}
        <li className="flex items-center gap-1">
          <ChevronRight className="size-4 text-ink-muted" aria-hidden="true" />
          <span aria-current="page" className="text-small font-medium text-ink">
            {product.name}
          </span>
        </li>
      </ol>
    </nav>
  );
}

// The page is split in two so the choices reset when you move to another product:
// the parent gives this component key={product.id}, so a new product starts from a clean state.
function ProductView({ product }) {
  const sizes = product.sizes ?? [];
  const crusts = product.crusts ?? [];
  const toppings = product.toppings ?? [];
  const isCustomizable = sizes.length > 0 || crusts.length > 0 || toppings.length > 0;
  const available = product.isAvailable;

  // Size and crust always have one chosen (the first), so a pizza can't be added with nothing picked.
  const [sizeId, setSizeId] = useState(sizes[0]?._id ?? null);
  const [crustId, setCrustId] = useState(crusts[0]?._id ?? null);
  const [toppingIds, setToppingIds] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const size = sizes.find((s) => s._id === sizeId);
  const crust = crusts.find((c) => c._id === crustId);
  const chosenToppings = toppings.filter((t) => t.isAvailable && toppingIds.includes(t._id));

  const unitPrice =
    product.price +
    (size?.priceDelta ?? 0) +
    (crust?.priceDelta ?? 0) +
    chosenToppings.reduce((sum, t) => sum + t.price, 0);
  const total = unitPrice * quantity;

  const toggleTopping = (id) =>
    setToppingIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!available) return;

    // Temporary until the cart exists: the toast echoes the choices so you can check them.
    // The cart step will store product id, size id, crust id, topping ids and quantity from here.
    const details = [size?.name, crust?.name, ...chosenToppings.map((t) => `+${t.name}`)].filter(Boolean).join(', ');
    toast(`${quantity} × ${product.name}${details ? ` (${details})` : ''}: the cart is coming soon`);
  };

  return (
    <>
      <Breadcrumb product={product} />

      <div className="mt-4 grid gap-8 md:grid-cols-2 lg:gap-14">
        <div className="md:sticky md:top-28 md:self-start">
          <div className="overflow-hidden rounded-2xl border border-border bg-placeholder">
            <ProductImage
              src={product.image}
              alt={product.name}
              className={`aspect-square w-full ${available ? '' : 'opacity-60'}`}
            />
          </div>
        </div>

        <div>
          <ProductBadges badges={product.badges} />
          <h1 className="mt-3 text-h1 text-ink">{product.name}</h1>
          <p className="mt-3 max-w-prose text-lead text-ink-soft">{product.description}</p>
          <p className="mt-4 text-ink">
            {isCustomizable && <span className="mr-2 text-small text-ink-muted">From</span>}
            <span className="price text-h3">{formatPrice(product.price)}</span>
          </p>

          {!available && (
            // warning on warning-tint 6.34:1 · icon + words, never colour alone
            <p
              role="status"
              className="mt-6 flex items-start gap-3 rounded-2xl bg-warning-tint p-4 text-body font-medium text-warning"
            >
              <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <span>
                Sold out today.{' '}
                <Link to="/menu" className="underline underline-offset-4">
                  See the rest of the menu
                </Link>
                .
              </span>
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-8 border-t border-border pt-8">
            {sizes.length > 0 && (
              <ChoiceGroup
                legend="Size"
                name="size"
                choices={sizes}
                value={sizeId}
                onChange={setSizeId}
                disabled={!available}
              />
            )}
            {crusts.length > 0 && (
              <ChoiceGroup
                legend="Crust"
                name="crust"
                choices={crusts}
                value={crustId}
                onChange={setCrustId}
                disabled={!available}
              />
            )}
            {toppings.length > 0 && (
              <ToppingGroup
                toppings={toppings}
                selectedIds={toppingIds}
                onToggle={toggleTopping}
                disabled={!available}
              />
            )}

            <div
              className={`flex flex-col gap-4 lg:flex-row lg:items-center ${isCustomizable ? 'border-t border-border pt-6' : ''}`}
            >
              <QuantityStepper value={quantity} onChange={setQuantity} max={MAX_QUANTITY} disabled={!available} />
              {/* The page's one tomato button (surface on tomato 6.07:1) */}
              <Button type="submit" size="lg" disabled={!available} className="w-full lg:flex-1">
                {available ? (
                  <>
                    Add to cart <span aria-hidden="true">·</span> <span className="price">{formatPrice(total)}</span>
                  </>
                ) : (
                  'Sold out today'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// Same two-column shape as the real page, so nothing jumps when the product arrives.
function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading the product" role="status" className="mt-4 grid gap-8 md:grid-cols-2 lg:gap-14">
      <div className="skeleton aspect-square w-full rounded-2xl motion-safe:animate-shimmer" />
      <div>
        <div className="skeleton h-7 w-28 rounded-full motion-safe:animate-shimmer" />
        <div className="skeleton mt-4 h-12 w-3/4 rounded-full motion-safe:animate-shimmer" />
        <div className="skeleton mt-4 h-5 w-full rounded-full motion-safe:animate-shimmer" />
        <div className="skeleton mt-2 h-5 w-5/6 rounded-full motion-safe:animate-shimmer" />
        <div className="skeleton mt-6 h-8 w-32 rounded-full motion-safe:animate-shimmer" />
        <div className="mt-8 grid gap-3 border-t border-border pt-8 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-20 rounded-xl motion-safe:animate-shimmer" />
          ))}
        </div>
        <div className="skeleton mt-8 h-14 w-full rounded-full motion-safe:animate-shimmer" />
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { data: product, isPending, isError, error, refetch, isFetching } = useProduct(slug);
  useDocumentTitle(product ? `${product.name} | ${BRAND.name}` : `Menu | ${BRAND.name}`);

  const notFound = isError && error?.response?.status === 404;

  return (
    <div className="bg-page pt-4 pb-section md:pt-6">
      <Container>
        {product ? (
          <ProductView key={product.id} product={product} />
        ) : isPending ? (
          <DetailSkeleton />
        ) : notFound ? (
          // ink-soft on surface-sunken 8.40:1
          <div className="mt-6 rounded-2xl bg-surface-sunken p-8 text-center md:p-12">
            <h1 className="font-heading text-h3 text-ink">We couldn't find that item</h1>
            <p className="mx-auto mt-2 max-w-md text-body text-ink-soft">
              It may have been taken off the menu, or the link is out of date.
            </p>
            <ButtonLink to="/menu" variant="secondary" className="mt-6">
              Back to the menu
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-6">
            <ErrorPanel
              message="This item didn't load. Check your connection, then try again."
              onRetry={() => refetch()}
              retrying={isFetching}
            />
          </div>
        )}
      </Container>
    </div>
  );
}