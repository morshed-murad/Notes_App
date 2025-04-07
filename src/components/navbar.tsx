import { Link, Outlet } from "react-router-dom";

export function Navbar() {
  return (
    <div className="flex flex-col h-full">
      <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full">
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/notes">Dashboard</Link>
          </li>
          <li>
            <Link to="/favorites">Starred Notes</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
