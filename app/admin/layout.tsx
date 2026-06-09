import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, Briefcase, FileText, Users } from "lucide-react";

import DashboardSidebar from "@/components/sidebar/DashboardSidebar";

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

  const adminItems = [
    {
      href: "/admin/dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/tasks",
      title: "Tasks",
      icon: Briefcase,
    },
    {
      href: "/admin/submissions",
      title: "Submissions",
      icon: FileText,
    },
    {
      href: "/admin/users",
      title: "Users",
      icon: Users,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar
        title="Admin Panel"
        items={adminItems}
      />

      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}