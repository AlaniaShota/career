"use client";

import { Controller, type Control } from "react-hook-form";
import type { FilterForm } from "../JobsFilter";

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
        <div className="relative w-full max-w-xs">
          <input
            {...field}
            id={name}
            placeholder=" " // пустой placeholder нужен для :placeholder-shown
            className="
              peer
              block w-full px-0 pb-2 pt-5
              text-gstore-midnight text-base
              bg-transparent border-b-2 border-gray-500
              focus:border-b-2 focus:border-gstore-blue focus:outline-none
              transition-all
            "
          />
          <label
            htmlFor={name}
            className="
              absolute left-0 top-5 text-gray-400 text-base
              transition-all
              peer-placeholder-shown:top-5
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-0
              peer-focus:text-gstore-blue
              peer-focus:text-sm
              pointer-events-none
            "
          >
            {placeholder || "Search..."}
          </label>
        </div>
      )}
    />
  );
}
