import Category from '../models/Category.js';

// GET /api/categories
export const listCategories = async (req, res) => {
  const categories = await Category.find().sort({ sortOrder: 1, name: 1 }).select('name slug').lean();
  res.json({ categories: categories.map(({ _id, name, slug }) => ({ id: _id, name, slug })) });
};