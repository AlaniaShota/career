"use client";

import JobSkills from "./components/JobSkills";
import JobDescription from "./components/JobDescription";
import JobActions from "./components/JobActions";
import RequirementsList from "./components/RequirementsList";
import BenefitsList from "./components/BenefitsList";
import LanguagesList from "./components/LanguagesList";
import type { Job } from "../../../../store/jobStore";
import JobHeader from "./components/JobHeader";
import JobMeta from "./components/JobMeta";
import GradientCard from "../../../../component/GradientCard";

interface JobDetailsProps {
  job: Job;
}

export default function JobDetails({ job }: JobDetailsProps) {
  const gradientStyle = "gradient-gstore";
  return (
    <GradientCard
      className="my-6"
      gradientStyle={gradientStyle}
      variant="premium"
    >
      <div>
        {" "}
        <JobHeader job={job} />
        <JobMeta job={job} />

        <div className="flex flex-row flex-wrap items-start gap-10 justify-between">
          <RequirementsList requirements={job.requirements} />
          <BenefitsList benefits={job.benefits} />
          <LanguagesList languages={job.languages} />
          <JobSkills skills={job.skills} />
        </div>
        <JobDescription text={job.fullDescription} />
        <JobActions job={job} />
      </div>
    </GradientCard>
  );
}
