"use client";

import { useMemo } from "react";
import { BookCard } from "@/shared/ui/book-card";
import { useBooksSortStore } from "@/shared/store/books.store";
import SortControls from "./sort-controls";
import { BooksListItem } from "@/shared/types/types";

export const BooksList = ({ books }: { books: BooksListItem[] }) => {
  const order = useBooksSortStore(
    (s: { order: "oldest" | "newest" }) => s.order
  );
  const setOrder = useBooksSortStore(
    (s: { setOrder: (o: "oldest" | "newest") => void }) => s.setOrder
  );
  const sorted = useMemo(() => {
    const copy = [...books];
    copy.sort((a, b) => {
      const ay = a.year ?? -Infinity;
      const by = b.year ?? -Infinity;
      return order === "newest" ? by - ay : ay - by;
    });
    return copy;
  }, [books, order]);

  return (
    <section className="mt-6">
      <SortControls order={order} setOrder={setOrder} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sorted.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            coverUrl={book.coverUrl}
            year={book.year}
          />
        ))}
      </div>
    </section>
  );
};
