import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import SearchInput from "./filters/SearchInput";
import IndustryFilter from "./filters/IndustryFilter";
import SkillFilter from "./filters/SkillFilter";
import ExperienceFilter from "./filters/ExperienceFilter";
import SortFilter from "./filters/SortFilter";
import RemoteToggle from "./filters/RemoteToggle";
import ActiveChips from "./filters/ActiveChips";
import type { Job } from "../../store/jobStore";

export interface FilterForm {
  search: string;
  industry: string | null;
  skill: string | null;
  remote: boolean;
  experience: string | null;
  sort: "default" | "date" | "salary" | "remote";
}

interface Props {
  jobs: Job[];
  className?: string;
}

export default function JobsFilter({ jobs, className = "" }: Props) {
  const { control, setValue, reset, watch } = useFormContext<FilterForm>();
  const filters = watch();
  const industries = useMemo(() => Array.from(new Set(jobs.map((j) => j.company.industry))), [jobs]);
  const skills = useMemo(() => Array.from(new Set(jobs.flatMap((j) => j.skills))), [jobs]);

  return (
    <div
      className={`bg-white rounded-2xl shadow-2xl w-2/6 p-4 flex flex-col gap-4 sticky top-4 ${className}`}
    >
      <SearchInput control={control} name="search" />
      <IndustryFilter industries={industries} control={control} name="industry" />
      <SkillFilter skills={skills} control={control} name="skill" setValue={setValue} />
      <RemoteToggle control={control} name="remote" />
      <ExperienceFilter control={control} name="experience" />
      <SortFilter control={control} name="sort" />
      <ActiveChips watch={filters} setValue={setValue} />
      <button
        type="button"
        onClick={() => reset()}
        className="px-3 py-2 rounded bg-gray-200 w-full"
      >
        Reset all
      </button>
    </div>
  );
}
