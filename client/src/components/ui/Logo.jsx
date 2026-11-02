import { BRAND } from '../../config/brand';

export default function Logo({ variant = 'light', className = 'h-8 w-auto' }) {
  return <img src={BRAND.logo[variant]} alt={BRAND.name} className={className} />;
}