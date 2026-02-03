"use client";

import { motion } from "framer-motion";
import {
  AnimatedList,
  type AnimatedListItem,
} from "../../../component/AnimatedList";
import { cardItem } from "../../../utils/animations";
import { faqTitle } from "./constanta";
import { faqConfig } from "./faq.config";

export default function FAQ() {
  const officeList: AnimatedListItem[] = faqConfig.map((item) => ({
    id: item.id,
    name: item.label,
    post: item.value,
  }));

  return (
    <div className=" w-full flex flex-row justify-between gap-10">
      <motion.div
        variants={cardItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-soft-silver p-0 md:p-6 flex flex-col items-start"
      >
        <h3 className="text-3xl md:text-3xl mb-3">{faqTitle}</h3>
        <AnimatedList data={officeList} />
      </motion.div>
    </div>
  );
}
