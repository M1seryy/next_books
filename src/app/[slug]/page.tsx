import { fetchBookByWorkId } from "@/entities/api/books/books.api";
import { BookPageProps } from "@/shared/types/types";
import Image from "next/image";

export const revalidate = 30;

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const data = await fetchBookByWorkId(slug);

  const coverId =
    Array.isArray(data?.covers) && data.covers[0] ? data.covers[0] : null;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://placehold.co/480x640/jpg?text=No+Cover";

  const rawDescription = data?.description;
  const description =
    typeof rawDescription === "string"
      ? rawDescription
      : typeof rawDescription?.value === "string"
      ? rawDescription.value
      : "Опис відсутній.";

  const subjects: string[] = Array.isArray(data?.subjects)
    ? data.subjects.slice(0, 12)
    : [];

  return (
    <section className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-4 md:p-6">
        <div className="flex justify-center">
          <Image
            src={coverUrl}
            alt={data?.title ?? "Book cover"}
            width={480}
            height={640}
            className="rounded-lg object-cover shadow"
            priority
          />
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {data?.title ?? "Book"}
            </h1>
          </div>

          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {description}
          </p>

          {subjects.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Тематики
              </h3>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
