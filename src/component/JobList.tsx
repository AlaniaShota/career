import { useEffect, useState } from "react";
import axios from "axios";

interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
}

interface Job {
  id: number;
  title: string;
  company: Company;
  location: string;
  remote: boolean;
  salary: string;
  employmentType: string;
  experienceLevel: string;
  skills: string[];
  description: string;
  postedAt: string;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Job[]>("/jobs.json")
      .then((res) => setJobs(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  const industries = Array.from(new Set(jobs.map((j) => j.company.industry)));
  const skills = Array.from(new Set(jobs.flatMap((j) => j.skills)));

  const filteredJobs = jobs.filter(
    (job) =>
      (!selectedIndustry || job.company.industry === selectedIndustry) &&
      (!selectedSkill || job.skills.includes(selectedSkill))
  );

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
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
