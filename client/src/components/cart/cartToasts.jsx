import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const linkClass = 'font-semibold text-forest underline underline-offset-4 hover:text-forest-hover';

// "Added Margherita · View cart": the customer stays where they are and can jump to the cart.
export function notifyAdded(name, quantity = 1) {
  toast(
    (t) => (
      <span className="flex items-center gap-3">
        <span>
          Added {quantity > 1 ? `${quantity} × ` : ''}
          {name}
        </span>
        <Link to="/cart" onClick={() => toast.dismiss(t.id)} className={linkClass}>
          View cart
        </Link>
      </span>
    ),
    { duration: 4000 },
  );
}

// "Removed X · Undo": removing is instant, and Undo puts the line back where it was.
export function notifyRemoved(name, onUndo) {
  toast(
    (t) => (
      <span className="flex items-center gap-3">
        <span>Removed {name}</span>
        <button
          type="button"
          onClick={() => {
            onUndo();
            toast.dismiss(t.id);
          }}
          className={linkClass}
        >
          Undo
        </button>
      </span>
    ),
    { duration: 6000 },
  );
}