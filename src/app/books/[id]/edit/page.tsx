import BookForm, { BookFormValues } from "@/components/books/book-form";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function EditBookPage(props: PageProps<"/books/[id]">) {
  const params = await props.params;
  const book = await prisma.book.findUnique({ where: { id: params.id } });

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

  async function updateBook(data: BookFormValues) {
    "use server";

    await prisma.book.update({
      where: { id: book?.id },
      data: {
        ...data,
        published: new Date(data.published),
      },
    });
  }

  return (
    <BookForm
      defaultValues={{
        title: book.title,
        author: book.author,
        published: book.published.toISOString().split("T")[0],
        isbn: book.isbn,
      }}
      bookId={book.id}
      mode="edit"
      onSubmit={updateBook}
      buttonText="Update Book"
    />
  );
}
