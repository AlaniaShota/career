"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function FiltersAccordion({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-3 py-2 border rounded flex justify-between items-center"
        style={{ borderColor: "var(--color-gstore-blue)" }}
      >
        <span className="font-thin">Filters</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mt-4 space-y-4"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
