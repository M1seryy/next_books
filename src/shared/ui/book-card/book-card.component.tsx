import { Card, CardHeader, CardBody } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

type BookCardProps = {
  id?: string;
  title: string;
  author?: string;
  coverUrl?: string;
  year?: number;
};

import { memo } from "react";

const BookCard = ({ id, title, author, coverUrl, year }: BookCardProps) => {
  const content = (
    <Card className="group py-4 border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 hover:-translate-y-0.5">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold text-gray-500">Book</p>
        {author || year ? (
          <small className="text-default-500">
            {author ? `by ${author}` : ""}
            {author && year ? " • " : ""}
            {year ?? ""}
          </small>
        ) : null}
        <h4 className="font-bold text-large mt-1">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={title}
          className="object-cover rounded-xl transition-transform duration-200 group-hover:scale-[1.02]"
          src={coverUrl || "https://placehold.co/270x360/jpg?text=Book"}
          width={270}
          height={360}
        />
      </CardBody>
    </Card>
  );

  return id ? (
    <Link href={`/${id}`} className="block" aria-label={`Open ${title}`}>
      {content}
    </Link>
  ) : (
    content
  );
};
export default memo(BookCard);
