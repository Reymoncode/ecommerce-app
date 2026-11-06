import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container } from '../components/ui/Container';
import { ButtonLink } from '../components/ui/ButtonLink';
import { ErrorPanel } from '../components/ui/ErrorPanel';
import { CategoryTabs } from '../components/menu/CategoryTabs';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { CATEGORIES } from '../data/categories';
import { BRAND } from '../config/brand';
import { useProducts } from '../hooks/useProduct';
import { useDocumentTitle } from '../hooks/useDocumentTitle';


const MENU_PARAMS = { limit: 50 };

const GRID = 'grid gap-card sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

function buildSections(products, activeSlug) {
  const known = new Set(CATEGORIES.map((category) => category.slug));
  const sections = CATEGORIES.map((category) => ({
    ...category,
    items: products.filter((product) => product.category?.slug === category.slug),
  }));
  const others = products.filter((product) => !known.has(product.category?.slug));
  if (others.length > 0) sections.push({ slug: 'more', name: 'More', blurb: '', items: others });

  return sections.filter((section) => section.items.length > 0 && (!activeSlug || section.slug === activeSlug));
}

export default function Menu() {
  useDocumentTitle(`Menu | ${BRAND.name}`);

  const [searchParams] = useSearchParams();
  const requested = searchParams.get('category')?.toLowerCase();
  const active = CATEGORIES.some((category) => category.slug === requested) ? requested : null; // unknown value = All

  const { data, isPending, isError, refetch, isFetching } = useProducts(MENU_PARAMS);
  const sections = buildSections(data?.products ?? [], active);
  const activeName = CATEGORIES.find((category) => category.slug === active)?.name;

  // Temporary until the cart exists
  const handleAdd = (product) => toast(`${product.name}: the cart is coming soon`);

  return (
    <>
      <header className="bg-page pt-10 pb-6 md:pt-14 md:pb-8">
        <Container>
          <h1 className="text-h1 text-ink">Menu</h1>
          <p className="mt-3 max-w-xl text-lead text-ink-soft">Pick a pizza, side, drink or dessert.</p>
        </Container>
      </header>

      <CategoryTabs active={active} />

      <div className="bg-page pt-8 pb-section md:pt-10">
        <Container>
          {isError ? (
            <ErrorPanel
              message="The menu didn't load. Check your connection, then try again."
              onRetry={() => refetch()}
              retrying={isFetching}
            />
          ) : isPending ? (
            <ul className={GRID} aria-busy="true" aria-label="Loading the menu">
              {Array.from({ length: 8 }, (_, i) => (
                <li key={i}>
                  <ProductCardSkeleton />
                </li>
              ))}
            </ul>
          ) : sections.length === 0 ? (
            // ink-soft on surface-sunken 8.40:1
            <div className="rounded-2xl bg-surface-sunken p-8 text-center md:p-12">
              <p className="font-heading text-h3 text-ink">
                {active ? `No ${activeName.toLowerCase()} on the menu right now` : 'The menu is being updated'}
              </p>
              <p className="mx-auto mt-2 max-w-md text-body text-ink-soft">
                {active ? 'Have a look at everything else we make.' : 'Please check back soon.'}
              </p>
              {active && (
                <ButtonLink to="/menu" variant="secondary" className="mt-6">
                  See the full menu
                </ButtonLink>
              )}
            </div>
          ) : (
            <div className="space-y-12 md:space-y-16">
              {sections.map(({ slug, name, blurb, items }) => (
                <section key={slug} aria-labelledby={`menu-${slug}`}>
                  <div className="mb-6">
                    <h2 id={`menu-${slug}`} className="text-h3 text-ink">
                      {name}
                    </h2>
                    {blurb && <p className="mt-1 text-body text-ink-muted">{blurb}</p>}
                  </div>
                  <ul className={GRID}>
                    {items.map((product) => (
                      <li key={product.id}>
                        <ProductCard product={product} onAdd={handleAdd} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  );
}