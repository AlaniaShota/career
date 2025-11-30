import { motion } from "framer-motion";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import type { FilterForm } from "./JobsFilter";

import {
  listContainer,
  cardItem,
  cardWrapperHover,
  hoverTransition,
  cardInnerItem,
  getJobCardClass,
} from "../../utils/animations";

import type { Job } from "../../store/jobStore";
import { filterAndSortJobs } from "../../utils/jobs";

interface Props {
  job: Job[];
  selectedJob: Job | null;
  onSelect: (job: Job) => void;
}

export default function JobCards({ job, selectedJob, onSelect }: Props) {
  const { watch } = useFormContext<FilterForm>();
  const filters = watch();

  const filteredJobs = useMemo(
    () => filterAndSortJobs(job, filters),
    [job, filters]
  );

  if (!filteredJobs.length)
    return <div className="p-6 text-center text-gray-500">Nothing found</div>;

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 w-full gap-6"
      variants={listContainer}
      initial="hidden"
      animate="visible"
    >
      {filteredJobs.map((item) => {
        const isSelected = selectedJob?.id === item.id;
        const isOtherSelected = !!selectedJob && !isSelected;

        const { className } = getJobCardClass(isSelected, isOtherSelected);

        return (
          <motion.div
            key={item.id}
            variants={cardItem}
            whileHover={cardWrapperHover}
            transition={hoverTransition}
            animate={{ opacity: isOtherSelected ? 0.55 : 1 }}
            onClick={() => onSelect(item)}
            className={className}
          >
            <Card job={item} expanded />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function Card({ job, expanded }: { job: Job; expanded: boolean }) {
  return (
    <motion.div layout className="flex flex-col p-4">
      <div className="flex justify-between items-end ">
        <div className="flex flex-row items-center">
          <motion.div
            variants={cardInnerItem}
            className="p-2 bg-white shadow-xl/30 rounded-2xl"
          >
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-16 h-16 m-2"
            />
          </motion.div>

          <div className="flex flex-col ml-4">
            <motion.h5
              className="font-thin"
              variants={cardInnerItem}
              style={{ color: "var(--color-gstore-blue)" }}
            >
              {job.company.name}
            </motion.h5>

            <motion.h3
              variants={cardInnerItem}
              className="font-medium cursor-pointer"
              whileHover={{ y: -2, color: "var(--color-gstore-blue)" }}
            >
              {job.title}
            </motion.h3>

            <motion.div variants={cardInnerItem}>
              <p className="text-sm">{job.company.industry}</p>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col justify-end my-1 gao-6 items-center">
          <motion.p className="text-xs text-gray-400" variants={cardInnerItem}>
            {new Date(job.postedAt).toLocaleDateString()}
          </motion.p>
          {job.remote && (
            <div className="bg-magic-gold px-2 rounded">
              <p className="text-gstore-midnight text-sm font-medium my-1">Remote</p>
            </div>
          )}
        </div>
      </div>
      {expanded && (
        <motion.div
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-3 rounded-xl bg-white"
        >
          <p className="text-sm mb-2">
            {job.description ?? "No description provided."}
          </p>

          <div className="flex gap-2 flex-wrap">
            {job.skills?.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 font-thin text-xs bg-blue-100 text-blue-600 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
