import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { booksListQueryOptions } from "@/entities/api/books/books.query";
import { SearchForm } from "@/shared/ui/search-form";
import { Banner } from "@/shared/ui/banner";
import BooksModule from "@/modules/books/books.module";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const q = (sp.q ?? "Harry Potter").trim();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(booksListQueryOptions(q));
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="mt-6">
      <Banner />
      <SearchForm />
      <HydrationBoundary state={dehydratedState}>
        <BooksModule />
      </HydrationBoundary>
    </div>
  );
}
