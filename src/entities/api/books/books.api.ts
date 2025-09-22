const OPEN_LIBRARY_BASE_URL = "https://openlibrary.org";

export async function fetchBooks() {
    const res = await fetch(`${OPEN_LIBRARY_BASE_URL}/subjects/fantasy.json?limit=9`, {
        next: { revalidate: 30 },
    });
    return res.json();
}

export async function fetchBookByWorkId(workId: string) {
    const res = await fetch(`${OPEN_LIBRARY_BASE_URL}/works/${workId}.json`, {
        next: { revalidate: 30 },
    });
    return res.json();
}

export async function searchBooksByTitle(title: string) {
    const url = new URL(`${OPEN_LIBRARY_BASE_URL}/search.json`);
    url.searchParams.set("title", title);
    url.searchParams.set("limit", "12");

    const res = await fetch(url.toString(), { next: { revalidate: 30 } });
    if (!res.ok) return [] as { id: string; title: string; author?: string; coverUrl?: string }[];
    const data = await res.json();
    type Doc = {
        key?: string;
        title?: string;
        author_name?: string[];
        cover_i?: number;
        first_publish_year?: number;
    };
    const docs = Array.isArray(data.docs) ? (data.docs as Doc[]) : [];
    return docs.slice(0, 12).map((doc: Doc) => ({
        id: String(doc.key || "").replace("/works/", ""),
        title: String(doc.title || "Untitled"),
        author: Array.isArray(doc.author_name) && doc.author_name[0] ? doc.author_name[0] : undefined,
        coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : undefined,
        year: typeof doc.first_publish_year === "number" ? doc.first_publish_year : undefined,
    }));
}

