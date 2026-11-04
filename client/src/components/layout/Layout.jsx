import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="on-dark sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-toast focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-body focus:font-semibold focus:text-parchment"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--surface)',
            color: 'var(--ink)',
            border: '1px solid var(--border)',
            borderRadius: '9999px',
            boxShadow: 'var(--elev-card-hover)',
            fontFamily: 'var(--ff-body)',
            fontWeight: 500,
          },
        }}
      />
    </div>
  );
}