"use client";

import { motion } from "framer-motion";
import JobHeader from "./JobHeader";
import JobMeta from "./JobMeta";
import JobSkills from "./JobSkills";

import JobDescription from "./JobDescription";
import JobActions from "./JobActions";
import RequirementsList from "./RequirementsList";
import BenefitsList from "./BenefitsList";
import LanguagesList from "./LanguagesList";
import type { Job } from "../../../../store/jobStore";
interface JobDetailsProps {
  job: Job;
}
export default function JobDetails({ job }:JobDetailsProps) {
  return (
    <motion.div className="bg-white p-4 shadow-2xl rounded-2xl my-4 flex flex-col gap-2 max-h-[840px] overflow-y-auto hide-scroll scroll-smooth">
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
