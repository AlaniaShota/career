import {  Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-soft-silver flex flex-col justify-between w-full">
      <Header/>

      <main className="flex justify-center w-full">
        <div className="w-4/5">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
