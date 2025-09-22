"use client";

import { useForm } from "react-hook-form";
import { Input } from "@heroui/react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FormValues = { q: string };

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultQ = (searchParams.get("q") ?? "").trim();

  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { q: defaultQ },
  });

  const onSubmit = (values: FormValues) => {
    const params = new URLSearchParams(window.location.search);
    if (values.q.trim()) {
      params.set("q", values.q.trim());
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <form className="mb-4 flex gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        label="Search"
        placeholder="Search books..."
        variant="bordered"
        size="lg"
        radius="lg"
        className="w-full max-w-3xl"
        classNames={{
          inputWrapper:
            "border border-gray-300 hover:border-gray-400 focus-within:border-gray-900 py-3 px-4",
          label: "text-gray-600",
          input: "text-lg",
        }}
        {...register("q")}
      />
      <button
        type="submit"
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Search
      </button>
    </form>
  );
}
