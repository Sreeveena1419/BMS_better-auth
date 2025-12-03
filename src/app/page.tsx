import Link from "next/link";
import Carousel from "@/components/ui/carouselnew";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-black dark:to-zinc-900 flex items-center justify-center px-6 py-16">
      <main className="max-w-5xl w-full space-y-12">
        {/* HERO SECTION */}
        <section className="text-center space-y-5">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to Book Management System
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300 text-lg">
            Organize, browse and manage your books beautifully.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link href="/books">
              <Button size="lg" className="font-semibold">
                📚 View All Books
              </Button>
            </Link>
            <Link href="/books/create">
              <Button size="lg" variant="outline" className="font-semibold">
                ➕ Add New Book
              </Button>
            </Link>
          </div>
        </section>

        {/* CAROUSEL SECTION */}
        <section className="pt-8">
          <Carousel />
        </section>
      </main>
    </div>
  );
}
