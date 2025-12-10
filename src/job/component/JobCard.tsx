import { motion } from "framer-motion";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import type { FilterForm } from "./details/components/JobsFilter";
import type { Job } from "../../store/jobStore";

import {
  listContainer,
  cardItem,
  cardWrapperHover,
  hoverTransition,
  cardInnerItem,
  getJobCardClass,
} from "../../utils/animations";
import { filterAndSortJobs } from "../../utils/jobs";
import Button from "../../component/Button";

interface Props {
  jobs: Job[];
  selectedJobId?: number;
  onSelect: (job: Job) => void;
}

export default function JobCards({ jobs, selectedJobId, onSelect }: Props) {
  const { watch } = useFormContext<FilterForm>();
  const filters = watch();

  const filteredJobs = useMemo(
    () => filterAndSortJobs(jobs, filters),
    [jobs, filters]
  );

  if (!filteredJobs.length)
    return <div className="p-6 text-center text-gray-500">Nothing found</div>;

  return (
    <motion.div
      className="flex flex-col justify-center items-center w-full gap-4"
      variants={listContainer}
      initial="hidden"
      animate="visible"
    >
      {filteredJobs.map((job) => {
        const isSelected = selectedJobId === job.id;
        const isOtherSelected = selectedJobId !== undefined && !isSelected;

        const { className } = getJobCardClass(isSelected, isOtherSelected);

        return (
          <motion.div
            key={job.id}
            variants={cardItem}
            whileHover={cardWrapperHover}
            transition={hoverTransition}
            animate={{ opacity: isOtherSelected ? 0.55 : 1 }}
            onClick={() => onSelect(job)}
            className={className}
          >
            <Card job={job} expanded />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// function Card({ job, expanded }: { job: Job; expanded: boolean }) {
//   return (
//     <motion.div layout className="flex flex-col p-4 bg-white rounded-2xl">
//       <div className="flex justify-between items-start">
//         <div className="flex items-center gap-4">
//           <motion.div
//             variants={cardInnerItem}
//             className="p-2 rounded-2xl shadow-md bg-white"
//           >
//             <img
//               src={job.company.logo}
//               alt={job.company.name}
//               className="w-16 h-16"
//             />
//           </motion.div>
//           <div className="flex flex-col">
//             <motion.h5
//               variants={cardInnerItem}
//               className="font-thin text-gstore-blue"
//             >
//               {job.company.name}
//             </motion.h5>
//             <h3>{job.location}</h3>
//             {/* <motion.h3
//               variants={cardInnerItem}
//               className="font-medium cursor-pointer"
//               whileHover={{ y: -2, color: "#1D4ED8" }}
//             >
//               {job.title}
//             </motion.h3> */}
//             <motion.div variants={cardInnerItem}>
//               <p className="text-sm text-gray-500">{job.company.industry}</p>
//             </motion.div>
//           </div>
//         </div>

//         <div className="flex flex-col items-center gap-2">
//           <motion.p className="text-xs text-gray-400" variants={cardInnerItem}>
//             {new Date(job.postedAt).toLocaleDateString()}
//           </motion.p>
//           {job.remote && (
//             <div className="bg-yellow-300 px-2 rounded">
//               <p className="text-xs font-medium text-gray-800">Remote</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {expanded && (
//         <motion.div
//           layout
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: "auto" }}
//           exit={{ opacity: 0, height: 0 }}
//           transition={{ duration: 0.3 }}
//           className="mt-4 p-3 rounded-xl bg-gray-50"
//         >
//           <p className="text-sm mb-2">{job.description ?? "No description"}</p>
//           <div className="flex gap-2 flex-wrap">
//             {job.skills?.map((skill) => (
//               <span
//                 key={skill}
//                 className="px-2 py-1 text-xs font-thin bg-blue-100 text-blue-600 rounded-lg"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

function Card({ job, expanded }: { job: Job; expanded: boolean }) {
  return (
    <motion.div layout>
      <div className="flex flex-row justify-between items-center">
        <div className="flex justify-center flex-row items-center">
          <img src={job.company.logo} alt={job.company.name} />
          <h2>{job.company.name}</h2>
        </div>
        <div className="flex justify-center flex-row items-center">
          <p>{job.views}</p>
          <Button
            to={`/apply?jobId=${job.id}&title=${encodeURIComponent(job.title)}`}
          />
        </div>
      </div>
    </motion.div>
  );
}
