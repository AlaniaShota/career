"use client";

import { motion } from "framer-motion";
import { listContainer, unifiedTransition } from "../utils/animations";

export interface AnimatedListItem {
  id: number;
  name?: string;
  post: string;
}

interface AnimatedListProps {
  data: AnimatedListItem[];
  withBullet?: boolean;
}

export const AnimatedList = ({
  data,
  withBullet = false,
}: AnimatedListProps) => {
  return (
    <motion.ul
      variants={listContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="list-none"
    >
      {data.map((item, i) => (
        <motion.li
          key={item.id}
          className={`flex flex-row items-start gap-2 ${
            withBullet
              ? "before:content-['•'] before:text-soft-silver before:mr-1"
              : ""
          }`}
          variants={{
            hidden: { opacity: 0, y: 5 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.08, ...unifiedTransition },
            },
          }}
        >
          {item.name && <h3 className="font-semibold">{item.name}</h3>}
          <p>{item.post}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
};
