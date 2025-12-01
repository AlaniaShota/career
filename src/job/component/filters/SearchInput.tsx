"use client";

import { Controller, type Control } from "react-hook-form";
import type { FilterForm } from "../details/components/JobsFilter";

interface Props {
  control: Control<FilterForm>;
  name: "search";
}

export default function SearchInput({ control, name }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          value={field.value ?? ""} 
          placeholder="Search jobs..."
          className="w-full m-3 p-1 rounded"
        />
      )}
    />
  );
}
