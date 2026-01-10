import { useForm, FormProvider } from "react-hook-form";
import JobsFilter, { type FilterForm } from "./JobsFilter";
import { useNavigate, useParams } from "react-router-dom";
import type { Job } from "../../../store/jobStore";
import JobCards from "./JobCard";

interface Props {
  jobs: Job[];
}

export default function JobList({ jobs }: Props) {
  const safeJobs = jobs ?? [];
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const selectedJobId = id ? Number(id) : undefined;

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

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col md:flex-row justify-between md:items-start items-center gap-4 w-full">
        <JobsFilter jobs={safeJobs} />
        <JobCards
          jobs={safeJobs}
          selectedJobId={selectedJobId}
          onSelect={(job) => navigate(`/jobs/${job.id}`)}
        />
      </div>  
    </FormProvider>
  );
}
