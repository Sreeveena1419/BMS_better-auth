"use client";

import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(2, "The author name has to be at least 2 characters!"),
  published: z.string().min(1, "Published date is required"),
  isbn: z
    .string()
    .min(13, "ISBN should be 13 characters!")
    .max(13, "ISBN should be 13 characters!"),
});

export type BookFormValues = z.infer<typeof bookSchema>;

type BookFormProps = {
  defaultValues: BookFormValues;
  onSubmit: (data: BookFormValues) => Promise<void>;
  buttonText: string;
  bookId?: string;
  mode: "create" | "edit";
};

export default function BookForm({
  defaultValues,
  onSubmit,
  mode,
}: BookFormProps) {
  // now works
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues,
  });
  const router = useRouter();

  const handleSubmit = async (data: BookFormValues) => {
    try {
      await onSubmit(data);
      toast.success(
        mode === "create"
          ? "Book created successfully!"
          : "Book updated successfully!"
      );
      form.reset(defaultValues);
    } catch (err) {
      toast.error("Something went wrong");
    }
    if (mode === "edit") {
      router.push("/books");
      return;
    }
  };

  return (
    <div className="flex justify-center py-20">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>
            {mode === "create" ? "Add New Book" : "Edit Book"}
          </CardTitle>
          <CardDescription>
            {mode === "create" ? "Fill out the details" : "Update book details"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="book-form" onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Title</FieldLabel>
                    <Input {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="author"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Author</FieldLabel>
                    <Input {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="published"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Published Date</FieldLabel>
                    <Input
                      type="date"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="isbn"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>ISBN (13 digits)</FieldLabel>
                    <Input {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="book-form">
              {mode === "create" ? "Create Book" : "Update Book"}
            </Button>
            {mode === "create" && (
              <Button type="button" onClick={() => form.reset(defaultValues)}>
                Reset
              </Button>
            )}
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
