import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar goes here in Part 2 */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer goes here in Part 10 */}
    </div>
  );
}