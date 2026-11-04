import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { categories, products } from './data.js';

if (process.env.NODE_ENV === 'production') {
  console.error('Refusing to seed: NODE_ENV is production.');
  process.exit(1);
}

const seed = async () => {
  await connectDB();

  // Only products and categories are replaced. Users are never touched.
  await Product.deleteMany({});
  await Category.deleteMany({});

  const createdCategories = await Category.create(categories);
  const categoryIds = Object.fromEntries(createdCategories.map((c) => [c.slug, c._id]));

  const createdProducts = await Product.create(
    products.map((p) => ({ ...p, category: categoryIds[p.category] })),
  );

  console.log(`Seeded ${createdCategories.length} categories and ${createdProducts.length} products.`);
};

try {
  await seed();
} catch (error) {
  console.error('Seed failed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}