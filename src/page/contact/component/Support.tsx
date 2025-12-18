"use client";

import { motion } from "framer-motion";
import {
  AnimatedList,
  type AnimatedListItem,
} from "../../../component/AnimatedList";
import { cardItem } from "../../../utils/animations";

export default function Support() {
  const supportData: AnimatedListItem[] = [
    {
      id: 1,
      name: "Support:",
      post: "Issues with your account or applications",
    },
    { id: 2, name: "Business:", post: "Partnerships and collaborations" },
    { id: 3, name: "Press:", post: "Media and PR inquiries" },
  ];

  return (
    <motion.div
      variants={cardItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-soft-silver flex flex-col items-start gap-4"
    >
      <AnimatedList data={supportData} />
    </motion.div>
  );
}
