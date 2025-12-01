import {
    Controller,
    type Control,
    type UseFormSetValue,
  } from "react-hook-form";
  import type { FilterForm } from "../details/components/JobsFilter";
  
  interface Props {
    control: Control<FilterForm>;
    name: keyof FilterForm;
    skills: string[];
    setValue: UseFormSetValue<FilterForm>;
  }
  
  export default function SkillFilter({ control, name, skills }: Props) {
    return (
      <div>
        <label className="block text-sm mb-1">Skill</label>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <select
              {...field}
              value={(field.value ?? "") as string}
              onChange={(e) => field.onChange(e.target.value || null)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">All</option>
              {skills.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
        />
      </div>
    );
  }
  