import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { useScrolled } from '../../hooks/useScrolled';
import { useCartSummary } from '../../hooks/useCartSummary';

// Turn on once the login/register pages are wired into App.jsx.
const AUTH_ENABLED = false;

// Section anchors need a matching id on the page: #best-sellers, #how-it-works, and #contact (footer).
const NAV_LINKS = [
  { label: 'Menu', to: '/menu' },
  { label: 'Best sellers', to: { pathname: '/', hash: '#best-sellers' } },
  { label: 'How it works', to: { pathname: '/', hash: '#how-it-works' } },
  { label: 'Contact', to: { pathname: '/', hash: '#contact' } },
];

// Desktop link: muted parchment (7.75:1 on forest) → full parchment (10.47:1) when hovered or current.
const desktopLink =
  'relative inline-flex min-h-tap min-w-tap items-center justify-center rounded-xl text-small font-medium text-parchment-muted transition-colors duration-fast hover:text-parchment after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:bg-parchment after:opacity-0 aria-[current=page]:text-parchment aria-[current=page]:after:opacity-100';

const mobileLink =
  'flex min-h-14 items-center font-heading text-h3 text-parchment transition-colors duration-fast hover:text-parchment-muted';

// Only real routes (no hash) can be "current"; section anchors are plain links.
function NavItem({ link, className, onNavigate }) {
  if (typeof link.to === 'string') {
    return (
      <NavLink to={link.to} end className={className} onClick={onNavigate}>
        {link.label}
      </NavLink>
    );
  }
  return (
    <Link to={link.to} className={className} onClick={onNavigate}>
      {link.label}
    </Link>
  );
}

export function Navbar() {
  const scrolled = useScrolled();
  const { count } = useCartSummary();
  const location = useLocation();
  const menuButtonRef = useRef(null);

  // The menu remembers which page visit it was opened on. Every navigation gets a new
  // location.key, so the menu closes by itself when the route or hash changes — no effect needed.
  const [openedOn, setOpenedOn] = useState(null);
  const open = openedOn === location.key;
  const closeMenu = () => setOpenedOn(null);
  const toggleMenu = () => setOpenedOn(open ? null : location.key);

  // Escape closes the menu and returns focus to the button that opened it.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenedOn(null);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const cartLabel = count > 0 ? `Cart, ${count} ${count === 1 ? 'item' : 'items'}` : 'Cart';

  return (
    <header
      className={`on-dark sticky top-0 z-navbar border-b bg-forest text-parchment transition-[box-shadow,border-color] duration-base ease-out ${
        scrolled || open ? 'border-parchment/15 shadow-card' : 'border-transparent'
      }`}
    >
      <Container className="flex h-navbar items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.label} link={link} className={desktopLink} />
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-6">
          {AUTH_ENABLED && (
            <Link to="/login" className={`hidden lg:inline-flex ${desktopLink}`}>
              Sign in
            </Link>
          )}

          <Link
            to="/cart"
            aria-label={cartLabel}
            className="relative inline-flex min-h-tap min-w-tap items-center justify-center gap-2 rounded-full border-2 border-parchment px-3 text-small font-semibold text-parchment transition-colors duration-fast ease-out hover:bg-parchment hover:text-forest lg:px-5"
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            <span className="hidden lg:inline">Cart</span>
            {count > 0 && (
              // Small butter tag: 9.51:1 ink on butter
              <span
                aria-hidden="true"
                className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-butter px-1 text-label font-bold text-ink tabular-nums"
              >
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={toggleMenu}
            className="inline-flex size-11 items-center justify-center rounded-full text-parchment transition-colors duration-fast hover:bg-forest-hover lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-var(--layout-navbar-h))] overflow-y-auto border-t border-parchment/15 bg-forest shadow-card lg:hidden"
        >
          <Container as="nav" aria-label="Mobile" className="pt-2 pb-6">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.label} className="border-b border-parchment/15">
                  <NavItem link={link} className={mobileLink} onNavigate={closeMenu} />
                </li>
              ))}
              {AUTH_ENABLED && (
                <li className="border-b border-parchment/15">
                  <Link to="/login" className={mobileLink} onClick={closeMenu}>
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}

export default Navbar;