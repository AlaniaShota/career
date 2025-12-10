"use client";

import { Controller, type Control } from "react-hook-form";
import type { FilterForm } from "../details/components/JobsFilter";

interface Props {
  control: Control<FilterForm>;
  name: keyof FilterForm;
  placeholder?: string;
}

export default function SearchInput({ control, name, placeholder }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          placeholder={placeholder || "Search..."}
          className="w-full p-2 rounded border"
          value={String(field.value ?? "")}
        />
      )}
    />
  );
}
