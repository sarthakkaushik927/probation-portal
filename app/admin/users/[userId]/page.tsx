import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import DomainForm from "@/components/forms/DomainForm";
import DashboardCard from "@/components/dashboard/DashboardCard";

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{
    userId: string;
  }>;
}) {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    include: {
      submissions: true,
    },
  });

  if (!user) {
    notFound();
  }

  const attendance =
    await prisma.attendance.findMany({
      where: {
        userId,
      },

      orderBy: {
        date: "desc",
      },
    });

  const present =
    attendance.filter(
      (a) => a.status === "PRESENT"
    ).length;

  const absent =
    attendance.filter(
      (a) => a.status === "ABSENT"
    ).length;

  const leave =
    attendance.filter(
      (a) => a.status === "LEAVE"
    ).length;

  const workingDays =
    present + absent;

  const percentage =
    workingDays === 0
      ? 0
      : Math.round(
          (present / workingDays) *
            100
        );

  return (
    <div className="p-4 md:p-8">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">

        <h1 className="mb-8 text-3xl font-bold md:text-4xl">
          {user.name}
        </h1>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <p className="font-medium">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Role
            </p>

            <p className="font-medium">
              {user.role}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Domain
            </p>

            <p className="mb-3 font-medium">
              {user.domain ??
                "Not Assigned"}
            </p>

            <DomainForm
              userId={user.id}
              currentDomain={
                user.domain
              }
            />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Joined
            </p>

            <p className="font-medium">
              {user.createdAt.toLocaleDateString()}
            </p>
          </div>

        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <DashboardCard>
            <h3 className="text-sm text-muted-foreground">
              Attendance %
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {percentage}%
            </p>
          </DashboardCard>

          <DashboardCard>
            <h3 className="text-sm text-muted-foreground">
              Present
            </h3>

            <p className="mt-2 text-3xl font-bold text-green-500">
              {present}
            </p>
          </DashboardCard>

          <DashboardCard>
            <h3 className="text-sm text-muted-foreground">
              Absent
            </h3>

            <p className="mt-2 text-3xl font-bold text-red-500">
              {absent}
            </p>
          </DashboardCard>

          <DashboardCard>
            <h3 className="text-sm text-muted-foreground">
              Leave
            </h3>

            <p className="mt-2 text-3xl font-bold text-yellow-500">
              {leave}
            </p>
          </DashboardCard>

        </div>

        <div className="mt-10">

          <h2 className="mb-4 text-2xl font-bold">
            Attendance History
          </h2>

          {attendance.length === 0 ? (
            <DashboardCard>
              <p className="text-muted-foreground">
                No attendance records found.
              </p>
            </DashboardCard>
          ) : (
            <div className="space-y-3">

              {attendance.map(
                (record) => (
                  <DashboardCard
                    key={record.id}
                  >
                    <div className="flex items-center justify-between">

                      <span>
                        {new Date(
                          record.date
                        ).toLocaleDateString()}
                      </span>

                      <span
                        className={
                          record.status ===
                          "PRESENT"
                            ? "font-semibold text-green-500"
                            : record.status ===
                              "ABSENT"
                            ? "font-semibold text-red-500"
                            : "font-semibold text-yellow-500"
                        }
                      >
                        {record.status}
                      </span>

                    </div>
                  </DashboardCard>
                )
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}