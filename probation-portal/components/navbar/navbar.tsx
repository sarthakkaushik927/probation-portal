"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-4 mt-3 flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-6 backdrop-blur-xl">

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-linear-to-br from-violet-500 to-fuchsia-500" />

          <Link href="/">
            <h1 className="text-xl font-bold">
              Probation Portal
            </h1>
          </Link>
        </div>

        {!session ? (
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="outline">
                Login
              </Button>
            </Link>

            <Link href="/auth/signup">
              <Button>
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">

            {session.user.role === "ADMIN" ? (
              <Link href="/admin/dashboard">
                <Button variant="outline">
                  Admin Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/user/dashboard">
                <Button variant="outline">
                  Dashboard
                </Button>
              </Link>
            )}

            <span className="text-sm text-muted-foreground">
              {session.user?.name}
            </span>

            <LogoutButton />
          </div>
        )}
      </nav>
    </header>
  );
}