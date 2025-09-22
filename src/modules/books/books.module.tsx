"use client";

import { useQuery } from "@tanstack/react-query";
import { booksListQueryOptions } from "@/entities/api/books/books.query";
import { BooksList } from "@/widgets/books-list";
import { useSearchParams } from "next/navigation";

export default function BooksModule() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "Harry Potter").trim();

  const { data } = useQuery(booksListQueryOptions(q));

  const books = data ?? [];
  return <BooksList books={books} />;
}
