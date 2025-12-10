"use client";

import { Link } from "react-router-dom";

export default function Header() {
  const links = [
    { id: 1, title: "Home", to: "/" },
    { id: 2, title: "Jobs", to: "/jobs" },
    { id: 3, title: "About", to: "/about" },
    { id: 4, title: "Contact", to: "/contact" },
  ];
  return (
    <nav className="flex flex-row justify-between py-2 items-center w-4/5 mx-auto">
      <Link className="text-2xl" to="/">
        SJob
      </Link>
      <div className="flex flex-row gap-4 text-2xl">
        {links.map((link) => (
          <div key={link.id}>
            <Link to={link.to}>{link.title}</Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
