"use client";
import { useEffect, useState, useMemo } from "react";

import { useJobStore } from "../store/jobStore";
import JobList from "./component/JobList";

export default function JobsPage() {
  const jobs = useJobStore((state) => state.jobs);
  const fetchJobs = useJobStore((state) => state.fetchJobs);
  const loading = useJobStore((state) => state.loading);

  const [next, setNext] = useState(10);
  console.log(jobs);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const visibleJobs = useMemo(() => jobs.slice(0, next), [jobs, next]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setNext((prev) => Math.min(prev + 15, jobs.length));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [jobs.length]);

  if (loading) return <p className="text-center my-4">Loading jobs...</p>;

  return (
    <div>
      <div className="my-14 flex justify-start items-start gap-6 flex-col text-soft-silver">
        <h1 className="text-7xl">Find Your Dream Job</h1>
        <p className="text-3xl">
          Browse job listings from top companies and find the perfect fit for
          you.
        </p>
      </div>
      <JobList jobs={visibleJobs} />
    </div>
  );
}
