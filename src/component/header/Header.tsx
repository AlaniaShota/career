"use client";

import { Link } from "react-router-dom";

export default function Header() {
  const links = [
    { id: 1, title: "Home", to: "/" },
    { id: 2, title: "About", to: "/about" },
    { id: 3, title: "Contact", to: "/contact" },
  ];
  return (
    <nav className="flex flex-row justify-center md:justify-between pt-6 items-center w-4/5 mx-4 md:mx-auto text-soft-silver">
      <Link className="text-2xl md:flex hidden" to="/">
        SJob
      </Link>
      <div className="flex flex-row gap-4 text-xl md:text-2xl">
        {links.map((link) => (
          <div key={link.id}>
            <Link to={link.to}>{link.title}</Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
