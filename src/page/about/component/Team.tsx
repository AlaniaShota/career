"use client";

import { motion } from "framer-motion";
import teamImg from "../../../assets/Copilot_20251213_003740.png";
import { cardItem, listContainer, unifiedTransition } from "../../../utils/animations";


interface ListItem {
  id: number;
  name?: string;
  post: string;
}

interface ListBlockProps {
  title: string;
  data: ListItem[];
}

const ListBlock = ({ title, data }: ListBlockProps) => (
  <motion.div
    variants={cardItem}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="text-soft-silver flex flex-col items-start"
  >
    <h3 className="text-3xl mb-3">{title}</h3>
    <motion.ul
      variants={listContainer}
      initial="hidden"
      animate="visible"
      className="list-none"
    >
      {data.map((item, i) => (
        <motion.li
          key={item.id}
          className="flex flex-row items-start gap-4 before:content-['•'] before:text-soft-silver before:mr-1"
          custom={i}
          variants={{
            hidden: { opacity: 0, y: 5 },
            visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, ...unifiedTransition } },
          }}
        >
          {item.name && <h3>{item.name}</h3>}
          <p>{item.post}</p>
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
);

export default function Team() {
  const teamData = [
    { id: 1, name: "Reliability —", post: "We partner with verified employers and trusted organizations." },
    { id: 2, name: "Simplicity —", post: "Our interface is clean, intuitive, and packed with powerful filters." },
    { id: 3, name: "Support —", post: "Our team is always ready to help with guidance, resources, and technical assistance." },
  ];

  const valuesData = [
    { id: 1, name: "Transparency —", post: "We provide clear job details and honest employer profiles." },
    { id: 2, name: "Inclusivity —", post: "We welcome job seekers from all backgrounds and support diverse hiring." },
    { id: 3, name: "Innovation —", post: "We constantly improve our platform to meet the evolving needs of the workforce." },
  ];

  const impactData = [
    { id: 1, post: "Over 1 million job applications submitted" },
    { id: 2, post: "Trusted by 10,000+ companies worldwide" },
    { id: 3, post: "Serving users in 50+ countries" },
    { id: 4, post: "Rated 4.8/5 by our community of professionals" },
  ];

  const blocks = [
    { title: "Why Choose Us", data: teamData },
    { title: "Our Values", data: valuesData },
    { title: "Our Impact", data: impactData },
  ];

  return (
    <div className="flex flex-row justify-between gap-10">
      <div className="flex flex-col justify-evenly items-start gap-14">
        {blocks.map((block, index) => (
          <ListBlock key={index} title={block.title} data={block.data} />
        ))}
      </div>
      <motion.img
        src={teamImg}
        alt="Team"
        className="w-2/6 rounded-2xl object-cover"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ ...unifiedTransition }}
      />
    </div>
  );
}
