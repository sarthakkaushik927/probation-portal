import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import FrontendDashboard from "@/components/dashboard/domains/FrontendDashboard";
import BackendDashboard from "@/components/dashboard/domains/BackendDashboard";
import AppDashboard from "@/components/dashboard/domains/AppDashboard";
import UiuxDashboard from "@/components/dashboard/domains/UiuxDashboard";
import CloudDashboard from "@/components/dashboard/domains/CloudDashboard";
import MlDashboard from "@/components/dashboard/domains/MlDashboard";
import DefaultDashboard from "@/components/dashboard/domains/DefaultDashboard";

export default async function UserDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        ...(user?.domain ? [{ domain: user.domain }] : []),
        { domain: "COMMON" }
      ]
    },
  });

  const submissions = await prisma.submission.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <main className="p-4 md:p-8">
      {user?.domain === "FRONTEND" ? (
        <FrontendDashboard user={user} tasks={tasks} submissions={submissions} />
      ) : user?.domain === "BACKEND" ? (
        <BackendDashboard user={user} tasks={tasks} submissions={submissions} />
      ) : user?.domain === "APP" ? (
        <AppDashboard user={user} tasks={tasks} submissions={submissions} />
      ) : user?.domain === "UIUX" ? (
        <UiuxDashboard user={user} tasks={tasks} submissions={submissions} />
      ) : user?.domain === "CLOUD" ? (
        <CloudDashboard user={user} tasks={tasks} submissions={submissions} />
      ) : user?.domain === "ML" ? (
        <MlDashboard user={user} tasks={tasks} submissions={submissions} />
      ) : (
        <DefaultDashboard user={user} tasks={tasks} submissions={submissions} />
      )}
    </main>
  );
}