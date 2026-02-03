"use client";
import { useEffect } from "react";
import { useJobStore } from "../../store/jobStore";
import JobList from "./component/JobList";
import { description, title } from "./component/constanta";
import Banner from "../../component/Banner";

export default function JobsPage() {
  const jobs = useJobStore((state) => state.jobs);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  const loading = useJobStore((state) => state.loading);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading) return <p className="text-center my-4">Loading jobs...</p>;

  const textSize = "text-2xl md:text-7xl";
  const textSizeDescription = "text-lg md:text-2xl";
  
  return (
    <>
      <Banner
        title={title}
        description={description}
        textSize={textSize}
        textSizeDescription={textSizeDescription}
      />
      <JobList jobs={jobs} />
    </>
  );
}
