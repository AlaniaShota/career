import { Outlet } from "react-router-dom";
import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gstore-midnight flex flex-col justify-between w-full">
      <Header />

      <main className="flex justify-center w-full">
        <div className="w-4/5">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
