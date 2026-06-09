import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";

export default async function AdminDashboard() {
  const totalUsers =
    await prisma.user.count();

  const activeTasks =
    await prisma.task.count();

  const pendingReviews =
    await prisma.submission.count({
      where: {
        status: "PENDING",
      },
    });

  return (
    <main className="p-8">
      <PageHeader
        title="Admin Dashboard"
        description="Manage probation tasks and users"
      />

      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          title="Total Users"
          value={totalUsers}
        />

        <StatCard
          title="Active Tasks"
          value={activeTasks}
        />

        <StatCard
          title="Pending Reviews"
          value={pendingReviews}
        />

      </div>
    </main>
  );
}