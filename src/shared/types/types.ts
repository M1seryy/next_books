import { useBooksSortStore } from "../store/books.store";

export type Doc = {
    key?: string;
    title?: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
};

export type BookPageProps = {
    params: Promise<{ slug: string }>;
};

export type BooksListItem = {
    id: string;
    title: string;
    author?: string;
    coverUrl?: string;
    year?: number;
};
