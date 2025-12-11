"use client";
import { useState } from "react";
import { Input } from "antd";

import { Controller, type Control } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

interface Props {
  control: Control<any>;
  name: string;
  placeholder?: string;
}

export default function SearchInput({ control, name}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
     

        return (
          <div className="relative w-full max-w-md mx-auto">
            <Input
              {...field}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              prefix={<FaSearch className="text-gstore-midnight" />}
              size="large"
              placeholder="Search"
              className="py-2 rounded-lg"
            />
          </div>
        );
      }}
    />
  );
}
