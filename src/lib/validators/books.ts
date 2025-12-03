import { z } from "zod";

const isbn13Regex = /^\d{13}$/;

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(2, "The author name has to be at least 2 characters!"),

  published: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) {
        const d = new Date(val);
        return isNaN(d.getTime()) ? undefined : d;
      }
      return undefined;
    },
    z.date().refine((d) => d instanceof Date, {
      message: "Published date is required",
    })
  ),

  isbn: z
    .string()
    .regex(isbn13Regex, "ISBN must be exactly 13 digits (ISBN-13)")
    .min(13)
    .max(13),
});
