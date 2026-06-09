import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardSidebar, { IconName } from "@/components/sidebar/DashboardSidebar";

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

  const adminItems: { href: string; title: string; iconName: IconName }[] = [
    {
      href: "/admin/dashboard",
      title: "Dashboard",
      iconName: "LayoutDashboard",
    },
    {
      href: "/admin/tasks",
      title: "Tasks",
      iconName: "Briefcase",
    },
    {
      href: "/admin/submissions",
      title: "Submissions",
      iconName: "FileText",
    },
    {
      href: "/admin/users",
      title: "Users",
      iconName: "Users",
    },
    {
      href: "/admin/attendance",
      title: "Attendance",
      iconName: "CalendarDays",
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