"use client";

import { ListBlock } from "./ListBlock";
import teamImg from "../../../assets/Copilot_20251213_003740.png";
import { motion } from "framer-motion";
import { unifiedTransition } from "../../../utils/animations";
interface ListBlockItem {
  id: number;
  name?: string;
  post: string;
}

export default function Team() {
  const teamData: ListBlockItem[] = [
    {
      id: 1,
      name: "Reliability —",
      post: "We partner with verified employers and trusted organizations.",
    },
    {
      id: 2,
      name: "Simplicity —",
      post: "Our interface is clean, intuitive, and packed with powerful filters.",
    },
    {
      id: 3,
      name: "Support —",
      post: "Our team is always ready to help with guidance, resources, and technical assistance.",
    },
  ];

  const valuesData: ListBlockItem[] = [
    {
      id: 1,
      name: "Transparency —",
      post: "We provide clear job details and honest employer profiles.",
    },
    {
      id: 2,
      name: "Inclusivity —",
      post: "We welcome job seekers from all backgrounds and support diverse hiring.",
    },
    {
      id: 3,
      name: "Innovation —",
      post: "We constantly improve our platform to meet the evolving needs of the workforce.",
    },
  ];

  const impactData: ListBlockItem[] = [
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
    <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
      <div className="flex flex-col items-start justify-between gap-10">
        {blocks.map((block, i) => (
          <ListBlock key={i} title={block.title} data={block.data} />
        ))}
      </div>
      <motion.img
        src={teamImg}
        alt="Team"
        className="md:w-2/6 w-auto rounded-2xl object-cover"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ ...unifiedTransition }}
      />
    </div>
  );
}
