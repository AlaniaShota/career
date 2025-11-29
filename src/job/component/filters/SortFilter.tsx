import { Controller, type Control } from "react-hook-form";
import type { FilterForm } from "../JobsFilter";

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
          <select
            {...field}
            value={(field.value ?? "default") as string}
            onChange={(e) =>
              field.onChange(e.target.value as FilterForm["sort"])
            }
            className="border px-3 py-2 rounded w-full"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
}
