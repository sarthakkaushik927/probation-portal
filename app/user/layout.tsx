import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-72 border-r p-6">
        <h2 className="mb-8 text-2xl font-bold">
          My Portal
        </h2>

        <nav className="space-y-2">
          <Link
            href="/user/dashboard"
            className="block rounded-xl p-3 hover:bg-muted"
          >
            Dashboard
          </Link>

          <Link
            href="/user/tasks"
            className="block rounded-xl p-3 hover:bg-muted"
          >
            Tasks
          </Link>

          <Link
            href="/user/submissions"
            className="block rounded-xl p-3 hover:bg-muted"
          >
            Submissions
          </Link>
        </nav>
      </aside>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}