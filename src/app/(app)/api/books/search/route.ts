import { Doc } from "@/shared/types/types";
import { NextResponse } from "next/server";

export const revalidate = 30;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") ?? "Harry Potter").trim();

    const url = new URL("https://openlibrary.org/search.json");
    url.searchParams.set("title", q);
    url.searchParams.set("limit", "12");

    const res = await fetch(url.toString(), { next: { revalidate } });
    if (!res.ok) return NextResponse.json({ items: [] });
    const data = await res.json();
    const docs = Array.isArray(data.docs) ? data.docs : [];

    const items = docs.slice(0, 12).map((doc: Doc) => ({
        id: String(doc.key || "").replace("/works/", ""),
        title: String(doc.title || "Untitled"),
        author: Array.isArray(doc.author_name) && doc.author_name[0] ? doc.author_name[0] : undefined,
        coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : undefined,
    }));

    return NextResponse.json({ items });
}
