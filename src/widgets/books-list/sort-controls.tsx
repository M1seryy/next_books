"use client";

export type SortOrder = "oldest" | "newest";

type Props = {
  order: "oldest" | "newest";
  setOrder: (o: "oldest" | "newest") => void;
};

export default function SortControls({ order, setOrder }: Props) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-2xl font-semibold">Book list</h2>
      <div className="inline-flex rounded-md border border-gray-300 p-1 text-sm">
        <button
          type="button"
          className={`px-3 py-1 rounded-md ${
            order === "oldest" ? "bg-gray-900 text-white" : "bg-transparent"
          }`}
          onClick={() => setOrder("oldest")}
        >
          Oldest
        </button>
        <button
          type="button"
          className={`px-3 py-1 rounded-md ${
            order === "newest" ? "bg-gray-900 text-white" : "bg-transparent"
          }`}
          onClick={() => setOrder("newest")}
        >
          Newest
        </button>
      </div>
    </div>
  );
}
