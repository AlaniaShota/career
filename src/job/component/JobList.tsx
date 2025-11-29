import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import JobsFilter, { type FilterForm } from "./JobsFilter";
import JobCards from "./JobCard";
import JobDetailsWrapper from "./details/JobDetailsWrapper";
import type { Job } from "../../store/jobStore";

interface Props {
  job?: Job[] | null;
}

export default function JobList({ job }: Props) {
  const safeJobs = job ?? [];
  const loading = !job || job.length === 0;
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const handleSelect = (job: Job) => {
    if (isMobile) {
      navigate(`/jobs/${job.id}`, { state: { jobs: safeJobs } });
    } else {
      setSelectedJob(job);
    }
  };

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



  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (selectedJob && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedJob]);

  if (loading) return <div className="p-4">Loading jobs...</div>;

  return (
    <FormProvider {...methods}>
      <div className="p-4 flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-3/5">
          <JobCards
            job={safeJobs}
            selectedJob={selectedJob}
            onSelect={handleSelect}
          />
        </div>

        {!isMobile && (
          <div
            className="w-full md:w-2/5 flex flex-col justify-end items-end sticky self-start"
            ref={detailsRef}
          >
            <JobsFilter jobs={safeJobs} />
            <AnimatePresence>
              <JobDetailsWrapper selectedJob={selectedJob} />
            </AnimatePresence>
          </div>
        )}
      </div>
    </FormProvider>
  );
}
