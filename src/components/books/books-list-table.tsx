import Link from "next/link";
import DeleteBookButton from "./delete-book-button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Eye, Pencil } from "lucide-react";

type Book = {
  id: string;
  title: string;
  author: string;
  published: Date;
  isbn: string;
};

export default function BooksListTable({ books }: { books: Book[] }) {
  return (
    <div
      className="rounded-xl border bg-white shadow-sm p-4 mt-4"
      // added card style wrapper
    >
      <Table className="mt-3">
        <TableCaption className="text-gray-600 text-sm py-3">
          {/* softer caption */}
          Available Books
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100">
            {/*  header background styling */}
            <TableHead className="font-semibold text-gray-700">ID</TableHead>
            {/* better typography */}
            <TableHead className="font-semibold text-gray-700">Title</TableHead>
            <TableHead className="font-semibold text-gray-700">
              Author
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Published
            </TableHead>
            <TableHead className="font-semibold text-gray-700">ISBN</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-6 text-gray-500 italic"
                //  improved empty state
              >
                No books available
              </TableCell>
            </TableRow>
          ) : (
            books.map((b) => (
              <TableRow
                key={b.id}
                className="hover:bg-gray-50 transition-colors"
                // hover effect for rows
              >
                <TableCell className="text-gray-700">{b.id}</TableCell>
                {/* text color */}
                <TableCell className="font-medium text-gray-800">
                  {b.title}
                </TableCell>
                <TableCell className="text-gray-700">{b.author}</TableCell>
                <TableCell className="text-gray-700">
                  {new Date(b.published).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-gray-700">{b.isbn}</TableCell>

                <TableCell className="text-right flex gap-3 justify-end">
                  {/* added hover, size, color */}
                  <Link
                    href={`/books/${b.id}`}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    href={`/books/${b.id}/edit`}
                    className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition"
                  >
                    <Pencil size={18} />
                  </Link>

                  {/* consistent spacing with icons */}
                  <DeleteBookButton id={b.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
