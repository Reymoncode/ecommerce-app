export function Container({ as: Tag = 'div', className = '', ...props }) {
  return <Tag className={`mx-auto w-full max-w-site px-gutter ${className}`} {...props} />;
}
 
export default Container;