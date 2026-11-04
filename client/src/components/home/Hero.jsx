import { useId } from 'react';
import { Link } from 'react-router-dom';
import { Banknote, ChefHat, Pizza, SlidersHorizontal } from 'lucide-react';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/ButtonLink';

// ---- Edit the copy here -----------------------------------------------------
const COPY = {
  eyebrow: 'Pizza for delivery',
  // One sentence per line so the break never lands mid-sentence ("taste. Toppings")
  headline: ['Dough you can taste.', 'Toppings you choose.'],
  subhead: 'Pick a pizza, choose your crust, size and toppings, and pay when it arrives.',
};

// Photo: put your file at client/public/images/hero-pizza.jpg
const HERO_IMAGE = '/images/hero-pizza.jpg';
const HERO_ALT = 'A freshly baked pizza, seen from above'; // describe your actual photo

const TRUST = [
  { Icon: Banknote, label: 'Cash on delivery' },
  { Icon: SlidersHorizontal, label: 'Customize every pizza' },
  { Icon: ChefHat, label: 'Baked to order' },
];

const SEAL_TEXT = 'Hand-stretched daily • Made to order • ';
// -----------------------------------------------------------------------------

// Round stamp seal. Decorative, so hidden from assistive tech.
function Seal({ className = '' }) {
  const pathId = `seal-${useId().replace(/:/g, '')}`;

  return (
    <div
      aria-hidden="true"
      className={`absolute grid size-28 place-items-center rounded-full bg-forest text-parchment shadow-card lg:size-32 ${className}`}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full">
        <defs>
          <path id={pathId} d="M60 60 m-45 0 a45 45 0 1 1 90 0 a45 45 0 1 1 -90 0" />
        </defs>
        <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeOpacity="0.3" />
        <text className="fill-parchment text-[10px] font-semibold">
          <textPath href={`#${pathId}`} textLength="276" lengthAdjust="spacing">
            {SEAL_TEXT}
          </textPath>
        </text>
      </svg>
      <Pizza className="size-7" />
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-page py-section">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="text-small font-medium text-ink-muted">{COPY.eyebrow}</p>

          <h1 id="hero-heading" className="mt-3 text-display text-ink">
            {COPY.headline.map((sentence) => (
              <span key={sentence} className="block">
                {sentence}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-md text-lead text-ink-soft">{COPY.subhead}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink to="/menu" size="lg">
              Order now
            </ButtonLink>
            <Link
              to={{ pathname: '/', hash: '#best-sellers' }}
              className="inline-flex min-h-tap items-center text-body font-semibold text-forest underline decoration-2 underline-offset-4 transition-colors duration-fast hover:text-forest-hover"
            >
              See best sellers
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-small text-ink-soft">
            {TRUST.map(({ Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="size-5 text-forest" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-full max-w-md motion-safe:animate-hero-in lg:max-w-none">
          <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-placeholder shadow-card">
            <img
              src={HERO_IMAGE}
              alt={HERO_ALT}
              width="1200"
              height="1200"
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
          <Seal className="-bottom-6 -left-3 sm:-left-5 lg:-bottom-8 lg:-left-8" />
        </div>
      </Container>
    </section>
  );
}

export default Hero;