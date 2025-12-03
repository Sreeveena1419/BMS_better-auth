import BooksListTable from "@/components/books/books-list-table";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function BooksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      published: true,
      isbn: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-zinc-800">Books</h1>

        <Button
          asChild
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-5 text-md rounded-xl shadow-lg"
        >
          <Link href="/books/create">
            <PlusCircle className="h-5 w-5" />
            Create Book
          </Link>
        </Button>
      </div>

      {/* Table */}
      <BooksListTable books={books} />
    </div>
  );
}
