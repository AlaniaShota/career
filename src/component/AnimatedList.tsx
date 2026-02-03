"use client";

import { motion } from "framer-motion";
import { listContainer, unifiedTransition } from "../utils/animations";

export interface AnimatedListItem {
  id: number;
  name?: string;
  post: string | string[];

}

export interface AnimatedListProps {
  data: AnimatedListItem[];
  withBullet?: boolean;
  listDisc?:string
}

export const AnimatedList = ({
  data,
  withBullet = false, listDisc
}: AnimatedListProps) => {
  return (
    <motion.ul
      variants={listContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="list-none flex flex-col gap-2"
    >
      {data.map((item, i) => (
        <motion.li
          key={item.id}
          className={`flex flex-row flex-wrap items-start gap-2 ${
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
          {item.name && <h3 className="font-semibold mr-1">{item.name}</h3>}

          {Array.isArray(item.post) ? (
            <ul className={`${listDisc} ml-4 space-y-1`}>
              {item.post.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </ul>
          ) : (
            <p className="whitespace-normal break-words">{item.post}</p>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
};
