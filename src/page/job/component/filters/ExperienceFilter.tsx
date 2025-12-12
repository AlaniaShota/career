import { Controller, type Control } from "react-hook-form";
import type { FilterForm } from "../JobsFilter";
import { Select } from "antd";

const { Option } = Select;

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
        render={({ field }) => (
          <Select
            {...field}
            value={field.value || undefined} 
            onChange={(value) => field.onChange(value || null)}
            placeholder="Select experience"
            size="large"
            className="w-full rounded-lg"
            dropdownClassName="rounded-lg"
            allowClear
          >
            <Option value="">All</Option>
            {levels.map((level) => (
              <Option key={level} value={level}>
                {level}
              </Option>
            ))}
          </Select>
        )}
      />
    </div>
  );
}
