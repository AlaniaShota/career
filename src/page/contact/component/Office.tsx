"use client";

import { motion } from "framer-motion";
import { cardItem } from "../../../utils/animations";
import { officeConfig } from "./office.config";
import {
  AnimatedList,
  type AnimatedListItem,
} from "../../../component/AnimatedList";
import { officeTitle } from "./constanta";
import officeImg from "../../../assets/denustudios-DPwcr_yA-zE-unsplash.png";

export default function Office() {
  const officeList: AnimatedListItem[] = officeConfig.map((item) => ({
    id: item.id,
    name: item.label,
    post: item.value, 
  }));

  return (
    <div className="text-gstore-midnight w-1/3 bg-white rounded-2xl shadow-sm  flex flex-col justify-between gap-10">
      <motion.div
        variants={cardItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-gstore-midnight p-6 flex flex-col items-start"
      >
        <h3 className="text-2xl md:text-3xl mb-3">{officeTitle}</h3>
        <AnimatedList data={officeList}/>
      </motion.div>
      <img
        src={officeImg}
        alt={officeTitle}
        className="w-full object-contain"
      />
    </div>
  );
}
