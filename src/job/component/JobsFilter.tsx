import { useState } from "react";
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
}

export default function JobsFilter({ jobs }: Props) {
  const [open, setOpen] = useState(false);
  const { control, setValue, reset, watch } = useFormContext<FilterForm>();

  const industries = Array.from(new Set(jobs.map((j) => j.company.industry)));
  const skills = Array.from(new Set(jobs.flatMap((j) => j.skills)));

  return (
    <form className="w-1/2 bg-white mt-4 rounded-2xl shadow-2xl">
      <div className="flex justify-end items-center gap-2 w-full ">
        <div className="w-full">
          <SearchInput control={control} name="search" />
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="px-3 py-2 mx-2 rounded bg-gray-200"
        >
          {open ? " ▲" : "▼"}
        </button>
      </div>

      {open && (
        <div className="mt-4 mx-2 space-y-4">
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
          <ActiveChips watch={watch} setValue={setValue} />

          <button
            type="button"
            onClick={() => reset()}
            className="px-3 py-2 my-2 rounded bg-gray-200 w-full"
          >
            Reset all
          </button>
        </div>
      )}
    </form>
  );
}
