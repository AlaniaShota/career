"use client";
import { useEffect, useState } from "react";

import type { Job } from "../store/jobStore";
import axios from "axios";
import JobList from "./component/JobList";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    axios
      .get<Job[]>("/jobs.json")
      .then((res) => {
        console.log("Jobs loaded:", res.data); // <-- проверяем, пришли ли данные
        setJobs(res.data);
      })
      .catch((err) => {
        console.error("Error loading jobs:", err);
      });
  }, []);
  

  return <JobList jobs={jobs || []} />;
}
