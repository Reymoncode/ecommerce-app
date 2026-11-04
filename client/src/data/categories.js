import { CupSoda, Drumstick, IceCreamCone, Pizza } from 'lucide-react';

const CATEGORY_LIST = [
  { slug: 'pizzas', name: 'Pizzas', blurb: 'Classics and house specials', Icon: Pizza },
  { slug: 'sides', name: 'Sides', blurb: 'Garlic knots, wings and fries', Icon: Drumstick },
  { slug: 'drinks', name: 'Drinks', blurb: 'Iced tea, cola and sparkling water', Icon: CupSoda },
  { slug: 'desserts', name: 'Desserts', blurb: 'Tiramisu and Nutella calzone', Icon: IceCreamCone },
];

export const CATEGORIES = CATEGORY_LIST.map((category) => ({
  ...category,
  image: `/images/categories/${category.slug}.jpg`,
}));