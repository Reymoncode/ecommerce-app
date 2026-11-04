import { Link } from 'react-router-dom';
import { BRAND } from '../../config/brand';
 
// Text wordmark in the heading face. Swap for an <img> or SVG when the real logo exists.
// Colour is parchment because the wordmark sits on forest (navbar and footer).
export function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label={`${BRAND.name} home`}
      className={`inline-flex min-h-tap items-center font-heading text-h4 leading-none text-parchment ${className}`}
    >
      {BRAND.name}
    </Link>
  );
}
 
export default Logo;