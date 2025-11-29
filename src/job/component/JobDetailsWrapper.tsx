"use client";

import { motion, AnimatePresence } from "framer-motion";
import JobDetails from "./JobDetails";
import type { Job } from "../../store/jobStore";

interface Props {
  selectedJob: Job | null;
}

export default function JobDetailsWrapper({ selectedJob }: Props) {
  return (
    <AnimatePresence mode="wait">
      {selectedJob && (
        <motion.div
          key={selectedJob.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <JobDetails job={selectedJob} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
