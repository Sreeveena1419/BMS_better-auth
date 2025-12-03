"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

// Minimal session type from BetterAuth
type SessionType = {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
};

interface NavbarClientProps {
  session: SessionType | null;
}

export default function NavbarClient({ session }: NavbarClientProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    try {
      await authClient.signOut();
      // Optional: reload page to reflect sign out
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out failed", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {session ? (
        <Button onClick={handleSignOut} variant="outline" disabled={isLoading}>
          {isLoading ? "Signing out..." : "Sign Out"}
        </Button>
      ) : (
        <>
          <Button asChild variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
}
