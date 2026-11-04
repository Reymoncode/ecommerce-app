import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/ButtonLink';
import { ProductImage } from '../ProductImage';
import { PROMO } from '../../data/promo';

const isPromoLive = ({ active, endsAt }) =>
  active && (!endsAt || new Date() <= new Date(`${endsAt}T23:59:59`));

export function PromoBanner() {
  if (!isPromoLive(PROMO)) return null;
  const { tag, title, body, cta, image, imageAlt } = PROMO;

  return (
    <section aria-labelledby="promo-heading" className="bg-surface-sunken py-section">
      <Container>
        <div className="grid overflow-hidden rounded-2xl border border-border bg-surface shadow-card md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-80">
            <ProductImage src={image} alt={imageAlt} className="absolute inset-0 size-full" />
          </div>

          <div className="flex flex-col items-start justify-center p-6 md:p-10 lg:p-14">
            {tag && (
              <span className="inline-flex rounded-full bg-forest px-3 py-1 text-label font-semibold text-parchment">
                {tag}
              </span>
            )}
            <h2 id="promo-heading" className="mt-4 text-h2 text-ink">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-lead text-ink-soft">{body}</p>
            {/* Secondary on purpose: the closing "Start your order" button below is the page's tomato CTA */}
            <ButtonLink to={cta.to} variant="secondary" size="lg" className="mt-8">
              {cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PromoBanner;