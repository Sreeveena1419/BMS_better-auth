"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteBook } from "@/actions/book-actions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteBookButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure want to delete? ");
    if (!confirmDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteBook(id);
      if (res?.success) {
        toast.message("Deleted Successfully!");
        router.refresh();
      } else {
        toast.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Delete Failed!");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting.." : <Trash2 />}
    </Button>
  );
}
