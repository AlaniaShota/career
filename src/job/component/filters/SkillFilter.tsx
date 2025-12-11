import {
  Controller,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import type { FilterForm } from "../JobsFilter";

interface Props {
  control: Control<FilterForm>;
  name: keyof FilterForm;
  skills: string[];
  setValue: UseFormSetValue<FilterForm>;
}

export default function SkillFilter({ control, name, skills }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value != null ? String(field.value) : "";

        return (
          <div className="relative w-full max-w-xs">
            <select
              {...field}
              value={value}
              onChange={(e) => field.onChange(e.target.value || null)}
              className="
                peer
                block w-full px-0 pb-2 pt-5
                text-gstore-midnight text-base
             border-b-2 border-gstore-midnight
                focus:border-b-2 focus:border-soft-sky focus:outline-none
                appearance-none transition-all
              "
            >
              <option value="">{""}</option>
              {skills.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <label
              htmlFor={name}
              className="
                absolute left-0 top-5 text-gstore-midnight text-base
                transition-all
                peer-focus:top-0 peer-focus:text-gstore-blue peer-focus:text-sm
                pointer-events-none
              "
            >
              Skill
            </label>
          </div>
        );
      }}
    />
  );
}
