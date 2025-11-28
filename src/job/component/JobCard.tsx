
import { motion, type Variants,  } from "framer-motion";
import type { Job } from "../../store/jobStore";

interface Props {
  job: Job;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function JobCard({ job }: Props) {
  return (
    <motion.div
      className="flex justify-between items-center p-4 rounded-2xl shadow-xl/30 transition-all bg-white"
      whileHover={{
        scale: 1.01,
        y: -2,
        boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      <div className="flex flex-row items-center">
        <motion.div
          className="shadow-xl/30 rounded-2xl py-2 px-4"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          variants={itemVariants}
        >
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-16 h-16 m-2"
          />
        </motion.div>

        <div className="flex flex-col justify-between items-start mx-6">
          <motion.h5
            className="font-semibold"
            style={{ color: "var(--color-gstore-blue)" }}
            variants={itemVariants}
          >
            {job.company.name}
          </motion.h5>

          <motion.h3
            className="font-bold cursor-pointer"
            whileHover={{
              color: "var(--color-gstore-blue)",
              y: -3,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ color: "var(--color-gstore-midnight)" }}
            variants={itemVariants}
          >
            {job.title}
          </motion.h3>

          <motion.div
            className="text-center p-2 rounded"
            whileHover={{
              backgroundColor: "#E5E7EB",
              color: "var(--color-gstore-midnight)",
            }}
            transition={{ duration: 0.3 }}
            // style={{ borderColor: "var(--color-gstore-blue)" }}
            variants={itemVariants}
          >
            <p className="text-sm">{job.company.industry}</p>
          </motion.div>
        </div>
      </div>
      <motion.p className="text-xs mt-1 text-gray-400" variants={itemVariants}>
        Posted: {new Date(job.postedAt).toLocaleDateString()}
      </motion.p>
    </motion.div>
  );
}
