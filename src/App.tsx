import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-200 ">
      <nav>Career JobList <Link to='/admin'>Admin</Link></nav>
      <Outlet />
    </main>
  );
}
