import { z } from 'zod';

const BADGES = ['new', 'bestseller', 'spicy', 'vegetarian'];
const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid category id');

const choice = z.object({
  name: z.string().trim().min(1, 'Option name is required'),
  priceDelta: z.number().min(0, 'Price change cannot be negative').optional(),
});

const topping = z.object({
  name: z.string().trim().min(1, 'Topping name is required'),
  price: z.number().min(0, 'Topping price cannot be negative'),
  isAvailable: z.boolean().optional(),
});

// No .default() values here on purpose: Mongoose fills in defaults on create,
// and in Zod 4 a default would also be applied by .partial(), wiping fields on update.
export const productCreateSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80),
  description: z.string().trim().min(5, 'Description is too short').max(500),
  category: objectId,
  image: z.string().trim().optional(),
  price: z.number().min(0, 'Price cannot be negative'),
  sizes: z.array(choice).optional(),
  crusts: z.array(choice).optional(),
  toppings: z.array(topping).optional(),
  badges: z.array(z.enum(BADGES)).max(2, 'At most 2 badges').optional(),
  isAvailable: z.boolean().optional(),
});

export const productUpdateSchema = productCreateSchema.partial();

export const productQuerySchema = z.object({
  category: z.string().trim().toLowerCase().optional(),
  badge: z.enum(BADGES).optional(),
  search: z.string().trim().max(100).optional(),
  sort: z.enum(['recommended', 'price_asc', 'price_desc', 'newest', 'name']).default('recommended'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});