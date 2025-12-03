"use server";

import prisma from "@/lib/prisma";
import { bookSchema } from "@/lib/validators/books";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type BookInput = z.infer<typeof bookSchema>;

async function requireAuth() {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result || !result.session) {
    redirect("/signin");
  }
  return result.user;
}

export async function addBook(input: BookInput) {
  await requireAuth();

  const data = bookSchema.parse(input);

  const book = await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      published: new Date(data.published),
      isbn: data.isbn,
    },
  });

  revalidatePath("/books");
  redirect(`/books/${book.id}`);
}

export async function updateBook(id: string, input: BookInput) {
  await requireAuth();

  const data = bookSchema.parse(input);

  const book = await prisma.book.update({
    where: { id },
    data: {
      title: data.title,
      author: data.author,
      published: new Date(data.published),
      isbn: data.isbn,
    },
  });

  revalidatePath("/books");
  redirect(`/books/${book.id}`);
}

export async function deleteBook(id: string) {
  await requireAuth();

  await prisma.book.delete({
    where: { id },
  });

  revalidatePath("/books");
  // redirect("/books");
  return { success: true };
}
