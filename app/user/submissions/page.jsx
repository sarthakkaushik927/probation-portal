import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import UserSubmissionCard from "@/components/dashboard/UserSubmissionCard";

export default async function UserSubmissionsPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const submissions =
    await prisma.submission.findMany({
      where: {
        userId: session.user.id,
      },

      include: {
        task: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="p-8">

      <PageHeader
        title="My Submissions"
        description="Track your submitted tasks"
      />

      {submissions.length === 0 ? (
        <DashboardCard>
          <p className="text-muted-foreground">
            No submissions yet.
          </p>
        </DashboardCard>
      ) : (
        <div className="mt-8 grid gap-6">
          {submissions.map((submission) => (
            <UserSubmissionCard
              key={submission.id}
              submission={submission}
            />
          ))}
        </div>
      )}

    </main>
  );
}