import { Navbar } from "../../components/navbar";
import { Outlet } from "react-router-dom";
export function DashboardPage() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
