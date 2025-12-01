"use client";

import { motion } from "framer-motion";
import JobSkills from "./components/JobSkills";
import JobDescription from "./components/JobDescription";
import JobActions from "../JobActions";
import RequirementsList from "./components/RequirementsList";
import BenefitsList from "./components/BenefitsList";
import LanguagesList from "./components/LanguagesList";
import type { Job } from "../../../store/jobStore";
import JobHeader from "./components/JobHeader";
import JobMeta from "./components/JobMeta";

interface JobDetailsProps {
  job: Job;
}

export default function JobDetails({ job }:JobDetailsProps) {
  return (
    <motion.div className="bg-white p-4 shadow-2xl rounded-2xl my-4 flex flex-col gap-2 w-full">
      <JobHeader job={job} />
      <JobMeta job={job} />
      <JobSkills skills={job.skills} />
      <RequirementsList requirements={job.requirements} />
      <BenefitsList benefits={job.benefits} />
      <LanguagesList languages={job.languages} />
      <JobDescription text={job.fullDescription} />
      <JobActions job={job} />
    </motion.div>
  );
}
