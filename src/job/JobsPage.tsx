"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import JobList from "./component/JobList";
import type { Job } from "../store/jobStore";

export default function JobsPage() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [visibleJobs, setVisibleJobs] = useState<Job[]>([]);
  const [next, setNext] = useState(10); 
  const [loading, setLoading] = useState(false);

  const loadMoreJobs = () => {
    if (loading) return;
    if (visibleJobs.length >= allJobs.length) return;

    setLoading(true);
    setTimeout(() => {
      const newNext = next + 15;
      setVisibleJobs(allJobs.slice(0, newNext));
      setNext(newNext);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    axios
      .get<Job[]>("/jobs.json")
      .then((res) => {
        setAllJobs(res.data);
        setVisibleJobs(res.data.slice(0, 10));
      })
      .catch((err) => {
        console.error("Error loading jobs:", err);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadMoreJobs(); // теперь функция уже объявлена
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleJobs, allJobs, loading, next]); // добавляем зависимости
  

  return (
    <>
      <JobList job={visibleJobs} />
      {loading && <p className="text-center my-4">Loading...</p>}
    </>
  );
}
