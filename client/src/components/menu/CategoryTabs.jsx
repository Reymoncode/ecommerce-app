import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { Container } from '../ui/Container';

const TABS = [{ slug: null, name: 'All' }, ...CATEGORIES];

const tabBase =
  'inline-flex min-h-tap items-center rounded-full border px-5 text-body font-semibold whitespace-nowrap transition-colors duration-fast ease-out';
const tabActive = 'border-forest bg-forest text-parchment';
const tabIdle = 'border-border-strong bg-surface text-ink hover:bg-surface-hover';

export function CategoryTabs({ active }) {
  const activeRef = useRef(null);

  // On a phone the row scrolls sideways: bring the chosen tab into view (e.g. arriving on /menu?category=desserts)
  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [active]);

  return (
    <div className="sticky top-navbar z-30 border-b border-border bg-page">
      <Container>
        <nav aria-label="Menu categories">
          <ul className="-mx-gutter flex gap-2 overflow-x-auto px-gutter py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map(({ slug, name }) => {
              const isActive = slug === active;
              return (
                <li key={name}>
                  <Link
                    ref={isActive ? activeRef : null}
                    to={slug ? `/menu?category=${slug}` : '/menu'}
                    aria-current={isActive ? 'page' : undefined}
                    className={`${tabBase} ${isActive ? tabActive : tabIdle}`}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </div>
  );
}

export default CategoryTabs;