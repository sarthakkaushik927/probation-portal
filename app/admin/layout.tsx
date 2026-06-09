import { auth } from "@/auth";
import { redirect } from "next/navigation";


import SidebarLink from "@/components/sidebar/SidebarLink";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/user/dashboard");
  }
  return (
    <div className="flex min-h-screen">
      <aside className="w-72 border-r p-6">
        <h2 className="mb-8 text-2xl font-bold">
          Admin Panel
        </h2>

        <div className="space-y-2">
          <SidebarLink
            href="/admin/dashboard"
            title="Dashboard"
          />

          <SidebarLink
            href="/admin/tasks"
            title="Tasks"
          />

          <SidebarLink
            href="/admin/submissions"
            title="Submissions"
          />

          <SidebarLink
            href="/admin/users"
            title="Users"
          />
        </div>
      </aside>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}