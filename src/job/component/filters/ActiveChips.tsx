import { type UseFormSetValue } from "react-hook-form";
import type { FilterForm } from "../JobsFilter";

interface Props {
  watch: FilterForm;
  setValue: UseFormSetValue<FilterForm>;
}

export default function ActiveChips({ watch, setValue }: Props) {
  // const values = watch();
  return (
    <div className="flex flex-wrap gap-2">
      {watch.industry && (
        <span className="px-3 py-1 font-thin rounded-full bg-gray-100">
          {watch.industry}{" "}
          <button onClick={() => setValue("industry", null)}>×</button>
        </span>
      )}
      {watch.skill && (
        <span className="px-3 py-1 font-thin rounded-full bg-gray-100">
          {watch.skill}{" "}
          <button onClick={() => setValue("skill", null)}>×</button>
        </span>
      )}
      {watch.experience && (
        <span className="px-3 py-1 font-thin rounded-full bg-gray-100">
          {watch.experience}{" "}
          <button onClick={() => setValue("experience", null)}>×</button>
        </span>
      )}
      {watch.remote && (
        <span className="px-3 py-1 font-thin rounded-full bg-gray-100">
          Remote <button onClick={() => setValue("remote", false)}>×</button>
        </span>
      )}
    </div>
  );
}
