import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, Briefcase, FileText } from "lucide-react";

import DashboardSidebar from "@/components/sidebar/DashboardSidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const userItems = [
    {
      href: "/user/dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/user/tasks",
      title: "Tasks",
      icon: Briefcase,
    },
    {
      href: "/user/submissions",
      title: "Submissions",
      icon: FileText,
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