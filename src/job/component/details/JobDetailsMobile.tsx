import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import type { Job } from "../../../store/jobStore";
import JobDetails from "./component/JobDetails";

interface LocationState {
  jobs?: Job[];
}

const JobDetailsMobile = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const jobs = state?.jobs;
  const job = jobs?.find((j) => j.id === Number(id));

  if (!job) return <div className="p-4">Job not found</div>;

  return (
    <motion.div layout className="flex flex-col p-4">
      <JobDetails job={job} />
    </motion.div>
  );
};

export default JobDetailsMobile;
