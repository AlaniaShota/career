"use client";

import { Input } from "antd";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
}

export default function SearchInput<T extends FieldValues>({
  control,
  name,
  placeholder = "Search",
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative w-full max-w-md mx-4 md:mx-auto">
          <Input
            {...field}
            value={field.value ?? ""}
            onChange={(event) => field.onChange(event.target.value)}
            prefix={<FaSearch className="text-gstore-midnight" />}
            size="large"
            placeholder={placeholder}
            className="py-2 rounded-lg"
          />
        </div>
      )}
    />
  );
}
