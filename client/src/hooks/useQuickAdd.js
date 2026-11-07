import { useCart } from './useCart';
import { notifyAdded } from '../components/cart/cartToasts';

// One tap "Add" from a product card, for items with no choices to make (sides, desserts, simple drinks).
// Items with choices (a pizza) open the product page instead.
export function useQuickAdd() {
  const { addItem } = useCart();

  return (product) => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image ?? '',
      sizeId: null,
      crustId: null,
      toppingIds: [],
      options: [],
      unitPrice: product.price,
      quantity: 1,
    });
    notifyAdded(product.name);
  };
}

export default useQuickAdd;