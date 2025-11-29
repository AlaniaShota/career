"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import type { Job } from "../../store/jobStore";
import JobsFilter, { type FilterForm } from "./JobsFilter";
import JobCards from "./JobCard";
import JobDetailsWrapper from "./details/JobDetailsWrapper";

interface Props {
  job?: Job[] | null;
}

export default function JobList({ job }: Props) {
  const safeJobs = job ?? [];
  const loading = !job || job.length === 0;

  const methods = useForm<FilterForm>({
    defaultValues: {
      search: "",
      industry: null,
      skill: null,
      remote: false,
      experience: null,
      sort: "default",
    },
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedJob && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedJob]);

  if (loading) return <div className="p-4">Loading jobs...</div>;

  return (
    <FormProvider {...methods}>
      <div className="p-4 flex justify-between items-center gap-6">
        <div className="w-3/5">
          <JobCards
            job={safeJobs}
            selectedJob={selectedJob}
            onSelect={setSelectedJob}
          />
        </div>
        <div className="w-2/5 flex flex-col justify-end items-end sticky  self-start" ref={detailsRef}>
          <JobsFilter jobs={safeJobs} />
          <AnimatePresence>
            <JobDetailsWrapper selectedJob={selectedJob} />
          </AnimatePresence>
        </div>
      </div>
    </FormProvider>
  );
}
