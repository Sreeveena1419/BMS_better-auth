import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteBookButton from "@/components/books/delete-book-button";

export default async function BookDetails(props: PageProps<"/books/[id]">) {
  const params = await props.params;
  const book = await prisma.book.findUnique({
    where: { id: params.id },
  });

  if (!book) {
    return (
      <div>
        <p>Book not found</p>

        <Link href="/books">
          <Button>Back to list</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Card className="border-orange-300 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{book.author}</p>
            <p>Published: {new Date(book.published).toLocaleDateString()}</p>
            <p>ISBN: {book.isbn}</p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-4">
              <Link href={`/books/${book.id}/edit`} className="btn">
                <Button>Edit</Button>
              </Link>
              <DeleteBookButton id={book.id} />
              <Link href="/books">
                <Button>Back to list</Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
