import { Controller, type Control } from "react-hook-form";
import type { FilterForm } from "../JobsFilter";
import { Checkbox } from "antd";

interface Props {
  control: Control<FilterForm>;
  name: keyof FilterForm;
}

export default function RemoteToggle({ control, name }: Props) {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <label className="flex items-center gap-2">
            <Checkbox onChange={(e) => field.onChange(e.target.checked)} />
            Remote
          </label>
        )}
      />
    </div>
  );
}
