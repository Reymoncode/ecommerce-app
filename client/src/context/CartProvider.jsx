import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { CartContext } from './cartContext';
import { STORAGE_KEY, calcSubtotal, cartReducer, countItems, loadCart, saveCart } from '../utils/cart';

// Wrap the whole app once (see Layout.jsx). Everything that needs the cart reads it with useCart().
export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart);

  // Save after every change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  // Another browser tab changed the cart: pick up its version
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY || event.key === null) dispatch({ type: 'replace', items: loadCart() });
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addItem = useCallback((line) => dispatch({ type: 'add', line }), []);
  const setQuantity = useCallback((key, quantity) => dispatch({ type: 'setQuantity', key, quantity }), []);
  const removeItem = useCallback((key) => dispatch({ type: 'remove', key }), []);
  const restoreItem = useCallback((line, index) => dispatch({ type: 'restore', line, index }), []);
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo(
    () => ({
      items,
      count: countItems(items),
      subtotal: calcSubtotal(items),
      addItem,
      setQuantity,
      removeItem,
      restoreItem,
      clearCart,
    }),
    [items, addItem, setQuantity, removeItem, restoreItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;