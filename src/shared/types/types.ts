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