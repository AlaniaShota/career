"use client";

import { useEffect, useState } from "react";
import { useJobStore } from "../store/jobStore";

export default function JobList() {
  const { jobs, loading, error, fetchJobs, setFilter, filteredJobs } =
    useJobStore();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setFilter({ industry: selectedIndustry, skill: selectedSkill });
  }, [selectedIndustry, selectedSkill]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const industries = Array.from(new Set(jobs.map((j) => j.company.industry)));
  const skills = Array.from(new Set(jobs.flatMap((j) => j.skills)));

  return (
    <div className="p-4">
      {/* Фильтры */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={selectedIndustry || ""}
          onChange={(e) => setSelectedIndustry(e.target.value || null)}
        >
          <option value="">All Industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedSkill || ""}
          onChange={(e) => setSelectedSkill(e.target.value || null)}
        >
          <option value="">All Skills</option>
          {skills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      {/* Сетка вакансий */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs().map((job) => (
          <div
            key={job.id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-16 h-16 mb-2"
            />
            <h3 className="font-bold">{job.title}</h3>
            <p className="text-sm text-gray-500">
              {job.company.name} • {job.location}
            </p>
            <p className="text-sm">
              {job.salary} • {job.employmentType}
            </p>
            <p className="text-xs mt-2">Skills: {job.skills.join(", ")}</p>
            <p className="text-xs mt-1 text-gray-400">
              Posted: {new Date(job.postedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
