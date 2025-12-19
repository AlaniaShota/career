"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

type GradientVariant = "static" | "animated" | "premium";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  gradientStyle?: string;
  variant?: GradientVariant;
}

export default function GradientCard({
  children,
  className,
  innerClassName,
  gradientStyle,
  variant = "static",
}: GradientCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={clsx(
        "gradient-card",
        gradientStyle,
        `gradient-${variant}`,
        className
      )}
    >
      <div
        className={clsx(
          "rounded-3xl bg-white p-6 relative z-10",
          innerClassName
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
