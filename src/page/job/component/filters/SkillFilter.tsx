import {
  Controller,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import type { FilterForm } from "../JobsFilter";
import { Select } from "antd";

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
        return (
          <div className="relative w-full">
            <Select
              {...field}
              value={field.value || undefined}
              onChange={(val) => field.onChange(val || null)}
              placeholder=""
              defaultValue="Skill"
              size="large"
              className="w-full rounded-lg"
              dropdownClassName="rounded-lg"
            >
              <option value="">{""}</option>
              {skills.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>
        );
      }}
    />
  );
}
