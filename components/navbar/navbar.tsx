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
          <div className="h-8 w-8 shrink-0 rounded-lg bg-linear-to-br from-violet-500 to-fuchsia-500" />

          <Link href="/">
            <h1 className="hidden text-xl font-bold sm:block">
              Probation Portal
            </h1>
            <h1 className="text-xl font-bold sm:hidden">
              PP
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">

          {session?.user.role === "ADMIN" && (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/admin/dashboard">
                <Button
                  variant={
                    window.location.pathname.startsWith(
                      "/admin"
                    )
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                >
                  Admin
                </Button>
              </Link>

              <Link href="/user/dashboard">
                <Button
                  variant={
                    window.location.pathname.startsWith(
                      "/user"
                    )
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                >
                  User
                </Button>
              </Link>
            </div>
          )}

          {session ? (
            <>
              <span className="hidden text-sm text-muted-foreground lg:block">
                {session.user?.name}
              </span>
              <LogoutButton />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}

        </div>
      </nav>
    </header>
  );
}