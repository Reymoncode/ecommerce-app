import { slugify } from '../utils/slugify.js';

export const categories = [
  { name: 'Pizzas', slug: 'pizzas', sortOrder: 1 },
  { name: 'Sides', slug: 'sides', sortOrder: 2 },
  { name: 'Drinks', slug: 'drinks', sortOrder: 3 },
  { name: 'Desserts', slug: 'desserts', sortOrder: 4 },
];

const PIZZA_SIZES = [
  { name: 'Small 10"', priceDelta: 0 },
  { name: 'Medium 12"', priceDelta: 120 },
  { name: 'Large 14"', priceDelta: 220 },
];

const PIZZA_CRUSTS = [
  { name: 'Classic', priceDelta: 0 },
  { name: 'Thin', priceDelta: 0 },
  { name: 'Stuffed crust', priceDelta: 80 },
];

const PIZZA_TOPPINGS = [
  { name: 'Extra mozzarella', price: 50 },
  { name: 'Mushroom', price: 40 },
  { name: 'Black olives', price: 35 },
  { name: 'Jalapeño', price: 35 },
  { name: 'Pepperoni', price: 60 },
  { name: 'Italian sausage', price: 70 },
  { name: 'Burrata', price: 120, isAvailable: false }, // shows the "Out" state
];

const DRINK_SIZES = [
  { name: 'Regular', priceDelta: 0 },
  { name: 'Large', priceDelta: 30 },
];

const pizza = (data) => ({
  category: 'pizzas',
  sizes: PIZZA_SIZES,
  crusts: PIZZA_CRUSTS,
  toppings: PIZZA_TOPPINGS,
  ...data,
});

// `category` holds a slug here; the seed script swaps it for the real ObjectId.
// `price` is the starting price (smallest size, no extras).
export const products = [
  pizza({
    name: 'Margherita',
    description: 'San Marzano tomato, fresh mozzarella, basil and olive oil.',
    price: 349,
    badges: ['bestseller', 'vegetarian'],
  }),
  pizza({
    name: 'Pepperoni',
    description: 'Double pepperoni, mozzarella and our slow-cooked tomato sauce.',
    price: 399,
    badges: ['bestseller'],
  }),
  pizza({
    name: 'Spicy Diavola',
    description: 'Spicy salami, chili flakes, mozzarella and a drizzle of hot honey.',
    price: 429,
    badges: ['spicy', 'bestseller'],
  }),
  pizza({
    name: 'Four Cheese',
    description: 'Mozzarella, gorgonzola, parmesan and provolone on a white base.',
    price: 449,
    badges: ['new', 'vegetarian'],
  }),
  pizza({
    name: 'Garden Veggie',
    description: 'Bell peppers, mushroom, red onion, olives and tomato.',
    price: 399,
    badges: ['vegetarian'],
  }),
  pizza({
    name: 'BBQ Chicken',
    description: 'Smoky BBQ sauce, grilled chicken, red onion and cilantro.',
    price: 449,
    badges: ['new'],
  }),
  {
    name: 'Garlic Knots',
    category: 'sides',
    description: 'Six knots brushed with garlic butter and parmesan, with marinara.',
    price: 149,
    badges: ['bestseller', 'vegetarian'],
  },
  {
    name: 'Buffalo Wings',
    category: 'sides',
    description: 'Six crispy wings tossed in buffalo sauce, with ranch dip.',
    price: 249,
    badges: ['spicy'],
  },
  {
    name: 'Truffle Fries',
    category: 'sides',
    description: 'Skin-on fries with truffle oil and parmesan.',
    price: 179,
    badges: ['vegetarian'],
  },
  {
    name: 'House Iced Tea',
    category: 'drinks',
    description: 'Brewed black tea with calamansi.',
    price: 79,
    sizes: DRINK_SIZES,
  },
  {
    name: 'Cola',
    category: 'drinks',
    description: 'Ice-cold classic cola.',
    price: 69,
    sizes: DRINK_SIZES,
  },
  {
    name: 'Sparkling Water',
    category: 'drinks',
    description: 'Lightly sparkling mineral water.',
    price: 59,
  },
  {
    name: 'Nutella Calzone',
    category: 'desserts',
    description: 'Folded dough filled with Nutella, dusted with powdered sugar.',
    price: 199,
    badges: ['new'],
  },
  {
    name: 'Tiramisu',
    category: 'desserts',
    description: 'Espresso-soaked ladyfingers with mascarpone cream.',
    price: 179,
    isAvailable: false, // shows the "Sold out" state
  },
].map((p) => ({ ...p, image: `/images/products/${slugify(p.name)}.jpg` }));