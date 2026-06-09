import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardSidebar, { IconName } from "@/components/sidebar/DashboardSidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const userItems: { href: string; title: string; iconName: IconName }[] = [
    {
      href: "/user/dashboard",
      title: "Dashboard",
      iconName: "LayoutDashboard",
    },
    {
      href: "/user/tasks",
      title: "Tasks",
      iconName: "Briefcase",
    },
    {
      href: "/user/submissions",
      title: "Submissions",
      iconName: "FileText",
    },
    {
      href: "/user/attendance",
      title: "Attendance",
      iconName: "CalendarDays",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar
        title="My Portal"
        items={userItems}
      />

      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}