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
import Button from "../../component/Button";

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

  const industries = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.company.industry))),
    [jobs]
  );

  const skills = useMemo(
    () => Array.from(new Set(jobs.flatMap((j) => j.skills))),
    [jobs]
  );

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search.trim() !== "" ||
      filters.industry !== null ||
      filters.skill !== null ||
      filters.remote !== false ||
      filters.experience !== null ||
      filters.sort !== "default"
    );
  }, [filters]);

  return (
    <div
      className={`bg-white rounded-2xl shadow-2xl w-2/6 p-4 flex flex-col gap-4 sticky top-4 ${className}`}
    >
      <SearchInput control={control} name="search" />
      <IndustryFilter
        industries={industries}
        control={control}
        name="industry"
      />
      <SkillFilter
        skills={skills}
        control={control}
        name="skill"
        setValue={setValue}
      />
      <RemoteToggle control={control} name="remote" />
      <ExperienceFilter control={control} name="experience" />
      <SortFilter control={control} name="sort" />
      <ActiveChips watch={filters} setValue={setValue} />

      <Button
        variant="secondary"
        onClick={() => reset()}
        disabled={!hasActiveFilters}
        className={hasActiveFilters ? "bg-magic-gold text-gstore-midnight" : ""}
      >
        Reset All
      </Button>
    </div>
  );
}
