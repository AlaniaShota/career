import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-200 ">
      {/* <h1 className="text-3xl font-bold p-4">Job Listings</h1> */}
      <Outlet />
    </main>
  );
}
