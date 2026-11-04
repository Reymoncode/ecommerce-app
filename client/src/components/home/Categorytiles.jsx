import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { CATEGORIES } from '../../data/categories';

// No display class here: each use below sets its own (hidden / inline-flex), so they never fight.
const menuLink =
  'min-h-tap items-center text-body font-semibold text-forest underline decoration-2 underline-offset-4 transition-colors duration-fast hover:text-forest-hover';

// Photo if the file loads, forest icon if it is missing or fails.
// forest on placeholder: 8.53:1
function CategoryImage({ image, Icon }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="aspect-[4/3] overflow-hidden rounded-xl bg-placeholder">
      {image && !failed ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full object-cover transition-transform duration-base ease-out motion-safe:group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <Icon className="size-12 text-forest md:size-14" strokeWidth={1.5} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

export function CategoryTiles() {
  return (
    <section aria-labelledby="categories-heading" className="bg-surface-sunken py-section">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 id="categories-heading" className="text-h2 text-ink">
            What are you craving?
          </h2>
          <Link to="/menu" className={`hidden shrink-0 sm:inline-flex ${menuLink}`}>
            See full menu
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-card lg:grid-cols-4">
          {CATEGORIES.map(({ slug, name, blurb, Icon, image }) => (
            <li key={slug}>
              {/* The whole tile is one link: ink on surface 16.93:1, ink-muted on surface 6.99:1 */}
              <Link
                to={`/menu?category=${slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-3 shadow-card transition-shadow duration-base ease-out hover:shadow-card-hover md:p-4"
              >
                <CategoryImage image={image} Icon={Icon} />

                <div className="mt-4 flex flex-1 items-end justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-heading text-lead text-ink sm:text-h4">{name}</h3>
                    <p className="mt-1 hidden text-small text-ink-muted sm:block">{blurb}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-forest text-forest transition-colors duration-fast ease-out group-hover:bg-forest group-hover:text-parchment sm:size-9"
                  >
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/menu" className={`mt-6 inline-flex sm:hidden ${menuLink}`}>
          See full menu
        </Link>
      </Container>
    </section>
  );
}

export default CategoryTiles;