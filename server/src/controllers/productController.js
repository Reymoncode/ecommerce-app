import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { HttpError } from '../utils/httpError.js';

const SORTS = {
  recommended: { createdAt: 1, _id: 1 }, // menu order (the order products were added)
  price_asc: { price: 1, _id: 1 },
  price_desc: { price: -1, _id: 1 },
  newest: { createdAt: -1, _id: 1 },
  name: { name: 1, _id: 1 },
};

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// The small shape a product card needs
const toCard = (p) => ({
  id: p._id,
  name: p.name,
  slug: p.slug,
  description: p.description,
  image: p.image,
  price: p.price,
  badges: p.badges,
  isAvailable: p.isAvailable,
  isCustomizable: p.sizes.length > 0 || p.crusts.length > 0 || p.toppings.length > 0,
  category: p.category ? { name: p.category.name, slug: p.category.slug } : null,
});

// GET /api/products?category=pizzas&badge=bestseller&search=pep&sort=price_asc&page=1&limit=12
export const listProducts = async (req, res) => {
  const { category, badge, search, sort, page, limit } = req.validatedQuery;
  const filter = { isActive: true };

  if (category) {
    const found = await Category.findOne({ slug: category }).lean();
    if (!found) return res.json({ products: [], page, pages: 1, total: 0 });
    filter.category = found._id;
  }
  if (badge) filter.badges = badge;
  if (search) {
    const pattern = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ name: pattern }, { description: pattern }];
  }

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort(SORTS[sort])
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('category', 'name slug')
      .lean(),
    Product.countDocuments(filter),
  ]);

  res.json({
    products: items.map(toCard),
    page,
    pages: Math.max(1, Math.ceil(total / limit)),
    total,
  });
};

// GET /api/products/:slug
export const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    .populate('category', 'name slug')
    .lean();
  if (!product) throw new HttpError(404, 'Product not found');

  const { _id, __v, ...rest } = product;
  res.json({ product: { id: _id, ...rest } });
};

const ensureCategoryExists = async (categoryId) => {
  if (categoryId && !(await Category.exists({ _id: categoryId }))) {
    throw new HttpError(400, 'Category does not exist');
  }
};

// POST /api/products  (admin)
export const createProduct = async (req, res) => {
  await ensureCategoryExists(req.body.category);
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

// PATCH /api/products/:id  (admin) — send only the fields that change
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new HttpError(404, 'Product not found');

  await ensureCategoryExists(req.body.category);
  Object.assign(product, req.body);
  await product.save(); // runs schema validation again

  res.json({ product });
};

// DELETE /api/products/:id  (admin) — soft delete, so old orders still resolve
export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!product) throw new HttpError(404, 'Product not found');
  res.json({ message: 'Product removed from the menu' });
};