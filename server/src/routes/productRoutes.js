import { Router } from 'express';
import {
  listProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { validate, validateQuery } from '../middleware/validate.js';
import { productCreateSchema, productUpdateSchema, productQuerySchema } from '../validators/productSchemas.js';

const router = Router();

// Public
router.get('/', validateQuery(productQuerySchema), listProducts);
router.get('/:slug', getProductBySlug);

// Admin
router.post('/', protect, adminOnly, validate(productCreateSchema), createProduct);
router.patch('/:id', protect, adminOnly, validate(productUpdateSchema), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;