"use client";

import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import JobCard from "./JobCard";
import JobsFilter, { type FilterForm } from "./JobsFilter";
import type { Job } from "../../store/jobStore";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

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
  const safeJobs = jobs ?? [];
  const loading = !jobs || jobs.length === 0;

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

  if (loading) return <div className="p-4">Loading jobs...</div>;

  return (
    <FormProvider {...methods}>
      <div className="p-4 flex gap-6">
        <div className="flex-1">
          <JobCards jobs={safeJobs} />
        </div>
        <div className="w-80 sticky top-4 self-start">
          <JobsFilter jobs={safeJobs} />
        </div>
      </div>
    </FormProvider>
  );
}

// Компонент карточек с фильтрацией
function JobCards({ jobs }: { jobs: Job[] }) {
  const { watch } = useFormContext<FilterForm>();
  const filters = watch();

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        // Search
        if (
          filters.search &&
          !job.title.toLowerCase().includes(filters.search.toLowerCase())
        )
          return false;

        // Industry
        if (filters.industry && job.company.industry !== filters.industry)
          return false;

        // Skill
        if (filters.skill && !job.skills.includes(filters.skill)) return false;

        // Remote
        if (filters.remote && !job.remote) return false;

        // Experience
        if (filters.experience && job.experienceLevel !== filters.experience)
          return false;

        return true;
      })
      .sort((a, b) => {
        // Сортировка
        if (filters.sort === "date")
          return +new Date(b.postedAt) - +new Date(a.postedAt);
        if (filters.sort === "salary") {
          const parseTop = (s: string) => {
            const m = s.match(/(\d{2,6})(?=\D*$)/);
            return m ? Number(m[0]) : 0;
          };
          return parseTop(b.salary) - parseTop(a.salary);
        }
        if (filters.sort === "remote")
          return Number(b.remote) - Number(a.remote);
        return 0;
      });
  }, [jobs, filters]);

  if (!filteredJobs.length)
    return <div className="p-6 text-center text-gray-500">Nothing found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
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
    </div>
  );
}
