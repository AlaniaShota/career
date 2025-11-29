"use client";

import { motion } from "framer-motion";
import type { Job } from "../../store/jobStore";

interface Props {
  job: Job;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function JobDetails({ job }: Props) {
  return (
    <motion.div
      className="bg-white p-4 shadow rounded flex flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.h3 className="text-xl font-semibold" variants={itemVariants}>
        {job.title}
      </motion.h3>

      <motion.p className="text-gray-600" variants={itemVariants}>
        {job.company.name} - {job.location}
      </motion.p>

      <motion.p className="mt-2" variants={itemVariants}>
        {job.description}
      </motion.p>

      <motion.p className="mt-2 font-medium" variants={itemVariants}>
        Salary: {job.salary}
      </motion.p>

      {job.skills && job.skills.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 mt-2"
          variants={itemVariants}
        >
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      )}

      <motion.a
        href={job.applyLink}
        target="_blank"
        className="text-blue-600 mt-2 inline-block font-semibold"
        variants={itemVariants}
      >
        Apply Now
      </motion.a>
    </motion.div>
  );
}
