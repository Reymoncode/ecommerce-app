import { LoaderCircle } from 'lucide-react';
import { buttonClasses } from './buttonClasses';

// <button> with loading + disabled states.
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      {loading && <LoaderCircle className="size-5 motion-safe:animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;