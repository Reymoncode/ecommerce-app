import { useCart } from './useCart';

// What the navbar badge reads: how many items, and the subtotal.
export function useCartSummary() {
  const { count, subtotal } = useCart();
  return { count, total: subtotal };
}

export default useCartSummary;