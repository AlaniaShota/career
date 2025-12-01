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

  return <JobList jobs={visibleJobs} />;
}
