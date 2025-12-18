import { motion } from "framer-motion";
import {
  AnimatedList,
  type AnimatedListItem,
} from "../../../component/AnimatedList";
import { cardItem } from "../../../utils/animations";

interface ListBlockProps {
  title: string;
  data: AnimatedListItem[];
}

export const ListBlock = ({ title, data }: ListBlockProps) => (
  <motion.div
    variants={cardItem}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="text-soft-silver flex flex-col items-start"
  >
    <h3 className="text-2xl md:text-3xl mb-3">{title}</h3>
    <AnimatedList data={data} withBullet />
  </motion.div>
);
