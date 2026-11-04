import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, unique: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

categorySchema.pre('validate', function () {
  if (!this.slug && this.name) this.slug = slugify(this.name);
});

export default mongoose.model('Category', categorySchema);