"use client";

import { Controller, type Control } from "react-hook-form";
import { Select } from "antd";
import type { FilterForm } from "../JobsFilter";

const { Option } = Select;

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
        return (
          <div className="w-full">
            <Select
              {...field}
              value={field.value || undefined}
              onChange={(val) => field.onChange(val || null)}
              placeholder=""
              defaultValue="Industry"
              size="large"
              className="w-full rounded-lg"
              dropdownClassName="rounded-lg"
            >
              {industries.map((i) => (
                <Option key={i} value={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </div>
        );
      }}
    />
  );
}
