import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

// One choice inside a size or crust group, e.g. { name: 'Large', priceDelta: 220 }
const choiceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  priceDelta: { type: Number, min: 0, default: 0 },
});

// An extra topping, e.g. { name: 'Mushroom', price: 40, isAvailable: true }
const toppingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  isAvailable: { type: Boolean, default: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    description: { type: String, required: [true, 'Description is required'], trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required'] },
    image: { type: String, default: '' },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price cannot be negative'] },
    sizes: [choiceSchema],
    crusts: [choiceSchema],
    toppings: [toppingSchema],
    badges: {
      type: [{ type: String, enum: ['new', 'bestseller', 'spicy', 'vegetarian'] }],
      validate: { validator: (v) => v.length <= 2, message: 'A product can have at most 2 badges' },
    },
    isAvailable: { type: Boolean, default: true }, // false = "Sold out" today
    isActive: { type: Boolean, default: true }, // false = removed from the menu (soft delete)
  },
  { timestamps: true },
);

productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, isActive: 1 });

productSchema.pre('validate', function () {
  if (!this.slug && this.name) this.slug = slugify(this.name);
});

export default mongoose.model('Product', productSchema);