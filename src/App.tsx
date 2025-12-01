import { Link, Outlet } from "react-router-dom";
import Footer from "./footer/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-soft-silver flex flex-col justify-between w-full">
      <nav className="flex flex-row justify-between py-2 items-center w-4/5 mx-auto">
        <Link className="text-2xl" to="/">
          SJob
        </Link>
        <div className="flex flex-row gap-4 text-2xl">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>

      <main className="flex justify-center w-full">
        <div className="w-2/3">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
