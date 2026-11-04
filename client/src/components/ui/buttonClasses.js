const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,translate] duration-fast ease-out disabled:cursor-not-allowed';
 
const sizes = {
  sm: 'min-h-tap px-5 text-small',
  md: 'min-h-tap px-6 text-body',
  lg: 'min-h-14 px-8 text-body',
};
 
const variants = {
  primary:
    'bg-tomato text-surface shadow-stamp hover:bg-tomato-dark motion-safe:active:translate-x-1 motion-safe:active:translate-y-1 active:shadow-none disabled:bg-disabled disabled:text-disabled-fg disabled:shadow-none',
  secondary:
    'border-2 border-forest text-forest hover:bg-forest hover:text-parchment disabled:border-disabled disabled:text-disabled-fg disabled:hover:bg-transparent',
  outlineOnDark:
    'border-2 border-parchment text-parchment hover:bg-parchment hover:text-forest disabled:border-parchment/30 disabled:text-parchment/40 disabled:hover:bg-transparent',
};
 
export function buttonClasses({ variant = 'primary', size = 'md', className = '' } = {}) {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();
}
 
export default buttonClasses;