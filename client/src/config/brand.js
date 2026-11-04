import logoLight from '../assets/brand/logo-light.svg';
import logoDark from '../assets/brand/logo-dark.svg';

export const BRAND = {
  name: '[Brand Name]',
  tagline: 'Hand-stretched pizza, delivered hot.',
  contact: {
    phone: '+63 900 000 0000',
    email: 'hello@example.com',
    address: '123 Sample Street, Your City',
  },
  hours: 'Daily, 10:00 AM to 10:00 PM',
  socials: [
    { label: 'Facebook', href: 'https://facebook.com/' },
    { label: 'Instagram', href: 'https://instagram.com/' },
  ],
  logo: {
    light: logoLight, // for char backgrounds
    dark: logoDark,   // for light backgrounds
  },
};