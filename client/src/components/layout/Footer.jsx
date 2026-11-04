import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { BRAND } from '../../config/brand';

const AUTH_ENABLED = false;

// Add { label: 'Privacy', to: '/privacy' } and { label: 'Terms', to: '/terms' } once those pages exist.
const LEGAL_LINKS = [];

const LINK_GROUPS = [
  {
    title: 'Order',
    links: [
      { label: 'Menu', to: '/menu' },
      { label: 'Best sellers', href: '/#best-sellers' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Cart', to: '/cart' },
    ],
  },
  AUTH_ENABLED && {
    title: 'Account',
    links: [
      { label: 'Log in', to: '/login' },
      { label: 'Create account', to: '/register' },
      { label: 'My orders', to: '/orders' },
    ],
  },
].filter(Boolean);

// parchment-muted on forest 7.75:1 · parchment on forest (hover, headings) 10.47:1
const linkClass =
  'inline-flex min-h-tap items-center rounded-xl text-small text-parchment-muted underline-offset-4 transition-colors duration-fast hover:text-parchment hover:underline';
// h2 would inherit the serif heading face; these small caps labels read better in the body face
const headingClass = 'font-sans text-label font-semibold tracking-wider text-parchment uppercase';

function FooterLink({ link }) {
  // "/#section" links are plain anchors; the useScrollToHash hook on the home page does the scrolling
  if (link.href) {
    return (
      <a href={link.href} className={linkClass}>
        {link.label}
      </a>
    );
  }
  return (
    <Link to={link.to} className={linkClass}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  const { name, tagline, contact = {}, hours, socials = [] } = BRAND;
  const { address, phone, email } = contact;
  const hasVisitBlock = address || hours || phone || email;
  const year = new Date().getFullYear();

  // 3 link columns with the Account group, 2 without. Full class names so Tailwind can see them.
  const gridCols =
    LINK_GROUPS.length === 2
      ? 'md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]'
      : 'md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.3fr]';

  return (
    // id="contact" is the target of the navbar's Contact link
    <footer id="contact" className="on-dark scroll-mt-navbar bg-forest text-parchment">
      <Container className={`grid gap-10 py-12 lg:gap-12 lg:py-16 ${gridCols}`}>
        <div className="md:col-span-full lg:col-span-1">
          <Logo />
          {tagline && <p className="mt-3 max-w-xs text-small text-parchment-muted">{tagline}</p>}
          {socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {LINK_GROUPS.map((group) => (
          <nav key={group.title} aria-label={`${group.title} links`}>
            <h2 className={headingClass}>{group.title}</h2>
            <ul className="mt-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {hasVisitBlock && (
          <div>
            <h2 className={headingClass}>Visit us</h2>
            <address className="mt-3 text-small not-italic text-parchment-muted">
              {address && (
                <p className="flex gap-3 py-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {address}
                </p>
              )}
              {hours && (
                <p className="flex gap-3 py-2">
                  <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {hours}
                </p>
              )}
              {phone && (
                <p className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className={linkClass}>
                    {phone}
                  </a>
                </p>
              )}
              {email && (
                <p className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
                    {email}
                  </a>
                </p>
              )}
            </address>
          </div>
        )}
      </Container>

      <div className="border-t border-parchment/15">
        <Container className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-parchment-muted">
            © {year} {name}. All rights reserved.
          </p>
          {LEGAL_LINKS.length > 0 && (
            <ul className="flex gap-5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </div>
    </footer>
  );
}

export default Footer;