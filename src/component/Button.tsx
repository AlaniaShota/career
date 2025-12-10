import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  to?: string;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children = "Apply Now",
  onClick,
  to,
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 bg-gstore-blue text-white rounded hover:bg-gstore-midnight transition-colors disabled:opacity-50";

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
