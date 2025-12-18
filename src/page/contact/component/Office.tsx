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
// export default function Office() {
//   const officeList = officeConfig.flatMap((item) =>
//     item.value.map((text, index) => ({
//       id: item.id * 10 + index,
//       name: item.label,
//       post: text,
//     }))
//   );
//   return (
//     <div className="text-gstore-midnight w-1/3 bg-white rounded-2xl shadow-sm border flex flex-col justify-between gap-10">
//       <motion.div
//         variants={cardItem}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         className="flex flex-col items-start p-6"
//       >
//         <h3 className="text-2xl md:text-3xl mb-3">{officeTitle}</h3>
//         <AnimatedList data={officeList} withBullet />
//       </motion.div>
//       <img
//         src={officeImg}
//         alt=""
//         className="w-full object-contain rounded-b-2xl"
//       />
//     </div>
//   );
// }
export default function Office() {
  const officeList: AnimatedListItem[] = officeConfig.map((item) => ({
    id: item.id,
    name: item.label,
    post: item.value, // теперь массив значений
  }));

  return (
    <div className="text-gstore-midnight w-1/3 bg-white rounded-2xl shadow-sm border flex flex-col justify-between gap-10">
      <motion.div
        variants={cardItem}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-gstore-midnight p-6 flex flex-col items-start"
      >
        <h3 className="text-2xl md:text-3xl mb-3">{officeTitle}</h3>
        <AnimatedList data={officeList} />
      </motion.div>
      <img
        src={officeImg}
        alt={officeTitle}
        className="w-full object-contain"
      />
    </div>
  );
}
