"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import type { Job } from "../../store/jobStore";
import JobsFilter, { type FilterForm } from "./JobsFilter";
import JobCards from "./JobCard";

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
      <div className="p-4 flex gap-6">
        <div className="flex-1">
          <JobCards
            job={safeJobs}
            selectedJob={selectedJob}
            onSelect={setSelectedJob}
          />
        </div>
        <div className="w-80 sticky top-4 self-start" ref={detailsRef}>
          <JobsFilter jobs={safeJobs} />
          <AnimatePresence>
            {selectedJob && (
              <motion.div
                key={selectedJob.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-2xl shadow-lg mt-4"
              >
                <h3 className="font-bold text-lg">{selectedJob.title}</h3>
                <p className="text-sm text-gray-500">
                  {selectedJob.company.name}
                </p>
                <p className="mt-2">{selectedJob.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </FormProvider>
  );
}
