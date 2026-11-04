import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/ButtonLink';

// Copy only claims what is true today: made to order, customizable, cash on delivery.
const STEPS = [
  { title: 'Choose', body: 'Pick a pizza, side or drink from the menu.' },
  { title: 'Customize', body: 'Set the size and crust, then add the toppings you love.' },
  { title: 'Get it delivered', body: 'We bake it to order and bring it to you. Pay in cash when it arrives.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-navbar bg-page py-section">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-heading" className="text-h2 text-ink">
            How it works
          </h2>
          <p className="mt-3 text-lead text-ink-soft">From menu to doorstep in three steps.</p>
        </div>

        <div className="relative mt-12">
          {/* Dashed connector from the centre of the first circle to the centre of the last (one sixth in from each edge) */}
          <div
            aria-hidden="true"
            className="absolute top-8 right-[16.67%] left-[16.67%] hidden border-t-2 border-dashed border-border-strong md:block"
          />
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map(({ title, body }, index) => (
              <li key={title} className="flex flex-col items-center text-center">
                {/* The list already announces "1 of 3", so the visible numeral is hidden from screen readers */}
                <div
                  aria-hidden="true"
                  className="flex size-16 items-center justify-center rounded-full bg-forest font-heading text-h3 text-parchment ring-8 ring-page"
                >
                  {index + 1}
                </div>
                <h3 className="mt-5 font-heading text-h3 text-ink">{title}</h3>
                <p className="mt-2 max-w-xs text-body text-ink-soft">{body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 text-center">
          <ButtonLink to="/menu" size="lg">
            Start your order
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;