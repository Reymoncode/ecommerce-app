import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="px-4 py-20 text-center">
      <h1 className="font-display text-h1 uppercase">Page not found</h1>
      <Link to="/" className="mt-4 inline-block text-accent-ink underline">Back to home</Link>
    </div>
  );
}