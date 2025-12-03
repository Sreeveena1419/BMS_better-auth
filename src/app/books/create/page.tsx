import BookForm, { BookFormValues } from "@/components/books/book-form";
import prisma from "@/lib/prisma";

export default function CreateBookPage() {
  async function createBook(data: BookFormValues) {
    "use server";
    await prisma.book.create({
      data: {
        ...data,
        published: new Date(data.published),
      },
    });
  }

  return (
    <BookForm
      defaultValues={{
        title: "",
        author: "",
        published: new Date().toISOString().split("T")[0],
        isbn: "",
      }}
      mode="create" // ✔ FIXED
      onSubmit={createBook} // ✔ REQUIRED
      buttonText="Create Book" // ✔ REQUIRED
    />
  );
}
