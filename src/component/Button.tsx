import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  to?: string;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "link";
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children = "Apply Now",
  onClick,
  to,
  className = "",
  disabled = false,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded cursor-pointer transition-colors disabled:opacity-50";

  const variantStyles = {
    primary: "bg-gstore-blue text-white hover:bg-gstore-midnight",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    link: "bg-transparent text-blue-600 hover:underline p-0",
  };

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
