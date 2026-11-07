import { Link } from 'react-router-dom';
import { CircleAlert, RotateCw } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ProductCard } from '../ProductCard';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { useProducts } from '../../hooks/useProduct';
import { useQuickAdd } from '../../hooks/useQuickAdd';

const BEST_SELLER_PARAMS = { badge: 'bestseller', limit: 4 };

export function BestSellers() {
  const { data, isPending, isError, refetch, isFetching } = useProducts(BEST_SELLER_PARAMS);
  const products = data?.products ?? [];

  const handleAdd = useQuickAdd();

  // No best sellers at all: hide the section instead of showing an empty heading.
  if (!isPending && !isError && products.length === 0) return null;

  return (
    <section id="best-sellers" aria-labelledby="bestsellers-heading" className="scroll-mt-navbar bg-page py-section">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 id="bestsellers-heading" className="text-h2 text-ink">
            Best sellers
          </h2>
          <Link
            to="/menu"
            className="inline-flex min-h-tap shrink-0 items-center text-body font-semibold text-forest underline decoration-2 underline-offset-4 transition-colors duration-fast hover:text-forest-hover"
          >
            See full menu
          </Link>
        </div>

        {isError ? (
          // error on error-tint 6.78:1 · icon + words, never colour alone
          <div
            role="alert"
            className="mt-8 flex flex-col items-start gap-4 rounded-2xl bg-error-tint p-6 text-error sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="flex items-start gap-3 text-body font-medium">
              <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              The menu didn't load. Check your connection, then try again.
            </p>
            <Button variant="secondary" loading={isFetching} onClick={() => refetch()}>
              {!isFetching && <RotateCw className="size-4" aria-hidden="true" />}
              Try again
            </Button>
          </div>
        ) : (
          <ul className="mt-8 grid gap-card sm:grid-cols-2 xl:grid-cols-4" aria-busy={isPending}>
            {isPending
              ? Array.from({ length: BEST_SELLER_PARAMS.limit }, (_, i) => (
                  <li key={i}>
                    <ProductCardSkeleton />
                  </li>
                ))
              : products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} onAdd={handleAdd} />
                  </li>
                ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

export default BestSellers;