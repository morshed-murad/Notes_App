import { NavLink, Outlet } from "react-router-dom";

export function Navbar() {
  return (
    <div className="flex flex-col h-full">
      <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full">
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notes"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              Starred Notes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
