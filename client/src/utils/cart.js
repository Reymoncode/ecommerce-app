// Pure cart logic: no React in here, so it is easy to reason about and test.

export const MAX_QUANTITY = 10; // per line
export const MAX_LINES = 50; // per cart
export const STORAGE_KEY = 'cart:v1'; // bump the version if the saved shape ever changes

// A "line" is one product with one exact set of choices. Two adds with the same
// product, size, crust and toppings (in any order) land on the same line.
export const makeLineKey = ({ productId, sizeId, crustId, toppingIds = [] }) =>
  [productId, sizeId ?? '', crustId ?? '', [...toppingIds].sort().join(',')].join('|');

const clampQuantity = (quantity) => Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity)));

export function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const key = makeLineKey(action.line);
      const existing = items.find((line) => line.key === key);
      if (existing) {
        return items.map((line) =>
          line.key === key ? { ...line, quantity: clampQuantity(line.quantity + action.line.quantity) } : line,
        );
      }
      if (items.length >= MAX_LINES) return items;
      return [...items, { ...action.line, key, quantity: clampQuantity(action.line.quantity) }];
    }
    case 'setQuantity':
      return items.map((line) => (line.key === action.key ? { ...line, quantity: clampQuantity(action.quantity) } : line));
    case 'remove':
      return items.filter((line) => line.key !== action.key);
    case 'restore': {
      // Undo for "remove": put the line back where it was
      if (items.some((line) => line.key === action.line.key)) return items;
      const next = [...items];
      next.splice(Math.min(action.index, next.length), 0, action.line);
      return next;
    }
    case 'clear':
      return [];
    case 'replace':
      return action.items;
    default:
      return items;
  }
}

export const countItems = (items) => items.reduce((sum, line) => sum + line.quantity, 0);
export const calcSubtotal = (items) => items.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

// Saved data can be old, hand-edited or corrupted: keep only lines that are well formed.
const isValidLine = (line) =>
  line &&
  typeof line.key === 'string' &&
  typeof line.productId === 'string' &&
  typeof line.slug === 'string' &&
  typeof line.name === 'string' &&
  typeof line.image === 'string' &&
  Number.isFinite(line.unitPrice) &&
  line.unitPrice >= 0 &&
  Number.isInteger(line.quantity) &&
  line.quantity >= 1 &&
  line.quantity <= MAX_QUANTITY &&
  Array.isArray(line.toppingIds) &&
  Array.isArray(line.options) &&
  line.options.every((option) => typeof option === 'string');

export function sanitizeCart(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isValidLine).slice(0, MAX_LINES);
}

// Browser storage can be blocked (private windows, strict settings): never let that break the site.
export function loadCart() {
  try {
    return sanitizeCart(JSON.parse(window.localStorage.getItem(STORAGE_KEY)));
  } catch {
    return [];
  }
}

export function saveCart(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage full or blocked: the cart still works for this visit
  }
}