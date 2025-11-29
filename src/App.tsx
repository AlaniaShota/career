import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <main className="min-h-screen bg-soft-silver">
      <nav className="flex flex-row justify-between px-10 py-2 items-center">
        <Link className="text-2xl" to="/">Career</Link>

        <div className="flex flex-row justify-between items-center gap-4 text-2xl">
          {" "}
          <Link to="/">Home</Link> <Link to="/admin">Admin</Link>
        </div>
      </nav>
      <Outlet />
    </main>
  );
}
