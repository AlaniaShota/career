"use client";

import { useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import JobCard from "./JobCard";
import JobsFilter from "./JobsFilter";
import type { Job } from "../../store/jobStore";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      type: "spring",
      stiffness: 220,
      damping: 20,
    },
  }),
};

interface Props {
  jobs?: Job[] | null;
}

export default function JobList({ jobs }: Props) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [experience, setExperience] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<
    "date" | "salary" | "remote" | "default"
  >("default");

  const safeJobs = jobs ?? [];

  const loading = !jobs || jobs.length === 0;

  const filteredJobs = useMemo(() => {
    let res = safeJobs.slice();

    if (selectedIndustry)
      res = res.filter((j) => j.company.industry === selectedIndustry);
    if (selectedSkill)
      res = res.filter((j) => j.skills.includes(selectedSkill));
    if (remoteOnly) res = res.filter((j) => j.remote);
    if (experience) res = res.filter((j) => j.experienceLevel === experience);

    if (sortBy === "date") {
      res.sort((a, b) => +new Date(b.postedAt) - +new Date(a.postedAt));
    } else if (sortBy === "salary") {
      const parseTop = (s: string) => {
        const m = s.match(/(\d{2,6})(?=\D*$)/);
        return m ? Number(m[0]) : 0;
      };
      res.sort((a, b) => parseTop(b.salary) - parseTop(a.salary));
    } else if (sortBy === "remote") {
      res.sort((a, b) => Number(b.remote) - Number(a.remote));
    }

    return res;
  }, [
    safeJobs,
    selectedIndustry,
    selectedSkill,
    remoteOnly,
    experience,
    sortBy,
  ]);

  const clearAll = () => {
    setSelectedIndustry(null);
    setSelectedSkill(null);
    setRemoteOnly(false);
    setExperience(null);
    setSortBy("default");
  };

  if (loading) return <div className="p-4">Loading jobs...</div>;

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="w-80 sticky top-4 self-start">
        <JobsFilter
          jobs={safeJobs}
          selectedIndustry={selectedIndustry}
          selectedSkill={selectedSkill}
          setSelectedIndustry={setSelectedIndustry}
          setSelectedSkill={setSelectedSkill}
          remoteOnly={remoteOnly}
          setRemoteOnly={setRemoteOnly}
          experience={experience}
          setExperience={setExperience}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearAll={clearAll}
        />
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {filteredJobs.map((job, idx) => (
          <motion.div
            key={job.id}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <JobCard job={job} />
          </motion.div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="col-span-full p-6 text-center text-gray-500">
            Nothing found
          </div>
        )}
      </div>
    </div>
  );
}
