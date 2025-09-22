import { searchBooksByTitle } from './books.api';

export const booksListQueryOptions = (q: string) => ({
    queryKey: ["books", q],
    queryFn: () => searchBooksByTitle(q),
    staleTime: 30_000,
    refetchOnMount: "always" as const,
});