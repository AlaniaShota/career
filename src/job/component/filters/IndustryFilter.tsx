import { Controller, type Control } from "react-hook-form";
import type { FilterForm } from "../JobsFilter";

interface Props {
  control: Control<FilterForm>;
  name: keyof FilterForm;
  industries: string[];
}

export default function IndustryFilter({ control, name, industries }: Props) {
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
                bg-transparent border-b-2 border-gstore-midnight
                focus:border-b-2 focus:border-gstore-blue focus:outline-none
                appearance-none transition-all
              "
            >
              <option value="">Select industry</option>
              {industries.map((i) => (
                <option key={i} value={i}>
                  {i}
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
              Industry
            </label>
          </div>
        );
      }}
    />
  );
}
