import { Controller, type Control } from "react-hook-form";
import type { FilterForm } from "../JobsFilter";
import { Select } from "antd";

const { Option } = Select;

interface Props {
  control: Control<FilterForm>;
  name: keyof FilterForm;
}

const options = [
  { value: "default", label: "Default" },
  { value: "date", label: "Date" },
  { value: "salary", label: "Salary" },
  { value: "remote", label: "Remote" },
];

export default function SortFilter({ control, name }: Props) {
  return (
    <div>
      <label className="block text-sm mb-1">Sort</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value || "default"} 
            onChange={(value) => field.onChange(value)}
            placeholder="Select sort"
            size="large"
            className="w-full rounded-lg"
            dropdownClassName="rounded-lg"
          >
            {options.map((o) => (
              <Option key={o.value} value={o.value}>
                {o.label}
              </Option>
            ))}
          </Select>
        )}
      />
    </div>
  );
}
