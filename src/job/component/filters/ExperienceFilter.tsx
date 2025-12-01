import { Controller, type Control } from "react-hook-form";
import type { FilterForm } from "../details/components/JobsFilter";

interface Props {
  control: Control<FilterForm>;
  name: keyof FilterForm;
}

export default function ExperienceFilter({ control, name }: Props) {
  const levels = ["Junior", "Mid", "Senior"];

  return (
    <div>
      <label className="block text-sm mb-1">Experience</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const value = field.value != null ? String(field.value) : "";

          return (
            <select
              {...field}
              value={value}
              onChange={(e) =>
                field.onChange(e.target.value || null) 
              }
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">All</option>
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          );
        }}
      />
    </div>
  );
}
