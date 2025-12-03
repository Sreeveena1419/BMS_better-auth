import Link from "next/link";
import { BookOpen, Home } from "lucide-react";
import NavbarClient from "./navbar-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MainNavbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="w-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 shadow-lg backdrop-blur-xl border-b border-zinc-600/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-100 font-bold text-xl tracking-wide hover:text-zinc-300 transition"
        >
          <BookOpen className="h-6 w-6" />
          BookShelf
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-zinc-200 text-sm font-medium hover:text-white transition"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/books"
              className="flex items-center gap-1 text-zinc-200 text-sm font-medium hover:text-white transition"
            >
              <BookOpen className="h-4 w-4" />
              Books
            </Link>
          </li>
        </ul>

        {/* Pass either session object or null */}
        <NavbarClient session={session?.session ?? null} />
      </div>
    </nav>
  );
}
