import { create } from "zustand";
import { persist } from "zustand/middleware";

type BooksSortState = {
    order: "oldest" | "newest";
    setOrder: (o: "oldest" | "newest") => void;
};

export const useBooksSortStore = create<BooksSortState>()(
    persist(
        (set) => ({
            order: "newest",
            setOrder: (o) => set({ order: o }),
        }),
        { name: "books-sort" }
    )
);