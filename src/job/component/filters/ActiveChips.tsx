import { type UseFormSetValue } from "react-hook-form";
import type { FilterForm } from "../JobsFilter";

interface Props {
  watch: () => FilterForm;
  setValue: UseFormSetValue<FilterForm>;
}

export default function ActiveChips({ watch, setValue }: Props) {
  const values = watch();

  return (
    <div className="flex flex-wrap gap-2">
      {values.industry && (
        <span className="px-3 py-1 font-thin rounded-full bg-gray-100">
          {values.industry}{" "}
          <button onClick={() => setValue("industry", null)}>×</button>
        </span>
      )}
      {values.skill && (
        <span className="px-3 py-1 font-thin rounded-full bg-gray-100">
          {values.skill}{" "}
          <button onClick={() => setValue("skill", null)}>×</button>
        </span>
      )}
      {values.experience && (
        <span className="px-3 py-1 font-thin rounded-full bg-gray-100">
          {values.experience}{" "}
          <button onClick={() => setValue("experience", null)}>×</button>
        </span>
      )}
      {values.remote && (
        <span className="px-3 py-1 font-thin rounded-full bg-gray-100">
          Remote <button onClick={() => setValue("remote", false)}>×</button>
        </span>
      )}
    </div>
  );
}
