import { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import JobsFilter, { type FilterForm } from "./JobsFilter";
import { useNavigate, useParams } from "react-router-dom";
import type { Job } from "../../../store/jobStore";
import JobCards from "./JobCard";
import { filterAndSortJobs } from "../../../utils/jobs";

interface Props {
  jobs: Job[];
}

export default function JobList({ jobs }: Props) {
  const safeJobs = useMemo(() => jobs ?? [], [jobs]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const selectedJobId = id ? Number(id) : undefined;
  const [next, setNext] = useState(10);

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

  const filters = useWatch<FilterForm>({
    control: methods.control,
    defaultValue: methods.getValues(),
  });
  const filteredJobs = useMemo(
    () => filterAndSortJobs(safeJobs, filters),
    [safeJobs, filters]
  );
  const visibleJobs = useMemo(
    () => filteredJobs.slice(0, next),
    [filteredJobs, next]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setNext((prev) => Math.min(prev + 15, filteredJobs.length));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredJobs.length]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col md:flex-row justify-between md:items-start items-center gap-4 w-full">
        <JobsFilter jobs={safeJobs} />
        <JobCards
          jobs={visibleJobs}
          selectedJobId={selectedJobId}
          onSelect={(job) => navigate(`/jobs/${job.id}`)}
        />
      </div>  
    </FormProvider>
  );
}
