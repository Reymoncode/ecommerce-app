import { Link } from 'react-router-dom';
import { buttonClasses } from './buttonClasses';

// A link that looks like a button. `to` = in-app route (React Router), `href` = external/anchor.
export function ButtonLink({ to, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const classes = buttonClasses({ variant, size, className });

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}

export default ButtonLink;